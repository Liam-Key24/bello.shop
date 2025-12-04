'use client';

import { useState } from 'react';
import { X, FloppyDisk } from '@phosphor-icons/react';
import type { CustomerAddress,  MailingAddressInput } from '@/lib/shopify/types';

interface AddressFormProps {
  address?: CustomerAddress | null;
  onSave: (address: MailingAddressInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const REQUIRED_FIELDS = ['address1', 'city', 'country', 'zip'] as const;

export default function AddressForm({ address, onSave, onCancel, isLoading = false }: AddressFormProps) {
  const [formData, setFormData] = useState<MailingAddressInput>({
    address1: address?.address1 || '',
    address2: address?.address2 || '',
    city: address?.city || '',
    province: address?.province || '',
    country: address?.country || address?.countryCodeV2 || 'United States',
    zip: address?.zip || '',
    phone: address?.phone || '',
    firstName: address?.firstName || '',
    lastName: address?.lastName || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation - HTML5 required handles most cases
    if (!REQUIRED_FIELDS.every(field => formData[field]?.trim())) {
      return;
    }
    await onSave(formData);
  };

  const updateField = (field: keyof MailingAddressInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="neumorphism-bg p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">
          {address ? 'Edit Address' : 'Add New Address'}
        </h3>
        <button 
          onClick={onCancel} 
          className="p-2 hover:bg-white/20 rounded-lg transition-colors" 
          disabled={isLoading}
        >
          <X className="w-5 h-5" weight="regular" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Street Address */}
        <div>
          <label htmlFor="address1" className="block text-sm font-medium mb-2">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            id="address1"
            type="text"
            value={formData.address1}
            onChange={(e) => updateField('address1', e.target.value)}
            className="w-full px-4 py-3 neumorphism-input-style"
            required
            disabled={isLoading}
          />
        </div>

        {/* Address Line 2 */}
        <div>
          <label htmlFor="address2" className="block text-sm font-medium mb-2">
            Apartment, suite, etc. (optional)
          </label>
          <input
            id="address2"
            type="text"
            value={formData.address2}
            onChange={(e) => updateField('address2', e.target.value)}
            className="w-full px-4 py-3 neumorphism-input-style"
            disabled={isLoading}
          />
        </div>

        {/* City, State, ZIP Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => updateField('city', e.target.value)}
              className="w-full px-4 py-3 neumorphism-input-style"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="province" className="block text-sm font-medium mb-2">
              State/Province
            </label>
            <input
              id="province"
              type="text"
              value={formData.province}
              onChange={(e) => updateField('province', e.target.value)}
              className="w-full px-4 py-3 neumorphism-input-style"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-medium mb-2">
              ZIP <span className="text-red-500">*</span>
            </label>
            <input
              id="zip"
              type="text"
              value={formData.zip}
              onChange={(e) => updateField('zip', e.target.value)}
              className="w-full px-4 py-3 neumorphism-input-style"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            value={formData.country}
            onChange={(e) => updateField('country', e.target.value)}
            className="w-full px-4 py-3 neumorphism-input-style"
            required
            disabled={isLoading}
          >
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Spain">Spain</option>
            <option value="Italy">Italy</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full neumorphism-button gap-3 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>Save Address</span>
                <FloppyDisk className="w-5 h-5" weight="regular" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}