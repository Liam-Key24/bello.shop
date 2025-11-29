import ErrorPage from './components/ErrorPage';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '403 - Unauthorized | Bello Shop',
  description: 'You do not have permission to access this page.',
};

/**
 * 403 Unauthorized page
 * Displayed when a user tries to access a protected resource without proper permissions
 */
export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl font-bold text-[var(--color-red)] mb-4">
          403
        </div>
        
        <h1 className="text-3xl font-bold text-[var(--color-black)] mb-4">
          Access Denied
        </h1>
        
        <p className="text-lg text-gray-700 mb-2">
          You don't have permission to access this page.
        </p>
        
        <p className="text-gray-600 mb-6">
          Please log in with an account that has the necessary permissions, or contact support if you believe this is an error.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/account/login"
            className="px-6 py-3 bg-[var(--color-green-primary)] text-[var(--color-black)] rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Log In
          </Link>
          
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-[var(--color-black)] rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

