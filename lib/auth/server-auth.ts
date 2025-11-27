import { cookies } from 'next/headers';
import { getCustomer, customerAccessTokenRenew } from '@/lib/shopify/customer';

import type { GetCustomerResponse } from '@/lib/shopify/types';

export interface ServerAuthResult {
  isAuthenticated: boolean;
  customer: GetCustomerResponse['customer'] | null;
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

    // Transform addresses from edges structure to flat array
    const transformedCustomer = {
      ...customer,
      addresses: customer.addresses?.edges?.map((edge: { node: any }) => edge.node) || [],
    };

    return {
      isAuthenticated: true,
      customer: transformedCustomer,
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
export async function requireAuth(): Promise<{ customer: NonNullable<GetCustomerResponse['customer']>; token: string }> {
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

