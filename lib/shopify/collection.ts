import { ShopifyProduct } from "./types"
import { shopifyFetch } from "./helper"
import { parseProductNode } from "./parsers/product-parser"
import {
  PRODUCT_BASE_FRAGMENT,
  PRODUCT_IMAGE_FRAGMENT,
  PRODUCT_PRICE_FRAGMENT,
  PRODUCT_RATING_FRAGMENT,
} from "./queries/fragments"
import { CACHE_CONFIG } from "./utils/cache-config"
import type { CollectionsResponse, CollectionResponse } from "./types/responses"

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
}

/**
 * Get all collections from Shopify
 */
export async function getAllCollections(): Promise<ShopifyCollection[]> {
  const query = `
    query getAllCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<CollectionsResponse>(
      query,
      { first: 50 },
      CACHE_CONFIG.default
    );

    return (data.collections.edges || []).map(edge => edge.node);
  } catch (err) {
    console.error("getAllCollections failed:", err);
    return [];
  }
}

/**
 * Find a collection by title (case-insensitive partial match)
 */
export async function findCollectionByTitle(title: string): Promise<ShopifyCollection | null> {
  const collections = await getAllCollections();
  const lowerTitle = title.toLowerCase();
  
  return collections.find(
    collection => collection.title.toLowerCase().includes(lowerTitle)
  ) || null;
}

/**
 * Get collection handle by title - useful for finding collections
 */
export async function getCollectionHandleByTitle(title: string): Promise<string | null> {
  const collection = await findCollectionByTitle(title);
  return collection?.handle || null;
}

/**
 * Get products from a specific collection by handle
 */
export async function getProductsByCollection(
  handle: string,
  first: number = 20
): Promise<ShopifyProduct[]> {
  const query = `
    ${PRODUCT_BASE_FRAGMENT}
    ${PRODUCT_IMAGE_FRAGMENT}
    ${PRODUCT_PRICE_FRAGMENT}
    ${PRODUCT_RATING_FRAGMENT}
    query getProductsByCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        id
        title
        handle
        products(first: $first) {
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
    }
  `;

  try {
    const data = await shopifyFetch<CollectionResponse>(
      query,
      { handle, first },
      CACHE_CONFIG.default
    );

    const collection = data.collectionByHandle;
    if (!collection?.products) return [];

    return collection.products.edges.map(({ node }) =>
      parseProductNode(node, {
        handle: collection.handle,
        title: collection.title,
      })
    );
  } catch (err) {
    console.error("getProductsByCollection failed for handle:", handle, err);
    return [];
  }
}