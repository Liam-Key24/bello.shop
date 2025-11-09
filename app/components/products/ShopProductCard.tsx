
import Link from 'next/link';
import { Heart, ExternalLink } from 'lucide-react';

interface ShopProductCardProps {
  name: string;
  price: number;
  handle: string;
  image: { url: string; altText?: string };
}

export default function ShopProductCard({ name, price, handle, image }: ShopProductCardProps) {
  return (
    <div className="w-full h-auto flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-[1.02]">
      <Link
        href={`/product/${handle}`}
        className="glass w-full h-44 rounded-4xl flex flex-col relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-black/10"
      >
        {image?.url ? (
          <img
            src={image.url}
            alt={image.altText || name}
            className="w-full h-full object-cover rounded-4xl transition-all duration-500 ease-in-out"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No image
          </div>
        )}

        <div className="flex gap-2 absolute top-3 right-3">
          <Heart className="w-4 h-4 text-gray-700" />
          <ExternalLink className="w-4 h-4 text-gray-700" />
        </div>

        <div className="flex items-center justify-between px-4 absolute bottom-2 w-full text-white drop-shadow-md">
          <span className="text-sm font-semibold">{name}</span>
          <span>£{price}</span>
        </div>
      </Link>
    </div>
  );
}
