"use client";

import Link from 'next/link';
import { Heart, ArrowSquareOut } from '@phosphor-icons/react';
import ProductImage from '../shared/ProductImage';
import { formatPrice, normalizeProductData } from '@/lib/utils/product';
import type { ProductCardProps } from '@/lib/types/product';

export default function ProductCard(props: ProductCardProps) {
  const { showPrice = true } = props;
  const { title, price: productPrice, image: productImage, href } = normalizeProductData(props);

  return (
    <div className="w-full h-auto flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-[1.02]">
      <Link
        href={href}
        className="glass w-full h-44 rounded-4xl flex flex-col relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-black/10"
        aria-label={`View ${title}`}
      >
        <ProductImage
          image={productImage}
          alt={title}
          className="w-full h-full object-cover rounded-4xl transition-all duration-500 ease-in-out"
        />

        <div className="flex absolute top-3 right-3 z-10">
          <button
            type="button"
            className="p-1 hover:scale-110 transition-transform"
            aria-label="Add to favorites"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Implement favorite functionality
            }}
          >
            <Heart className="w-4 h-4 text-gray-700" weight="regular" />
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
            <ArrowSquareOut className="w-4 h-4 text-gray-700" weight="regular" /> 
          </button>
        </div>

        <div className="flex items-center justify-between px-4 absolute bottom-2 w-full text-white drop-shadow-md z-10">
          <span className="text-sm font-semibold truncate flex-1 mr-2">{title}</span>
          {showPrice && (
            <span className="text-sm font-medium whitespace-nowrap">{formatPrice(productPrice)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}

