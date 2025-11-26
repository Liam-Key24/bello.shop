import { ShopifyProduct, ProductItem } from "./types"



export interface FilterObject {
    price?: { min: number; max: number }
    rating?: number
    brand?: string[]
    category?: string
}

export function mapShopifyToProductItem(products: ShopifyProduct[]): ProductItem[] {
  return products
    .filter((p) => p.id)
    .map((p) => ({
      id: p.id as string,
      handle: p.handle,
      title: p.title,
      price: p.price,
      categoryId: p.categoryId,
      collectionHandle: p.collectionHandle,
      collectionTitle: p.collectionTitle,
      vendor: p.vendor,
      rating: p.rating,
      images: p.images.map((img) => ({
        url: img.url,
        altText: img.altText ?? p.title,
      })),
    }))
}


// Convert price tier label (£, ££, £££) to numeric range
export function mapPriceTierToRange(tier: string): { min: number; max: number } | undefined {
    switch (tier) {
        case "£":
            return { min: 0, max: 50 }
        case "££":
            return { min: 50, max: 100 }
        case "£££":
            return { min: 100, max: Infinity }
        default:
            return undefined
    }
}

// Parse URL searchParams into normalized FilterObject
export function parseFiltersFromParams(searchParams: URLSearchParams): FilterObject {
    const filters: FilterObject = {}

    const price = searchParams.get("price")
    if (price) {
        // Support both tiers (£, £££) or ranges (50-100)
        if (price.includes("-")) {
            const [min, max] = price.split("-").map(Number)
            filters.price = { min, max }
        } else {
            const tierRange = mapPriceTierToRange(price)
            if (tierRange) filters.price = tierRange
        }
    }

    const rating = searchParams.get("rating")
    if (rating) filters.rating = parseInt(rating, 10)

    const brand = searchParams.get("brand")
    if (brand) filters.brand = brand.split(",")

    const category = searchParams.get("category")
    if (category) filters.category = category

    return filters
}

// Apply filters to a list of products
export function applyFilters(products: ShopifyProduct[], filters: FilterObject): ShopifyProduct[] {
    return products.filter((product) => {
        // Price filter
        if (filters.price) {
            const price = product.price
            if (price < filters.price.min || price > filters.price.max) return false
        }

        // Rating filter
        if (filters.rating !== undefined) {
            if (!product.rating || product.rating < filters.rating) return false
        }

        // Brand filter
        if (filters.brand && filters.brand.length > 0) {
            if (!product.vendor || !filters.brand.includes(product.vendor)) return false
        }

        // Category filter (tags)
        if (filters.category) {
            if (!product.tags.includes(filters.category)) return false
        }

        return true
    })
}


