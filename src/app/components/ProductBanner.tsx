'use client'

import React from "react"

export function ProductBanner() {
  return (
    <section className="min-h-[300px] sm:min-h-[350px] md:min-h-[450px] bg-gray-100 rounded-lg p-6 md:p-8">
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">New stock</h2>
        <p className="text-gray-600 text-sm sm:text-base">Discover our latest and most popular products.</p>
      </div>
    </section>
  )
}


