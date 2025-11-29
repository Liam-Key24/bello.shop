'use client';

import { useEffect } from 'react';
import ErrorPage from './edgecases/components/ErrorPage';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Next.js Global Error page
 * This file must be at app/global-error.tsx for Next.js App Router to use it
 * Catches errors in the root layout.tsx
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <ErrorPage
          statusCode={500}
          title="Critical Error"
          message="A critical error occurred."
          description="We're experiencing technical difficulties. Please try again later or contact support if the problem persists."
          showRetryButton={true}
          onRetry={reset}
        />
      </body>
    </html>
  );
}

