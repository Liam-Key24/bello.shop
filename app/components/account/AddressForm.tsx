'use client';

import { useState } from 'react';
import { X, Save, User, MapPin, Building2, Phone, Globe } from 'lucide-react';
import type { CustomerAddress, MailingAddressInput } from '@/lib/shopify/types';

interface AddressFormProps {
  address?: CustomerAddress | null;
  onSave: (address: MailingAddressInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.address1.trim()) {
      newErrors.address1 = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!formData.zip.trim()) {
      newErrors.zip = 'ZIP/Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onSave(formData);
  };

  return (
    <div className="neumorphism-bg p-8 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold">
          {address ? 'Edit Address' : 'Add New Address'}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Street Address */}
        <div>
          <label htmlFor="address1" className="block text-sm font-medium mb-2">
            Street Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
            <input
              id="address1"
              type="text"
              value={formData.address1}
              onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
              className="w-full pl-12 pr-4 py-3 neumorphism-input-style"
              disabled={isLoading}
              required
            />
          </div>
          {errors.address1 && (
            <p className="mt-1 text-xs text-red-600">{errors.address1}</p>
          )}
        </div>

        {/* Address Line 2 */}
        <div>
          <label htmlFor="address2" className="block text-sm font-medium mb-2">
            Apartment, suite, etc. (optional)
          </label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
            <input
              id="address2"
              type="text"
              value={formData.address2}
              onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
              className="w-full pl-12 pr-4 py-3 neumorphism-input-style"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Province, ZIP */}
        
          <div>
            <label htmlFor="province" className="block text-xs font-medium mb-2">
              State/Province
            </label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
              <input
                id="province"
                type="text"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="w-full pl-12 pr-4 py-3 neumorphism-input-style"
                disabled={isLoading}
              />
            </div>
          </div>
          <div>
            <label htmlFor="zip" className="block text-xs font-medium mb-2">
              ZIP/Postal Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              <input
                id="zip"
                type="text"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                className="w-full pl-12 pr-4 py-3 neumorphism-input-style"
                disabled={isLoading}
                required
              />
            </div>
            {errors.zip && (
              <p className="mt-1 text-xs text-red-600">{errors.zip}</p>
            )}
          </div>

        {/* Country and City */}
        
        <div>
            <label htmlFor="city" className="block text-sm font-medium mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full pl-12 pr-4 py-3 neumorphism-input-style"
                disabled={isLoading}
                required
              />
            </div>
            {errors.city && (
              <p className="mt-1 text-xs text-red-600">{errors.city}</p>
            )}
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              <select
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full pl-12 pr-4 py-3 neumorphism-input-style appearance-none"
                disabled={isLoading}
                required
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
            {errors.country && (
              <p className="mt-1 text-xs text-red-600">{errors.country}</p>
            )}
          </div>         
        

        {/* Action Buttons */}
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
                <Save className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

