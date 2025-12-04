import { getProductByHandle } from "@/lib/shopify/products";
import { formatPrice } from "@/lib/utils/product";
import {
  getFirstVariantId,
  getPrimaryImage,
  sanitizeDescription,
} from "@/lib/utils/product";
import {
  generateProductMetadata,
  generateProductStructuredData,
  generateBreadcrumbStructuredData,
} from "@/lib/utils/seo";
import { handleProductNotFound } from "@/lib/utils/errors";
import ProductImageGallery from "@/app/product/landing/ProductImageGallery";
import ProductActions from "./ProductActions";
import BackButton from "@/app/components/common/navigation/BackButton";
import type { ProductPageProps } from "@/lib/types/product";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;

  if (!handle) {
    return {
      title: "Product Not Found | Bello Shop",
    };
  }

  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found | Bello Shop",
    };
  }

  return generateProductMetadata(product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;

  if (!handle) {
    handleProductNotFound();
  }

  const product = await getProductByHandle(handle);

  if (!product) {
    handleProductNotFound();
  }

  // TypeScript now knows product is non-null after the check
  const { title, description, images, price } = product!;
  const variantId = getFirstVariantId(product!);
  const primaryImage = getPrimaryImage(product!);
  const image = primaryImage?.url ?? "";

  const productStructuredData = generateProductStructuredData(product!);
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: product!.title, url: `/product/${product!.handle}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <div className="w-full mt-10 mb-6 space-y-6">
        <BackButton />

        <ProductImageGallery images={images} title={title} />

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

        <ProductActions
          variantId={variantId}
          title={title}
          price={price}
          image={image}
        />
      </div>
    </>
  );
}
