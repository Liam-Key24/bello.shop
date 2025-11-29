import ErrorPage from './edgecases/components/ErrorPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Bello Shop',
  description: 'The page you are looking for could not be found.',
};

/**
 * Next.js 404 Not Found page
 * This file must be at app/not-found.tsx for Next.js App Router to use it
 */
export default function NotFound() {
  return (
    <ErrorPage
      statusCode={404}
      title="Page Not Found"
      message="The page you're looking for doesn't exist."
      description="It might have been moved, deleted, or the URL might be incorrect."
      showRetryButton={false}
    />
  );
}

