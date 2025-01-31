'use client'

import Image from 'next/image'
import React from 'react'
import { ProductCarousel } from './ProductCarousel'

export function Feature() {

    return (
    <section className="max-w-5xl mx-auto p-3 sm:p-4">
      <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white rounded p-3 sm:p-4">
          <div className="relative aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3] mb-3 sm:mb-4">
            <Image
              src="/media/kadarius-seegars-Mxy5gokl8mE-unsplash.jpg"
              alt="Featured Product"
              fill
              className="object-cover rounded"
              priority
            />
          </div>
          <div className="text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Featured Product</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Experience luxury skincare.</p>
            <button className="w-full sm:w-auto bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-sm sm:text-base">
              Shop Now
            </button>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="bg-white rounded p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Valentines Deal</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Give your skin some love.</p>
            <button className="w-full sm:w-auto bg-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-sm sm:text-base">
              View Deal
            </button>
          </div>
          <ProductCarousel />
        </div>
      </div>
    </section>
  )
}