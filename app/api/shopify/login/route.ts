// /api/shopify/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { customerLogin } from "@/lib/shopify/customer";
import { checkRateLimit, getClientIdentifier } from "@/lib/auth/rate-limit";
import { validateEmail, validatePassword, sanitizeString } from "@/lib/auth/validation";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimit = checkRateLimit(`login:${clientId}`, {
      maxRequests: 5, // 5 login attempts
      windowMs: 15 * 60 * 1000, // per 15 minutes
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: "Too many login attempts. Please try again later.",
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
          },
        }
      );
    }

    // Parse and validate input
    const body = await req.json().catch(() => ({}));
    const email = sanitizeString(body.email || '');
    const password = body.password || '';

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.errors[0] },
        { status: 400 }
      );
    }

    // Validate password (basic check - don't reveal too much)
    if (!password || password.length < 1) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Attempt login
    const result = await customerLogin(email, password);

    if (result.customerUserErrors?.length) {
      // Don't reveal specific error details for security
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = result.customerAccessToken?.accessToken;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 500 }
      );
    }

    const res = NextResponse.json({ success: true });

    // Set secure HTTP-only cookie
    res.cookies.set({
      name: "shopifyCustomerToken",
      value: token,
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      path: "/",
      sameSite: "strict", // CSRF protection
      maxAge: 60 * 60 * 24, // 24 hours
    });

    // Add security headers
    res.headers.set('X-RateLimit-Limit', '5');
    res.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
    res.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());

    return res;
  } catch (err) {
    console.error("Login error:", err);
    // Don't expose internal errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
