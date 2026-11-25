import { getAllProductsSimple } from "@/lib/shopify/products";
import { mapShopifyToProductItem } from "@/lib/shopify/filter";
import type { ProductItem } from "@/lib/shopify/types";
import ShopClient from "./components/ShopClient";
import type { Metadata } from "next";

// Shopify Storefront API requires runtime env vars
export const dynamic = "force-dynamic";

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
  let products: ProductItem[] = [];
  let loadError = false;

  try {
    const data = await getAllProductsSimple(50);
    products = mapShopifyToProductItem(data);
  } catch (error) {
    console.error("Error loading shop products:", error);
    loadError = true;
  }

  if (loadError) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-2">Unable to Load Shop</h1>
        <p className="text-mid-gray">
          Products will appear once Shopify credentials are configured.
        </p>
      </div>
    );
  }

  return <ShopClient products={products} />;
}
