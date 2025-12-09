"use client";

import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ErrorBoundary } from "./edgecases/ErrorBoundary";
import { useCartSync } from "@/lib/hooks/cart/useCartSync";

function CartSyncProvider({ children }: { children: React.ReactNode }) {
  useCartSync(); // Initialize cart sync on all pages
  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartSyncProvider>
          {children}
        </CartSyncProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

