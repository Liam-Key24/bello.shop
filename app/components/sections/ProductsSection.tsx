import { FeaturedProductCard } from "@/app/components/products/FeaturedProductCard";
import type { ShopifyProduct } from "@/lib/shopify/types";

export interface ProductsSectionProps {
  products: ShopifyProduct[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-20 md:py-[140px]">
      <div className="text-center mb-12 md:mb-20">
        <h2>Our Collection</h2>
      </div>

      {products.length === 0 ? (
        <div className="glass-bg glass-border glass-shadow rounded-md p-10 text-center text-mid-gray">
          <p>No featured products yet.</p>
          <p className="text-sm mt-2">
            Tag Shopify products with <code className="text-charcoal">featured</code> to show them here.
          </p>
          {/* TODO: AutoDS — sync will populate Shopify; keep the featured tag on launch SKUs */}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {products.slice(0, 2).map((product) => (
            <FeaturedProductCard key={product.id || product.handle} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
