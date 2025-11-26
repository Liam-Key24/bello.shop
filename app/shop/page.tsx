'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { getAllProductsSimple } from "@/lib/shopify/products"
import { mapShopifyToProductItem } from "@/lib/shopify/filter"
import type { ProductItem } from "@/lib/shopify/types"

import ProductGrid from "./components/ProductGrid"
import FilterMenu from "./components/FilterMenu"



export default function ShopPage() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const searchParams = useSearchParams()

  useEffect(() => {
    async function loadProducts() {
      const data = await getAllProductsSimple(50)
      const mapped = mapShopifyToProductItem(data)
      setProducts(mapped)
    }
    loadProducts()
  }, [])

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
      // simple tier mock (you can refine)
      if (price === "£") result = result.filter(p => p.price < 30)
      if (price === "££") result = result.filter(p => p.price >= 30 && p.price < 80)
      if (price === "£££") result = result.filter(p => p.price >= 80)
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
