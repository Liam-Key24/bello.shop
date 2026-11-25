"use client";

import { useState } from "react";
import { ProductMedia } from "@/app/components/products/ProductMedia";
import type { ShopifyImage } from "@/lib/shopify/types";

export interface ProductGalleryProps {
  images: ShopifyImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];
  const thumbs = images.slice(0, 4);

  return (
    <div className="md:sticky md:top-28 space-y-4">
      <ProductMedia
        src={active?.url}
        alt={active?.altText || title}
        className="w-full h-[400px] md:h-[600px] rounded-md glass-border"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {thumbs.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {thumbs.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-sm overflow-hidden border transition-colors ${
                index === activeIndex
                  ? "border-brand-mid"
                  : "border-light-gray hover:border-brand-mid"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <ProductMedia
                src={image.url}
                alt={image.altText || `${title} view ${index + 1}`}
                className="aspect-square w-full h-20"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
