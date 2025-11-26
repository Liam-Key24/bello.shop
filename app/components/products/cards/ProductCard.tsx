import Link from 'next/link';
import { Heart, ExternalLink } from 'lucide-react';
import ProductImage from '../shared/ProductImage';
import { formatPrice, getProductImage, getProductLink, getProductTitle } from '../shared/utils';
import type { ProductCardBaseProps } from '../shared/types';

interface ProductCardProps extends ProductCardBaseProps {
  // Legacy props for backward compatibility
  name?: string;
  price?: number;
  handle?: string;
  image?: { url: string; altText?: string };
}

/**
 * Main product card component - displays product with image, title, and price
 * Used in product grids and listings
 */
export default function ProductCard({ 
  product, 
  name, 
  price, 
  handle, 
  image,
  showPrice = true,
}: ProductCardProps) {
  // Support both new (product) and legacy (individual props) API
  const productTitle = product ? getProductTitle(product) : (name || 'Product');
  const productPrice = product?.price ?? price ?? 0;
  const productHandle = product?.handle ?? handle ?? '';
  const productImage = product 
    ? getProductImage(product) 
    : (image ? { url: image.url, altText: image.altText } : null);
  const href = getProductLink(productHandle);

  return (
    <div className="w-full h-auto flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-[1.02]">
      <Link
        href={href}
        className="glass w-full h-44 rounded-4xl flex flex-col relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-black/10"
        aria-label={`View ${productTitle}`}
      >
        <ProductImage
          image={productImage}
          alt={productTitle}
          className="w-full h-full object-cover rounded-4xl transition-all duration-500 ease-in-out"
        />

        <div className="flex gap-2 absolute top-3 right-3 z-10">
          <button
            type="button"
            className="p-1 hover:scale-110 transition-transform"
            aria-label="Add to favorites"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Implement favorite functionality
            }}
          >
            <Heart className="w-4 h-4 text-gray-700" />
          </button>
          <button
            type="button"
            className="p-1 hover:scale-110 transition-transform"
            aria-label="View product details"
            onClick={(e) => {
              e.preventDefault();
              window.open(href, '_blank');
            }}
          >
            <ExternalLink className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        <div className="flex items-center justify-between px-4 absolute bottom-2 w-full text-white drop-shadow-md z-10">
          <span className="text-sm font-semibold truncate flex-1 mr-2">{productTitle}</span>
          {showPrice && (
            <span className="text-sm font-medium whitespace-nowrap">{formatPrice(productPrice)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}

