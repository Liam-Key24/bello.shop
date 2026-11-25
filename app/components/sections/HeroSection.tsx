import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { FloatingProductCard } from "@/app/components/products/FloatingProductCard";
import type { ShopifyProduct } from "@/lib/shopify/types";

export interface HeroSectionProps {
  featuredProduct?: ShopifyProduct | null;
}

export function HeroSection({ featuredProduct }: HeroSectionProps) {
  return (
    <section className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] pt-20 md:pt-[140px] pb-24 md:pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div>
          <h1 className="mb-6 md:mb-8 max-w-xl">
            Live Better,
            <br />
            Waste Less
          </h1>
          <p className="text-lg md:text-[19px] leading-relaxed text-mid-gray mb-8 md:mb-12 max-w-md">
            Discover sustainable kitchen essentials designed to elevate your
            everyday life while caring for the planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop">
              <Button variant="primary" className="w-full sm:w-auto">
                Shop Our Products
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="glass" className="w-full sm:w-auto">
                Our Story
              </Button>
            </Link>
          </div>
        </div>

        {featuredProduct ? (
          <FloatingProductCard product={featuredProduct} />
        ) : (
          <div className="glass-bg glass-border glass-shadow rounded-md p-8 text-mid-gray text-sm">
            Featured product will appear here once a Shopify product is tagged
            with <code className="text-charcoal">featured</code>.
          </div>
        )}
      </div>
    </section>
  );
}
