import { getProductByHandle } from "@/lib/shopify/products";
import {
  formatPrice,
  getFirstVariantId,
  sanitizeDescription,
  getPrimaryImage,
} from "@/lib/utils/product";
import Link from "next/link";
import ProductBuyButtons from "./ProductBuyButtons";
import { ProductGallery } from "@/app/components/product/ProductGallery";
import { ProductGuarantees } from "@/app/components/product/ProductGuarantees";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { Icon } from "@/app/components/ui/Icon";
import { ReviewsPlaceholder } from "@/app/components/sections/ReviewsPlaceholder";
import type { ProductPageProps } from "@/lib/types/product";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;

  if (!handle) {
    return (
      <div className="text-center py-20 px-6">
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-mid-gray">The product you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  let product = null;
  try {
    product = await getProductByHandle(handle);
  } catch (error) {
    console.error("Error loading product:", error);
    return (
      <div className="text-center py-20 px-6">
        <h1 className="text-2xl font-bold mb-2">Unable to Load Product</h1>
        <p className="text-mid-gray">
          Please try again once Shopify credentials are configured.
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 px-6">
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-mid-gray">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/shop" className="inline-block mt-6 text-charcoal font-semibold">
          Back to shop
        </Link>
      </div>
    );
  }

  const { title, description, images, price } = product;
  const variantId = getFirstVariantId(product);
  const primaryImage = getPrimaryImage(product);
  const imageUrl = primaryImage?.url;
  const featureLines =
    description
      ?.replace(/<[^>]*>/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 4) ?? [];

  return (
    <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-24">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-mid-gray hover:text-charcoal mb-10 transition-colors"
      >
        ← Back to shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        <ProductGallery images={images || []} title={title} />

        <div>
          <span className="inline-block mb-6 px-3.5 py-1.5 rounded-sm bg-brand-pale text-charcoal text-[11px] font-bold uppercase tracking-wide">
            Sustainable Essential
          </span>
          <h1 className="text-4xl md:text-5xl mb-5">{title}</h1>
          <p className="font-display text-3xl md:text-4xl font-extrabold text-charcoal mb-7">
            {formatPrice(price)}
          </p>

          {description && (
            <div
              className="text-mid-gray leading-relaxed mb-9 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: sanitizeDescription(description),
              }}
            />
          )}

          {featureLines.length > 0 && (
            <GlassCard padding="md" className="mb-8">
              <h3 className="font-display text-lg font-bold text-charcoal mb-5">
                What&apos;s Included
              </h3>
              <ul className="space-y-3">
                {featureLines.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-[15px] text-mid-gray">
                    <span className="text-brand mt-0.5 shrink-0">
                      <Icon name="check" size={20} />
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          )}

          <ProductBuyButtons
            variantId={variantId}
            title={title}
            price={price}
            image={imageUrl}
          />

          <ProductGuarantees />
        </div>
      </div>

      <div className="mt-20">
        <ReviewsPlaceholder />
      </div>
    </div>
  );
}
