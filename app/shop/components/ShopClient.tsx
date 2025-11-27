'use client'

import React, { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { filterByPriceTier } from "@/lib/config/price-tiers"
import type { ProductItem } from "@/lib/shopify/types"

import ProductGrid from "./ProductGrid"
import FilterMenu from "./FilterMenu"

interface ShopClientProps {
  products: ProductItem[];
}

export default function ShopClient({ products }: ShopClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const searchParams = useSearchParams()

  const filteredProducts = useMemo(() => {
    let result = [...products]

    const brand = searchParams.get("brand")
    const rating = searchParams.get("rating")
    const price = searchParams.get("price")

    if (brand) {
      result = result.filter(p => p.vendor === brand)
    }

    if (rating) {
      result = result.filter(p => (p.rating ?? 0) >= Number(rating))
    }

    if (price) {
      result = filterByPriceTier(result, price)
    }

    return result
  }, [products, searchParams])

  return (
    <div className="shop-page container mx-auto px-4">
      <FilterMenu
        priceTiers={["£", "££", "£££"]}
        ratings={[1, 2, 3, 4, 5]}
        brands={[...new Set(products.map(p => p.vendor).filter((v): v is string => Boolean(v)))]}
      />
      <ProductGrid
        products={filteredProducts}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />
    </div>
  )
}

