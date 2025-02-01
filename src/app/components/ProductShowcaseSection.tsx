'use client'

import { ArrowRight,  } from 'lucide-react'
import React from 'react'

export function ProductShowcaseSection () {
  return (
    <section className="w-full p-2">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-2 transition-transform hover:scale-105 duration-300">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src="/media/mathilde-langevin-p3O5f4u95Lo-unsplash.jpg"
                alt="Product 1"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <h3 className="text-xl font-semibold mb-2">Natural Yogurt Skin Cream</h3>
            <button className="group flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-black">
              <span className="text-black group-hover:text-white transition-colors duration-300">
                View Item
              </span>
              <ArrowRight className="text-black group-hover:text-white transition-all duration-300 group-hover:-rotate-45" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-2 transition-transform duration-300 hover:scale-105">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src="/media/mathilde-langevin-p3O5f4u95Lo-unsplash.jpg"
                alt="Product 1"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <h3 className="text-xl font-semibold mb-2">Natural Yogurt Skin Cream</h3>
            <button className="group flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-black">
              <span className="text-black group-hover:text-white transition-colors duration-300">
                View Item
              </span>
              <ArrowRight className="text-black group-hover:text-white transition-all duration-300 group-hover:-rotate-45" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-2 transition-transform duration-300 hover:scale-105">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src="/media/mathilde-langevin-p3O5f4u95Lo-unsplash.jpg"
                alt="Product 1"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <h3 className="text-xl font-semibold mb-2">Natural Yogurt Skin Cream</h3>
            <button className="group flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-black">
              <span className="text-black group-hover:text-white transition-colors duration-300">
                View Item
              </span>
              <ArrowRight className="text-black group-hover:text-white transition-all duration-300 group-hover:-rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
};
