'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  acceptsMarketing: boolean;
  createdAt: string;
  defaultAddress?: any;
  addresses?: any;
  orders?: any;
}

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
      const res = await fetch('/api/shopify/customer');
      
      if (!res.ok) {
        if (res.status === 401) {
          setCustomer(null);
          setLoading(false);
          return;
        }
        throw new Error('Failed to check authentication');
      }

      const data = await res.json();
      setCustomer(data.customer);
    } catch (err: any) {
      setError(err.message);
      setCustomer(null);
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
    } catch (err: any) {
      setError(err.message || 'Login failed');
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
    } catch (err: any) {
      setError(err.message);
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

