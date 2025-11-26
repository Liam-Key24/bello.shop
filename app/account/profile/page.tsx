'use client';

import { useAuth } from "@/app/contexts/AuthContext";
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { customer, loading, error, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/account/login');
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Profile</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        
        {customer && (
          <div className="space-y-2">
            <p><strong>Name:</strong> {customer.firstName || ''} {customer.lastName || ''}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone || '-'}</p>
            <p><strong>Member since:</strong> {new Date(customer.createdAt).toLocaleDateString()}</p>
            {customer.defaultAddress && (
              <div className="mt-4">
                <h2 className="font-semibold mb-2">Default Address</h2>
                <p>{customer.defaultAddress.address1}</p>
                {customer.defaultAddress.address2 && <p>{customer.defaultAddress.address2}</p>}
                <p>{customer.defaultAddress.city}, {customer.defaultAddress.province} {customer.defaultAddress.zip}</p>
                <p>{customer.defaultAddress.country}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
