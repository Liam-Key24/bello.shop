import Image from 'next/image'
import React from 'react'

export function Hero () {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Text Content */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Shop the latest trends and find unique items that match your style. Quality products at competitive prices.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Shop Now
          </button>
        </div>

        {/* Right Image Card */}
        <div className="lg:w-1/2">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/drew-dizzy-graham-cTKGZJTMJQU-unsplash.jpg"
              alt="Hero Shopping Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
};