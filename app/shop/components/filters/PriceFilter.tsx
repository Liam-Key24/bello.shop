'use client'

import { CaretDown } from "@phosphor-icons/react"
import { useFilterState, useSectionToggle } from '@/lib/hooks/shop'
import { getPriceTierLabels } from '@/lib/config/price-tiers'

export default function PriceFilter() {
  const { selectedPrice, updateFilter } = useFilterState()
  const { openSections, toggleSection } = useSectionToggle()
  const isOpen = openSections.price
  const priceTiers = getPriceTierLabels()
  return (
    <>
      <div className="mb-4">
        <button onClick={() => toggleSection('price')} className="filter-section-header  w-full flex items-center justify-between p-3 rounded-full mb-2">
          <h3 className="filter-section-title">Price</h3>
          <CaretDown size={18} weight="regular" className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="filter-section-content">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {priceTiers.map((tier) => (
                <button
                  key={tier}
                  className={`filter-button cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium ${
                    selectedPrice === tier
                      ? " text-black-custom bg-green-primary"
                      : "text-gray-700 "
                  }`}
                  onClick={() =>
                    updateFilter('price', selectedPrice === tier ? null : tier)
                  }
                >
                  {tier}
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

