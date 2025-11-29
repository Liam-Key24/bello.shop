'use client';

import { useEffect, useState } from 'react';
import ErrorPage from './components/ErrorPage';

/**
 * Offline/Network Error page
 * Can be used to detect and display when the user is offline
 */
export default function Offline() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // If back online, redirect to home
  useEffect(() => {
    if (isOnline) {
      window.location.href = '/';
    }
  }, [isOnline]);

  return (
    <ErrorPage
      title="You're Offline"
      message="No internet connection detected."
      description="Please check your internet connection and try again. Some features may not be available while offline."
      showRetryButton={true}
      showHomeButton={false}
      showBackButton={false}
    />
  );
}

