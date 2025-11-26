import { redirect } from 'next/navigation';
import { getServerAuth } from '@/lib/auth/server-auth';
import LogoutButton from './logout-button';

/**
 * Server Component version of profile page
 * More secure as authentication is checked on the server
 */
export default async function ServerProfilePage() {
  const auth = await getServerAuth();

  if (!auth.isAuthenticated || !auth.customer) {
    redirect('/account/login');
  }

  const { customer } = auth;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Profile</h1>
        <LogoutButton />
      </div>

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
    </div>
  );
}

