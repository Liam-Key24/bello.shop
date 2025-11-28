'use client'

import { ChevronDown } from "lucide-react"
import { useSectionToggle } from '../hooks'
import type { Category } from "./types"

export default function CategoryFilter() {
  const { openSections, toggleSection } = useSectionToggle()
  const isOpen = openSections.category
  const categories: Category[] = []
  
  if (categories.length === 0) return null

  return (
    <>
      <div className="mb-4">
        <button onClick={() => toggleSection('category')} className="filter-section-header  w-full flex items-center justify-between p-3 rounded-full mb-2">
          <h3 className="filter-section-title">Category</h3>
          <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="filter-section-content">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between animate-fadeIn"
                >
                  <span className="text-xs text-gray-700">{cat.label}</span>
                  <label className="relative inline-block w-10 h-5">
                    <input
                      type="checkbox"
                      defaultChecked={cat.checked}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-cyan-400 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-300 peer-checked:bg-cyan-400 transition-all duration-300"></div>
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="filter-section-divider"></div>
    </>
  )
}

