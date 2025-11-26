import { NextRequest, NextResponse } from "next/server";
import { customerCreate, customerLogin } from "@/lib/shopify/customer";
import { checkRateLimit, getClientIdentifier } from "@/lib/auth/rate-limit";
import { validateEmail, validatePassword, validateName, sanitizeString } from "@/lib/auth/validation";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimit = checkRateLimit(`register:${clientId}`, {
      maxRequests: 3, // 3 registration attempts
      windowMs: 60 * 60 * 1000, // per hour
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: "Too many registration attempts. Please try again later.",
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Parse and validate input
    const body = await req.json().catch(() => ({}));
    const email = sanitizeString(body.email || '');
    const password = body.password || '';
    const firstName = sanitizeString(body.firstName || '');
    const lastName = sanitizeString(body.lastName || '');

    // Validate all inputs
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.errors[0] },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.errors[0] },
        { status: 400 }
      );
    }

    if (firstName) {
      const firstNameValidation = validateName(firstName, 'First name');
      if (!firstNameValidation.valid) {
        return NextResponse.json(
          { error: firstNameValidation.errors[0] },
          { status: 400 }
        );
      }
    }

    if (lastName) {
      const lastNameValidation = validateName(lastName, 'Last name');
      if (!lastNameValidation.valid) {
        return NextResponse.json(
          { error: lastNameValidation.errors[0] },
          { status: 400 }
        );
      }
    }

    // 1. Create customer in Shopify
    const createResult = await customerCreate(email, password, firstName || undefined, lastName || undefined);

    if (createResult.customerUserErrors.length > 0) {
      // Don't expose specific Shopify errors for security
      const error = createResult.customerUserErrors[0];
      if (error.code === 'TAKEN') {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: error.message || "Registration failed" },
        { status: 400 }
      );
    }

    // 2. Log in the customer to get access token
    const loginResult = await customerLogin(email, password);

    if (loginResult.customerUserErrors.length > 0 || !loginResult.customerAccessToken) {
      return NextResponse.json(
        { error: "Registration successful but login failed. Please try logging in." },
        { status: 500 }
      );
    }

    const token = loginResult.customerAccessToken.accessToken;

    // 3. Set token in secure HTTP-only cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: "shopifyCustomerToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "strict", // Changed from "lax" for better security
    });

    return res;

  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
