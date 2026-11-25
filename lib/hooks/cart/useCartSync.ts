"use client";

import { useEffect } from "react";

/**
 * Guest cart lifecycle: refresh activity on mount and clear stale local carts
 * after 30 minutes of inactivity when the tab closes.
 */
export function useCartSync() {
  useEffect(() => {
    try {
      localStorage.setItem("cartLastActivity", Date.now().toString());
    } catch {
      // Ignore
    }

    const handleBeforeUnload = () => {
      try {
        const lastActivity = localStorage.getItem("cartLastActivity");
        if (!lastActivity) return;
        const timeSinceActivity = Date.now() - parseInt(lastActivity, 10);
        const thirtyMinutes = 30 * 60 * 1000;
        if (timeSinceActivity >= thirtyMinutes) {
          localStorage.removeItem("cart");
          localStorage.removeItem("cartLastActivity");
        }
      } catch {
        // Ignore
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
}
