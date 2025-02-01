'use client'

import React, { useRef } from 'react'
import { FeaturedCarouselProductCard } from './FeaturedCarouselProductCard'
import { ArrowRight } from 'lucide-react'

const products = [
  { id: 1, title: 'Product 1', price: '9.99', description: 'hello' },
  { id: 2, title: 'Product 2', price: '9.99', description: 'hello' },
  { id: 3, title: 'Product 3', price: '9.99', description: 'hello' },
  { id: 4, title: 'Product 4', price: '9.99', description: 'hello' },
  { id: 5, title: 'Product 5', price: '9.99', description: 'hello' },
]

export function ProductCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollCarousel = () => {
    const container = containerRef.current
    if (container) {
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
        
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        })
      } else {

        container.scrollTo({
          left: container.scrollLeft + 266,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <div className="relative max-w-4xl">
      <div className="h-[300px] flex justify-center">
        <div 
          ref={containerRef} 
          className="carousel-items flex gap-4 overflow-x-auto snap-x snap-mandatory h-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[250px] snap-start h-full">
              <FeaturedCarouselProductCard
                imageUrl="/media/neauthy-skincare-M8Vl5jWSV9s-unsplash.jpg"
                title={product.title}
                price={product.price}
                description={product.description}
              />
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={scrollCarousel}
        className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white hidden md:block"
      >
        <ArrowRight /> 
      </button>
    </div>
  )
}