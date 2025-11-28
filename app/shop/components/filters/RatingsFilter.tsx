'use client'

import { ChevronDown } from "lucide-react"
import { useFilterState } from '../hooks'
import { useSectionToggle } from '../hooks'
import { DEFAULT_RATINGS } from './types'

export default function RatingsFilter() {
  const { selectedRating, updateFilter } = useFilterState()
  const { openSections, toggleSection } = useSectionToggle()
  const isOpen = openSections.ratings
  const ratings = [...DEFAULT_RATINGS]
  return (
    <>
      <div className="mb-4">
        <button onClick={() => toggleSection('ratings')} className="filter-section-header  w-full flex items-center justify-between p-3 rounded-full mb-2">
          <h3 className="filter-section-title">Ratings</h3>
          <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="filter-section-content">
            <div className="flex gap-1.5 justify-center">
              {ratings.map((star) => (
                <button
                  key={star}
                  className={`filter-button text-2xl transition-all duration-200 ${
                    selectedRating === star
                      ? "text-yellow-400 scale-110"
                      : "text-yellow-400 hover:text-yellow-400 hover:scale-110"
                  }`}
                  onClick={() => {
                    const newValue = selectedRating === star ? null : star.toString()
                    updateFilter('rating', newValue)
                  }}
                >
                  {selectedRating && selectedRating >= star ? "★" : "☆"}
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

