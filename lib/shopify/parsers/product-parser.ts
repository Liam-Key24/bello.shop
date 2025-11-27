import { ShopifyProduct, ShopifyImage } from "../types";
import type {
  GraphQLImageEdge,
  GraphQLPriceRange,
  GraphQLMetafield,
  GraphQLProductNode,
  GraphQLVariantEdge,
} from "../types/graphql";

/**
 * Parse Shopify image edges into ShopifyImage array
 */
export const parseImages = (edges: GraphQLImageEdge[], fallbackAlt?: string): ShopifyImage[] =>
  (edges || []).map((edge) => ({
    url: edge.node.url,
    altText: edge.node.altText || fallbackAlt || null,
  }));

/**
 * Parse Shopify priceRange into numeric price
 */
export const parsePrice = (priceRange: GraphQLPriceRange): number =>
  parseFloat(priceRange?.minVariantPrice?.amount || "0");

/**
 * Parse Shopify metafield rating into number
 */
export const parseRating = (metafield: GraphQLMetafield | null | undefined): number | undefined =>
  metafield?.value ? parseFloat(metafield.value) : undefined;

/**
 * Parse a single product node from Shopify GraphQL response
 */
export const parseProductNode = (
  node: GraphQLProductNode,
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
  variants: node.variants?.edges?.map((edge: GraphQLVariantEdge) => ({ id: edge.node.id })) || [],
});

