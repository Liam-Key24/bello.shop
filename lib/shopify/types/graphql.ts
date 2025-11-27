/**
 * TypeScript types for Shopify GraphQL responses
 */

export interface GraphQLImageNode {
  url: string;
  altText?: string | null;
}

export interface GraphQLImageEdge {
  node: GraphQLImageNode;
}

export interface GraphQLPriceRange {
  minVariantPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
}

export interface GraphQLMetafield {
  value?: string | null;
}

export interface GraphQLVariantNode {
  id: string;
}

export interface GraphQLVariantEdge {
  node: GraphQLVariantNode;
}

export interface GraphQLProductNode {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  vendor: string;
  tags: string[];
  images?: {
    edges: GraphQLImageEdge[];
  } | null;
  priceRange: GraphQLPriceRange;
  metafield?: GraphQLMetafield | null;
  variants?: {
    edges: GraphQLVariantEdge[];
  } | null;
}

export interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
}

