'use client'

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { filterByPriceTier } from "@/lib/config/price-tiers"
import ProductCard from "@/app/components/products/cards/ProductCard"
import type { ProductsGridProps, ShopifyProduct } from "@/lib/shopify/types"

export default function ProductGrid({ products, viewMode }: ProductsGridProps) {
  const searchParams = useSearchParams()
  
  const filteredProducts = useMemo(() => {
    const brand = searchParams.get("brand")
    const rating = searchParams.get("rating")
    const price = searchParams.get("price")

    return products.filter(p => {
      const matchesBrand = !brand || p.vendor === brand
      const matchesRating = !rating || (p.rating ?? 0) >= Number(rating)
      const matchesPrice = !price || filterByPriceTier([p], price).length > 0
      return matchesBrand && matchesRating && matchesPrice
    })
  }, [products, searchParams])

  const gridCols = viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"

  return (
    <div className="mt-6">
      {filteredProducts.length > 0 ? (
        <motion.div
          layout
          transition={{ duration: 0.3 }}
          className={`grid gap-6 ${gridCols}`}
        >
          {filteredProducts.map((product) => (
            <motion.div layout key={product.id || product.handle}>
              <ProductCard product={product as ShopifyProduct} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 py-10">No products found.</p>
      )}
    </div>
  )
}

