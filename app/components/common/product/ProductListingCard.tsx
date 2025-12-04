import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/product";
import type { ShopifyProduct } from "@/lib/shopify/types";

interface ProductListingCardProps {
  product: ShopifyProduct;
  className?: string;
}

/**
 * Shared product listing card component
 * Used across product listing pages for consistency
 */
export default function ProductListingCard({
  product,
  className = "block border p-4 rounded-xl hover:shadow-md transition",
}: ProductListingCardProps) {
  const image = product.images[0];
  const imageUrl = image?.url || "/placeholder.svg";
  const imageAlt = image?.altText || product.title;

  return (
    <Link
      key={product.id}
      href={`/product/${product.handle}`}
      className={className}
    >
      <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
      </div>
      <h2 className="text-lg font-medium">{product.title}</h2>
      <p className="text-sm text-gray-600">{formatPrice(product.price)}</p>
    </Link>
  );
}

