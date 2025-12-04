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

export interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export interface ProductCardProps extends ProductCardBaseProps {
  name?: string;
  price?: number;
  handle?: string;
  image?: { url: string; altText?: string };
}

