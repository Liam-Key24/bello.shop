import { getAllProductsSimple } from "@/lib/shopify/products";
import ProductListingCard from "@/app/components/common/product/ProductListingCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | Bello Shop",
  description: "Browse our complete collection of premium health and beauty products.",
  alternates: {
    canonical: "/product",
  },
};

export default async function ProductsPage() {
  const products = await getAllProductsSimple();

  if (!products?.length) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-2">No Products Found</h1>
        <p className="text-gray-600">Check back soon for new products.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductListingCard key={product.id} product={product} />
      ))}
    </div>
  );
}
