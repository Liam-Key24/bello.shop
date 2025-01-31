'use client'

import Image from 'next/image'
import React from 'react'
import { FeaturedCarouselProductCard } from "@/app/components/FeaturedCarouselProductCard"

export function Feature (){
    return (
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Featured Product */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="relative h-64 w-full mb-4">
                  <Image
                    src="/featured-product.jpg"
                    alt="Featured Product"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">Featured Product</h2>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
    
            {/* Right Side - Empty Space */}
            <div className="w-full md:w-1/2">
              <div className="h-full flex flex-col">
                <div className="h-3/5 bg-white rounded-lg shadow-lg p-6 mb-4 flex flex-col justify-center">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Valentines Deal</h1>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-4">
                    Give your skin some love this valentines, with this deal.
                  </p>
                  <button className="bg-pink-500 text-white px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base rounded-md hover:bg-pink-600 transition-colors">
                    View Deal
                  </button>
                </div>
                <div className="h-2/5 bg-white rounded-lg shadow-lg p-6">
                  <div className="overflow-x-hidden relative">
                    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                      <FeaturedCarouselProductCard 
                        imageUrl="/product1.jpg"
                        title="Product 1"
                        price = "9.99" 
                        description='hello'
                      />
                      <FeaturedCarouselProductCard 
                        imageUrl="/product1.jpg"
                        title="Product 1"
                        price = "9.99" 
                        description='hello'
                      />
                      <FeaturedCarouselProductCard 
                        imageUrl="/product1.jpg"
                        title="Product 1"
                        price = "9.99" 
                        description='hello'
                      />
                    </div>
                </div>
             </div>
            </div>
            </div>

            </div>
        </section>
    
    )
 };