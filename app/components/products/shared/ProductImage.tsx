/**
 * Shared product image component with consistent styling
 */

import Image from 'next/image';
import type { ShopifyImage } from '@/lib/shopify/types';

interface ProductImageProps {
  image: ShopifyImage | null;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export default function ProductImage({
  image,
  alt,
  className = 'object-cover rounded-4xl transition-transform duration-300 group-hover:scale-110',
  fill = true,
  sizes = '(max-width: 768px) 50vw, 33vw',
  priority = false,
}: ProductImageProps) {
  if (!image?.url) {
    return (
      <div className={`w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm ${className}`}>
        No image
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={image.url}
        alt={image.altText || alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={image.url}
      alt={image.altText || alt}
      width={400}
      height={400}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}

