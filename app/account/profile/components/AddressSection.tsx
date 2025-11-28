'use client';

import { AlertCircle } from 'lucide-react';
import AddressList from '@/app/components/account/AddressList';
import type { CustomerAddress, MailingAddressInput } from '@/lib/shopify/types';

interface AddressSectionProps {
  addresses: CustomerAddress[];
  defaultAddressId?: string;
  onAddressCreate: (address: MailingAddressInput) => Promise<void>;
  onAddressUpdate: (addressId: string, address: MailingAddressInput) => Promise<void>;
  onAddressDelete: (addressId: string) => Promise<void>;
  onSetDefault: (addressId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export default function AddressSection({
  addresses,
  defaultAddressId,
  onAddressCreate,
  onAddressUpdate,
  onAddressDelete,
  onSetDefault,
  isLoading,
  error,
}: AddressSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold text-gray-800">Saved Addresses</h2>
      </div>

      {error && (
        <div className="p-4 bg-white rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <AddressList
        addresses={addresses}
        defaultAddressId={defaultAddressId}
        onAddressCreate={onAddressCreate}
        onAddressUpdate={onAddressUpdate}
        onAddressDelete={onAddressDelete}
        onSetDefault={onSetDefault}
        isLoading={isLoading}
      />
    </div>
  );
}

