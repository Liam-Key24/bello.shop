// filepath: app/product/[handle]/page.tsx
import { getProductByHandle } from "@/lib/shopify/products";
import ProductImageGallery from "@/app/product/landing/ProductImageGallery";
import ProductTitle from "@/app/components/common/product/ProductTitle";
import BrandBadge from "@/app/components/common/product/BrandBadge";

import ProductDescription from "@/app/components/common/product/ProductDescription";
import Rating from "@/app/components/common/product/Rating";
import DetailsDropdown from "@/app/components/common/product/DetailsDropdown";
import QuantitySelector from "@/app/components/common/product/QuantitySelector";
import BackButton from "@/app/components/common/buttons/BackButton";
import ActionButtons from "@/app/cart/components/ActionButtons";
import type { ProductPageProps } from "@/lib/types/product";

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;

  if (!handle) return <div className="p-8 text-center">Invalid product handle.</div>;

  const product = await getProductByHandle(handle);

  if (!product) return <div className="p-8 text-center">Product not found.</div>;

  const { title, description, images, price, variants } = product;
  const variantId = variants?.[0]?.id ?? "";
  const image = images?.[0]?.url ?? "/placeholder.svg";

  return (
    <div className="w-full mt-10 mb-6 space-y-6">
      <BackButton />

      <ProductImageGallery images={images} />

      <div className="flex flex-col gap-4">
        <BrandBadge />
        <ProductTitle name={title} />
        <Rating rating={5} reviewCount={12} />
        <ProductDescription description={description || ""} />
      </div>

      <div className="flex gap-4">
        <DetailsDropdown />
        <QuantitySelector />
      </div>

      <ActionButtons variantId={variantId} title={title} price={price} image={image} />
    </div>
  );
}
