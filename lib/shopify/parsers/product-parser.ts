import { ShopifyProduct, ShopifyImage } from "../types";

/**
 * Parse Shopify image edges into ShopifyImage array
 */
export const parseImages = (edges: any[], fallbackAlt?: string): ShopifyImage[] =>
  (edges || []).map((edge: any) => ({
    url: edge.node.url,
    altText: edge.node.altText || fallbackAlt || null,
  }));

/**
 * Parse Shopify priceRange into numeric price
 */
export const parsePrice = (priceRange: any): number =>
  parseFloat(priceRange?.minVariantPrice?.amount || "0");

/**
 * Parse Shopify metafield rating into number
 */
export const parseRating = (metafield: any): number | undefined =>
  metafield?.value ? parseFloat(metafield.value) : undefined;

/**
 * Parse a single product node from Shopify GraphQL response
 */
export const parseProductNode = (
  node: any,
  collectionInfo?: { handle: string; title: string }
): ShopifyProduct => ({
  id: node.id,
  title: node.title,
  handle: node.handle,
  description: node.description,
  vendor: node.vendor,
  tags: node.tags || [],
  price: parsePrice(node.priceRange),
  images: parseImages(node.images?.edges || [], node.title),
  rating: parseRating(node.metafield),
  collectionHandle: collectionInfo?.handle,
  collectionTitle: collectionInfo?.title,
  data: JSON.stringify(node),
  variants: node.variants?.edges?.map((edge: any) => ({ id: edge.node.id })) || [],
});

