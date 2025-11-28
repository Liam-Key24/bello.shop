import { useMemo } from 'react';
import type { Customer, CustomerAddress } from '@/lib/shopify/types';

export function useCustomerAddresses(customer: Customer | null): CustomerAddress[] {
  return useMemo(() => {
    if (!customer) return [];
    
    const addresses: CustomerAddress[] = [];
    const addressMap = new Map<string, CustomerAddress>();
    
    // Add default address if it exists
    if (customer.defaultAddress) {
      addressMap.set(customer.defaultAddress.id, customer.defaultAddress);
    }
    
    // Add other addresses from the addresses array
    if (customer.addresses) {
      const addressArray = Array.isArray(customer.addresses) 
        ? customer.addresses 
        : (customer.addresses as any).edges?.map((e: any) => e.node) || [];
      
      addressArray.forEach((addr: CustomerAddress) => {
        if (!addressMap.has(addr.id)) {
          addressMap.set(addr.id, addr);
        }
      });
    }
    
    return Array.from(addressMap.values());
  }, [customer]);
}

