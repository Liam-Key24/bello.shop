'use client';

import { useState } from 'react';
import { MapPinIcon, PencilSimpleIcon, TrashIcon, StarIcon, PlusIcon } from '@phosphor-icons/react';
import AddressForm from './AddressForm';

import type { AddressListProps } from '@/lib/shopify/address-list'; 
import type { MailingAddressInput } from '@/lib/shopify/types';


export default function AddressList({
  addresses,
  defaultAddressId,
  onAddressCreate,
  onAddressUpdate,
  onAddressDelete,
  onSetDefault,
  isLoading = false,
}: AddressListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSave = async (address: MailingAddressInput, addressId?: string) => {
    if (addressId) {
      await onAddressUpdate(addressId, address);
    } else {
      await onAddressCreate(address);
    }
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleDelete = async (addressId: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setDeletingId(addressId);
      await onAddressDelete(addressId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Add New Address Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          disabled={isLoading}
          className="w-full p-4 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold bg-white-custom text-green-primary"
        >
          <PlusIcon className="w-5 h-5" weight="regular" />
          <span>Add New Address</span>
        </button>
      )}

      {/* Add Address Form */}
      {showAddForm && (
        <AddressForm
          onSave={(address) => handleSave(address)}
          onCancel={() => setShowAddForm(false)}
          isLoading={isLoading}
        />
      )}

      {/* Address List */}
      {addresses.map((address) => {
        const isDefault = address.id === defaultAddressId;
        const isEditing = editingId === address.id;

        if (isEditing) {
          return (
            <AddressForm
              key={address.id}
              address={address}
              onSave={(addr) => handleSave(addr, address.id)}
              onCancel={() => setEditingId(null)}
              isLoading={isLoading}
            />
          );
        }

        return (
          <div
            key={address.id}
            className="glass p-6 rounded-2xl shadow-lg relative"
          >
            {/* Default Badge */}
            {isDefault && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                <StarIcon className="w-3 h-3 fill-current" weight="fill" />
                <span>Default</span>
              </div>
            )}

            {/* Address Content */}
            <div className="pr-20">
              <div className="flex items-start gap-3 mb-3">
                <MapPinIcon className="w-5 h-5 text-green-600" weight="regular" />
                <div className="flex-1">
                  {(address.firstName || address.lastName) && (
                    <p className="font-semibold text-gray-800 mb-1">
                      {address.firstName} {address.lastName}
                    </p>
                  )}
                  <p className="text-gray-700">{address.address1}</p>
                  {address.address2 && (
                    <p className="text-gray-700">{address.address2}</p>
                  )}
                  <p className="text-gray-700">
                    {address.city}
                    {address.province && `, ${address.province}`}
                    {address.zip && ` ${address.zip}`}
                  </p>
                  {address.country && (
                    <p className="text-gray-700">{address.country}</p>
                  )}
                  {address.phone && (
                    <p className="text-gray-600 text-sm mt-1">{address.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              {!isDefault && (
                <button
                  onClick={() => onSetDefault(address.id)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  Set as Default
                </button>
              )}
              <button
                onClick={() => setEditingId(address.id)}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <PencilSimpleIcon className="w-4 h-4" weight="regular" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                disabled={isLoading || deletingId === address.id}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {deletingId === address.id ? (
                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <TrashIcon className="w-4 h-4" weight="regular" />
                )}
                <span>Delete</span>
              </button>
            </div>
          </div>
        );
      })}

      {/* Empty State */}
      {addresses.length === 0 && !showAddForm && (
        <div className="p-12 rounded-2xl text-center">
          <MapPinIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-sm">No addresses saved yet</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center justify-center"
          >
            Add Your First Address
          </button>
        </div>
      )}
    </div>
  );
}

