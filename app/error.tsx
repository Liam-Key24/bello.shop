'use client';

import { useEffect } from 'react';
import ErrorPage from './edgecases/components/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Next.js Error page
 * This file must be at app/error.tsx for Next.js App Router to use it
 * Catches runtime errors in the app directory
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error('Application error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="Something went wrong"
      message="We encountered an unexpected error."
      description="Don't worry, our team has been notified. Please try again in a moment."
      showRetryButton={true}
      onRetry={reset}
    />
  );
}

