import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="p-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
      <p className="text-mid-gray mb-6 max-w-md">
        The product you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <div className="flex gap-4">
        <Link
          href="/shop"
          className="px-6 py-2 rounded-sm border border-light-gray text-charcoal hover:opacity-70 transition-opacity"
        >
          Back to shop
        </Link>
        <Link
          href="/shop"
          className="px-6 py-2 rounded-sm bg-brand text-charcoal hover:bg-brand-hover transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  );
}
