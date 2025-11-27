import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export function useFilterState() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  useEffect(() => {
    setSelectedPrice(searchParams.get("price"))
    const ratingParam = searchParams.get("rating")
    setSelectedRating(ratingParam ? parseInt(ratingParam) : null)
    setSelectedBrand(searchParams.get("brand"))
  }, [searchParams])

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return {
    selectedPrice,
    selectedRating,
    selectedBrand,
    updateFilter,
  }
}

