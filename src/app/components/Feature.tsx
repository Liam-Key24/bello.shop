'use client'

import Image from 'next/image'
import React from 'react'
import { ProductCarousel } from './ProductCarousel'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
export function Feature() {

    return (
    <section className="w-auto md:max-w-5xl mx-auto p-1 sm:p-4 ">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3 sm:gap-4">
        <div className="bg-white rounded p-2 sm:p-3 md:p-4 w-full">
          <div className="relative aspect-[1/1] sm:aspect-[4/3] md:aspect-[3/2] mb-2 sm:mb-3 md:mb-4">
            <Image
              src="/media/kadarius-seegars-Mxy5gokl8mE-unsplash.jpg"
              alt="Featured Product"
              fill
              className="object-cover rounded"
              priority
            />
          </div>
          <div className="text-center px-2 sm:px-3 md:px-4">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 md:mb-3">Featured Product</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4">Experience luxury skincare.</p>
            <button className="w-full bg-black text-white px-3 sm:px-4 md:px-6 py-2 rounded text-xs sm:text-sm md:text-base transition-all hover:bg-gray-800">
              Shop Now
            </button>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="bg-white rounded p-4 flex justify-between items-center">
            <div className="flex-col text-center p-5">
              <h2 className="font-bold">Valentines Deal</h2>
              <p className="text-gray-600">Give your skin some love.</p>
            </div>
            <button className="group flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-black">
              <span className="text-black group-hover:text-white transition-colors duration-300">
                View Item
              </span>
              <ArrowUpRight className='block md:hidden text-black' />
              <ArrowRight className="hidden md:block text-black group-hover:text-white transition-all duration-300 group-hover:-rotate-45" />
            </button>
          </div>
          <ProductCarousel />
        </div>
      </div>
    </section>
  )
}