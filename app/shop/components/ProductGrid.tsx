'use client'
import { motion } from "framer-motion"
import { ProductCard } from "@/app/components/products/cards"
import type { ProductsGridProps } from "@/lib/shopify/types"
import type { ShopifyProduct } from "@/lib/shopify/types"
export default function ProductGrid({ products, viewMode }: ProductsGridProps) {
  const gridCols = viewMode === "grid" 
    ? "grid-cols-2 md:grid-cols-3" 
    : "grid-cols-1";

  return (
    <div className="mt-6">
      {products.length > 0 ? (
        <motion.div
          layout
          transition={{ duration: 0.3 }}
          className={`grid gap-6 ${gridCols}`}
        >
          {products.map((product) => (
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

