'use client'

import { useState, useEffect, useMemo } from 'react'
import { ChevronDown } from "lucide-react"
import { useFilterState } from '../hooks'
import { useSectionToggle } from '../hooks'
import { getAllProductsSimple } from '@/lib/shopify/products'
import { mapShopifyToProductItem } from '@/lib/shopify/filter'
import type { ProductItem } from '@/lib/shopify/types'

export default function BrandFilter() {
  const { selectedBrand, updateFilter } = useFilterState()
  const { openSections, toggleSection } = useSectionToggle()
  const isOpen = openSections.brand
  const [products, setProducts] = useState<ProductItem[]>([])
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProductsSimple(50)
        const productItems = mapShopifyToProductItem(data)
        setProducts(productItems)
      } catch (error) {
        console.error('Failed to fetch products for brands:', error)
      }
    }
    fetchProducts()
  }, [])
  
  const brands = useMemo(() => {
    return [...new Set(products.map(p => p.vendor).filter((v): v is string => Boolean(v)))]
  }, [products])
  
  if (brands.length === 0) return null

  return (
    <>
      <div className="mb-4">
        <button onClick={() => toggleSection('brand')} className="filter-section-header  w-full flex items-center justify-between p-3 rounded-full mb-2">
          <h3 className="filter-section-title">Brand</h3>
          <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="filter-section-content">
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  className={`filter-button cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium ${
                    selectedBrand === brand
                      ? "bg-green-primary text-black-custom"
                      : "text-gray-700 hover:bg-green-primary"
                  }`}
                  onClick={() =>
                    updateFilter('brand', selectedBrand === brand ? null : brand)
                  }
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="filter-section-divider"></div>
    </>
  )
}

