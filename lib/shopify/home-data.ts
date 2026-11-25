import { getProductsByTag } from "@/lib/shopify/products";
import type { ShopifyProduct } from "@/lib/shopify/types";

export interface HomePageData {
  featuredProducts: ShopifyProduct[];
}

/**
 * Homepage data: featured products tagged in Shopify.
 * Liam should tag launch products with: featured
 *
 * TODO: AutoDS — when AutoDS syncs products into Shopify, ensure those
 * products also receive the `featured` tag (or update this query).
 */
export async function getHomePageData(): Promise<HomePageData> {
  const featuredProducts = await getProductsByTag("featured", 2);

  return {
    featuredProducts,
  };
}
