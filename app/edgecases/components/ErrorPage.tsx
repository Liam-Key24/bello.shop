'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  message?: string;
  description?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  showRetryButton?: boolean;
  onRetry?: () => void;
}

/**
 * Reusable error page component with consistent styling
 */
export default function ErrorPage({
  statusCode,
  title,
  message,
  description,
  showHomeButton = true,
  showBackButton = true,
  showRetryButton = false,
  onRetry,
}: ErrorPageProps) {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {statusCode && (
          <div className="text-6xl font-bold text-[var(--color-red)] mb-4">
            {statusCode}
          </div>
        )}
        
        <h1 className="text-3xl font-bold text-[var(--color-black)] mb-4">
          {title || 'Oops! Something went wrong'}
        </h1>
        
        {message && (
          <p className="text-lg text-gray-700 mb-2">{message}</p>
        )}
        
        {description && (
          <p className="text-gray-600 mb-6">{description}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {showHomeButton && (
            <Link
              href="/"
              className="px-6 py-3 bg-[var(--color-green-primary)] text-[var(--color-black)] rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Go Home
            </Link>
          )}
          
          {showBackButton && (
            <button
              onClick={handleGoBack}
              className="px-6 py-3 bg-gray-200 text-[var(--color-black)] rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Go Back
            </button>
          )}
          
          {showRetryButton && (
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-[var(--color-green-primary)] text-[var(--color-black)] rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

