"use client";

import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ErrorBoundary } from "./edgecases/ErrorBoundary";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AuthProvider>{children}</AuthProvider>
    </ErrorBoundary>
  );
}

