"use client";

import { ErrorBoundary } from "./edgecases/ErrorBoundary";
import { useCartSync } from "@/lib/hooks/cart/useCartSync";

function CartSyncProvider({ children }: { children: React.ReactNode }) {
  useCartSync();
  return <>{children}</>;
}

/**
 * AuthProvider removed from the guest-checkout rebuild.
 * Account routes are deleted in Stage 7; cart sync uses checkAuthStatus util only.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <CartSyncProvider>{children}</CartSyncProvider>
    </ErrorBoundary>
  );
}
