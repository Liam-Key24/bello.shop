/**
 * Shared utilities for product components
 */

import type { ShopifyProduct, ShopifyImage } from "@/lib/shopify/types";

/**
 * Format price to display format
 */
export const formatPrice = (price: number): string => {
  return `£${price.toFixed(2)}`;
};

/**
 * Get product image with fallback
 */
export const getProductImage = (
  product: ShopifyProduct | undefined,
  index: number = 0
): ShopifyImage | null => {
  return product?.images?.[index] || null;
};

/**
 * Get product link
 */
export const getProductLink = (handle: string | undefined): string => {
  return handle ? `/product/${handle}` : '/shop';
};

/**
 * Get product display title
 */
export const getProductTitle = (product: ShopifyProduct | undefined, fallback: string = 'Product'): string => {
  return product?.title || fallback;
};

