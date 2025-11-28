import { useState } from 'react';
import type { MailingAddressInput } from '@/lib/shopify/types';

interface UseAddressOperationsReturn {
  isAddressLoading: boolean;
  addressError: string | null;
  createAddress: (address: MailingAddressInput) => Promise<void>;
  updateAddress: (addressId: string, address: MailingAddressInput) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  setDefaultAddress: (addressId: string) => Promise<void>;
}

export function useAddressOperations(
  onSuccess?: () => Promise<void>
): UseAddressOperationsReturn {
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  const createAddress = async (address: MailingAddressInput) => {
    setIsAddressLoading(true);
    setAddressError(null);
    
    try {
      const res = await fetch('/api/shopify/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create address');
      }

      if (onSuccess) {
        await onSuccess();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create address';
      setAddressError(errorMessage);
      throw err;
    } finally {
      setIsAddressLoading(false);
    }
  };

  const updateAddress = async (addressId: string, address: MailingAddressInput) => {
    setIsAddressLoading(true);
    setAddressError(null);
    
    try {
      const res = await fetch('/api/shopify/address', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: addressId, ...address }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update address');
      }

      if (onSuccess) {
        await onSuccess();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update address';
      setAddressError(errorMessage);
      throw err;
    } finally {
      setIsAddressLoading(false);
    }
  };

  const deleteAddress = async (addressId: string) => {
    setIsAddressLoading(true);
    setAddressError(null);
    
    try {
      const res = await fetch(`/api/shopify/address?id=${addressId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete address');
      }

      if (onSuccess) {
        await onSuccess();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete address';
      setAddressError(errorMessage);
      throw err;
    } finally {
      setIsAddressLoading(false);
    }
  };

  const setDefaultAddress = async (addressId: string) => {
    setIsAddressLoading(true);
    setAddressError(null);
    
    try {
      const res = await fetch('/api/shopify/address', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addressId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to set default address');
      }

      if (onSuccess) {
        await onSuccess();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to set default address';
      setAddressError(errorMessage);
      throw err;
    } finally {
      setIsAddressLoading(false);
    }
  };

  return {
    isAddressLoading,
    addressError,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
}

