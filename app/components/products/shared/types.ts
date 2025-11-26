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

