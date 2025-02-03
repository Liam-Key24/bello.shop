import Image from 'next/image'
import React from 'react'

interface ProductCardProps {
  imageUrl: string
  title: string
  price: string
  description: string
}

export const FeaturedCarouselProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  price,
  description
}) => {
  return (
    <div className="w-[200px] h-auto rounded overflow-hidden bg-green-200 text-green-100 hover:shadow-xl shadow-md transition-shadow">
      <div className="relative h-[150px] w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="px-4 py-3">
        <h3 className="font-bold text-lg mb-1 truncate">{title}</h3>
        <p className="text-green-100 text-sm mb-2 line-clamp-1">{description}</p>
        <p className="text-green-300 font-bold text-lg">
          {price}
        </p>
      </div>
    </div>
  )
};
