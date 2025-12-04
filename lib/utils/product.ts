import type { ShopifyProduct, ShopifyImage } from "@/lib/shopify/types";
import type { ProductCardProps } from "@/lib/types/product";

const priceCache = new Map<number, string>();

export const formatPrice = (price: number): string => {
  if (priceCache.has(price)) {
    return priceCache.get(price)!;
  }
  const formatted = `£${price.toFixed(2)}`;
  if (priceCache.size > 1000) {
    const firstKey = priceCache.keys().next().value;
    priceCache.delete(firstKey);
  }
  priceCache.set(price, formatted);
  return formatted;
};

export const getProductImage = (
  product: ShopifyProduct | undefined,
  index: number = 0
): ShopifyImage | null => {
  return product?.images?.[index] || null;
};

export const getProductLink = (handle: string | undefined): string => {
  return handle ? `/product/${handle}` : '/shop';
};

export const getProductTitle = (product: ShopifyProduct | undefined, fallback: string = 'Product'): string => {
  return product?.title || fallback;
};

export function getFirstVariantId(product: ShopifyProduct): string {
  return product.variants?.[0]?.id ?? "";
}

export function getPrimaryImage(product: ShopifyProduct): ShopifyImage | null {
  return product.images?.[0] || null;
}

export function getProductUrl(handle: string): string {
  return `/product/${handle}`;
}

export function sanitizeDescription(description: string | null | undefined): string {
  if (!description) return "";
  return description.replace(/\s+/g, " ").trim();
}

export function hasProductImages(product: ShopifyProduct): boolean {
  return product.images && product.images.length > 0;
}

export function isProductAvailable(product: ShopifyProduct): boolean {
  return product.variants && product.variants.length > 0;
}

export interface NormalizedProductData {
  title: string;
  price: number;
  handle: string;
  image: ShopifyImage | null;
  href: string;
}

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

