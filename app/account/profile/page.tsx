'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts";
import { useCustomerAddresses } from "@/lib/hooks/account";
import type { MailingAddressInput } from "@/lib/shopify/types";

import PersonalInfoSection from './components/PersonalInfoSection';
import PreferencesSection from './components/PreferencesSection';
import AddressSection from './components/address/AddressSection';
import ProfileLoading from './components/ProfileLoading';
import ProfileError from './components/ProfileError';
import LogoutButton from './components/LogoutButton';

export default function ProfilePage() {
  const { customer, loading, error, logout, checkAuth } = useAuth();
  const router = useRouter();
  const addresses = useCustomerAddresses(customer);
  
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  // Simple auth check - redirect if not authenticated
  useEffect(() => {
    if (!loading && !customer) {
      router.push('/account/login');
    }
  }, [loading, customer, router]);

  // Consolidated address operation handler
  const handleAddressOperation = async (
    operation: () => Promise<Response>
  ) => {
    setIsAddressLoading(true);
    setAddressError(null);
    try {
      const res = await operation();
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Operation failed');
      }
      await checkAuth(); // Refresh customer data
    } catch (err) {
      setAddressError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setIsAddressLoading(false);
    }
  };

  const createAddress = (address: MailingAddressInput) =>
    handleAddressOperation(() =>
      fetch('/api/shopify/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address),
      })
    );

  const updateAddress = (addressId: string, address: MailingAddressInput) =>
    handleAddressOperation(() =>
      fetch('/api/shopify/address', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: addressId, ...address }),
      })
    );

  const deleteAddress = (addressId: string) =>
    handleAddressOperation(() =>
      fetch(`/api/shopify/address?id=${addressId}`, { method: 'DELETE' })
    );

  const setDefaultAddress = (addressId: string) =>
    handleAddressOperation(() =>
      fetch('/api/shopify/address', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addressId }),
      })
    );

  const handleLogout = async () => {
    await logout();
    router.push('/account/login');
  };

  // Show loading or redirect
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ProfileLoading />
      </div>
    );
  }

  if (!customer) {
    return null; // Will redirect via useEffect
  }

  return (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl">
        {error && <ProfileError error={error} />}
          
            <div className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-green-tertiary">
              My Profile
            </h1>
            <p>Manage your account information</p>
          </div>

              {/* Main Profile Card */}
              <div className="neumorphism-bg p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-6">
                  <PersonalInfoSection customer={customer} />
                  <PreferencesSection customer={customer} />
                </div>
                <LogoutButton onLogout={handleLogout} />
              </div>

              {/* Address Section */}
              <div className="neumorphism-bg p-8 md:p-10">
                <AddressSection
                  addresses={addresses}
                  defaultAddressId={customer.defaultAddress?.id}
                  onAddressCreate={createAddress}
                  onAddressUpdate={updateAddress}
                  onAddressDelete={deleteAddress}
                  onSetDefault={setDefaultAddress}
                  isLoading={isAddressLoading}
                  error={addressError}
                />
              </div>
        </div>
      </div>
    </div>
  );
}