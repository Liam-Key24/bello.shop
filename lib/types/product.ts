/**
 * Shared types for product components
 */

import type { ShopifyProduct } from "@/lib/shopify/types";

export interface ProductCardBaseProps {
  product?: ShopifyProduct;
  className?: string;
  showPrice?: boolean;
  showRating?: boolean;
}

export interface ProductImageCardProps extends ProductCardBaseProps {
  imageSize?: 'small' | 'medium' | 'large';
  overlay?: 'gradient' | 'solid' | 'none';
}

/**
 * Props for product detail page component
 */
export interface ProductPageProps {
  params: {
    handle: string;
  };
}

/**
 * Props for ProductCard component
 * Supports both new (product object) and legacy (individual props) API for backward compatibility
 */
export interface ProductCardProps extends ProductCardBaseProps {
  // Legacy props for backward compatibility
  name?: string;
  price?: number;
  handle?: string;
  image?: { url: string; altText?: string };
}

