import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { ProductMedia } from "@/app/components/products/ProductMedia";
import { formatPrice, getPrimaryImage } from "@/lib/utils/product";
import type { ShopifyProduct } from "@/lib/shopify/types";

export interface FeaturedProductCardProps {
  product: ShopifyProduct;
}

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const image = getPrimaryImage(product);
  const description =
    product.description?.replace(/<[^>]*>/g, "").slice(0, 140) ||
    "Sustainable kitchen essential.";

  return (
    <article className="glass-bg glass-border glass-shadow rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <ProductMedia
        src={image?.url}
        alt={image?.altText || product.title}
        className="w-full h-80 md:h-[400px]"
      />
      <div className="p-6 md:p-8">
        <h3 className="font-display text-2xl font-bold text-charcoal mb-3">
          {product.title}
        </h3>
        <p className="font-display text-[28px] font-extrabold text-brand-deep mb-5">
          {formatPrice(product.price)}
        </p>
        <p className="text-base text-mid-gray mb-6 leading-relaxed">
          {description}
          {product.description && product.description.length > 140 ? "…" : ""}
        </p>
        <Link href={`/product/${product.handle}`} className="block">
          <Button variant="primary" className="w-full">
            View Product
          </Button>
        </Link>
      </div>
    </article>
  );
}
