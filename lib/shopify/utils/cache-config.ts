/**
 * Centralized cache configuration for Shopify API calls
 */
export const CACHE_CONFIG = {
  /** Default cache: 1 hour */
  default: { cache: 'force-cache' as RequestCache, revalidate: 3600 },
  /** Short cache: 5 minutes */
  short: { cache: 'force-cache' as RequestCache, revalidate: 300 },
  /** Long cache: 24 hours */
  long: { cache: 'force-cache' as RequestCache, revalidate: 86400 },
  /** No cache: always fetch fresh */
  noCache: { cache: 'no-store' as RequestCache },
} as const;

