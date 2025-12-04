"use client";

import type { ShopifyCheckout } from "./types";

/**
 * Client-side checkout helper (calls API)
 * This wraps the server-side createCheckout function via API route
 */
export const createCheckoutClient = async (
  variantId: string,
  quantity: number = 1
): Promise<ShopifyCheckout> => {
  if (quantity < 1 || quantity > 999) {
    throw new Error("Quantity must be between 1 and 999");
  }

  const res = await fetch("/api/shopify/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variantId, quantity }),
  });

  const data = await res.json();
  
  if (!res.ok || !data.checkout) {
    throw new Error(data.error || "Failed to create checkout");
  }
  
  return data.checkout;
};

