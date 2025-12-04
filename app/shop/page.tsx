import { getAllProductsSimple } from "@/lib/shopify/products";
import { mapShopifyToProductItem } from "@/lib/shopify/filter";
import type { ProductItem } from "@/lib/shopify/types";
import ShopClient from "./components/ShopClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Bello Shop",
  description: "Browse our collection of premium health and beauty products. Filter by brand, price, and rating.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Shop | Bello Shop",
    description: "Browse our collection of premium health and beauty products.",
    type: "website",
  },
};

export default async function ShopPage() {
  // Fetch products on the server
  const data = await getAllProductsSimple(50);
  const products: ProductItem[] = mapShopifyToProductItem(data);

  return <ShopClient products={products} />;
}
