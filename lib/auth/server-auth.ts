import { cookies } from 'next/headers';
import { getCustomer, customerAccessTokenRenew } from '@/lib/shopify/customer';

export interface ServerAuthResult {
  isAuthenticated: boolean;
  customer: any | null;
  token: string | null;
}

/**
 * Server-side authentication utility
 * Use this in Server Components and API routes
 */
export async function getServerAuth(): Promise<ServerAuthResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('shopifyCustomerToken')?.value;

    if (!token) {
      return {
        isAuthenticated: false,
        customer: null,
        token: null,
      };
    }

    // Validate token by fetching customer
    const customer = await getCustomer(token);

    if (!customer) {
      return {
        isAuthenticated: false,
        customer: null,
        token: null,
      };
    }

    return {
      isAuthenticated: true,
      customer,
      token,
    };
  } catch (error) {
    console.error('Server auth error:', error);
    return {
      isAuthenticated: false,
      customer: null,
      token: null,
    };
  }
}

/**
 * Require authentication - throws error if not authenticated
 * Use in Server Components that require auth
 */
export async function requireAuth(): Promise<{ customer: any; token: string }> {
  const auth = await getServerAuth();

  if (!auth.isAuthenticated || !auth.customer || !auth.token) {
    throw new Error('Unauthorized');
  }

  return {
    customer: auth.customer,
    token: auth.token,
  };
}

/**
 * Renew customer access token if needed
 */
export async function renewTokenIfNeeded(token: string): Promise<string | null> {
  try {
    const result = await customerAccessTokenRenew(token);
    
    if (result.userErrors?.length || !result.customerAccessToken) {
      return null;
    }

    return result.customerAccessToken.accessToken;
  } catch (error) {
    console.error('Token renewal error:', error);
    return null;
  }
}

