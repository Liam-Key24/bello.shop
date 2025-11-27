'use client'

import { useFilterState, useSectionToggle } from './hooks'
import {
  FilterHeader,
  CategoryFilter,
  PriceFilter,
  RatingsFilter,
  BrandFilter,
  DEFAULT_RATINGS,
  type Category,
} from './filters'
import { getPriceTierLabels } from '@/lib/config/price-tiers'

type FilterMenuProps = {
  priceTiers?: string[]
  ratings?: number[]
  brands?: string[]
  categories?: Category[]
}

export default function FilterMenu({
  priceTiers = getPriceTierLabels(),
  ratings = [...DEFAULT_RATINGS],
  brands = [],
  categories = [],
}: FilterMenuProps) {
  const { selectedPrice, selectedRating, selectedBrand, updateFilter } =
    useFilterState()
  const { openSections, toggleSection } = useSectionToggle()

  return (
    <div className="filter-container">
      <FilterHeader />

      <CategoryFilter
        categories={categories}
        isOpen={openSections.category}
        onToggle={() => toggleSection('category')}
      />

      <PriceFilter
        priceTiers={priceTiers}
        selectedPrice={selectedPrice}
        isOpen={openSections.price}
        onToggle={() => toggleSection('price')}
        onPriceChange={(price) => updateFilter('price', price)}
      />

      <RatingsFilter
        ratings={ratings}
        selectedRating={selectedRating}
        isOpen={openSections.ratings}
        onToggle={() => toggleSection('ratings')}
        onRatingChange={(rating) =>
          updateFilter('rating', rating ? rating.toString() : null)
        }
      />

      <BrandFilter
        brands={brands}
        selectedBrand={selectedBrand}
        isOpen={openSections.brand}
        onToggle={() => toggleSection('brand')}
        onBrandChange={(brand) => updateFilter('brand', brand)}
      />
    </div>
  )
}
