'use client'

import Image from 'next/image'
import React from 'react'
import { ProductCarousel } from './ProductCarousel'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Newsletter } from '@/app/components/Newsletter'
import { inherits } from 'util'

export function Feature() {


    return (
    <section className="w-full mx-auto p-1 sm:p-4 ">
      <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 justify-between">
        <div className="rounded p-2 sm:p-3 md:p-4 w-full bg-green-100 text-green-300">
          <div className="relative aspect-[1/1] sm:aspect-[4/3] md:aspect-[1/2] mb-2 sm:mb-3 md:mb-4">
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
            <p className="text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4">Experience luxury skincare.</p>
            <button className="w-auto px-3 sm:px-4 md:px-6 py-2 rounded text-xs sm:text-sm md:text-base transition-all text-green-100 bg-green-300 hover:scale-105 hover:-translate-y-1">
              Shop Now
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col md:block md:space-y-10 md:my-auto gap-4">
          <div className='rounded bg-green-100 w-full h-40 md:h-96 mx-auto py-3'>
            <div className='relative w-[95%] md:aspect-[2/1] mx-auto'>
            <Image
              src='/media/trinh-minh-th-h4cM5JQmxoQ-unsplash.jpg'
              alt='bundle_photo'
              fill
              className='object-cover rounded'
              priority
            />
            </div>
            <div className='w-full inline-flex justify-evenly items-center'>
              <h2 className='text-left px-2 sm:px-3 md:px-4'>Discover our Limited Bundle Offers</h2>
              <button className="group flex items-center gap-2 px-4 py-2 transition-all duration-300 ease-in-out hover:scale-110 md:text-base text-sm">
              <span className="transition-colors duration-300">
                View Item
              </span>
              <ArrowUpRight className='block md:hidden' />
              <ArrowRight className="hidden md:block group-hover:-rotate-45 transition-all duration-300" />
            </button>
            </div>
          </div>
          <div className="rounded p-4 flex justify-between items-center bg-[#F5A3BE] text-red-700 w-auto h-24">
            <div className="flex-col text-center p-5">
              <h2 className="font-semibold md:text-4xl text-2xl">Valentines Deal</h2>
              <p className="md:text-lg text-sm ">Give your skin some love.</p>
            </div>
            <button className="group flex items-center gap-2 px-4 py-2 transition-all duration-300 ease-in-out hover:scale-110 md:text-base text-sm">
              <span className="transition-colors duration-300">
                View Item
              </span>
              <ArrowUpRight className='block md:hidden' />
              <ArrowRight className="hidden md:block group-hover:-rotate-45 transition-all duration-300" />
            </button>
          </div>
          <ProductCarousel />
          <Newsletter />
        </div>
      </div>
    </section>
  )
}