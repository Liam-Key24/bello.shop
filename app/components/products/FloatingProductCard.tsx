import Link from "next/link";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { Button } from "@/app/components/ui/Button";
import { ProductMedia } from "@/app/components/products/ProductMedia";
import { formatPrice, getPrimaryImage } from "@/lib/utils/product";
import type { ShopifyProduct } from "@/lib/shopify/types";

export interface FloatingProductCardProps {
  product: ShopifyProduct;
}

export function FloatingProductCard({ product }: FloatingProductCardProps) {
  const image = getPrimaryImage(product);

  return (
    <GlassCard padding="md" className="max-w-sm w-full ml-auto glass-shadow-lg">
      <span className="inline-block mb-5 px-3.5 py-1.5 rounded-sm bg-brand-pale/90 text-charcoal text-[11px] font-bold uppercase tracking-wide">
        Featured
      </span>
      <ProductMedia
        src={image?.url}
        alt={image?.altText || product.title}
        className="w-full h-60 rounded-sm mb-5"
        priority
      />
      <h3 className="font-display text-xl font-bold text-charcoal mb-2.5">
        {product.title}
      </h3>
      <p className="font-display text-[28px] font-extrabold text-charcoal mb-5">
        {formatPrice(product.price)}
      </p>
      <Link href={`/product/${product.handle}`} className="block">
        <Button variant="primary" className="w-full">
          View Product
        </Button>
      </Link>
    </GlassCard>
  );
}
