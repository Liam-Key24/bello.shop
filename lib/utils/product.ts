/**
 * Shared utilities for product components
 */

import type { ShopifyProduct, ShopifyImage } from "@/lib/shopify/types";
import type { ProductCardProps } from "@/lib/types/product";

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

/**
 * Normalized product data from ProductCard props
 */
export interface NormalizedProductData {
  title: string;
  price: number;
  handle: string;
  image: ShopifyImage | null;
  href: string;
}

/**
 * Normalize product data from either product object or legacy individual props
 * Handles backward compatibility with legacy API
 */
export const normalizeProductData = (
  props: ProductCardProps
): NormalizedProductData => {
  const title = props.product ? getProductTitle(props.product) : (props.name || 'Product');
  const price = props.product?.price ?? props.price ?? 0;
  const handle = props.product?.handle ?? props.handle ?? '';
  const image = props.product 
    ? getProductImage(props.product) 
    : (props.image ? { url: props.image.url, altText: props.image.altText } : null);
  const href = getProductLink(handle);

  return { title, price, handle, image, href };
};

