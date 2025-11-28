'use client'

import { useState } from 'react'
import {
  FilterBar,
  CategoryFilter,
  PriceFilter,
  RatingsFilter,
  BrandFilter,
} from '.'

export default function FilterMenu() {
  const [isMainOpen, setIsMainOpen] = useState(false)

  return (
    <FilterBar
      isOpen={isMainOpen}
      onToggle={() => setIsMainOpen(!isMainOpen)}
      variant="main"
    >
      <CategoryFilter />
      <PriceFilter />
      <RatingsFilter />
      <BrandFilter />
    </FilterBar>
  )
}