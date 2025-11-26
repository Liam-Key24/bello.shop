'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

type FilterMenuProps = {
  priceTiers?: string[] // e.g., ["£", "££", "£££"]
  ratings?: number[]    // e.g., [1,2,3,4,5]
  brands?: string[]     // optional
}

export default function FilterMenu({ priceTiers = ["£", "££", "£££"], ratings = [1, 2, 3, 4, 5], brands = [] }: FilterMenuProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for selected filters
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  // Update state when URL changes (keeps back button in sync)
  useEffect(() => {
    setSelectedPrice(searchParams.get("price"))
    const ratingParam = searchParams.get("rating")
    setSelectedRating(ratingParam ? parseInt(ratingParam) : null)
    setSelectedBrand(searchParams.get("brand"))
  }, [searchParams])

  // Update URL when filters change
  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.replace(`${window.location.pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-4 mt-38">
      {/* Price filter */}
      {priceTiers.map((tier) => (
        <button
          key={tier}
          className={`px-3 py-1 border rounded ${selectedPrice === tier ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => updateFilter("price", selectedPrice === tier ? null : tier)}
        >
          {tier}
        </button>
      ))}

      {/* Rating filter */}
      {ratings.map((r) => (
        <button
          key={r}
          className={`px-3 py-1 border rounded ${selectedRating === r ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => updateFilter("rating", selectedRating === r ? null : r.toString())}
        >
          {r}★
        </button>
      ))}

      {/* Brand filter (optional) */}
      {brands.map((brand) => (
        <button
          key={brand}
          className={`px-3 py-1 border rounded ${selectedBrand === brand ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => updateFilter("brand", selectedBrand === brand ? null : brand)}
        >
          {brand}
        </button>
      ))}
    </div>
  )
}
