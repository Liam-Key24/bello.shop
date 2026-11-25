import { Metadata } from "next";
import { getAllProductsSimple } from "@/lib/shopify/products";
import { FeaturedProductCard } from "@/app/components/products/FeaturedProductCard";
import { PageHeading } from "@/app/components/ui/PageHeading";
import type { ShopifyProduct } from "@/lib/shopify/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop | Bello",
  description: "Browse Bello sustainable kitchen essentials.",
};

export default async function ShopPage() {
  let products: ShopifyProduct[] = [];
  let loadError = false;

  try {
    products = await getAllProductsSimple(50);
  } catch (error) {
    console.error("Error loading shop products:", error);
    loadError = true;
  }

  if (loadError) {
    return (
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-24 text-center">
        <h1 className="mb-4">Shop</h1>
        <p className="text-mid-gray">
          Products will appear once Shopify credentials are configured.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-24">
      <PageHeading title="Shop" />

      {products.length === 0 ? (
        <div className="glass-bg glass-border glass-shadow rounded-md p-10 text-center text-mid-gray">
          <p>No products found in Shopify yet.</p>
          <p className="text-sm mt-2">
            {/* TODO: AutoDS — products will sync into Shopify; tag launch SKUs with featured for homepage */}
            Add products in Shopify (and tag launch items <code className="text-brand-deep">featured</code>).
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {products.map((product) => (
            <FeaturedProductCard key={product.id || product.handle} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
