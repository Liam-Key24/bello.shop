import { cookies } from 'next/headers';
import { getCustomer, customerAccessTokenRenew } from '@/lib/shopify/customer';
import type { GetCustomerResponse, CustomerAddress } from '@/lib/shopify/types';

export interface ServerAuthResult {
  isAuthenticated: boolean;
  customer: GetCustomerResponse['customer'] | null;
  token: string | null;
}

interface AddressEdge {
  node: CustomerAddress;
}

function transformAddresses(
  addresses: GetCustomerResponse['customer']['addresses']
): CustomerAddress[] {
  if (!addresses) return [];
  if (Array.isArray(addresses)) return addresses;
  if ('edges' in addresses && Array.isArray(addresses.edges)) {
    return addresses.edges.map((edge: AddressEdge) => edge.node);
  }
  return [];
}

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

    const customer = await getCustomer(token);

    if (!customer) {
      return {
        isAuthenticated: false,
        customer: null,
        token: null,
      };
    }

    const transformedCustomer = {
      ...customer,
      addresses: transformAddresses(customer.addresses),
    };

    return {
      isAuthenticated: true,
      customer: transformedCustomer,
      token,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      customer: null,
      token: null,
    };
  }
}

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

export async function renewTokenIfNeeded(token: string): Promise<string | null> {
  try {
    const result = await customerAccessTokenRenew(token);
    
    if (result.userErrors?.length || !result.customerAccessToken) {
      return null;
    }

    return result.customerAccessToken.accessToken;
  } catch {
    return null;
  }
}

