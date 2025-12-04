import Link from "next/link";
import BackButton from "@/app/components/common/navigation/BackButton";

export default function ProductNotFound() {
  return (
    <div className="p-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        The product you're looking for doesn't exist or may have been removed.
      </p>
      <div className="flex gap-4">
        <BackButton href="/shop" className="px-6 py-2" />
        <Link
          href="/shop"
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  );
}

