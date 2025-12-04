import { NextRequest, NextResponse } from "next/server";
import { customerCreate, customerLogin, customerLogout } from "@/lib/shopify/customer";
import { checkRateLimit, getClientIdentifier } from "@/lib/auth/rate-limit";
import { validateEmail, validatePassword, validateName, sanitizeString } from "@/lib/auth/validation";

// POST /api/shopify/auth - Login or Register
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action, email, password, firstName, lastName } = body;

    if (!action || !["login", "register"].includes(action)) {
      return NextResponse.json({ error: "Action must be 'login' or 'register'" }, { status: 400 });
    }

    // Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitKey = action === "login" ? `login:${clientId}` : `register:${clientId}`;
    const rateLimit = checkRateLimit(rateLimitKey, {
      maxRequests: action === "login" ? 5 : 3,
      windowMs: action === "login" ? 15 * 60 * 1000 : 60 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many ${action} attempts. Please try again later.`,
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const sanitizedEmail = sanitizeString(email || "");
    const sanitizedPassword = password || "";
    const sanitizedFirstName = sanitizeString(firstName || "");
    const sanitizedLastName = sanitizeString(lastName || "");

    // Validate email
    const emailValidation = validateEmail(sanitizedEmail);
    if (!emailValidation.valid) {
      return NextResponse.json({ error: emailValidation.errors[0] }, { status: 400 });
    }

    // Validate password
    if (!sanitizedPassword || sanitizedPassword.length < 1) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    if (action === "register") {
      const passwordValidation = validatePassword(sanitizedPassword);
      if (!passwordValidation.valid) {
        return NextResponse.json({ error: passwordValidation.errors[0] }, { status: 400 });
      }

      if (sanitizedFirstName) {
        const firstNameValidation = validateName(sanitizedFirstName, "First name");
        if (!firstNameValidation.valid) {
          return NextResponse.json({ error: firstNameValidation.errors[0] }, { status: 400 });
        }
      }

      if (sanitizedLastName) {
        const lastNameValidation = validateName(sanitizedLastName, "Last name");
        if (!lastNameValidation.valid) {
          return NextResponse.json({ error: lastNameValidation.errors[0] }, { status: 400 });
        }
      }

      // Create customer
      const createResult = await customerCreate(
        sanitizedEmail,
        sanitizedPassword,
        sanitizedFirstName || undefined,
        sanitizedLastName || undefined
      );

      if (createResult.customerUserErrors.length > 0) {
        const error = createResult.customerUserErrors[0];
        if (error.code === "TAKEN") {
          return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
        }
        return NextResponse.json({ error: error.message || "Registration failed" }, { status: 400 });
      }

      // Auto-login after registration
      const loginResult = await customerLogin(sanitizedEmail, sanitizedPassword);
      if (loginResult.customerUserErrors.length > 0 || !loginResult.customerAccessToken) {
        return NextResponse.json(
          { error: "Registration successful but login failed. Please try logging in." },
          { status: 500 }
        );
      }

      const token = loginResult.customerAccessToken.accessToken;
      const res = NextResponse.json({ success: true });
      res.cookies.set({
        name: "shopifyCustomerToken",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "strict",
      });
      return res;
    } else {
      // Login
      const result = await customerLogin(sanitizedEmail, sanitizedPassword);

      if (result.customerUserErrors?.length) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }

      const token = result.customerAccessToken?.accessToken;
      if (!token) {
        return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
      }

      const res = NextResponse.json({ success: true });
      res.cookies.set({
        name: "shopifyCustomerToken",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });

      res.headers.set("X-RateLimit-Limit", "5");
      res.headers.set("X-RateLimit-Remaining", rateLimit.remaining.toString());
      res.headers.set("X-RateLimit-Reset", rateLimit.resetTime.toString());

      return res;
    }
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/shopify/auth - Logout
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("shopifyCustomerToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const result = await customerLogout(token);

    if (result.userErrors?.length) {
      return NextResponse.json({ error: result.userErrors[0].message }, { status: 400 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: "shopifyCustomerToken",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 0,
    });

    return res;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
