import { shopifyFetch } from "@/lib/shopify/helper"
import { ShopifyProduct } from "./types";
import { parseProductNode } from "./parsers/product-parser";
import {
  PRODUCT_BASE_FRAGMENT,
  PRODUCT_IMAGE_FRAGMENT,
  PRODUCT_PRICE_FRAGMENT,
  PRODUCT_RATING_FRAGMENT,
  PRODUCT_VARIANT_FRAGMENT,
} from "./queries/fragments";
import { CACHE_CONFIG } from "./utils/cache-config";
import type { ProductByHandleResponse, ProductsResponse as ProductsResponseType } from "./types/responses";

/**
 * Get a single product by its handle
 */
export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    ${PRODUCT_BASE_FRAGMENT}
    ${PRODUCT_IMAGE_FRAGMENT}
    ${PRODUCT_PRICE_FRAGMENT}
    ${PRODUCT_RATING_FRAGMENT}
    ${PRODUCT_VARIANT_FRAGMENT}
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductBase
        images(first: 10) {
          edges {
            node {
              ...ProductImage
            }
          }
        }
        ...ProductPrice
        ...ProductRating
        variants(first: 250) {
          edges {
            node {
              ...ProductVariant
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<ProductByHandleResponse>(
      query, 
      { handle },
      CACHE_CONFIG.default
    );
    
    const product = data.productByHandle;
    if (!product) return null;

    return parseProductNode(product);
  } catch (err) {
    console.error("getProductByHandle failed for handle:", handle, err);
    return null;
  }
}

export interface ProductsPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface ProductsResponse {
  products: ShopifyProduct[];
  pageInfo: ProductsPageInfo;
}

/**
 * Get all products with pagination support
 */
export async function getAllProducts(
  first: number = 12,
  after?: string
): Promise<ProductsResponse> {
  if (first < 1 || first > 250) {
    throw new Error("First parameter must be between 1 and 250");
  }

  const query = `
    ${PRODUCT_BASE_FRAGMENT}
    ${PRODUCT_IMAGE_FRAGMENT}
    ${PRODUCT_PRICE_FRAGMENT}
    ${PRODUCT_RATING_FRAGMENT}
    query getAllProducts($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            ...ProductBase
            images(first: 3) {
              edges {
                node {
                  ...ProductImage
                }
              }
            }
            ...ProductPrice
            ...ProductRating
          }
        }
      }
    }
  `;

  const variables: { first: number; after?: string } = { first };
  if (after) variables.after = after;

  const data = await shopifyFetch<ProductsResponseType>(
    query, 
    variables,
    CACHE_CONFIG.default
  );
  
  const products = (data.products.edges || []).map((edge) => {
    const product = parseProductNode(edge.node);
    // Add categoryId for backward compatibility
    return {
      ...product,
      categoryId: edge.node.tags?.[0] ?? null,
    };
  });

  return {
    products,
    pageInfo: data.products.pageInfo || {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };
}

/**
 * Backward compatibility: return just products array
 */
export async function getAllProductsSimple(first: number = 12): Promise<ShopifyProduct[]> {
  const response = await getAllProducts(first);
  return response.products;
}