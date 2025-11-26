import { getAllProductsSimple } from '@/lib/shopify/products';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await getAllProductsSimple();

  if (!products?.length) {
    return <div className="text-center py-10">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.handle}`}
          className="block border p-4 rounded-xl hover:shadow-md transition"
        >
          <img
            src={product.images[0]?.url}
            alt={product.images[0]?.altText || product.title}
            className="w-full aspect-square object-cover rounded-lg mb-3"
          />
          <h2 className="text-lg font-medium">{product.title}</h2>
          <p className="text-sm text-gray-600">
            £{product.price.toFixed(2)}
          </p>
        </Link>
      ))}
    </div>
  );
}
