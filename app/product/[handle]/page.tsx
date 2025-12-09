import { getProductByHandle } from "@/lib/shopify/products";
import { formatPrice, getFirstVariantId, sanitizeDescription, getPrimaryImage } from "@/lib/utils/product";
import Image from "next/image";
import Link from "next/link";
import ProductBuyButtons from "./ProductBuyButtons";
import type { ProductPageProps } from "@/lib/types/product";

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;

  if (!handle) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  const product = await getProductByHandle(handle);

  if (!product) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  const { title, description, images, price } = product;
  const variantId = getFirstVariantId(product);
  const primaryImage = getPrimaryImage(product);
  const imageUrl = primaryImage?.url || "/placeholder.svg";
  const imageAlt = primaryImage?.altText || title;

  return (
    <div className="w-full mt-10 mb-6 space-y-6">
      <Link 
        href="/shop" 
        className="inline-flex items-center rounded-full w-10 h-10 hover:bg-black/10 transition"
        aria-label="Back to shop"
      >
        ←
      </Link>

      <div className="relative w-full aspect-square rounded-4xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="text-2xl font-semibold text-gray-800">
          {formatPrice(price)}
        </p>
        {description && (
          <div
            className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: sanitizeDescription(description),
            }}
          />
        )}
      </div>

      <ProductBuyButtons
        variantId={variantId}
        title={title}
        price={price}
        image={imageUrl}
      />
    </div>
  );
}
