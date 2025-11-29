import ErrorPage from './components/ErrorPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '500 - Server Error | Bello Shop',
  description: 'An internal server error occurred.',
};

/**
 * 500 Server Error page
 * Displayed when a server-side error occurs
 */
export default function ServerError() {
  return (
    <ErrorPage
      statusCode={500}
      title="Server Error"
      message="We're experiencing technical difficulties."
      description="Our servers encountered an unexpected error. Our team has been notified and is working to fix the issue. Please try again in a few moments."
      showRetryButton={true}
    />
  );
}

