/**
 * Type definitions for Shopify GraphQL API responses
 */

export interface ProductNode {
  id: string;
  title: string;
  handle: string;
  description?: string;
  vendor: string;
  tags: string[];
  images: {
    edges: Array<{
      node: {
        url: string;
        altText?: string;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  metafield?: {
    value: string;
  } | null;
  variants?: {
    edges: Array<{
      node: {
        id: string;
        title?: string;
        price?: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  } | null;
}

export interface CollectionResponse {
  collectionByHandle: {
    id: string;
    title: string;
    handle: string;
    products: {
      edges: Array<{ node: ProductNode }>;
    };
  } | null;
}

export interface ProductsResponse {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string;
      endCursor?: string;
    };
    edges: Array<{ node: ProductNode }>;
  };
}

export interface ProductByHandleResponse {
  productByHandle: ProductNode | null;
}

export interface CollectionsResponse {
  collections: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
      };
    }>;
  };
}

