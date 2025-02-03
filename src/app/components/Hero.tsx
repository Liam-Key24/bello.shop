import Image from 'next/image'
import React from 'react'

export function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 bg-green-100 rounded-md text-green-200 ">
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
        <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
          <h1 className=" text-black-200 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Discover Amazing Products
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black-100 max-w-2xl mx-auto md:mx-0">
            Shop the latest trends and find unique items that match your style.
          </p>
          <button className="w-full sm:w-auto bg-green-300 text-green-100 px-6 py-3 sm:py-4 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:origin-bottom-left text-lg sm:text-xl font-medium shadow-lg">
            Shop Now
          </button>
        </div>

        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
            <Image
              src="/media/drew-dizzy-graham-cTKGZJTMJQU-unsplash.jpg"
              alt="Hero Shopping Image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transform hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}