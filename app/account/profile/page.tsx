'use client';
import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/contexts";
import { useAddressOperations, useCustomerAddresses } from "@/lib/hooks/account";
import ProtectedRoute from "@/lib/componet/auth/ProtectedRoute";

import ProfileHeader from './components/ProfileHeader';
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
  
  const {
    isAddressLoading,
    addressError,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddressOperations(checkAuth);

  const handleLogout = async () => {
    await logout();
    router.push('/account/login');
  };

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {loading && <ProfileLoading />}
          
          {error && !loading && <ProfileError error={error} />}

          {customer && !loading && (
            <div className="space-y-6">
              {/* Main Profile Card */}
              <div className="neumorphism-bg p-8 md:p-10">
                <ProfileHeader />
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
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
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
