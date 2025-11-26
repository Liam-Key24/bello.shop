// filepath: app/product/[handle]/page.tsx
import { getProductByHandle } from "@/lib/shopify/products";
import ProductImageGallery from "../../layout/ProductShopGallery";
import { 
  ProductTitle, 
  BrandBadge, 
  ProductDescription, 
  Rating, 
  DetailsDropdown, 
  QuantitySelector, 
  BackButton 
} from "../../components/common";
import ActionButtons from "../../cart/components/ActionButtons";


interface ProductPageProps {
  params: {
    handle: string;
  };
}


export default async function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = await params; // <-- unwrap the promise
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
