"use client";

import { useEffect, useRef } from "react";
import { checkAuthStatus } from "@/lib/utils/auth-check";
import { cartActions } from "@/lib/store/cart";

/**
 * Hook to sync cart with Shopify when logged in
 * and clear localStorage when user leaves page if not logged in (after 30 mins)
 */
export function useCartSync() {
  const isAuthenticatedRef = useRef(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Initialize cart on mount
    const initializeCart = async () => {
      if (isInitializedRef.current) return; // Prevent re-initialization
      isInitializedRef.current = true;

      try {
        const authStatus = await checkAuthStatus();
        isAuthenticatedRef.current = authStatus;

        if (authStatus) {
          // Load cart from Shopify
          await cartActions.loadFromShopify();
        } else {
          // Load from localStorage (already done by cart store)
          // Update last activity timestamp
          try {
            localStorage.setItem("cartLastActivity", Date.now().toString());
          } catch {
            // Ignore
          }
        }
      } catch (error) {
        console.error("Error initializing cart:", error);
      }
    };

    initializeCart();

    // Check auth status when tab becomes visible (to detect logout)
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        try {
          const authStatus = await checkAuthStatus();
          const wasAuthenticated = isAuthenticatedRef.current;
          
          // If user logged out, clear cart
          if (wasAuthenticated && !authStatus) {
            cartActions.clearCart();
            try {
              localStorage.removeItem("cartLastActivity");
              localStorage.removeItem("cartLastShopifySync");
            } catch {
              // Ignore
            }
          }
          
          isAuthenticatedRef.current = authStatus;
        } catch {
          // Ignore errors
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Set up page leave handler for non-authenticated users
    const handleBeforeUnload = () => {
      if (!isAuthenticatedRef.current) {
        try {
          const lastActivity = localStorage.getItem("cartLastActivity");
          if (lastActivity) {
            const timeSinceActivity = Date.now() - parseInt(lastActivity, 10);
            const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
            
            // Only clear if 30 minutes have passed since last activity
            if (timeSinceActivity >= thirtyMinutes) {
              localStorage.removeItem("cart");
              localStorage.removeItem("cartLastActivity");
            }
          }
        } catch (error) {
          console.error("Error checking cart expiration:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}

