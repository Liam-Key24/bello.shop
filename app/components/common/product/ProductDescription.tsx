/**
 * Product description - displays product description text
 */
export default function ProductDescription({ description }: { description: string }) {
  return (
    <p className="text-gray-700 text-sm leading-relaxed mb-6">
      {description}
    </p>
  );
}

