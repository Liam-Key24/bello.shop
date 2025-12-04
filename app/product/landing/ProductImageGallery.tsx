"use client";
import { useState } from "react";
import Image from "next/image";
import type { ShopifyImage } from "@/lib/shopify/types";

interface ProductImageGalleryProps {
  images: ShopifyImage[];
  title?: string;
}

export default function ProductImageGallery({
  images,
  title = "Product",
}: ProductImageGalleryProps) {
  const mainImage = images[0] || { url: "/placeholder.svg", altText: "No image" };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex] || mainImage;
  const thumbnails = images.slice(1, 4);

  return (
    <div className="mb-4">
      <div className="relative h-96 mb-4 rounded-4xl overflow-hidden">
        <Image
          src={selected.url || "/placeholder.svg"}
          alt={selected.altText || `${title} image ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
      </div>

      {thumbnails.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {thumbnails.map((img, idx) => {
            const actualIndex = idx + 1;
            return (
              <button
                key={actualIndex}
                onClick={() => setSelectedIndex(actualIndex)}
                className={`relative h-28 rounded-4xl overflow-hidden border-2 transition ${
                  selectedIndex === actualIndex
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }`}
                aria-label={`View ${title} image ${actualIndex + 1}`}
              >
                <Image
                  src={img.url || "/placeholder.svg"}
                  alt={img.altText || `${title} thumbnail ${actualIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 200px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
