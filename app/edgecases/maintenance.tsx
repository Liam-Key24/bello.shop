import ErrorPage from './components/ErrorPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maintenance Mode | Bello Shop',
  description: 'Bello Shop is currently under maintenance.',
};

/**
 * Maintenance Mode page
 * Displayed when the site is in maintenance mode
 * Can be conditionally rendered based on environment variables or feature flags
 */
export default function Maintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-5xl mb-6">🔧</div>
        
        <h1 className="text-3xl font-bold text-[var(--color-black)] mb-4">
          We'll Be Back Soon
        </h1>
        
        <p className="text-lg text-gray-700 mb-2">
          Bello Shop is currently undergoing maintenance.
        </p>
        
        <p className="text-gray-600 mb-6">
          We're working hard to improve your shopping experience. Please check back in a little while. We apologize for any inconvenience.
        </p>

        <div className="text-sm text-gray-500">
          <p>Expected downtime: Usually less than 30 minutes</p>
        </div>
      </div>
    </div>
  );
}

