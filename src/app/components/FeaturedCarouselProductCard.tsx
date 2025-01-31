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
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-base mb-2">{description}</p>
        <p className="text-gray-900 font-bold text-xl">
          {price}
        </p>
      </div>
    </div>
  )
};
