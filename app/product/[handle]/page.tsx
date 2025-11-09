// filepath: /Users/liamgk/Desktop/belloshop2025/my-ecommerce-app/app/product/[handle]/page.tsx
import { getProductByHandle } from '../../../lib/shopify';
import ProductImageGallery from '../../layout/ProductShopGallery';
import ProductTitle from '../../components/ui/ProductTitle';
import BrandBadge from '../../components/ui/BrandBadge';
import ProductDescription from '../../components/ui/ProductDescription';
import Rating from '../../components/ui/Rating';
import DetailsDropdown from '../../components/ui/DetailsDropdown';
import QuantitySelector from '../../components/ui/QuantitySelector';
import ActionButtons from '../../cart/components/Actionbuttons';
import BackButton from '../../components/ui/BackButton';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return <div className="p-8 text-center">Product not found.</div>;
  }

  const images =
    product.images?.map((img: any) => ({
      url: img.url,
      altText: img.altText || product.title,
    })) || [];

  const variantNode = product.variants?.edges?.[0]?.node;
  const variantId = variantNode?.id || "";
  const variantPrice = Number(product.priceRange?.minVariantPrice?.amount ?? 0);
  const productImage = product.images?.[0]?.url ?? "/placeholder.svg";
  const productTitle = product.title ?? "";


  return (
    <div className="w-full mt-10 mb-6">
      <div className="flex items-center mb-4">
        <BackButton />
      </div>

      <ProductImageGallery images={images} />

      <div className="w-full flex flex-col gap-4">
        <BrandBadge />
        <ProductTitle name={product.title} />
        <Rating rating={5} reviewCount={12} />
        <ProductDescription description={product.description || ''} />
      </div>

      <div className="flex gap-4 mb-6">
        <DetailsDropdown />
        <QuantitySelector />
      </div>

      {/* pass real props to ActionButtons */}
      <ActionButtons
        variantId={variantId}
        title={productTitle}
        price={variantPrice}
        image={productImage}
      />
    </div>
  );
}