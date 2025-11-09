'use client';
import { useState } from 'react';

interface GalleryImage {
  url: string;
  altText?: string;
}

export default function ProductImageGallery({ images }: { images: GalleryImage[] }) {
  const mainImage = images[0] || { url: '/placeholder.svg', altText: 'No image' };
  const [selected, setSelected] = useState(mainImage);
  const thumbnails = images.slice(1, 3);

  return (
    <div className="mb-4">
      <div className="h-96 mb-4 rounded-4xl overflow-hidden">
        <img src={selected.url || '/placeholder.svg'} alt={selected.altText} className="w-full h-full object-cover" />
      </div>

      {thumbnails.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {thumbnails.map((img, idx) => (
            <img
              key={idx}
              src={img.url || '/placeholder.svg'}
              alt={img.altText}
              className="h-28 rounded-4xl object-cover cursor-pointer"
              onClick={() => setSelected(img)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
