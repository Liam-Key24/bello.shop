'use client'

import { useState } from "react"
import type { ProductItem } from "@/lib/shopify/types"
import ProductGrid from "./ProductGrid"
import FilterMenu from "./filters/FilterMenu"

interface ShopClientProps {
  products: ProductItem[];
}

export default function ShopClient({ products }: ShopClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="shop-page container mx-auto px-4 pt-10 pb-20">
      <div className="mb-6 sticky top-20 z-[9997]">
        <FilterMenu />
      </div>
      <ProductGrid
        products={products}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />
    </div>
  )
}