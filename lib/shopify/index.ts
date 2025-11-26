/**
 * Barrel export for Shopify utilities
 * Provides a clean import interface for the entire Shopify module
 */

// Types
export * from "./types";
export * from "./types/responses";

// Core utilities
export { shopifyFetch } from "./helper";
export { CACHE_CONFIG } from "./utils/cache-config";

// Parsers
export * from "./parsers/product-parser";

// Queries
export * from "./queries/fragments";

// Product functions
export {
  getProductByHandle,
  getAllProducts,
  getAllProductsSimple,
  type ProductsResponse,
  type ProductsPageInfo,
} from "./products";

// Collection functions
export {
  getAllCollections,
  findCollectionByTitle,
  getCollectionHandleByTitle,
  getProductsByCollection,
  type ShopifyCollection,
} from "./collection";

// Cart functions
export {
  createShopifyCart,
  createCheckout,
} from "./cart";

// Customer functions
export {
  customerCreate,
  customerLogin,
  customerAccessTokenRenew,
  getCustomer,
  customerLogout,
} from "./customer";

// Filter utilities
export {
  mapShopifyToProductItem,
  applyFilters,
  parseFiltersFromParams,
  mapPriceTierToRange,
  type FilterObject,
} from "./filter";

