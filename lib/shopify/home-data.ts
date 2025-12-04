import {
    getProductsByCollection,
    getCollectionHandleByTitle,
  } from "@/lib/shopify/collection";
  import { ShopifyProduct } from "@/lib/shopify/types";
  
  export interface HomePageData {
    heroProducts: ShopifyProduct[];
    newProducts: ShopifyProduct[];
    productOfWeek: ShopifyProduct[];
  }
  
  export async function getHomePageData(): Promise<HomePageData> {
    const [heroHandle, newProductsHandle, productOfWeekHandle] =
      await Promise.all([
        getCollectionHandleByTitle("hero image"),
        getCollectionHandleByTitle("new products"),
        getCollectionHandleByTitle("product of the week"),
      ]);
  
    // Fetch products from collections
    const [heroProducts, newProducts, productOfWeek] = await Promise.all([
      heroHandle ? getProductsByCollection(heroHandle, 1) : Promise.resolve([]),
      newProductsHandle
        ? getProductsByCollection(newProductsHandle, 4)
        : Promise.resolve([]),
      productOfWeekHandle
        ? getProductsByCollection(productOfWeekHandle, 1)
        : Promise.resolve([]),
    ]);
  
    return {
      heroProducts,
      newProducts,
      productOfWeek,
    };
  }