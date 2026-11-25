"use client";

import { ErrorBoundary } from "./edgecases/ErrorBoundary";
import { useCartSync } from "@/lib/hooks/cart/useCartSync";

function CartSyncProvider({ children }: { children: React.ReactNode }) {
  useCartSync();
  return <>{children}</>;
}

/** Guest-checkout providers — cart sync only, no account auth. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <CartSyncProvider>{children}</CartSyncProvider>
    </ErrorBoundary>
  );
}
