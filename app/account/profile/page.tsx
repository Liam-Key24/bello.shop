'use client';

import { useState } from 'react';
import { useAuth } from "@/app/contexts/AuthContext";
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Calendar, MapPin, LogOut, Shield } from "lucide-react";
import AddressList from "@/app/components/account/AddressList";
import type { CustomerAddress, MailingAddressInput } from "@/lib/shopify/types";

export default function ProfilePage() {
  const { customer, loading, error, logout, checkAuth } = useAuth();
  const router = useRouter();
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
    router.push('/account/login');
  };

  // Get all addresses from customer data
  const getAllAddresses = (): CustomerAddress[] => {
    if (!customer) return [];
    const addresses: CustomerAddress[] = [];
    const addressMap = new Map<string, CustomerAddress>();
    
    // Add default address if it exists
    if (customer.defaultAddress) {
      addressMap.set(customer.defaultAddress.id, customer.defaultAddress);
    }
    
    // Add other addresses from the addresses array
    // Note: customer.addresses might be an array or have edges structure
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
  };

  const handleAddressCreate = async (address: MailingAddressInput) => {
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

      // Refresh customer data to get updated addresses
      await checkAuth();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create address';
      setAddressError(errorMessage);
      throw err;
    } finally {
      setIsAddressLoading(false);
    }
  };

  const handleAddressUpdate = async (addressId: string, address: MailingAddressInput) => {
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

      // Refresh customer data
      await checkAuth();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update address';
      setAddressError(errorMessage);
      throw err;
    } finally {
      setIsAddressLoading(false);
    }
  };

  const handleAddressDelete = async (addressId: string) => {
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

      // Refresh customer data
      await checkAuth();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete address';
      setAddressError(errorMessage);
      throw err;
    } finally {
      setIsAddressLoading(false);
    }
  };

  const handleSetDefault = async (addressId: string) => {
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

      // Refresh customer data
      await checkAuth();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to set default address';
      setAddressError(errorMessage);
      throw err;
    } finally {
      setIsAddressLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="w-full max-w-4xl">
          {/* Loading State */}
          {loading && (
            <div className="glass p-12 rounded-4xl shadow-2xl text-center">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading your profile...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="glass p-8 rounded-4xl shadow-2xl">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-600 font-semibold">Error loading profile</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Profile Content */}
          {customer && !loading && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="glass p-8 rounded-4xl shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                      My Profile
                    </h1>
                    <p className="text-gray-600">Manage your account information</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>

                {/* Profile Info Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <User className="w-6 h-6 text-green-600" />
                      Personal Information
                    </h2>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                        <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
                          <p className="text-gray-800 font-medium">
                            {customer.firstName || customer.lastName 
                              ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
                              : 'Not provided'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                        <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                          <p className="text-gray-800 font-medium">{customer.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                        <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                          <p className="text-gray-800 font-medium">{customer.phone || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                        <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Member Since</p>
                          <p className="text-gray-800 font-medium">
                            {new Date(customer.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Preference */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Shield className="w-6 h-6 text-green-600" />
                      Preferences
                    </h2>
                    <div className="p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">Marketing Emails</p>
                          <p className="text-sm text-gray-600">Receive updates about new products and offers</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            customer.acceptsMarketing 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {customer.acceptsMarketing ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Management Section */}
              <div className="glass p-8 rounded-4xl shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Saved Addresses</h2>
                </div>

                {addressError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{addressError}</p>
                  </div>
                )}

                <AddressList
                  addresses={getAllAddresses()}
                  defaultAddressId={customer.defaultAddress?.id}
                  onAddressCreate={handleAddressCreate}
                  onAddressUpdate={handleAddressUpdate}
                  onAddressDelete={handleAddressDelete}
                  onSetDefault={handleSetDefault}
                  isLoading={isAddressLoading}
                />
              </div>
            </div>
          )}
        </div>
    </div>
    </ProtectedRoute>
  );
}
