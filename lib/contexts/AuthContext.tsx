'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Customer } from '@/lib/shopify/types';

interface AuthContextType {
  customer: Customer | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  getCustomer: () => Promise<Customer | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/shopify/customer', {
        credentials: 'include', // Ensure cookies are sent
      });
      
      if (!res.ok) {
        // 401 is expected when not logged in - not an error
        if (res.status === 401) {
          setCustomer(null);
          setLoading(false);
          return;
        }
        // Only set error for actual errors (not 401)
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || 'Failed to check authentication');
        setCustomer(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setCustomer(data.customer);
    } catch (err: unknown) {
      // Network errors or other exceptions
      // Don't set error for network issues on initial load - user might be offline
      if (err instanceof TypeError && err.message.includes('fetch')) {
        // Network error - silently fail, user might be offline
        setCustomer(null);
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Failed to check authentication';
        setError(errorMessage);
        setCustomer(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const res = await fetch('/api/shopify/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return false;
      }

      // Fetch customer data after successful login
      await checkAuth();
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      return false;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      const res = await fetch('/api/shopify/logout', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }

      setCustomer(null);
      
      // Clear cart cookie on logout (cart will fall back to localStorage)
      if (typeof document !== 'undefined') {
        document.cookie = 'shopifyCartId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
    }
  };

  const getCustomer = async (): Promise<Customer | null> => {
    try {
      const res = await fetch('/api/shopify/customer');
      
      if (!res.ok) {
        return null;
      }

      const data = await res.json();
      setCustomer(data.customer);
      return data.customer;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    customer,
    loading,
    error,
    isAuthenticated: !!customer,
    login,
    logout,
    checkAuth,
    getCustomer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

