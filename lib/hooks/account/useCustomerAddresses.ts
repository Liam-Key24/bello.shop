"use client";

import { useMemo } from 'react';
import type { Customer, CustomerAddress } from '@/lib/shopify/types';

interface AddressEdge {
  node: CustomerAddress;
}

function isAddressEdgeArray(value: unknown): value is { edges: AddressEdge[] } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'edges' in value &&
    Array.isArray((value as { edges: unknown }).edges)
  );
}

export function useCustomerAddresses(customer: Customer | null): CustomerAddress[] {
  return useMemo(() => {
    if (!customer) return [];
    
    const addressMap = new Map<string, CustomerAddress>();
    
    if (customer.defaultAddress) {
      addressMap.set(customer.defaultAddress.id, customer.defaultAddress);
    }
    
    if (customer.addresses) {
      let addressArray: CustomerAddress[] = [];
      
      if (Array.isArray(customer.addresses)) {
        addressArray = customer.addresses;
      } else {
        const addressesWithEdges = customer.addresses as { edges?: AddressEdge[] };
        if (isAddressEdgeArray(addressesWithEdges)) {
          addressArray = addressesWithEdges.edges.map((e: AddressEdge) => e.node);
        }
      }
      
      addressArray.forEach((addr: CustomerAddress) => {
        if (!addressMap.has(addr.id)) {
          addressMap.set(addr.id, addr);
        }
      });
    }
    
    return Array.from(addressMap.values());
  }, [customer]);
}

