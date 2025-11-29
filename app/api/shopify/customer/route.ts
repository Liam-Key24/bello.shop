import { NextRequest, NextResponse } from "next/server";
import { customerAccessTokenRenew } from "@/lib/shopify/customer";
import { getServerAuth } from "@/lib/auth/server-auth";

export async function GET(req: NextRequest) {
  try {
    // Use server-side auth utility
    const auth = await getServerAuth();

    if (!auth.isAuthenticated || !auth.customer || !auth.token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Transform addresses from edges structure to flat array for client
    const transformedCustomer = auth.customer ? {
      ...auth.customer,
      addresses: auth.customer.addresses?.edges?.map((edge: { node: any }) => edge.node) || [],
    } : null;

    // Optionally try to renew token if it's close to expiring
    // This is a silent refresh to keep the session alive
    try {
      const renewedToken = await customerAccessTokenRenew(auth.token);
      if (renewedToken.customerAccessToken?.accessToken) {
        const response = NextResponse.json({ customer: transformedCustomer });
        // Update cookie with new token
        response.cookies.set({
          name: "shopifyCustomerToken",
          value: renewedToken.customerAccessToken.accessToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "strict",
          maxAge: 60 * 60 * 24, // 24 hours
        });
        return response;
      }
    } catch (renewError) {
      // If renewal fails, still return customer data with existing token
      console.warn("Token renewal failed, using existing token:", renewError);
    }

    return NextResponse.json({ customer: transformedCustomer });
  } catch (err) {
    console.error("Profile fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
