import FilterSectionHeader from "./FilterSectionHeader"
import type { Category } from "./types"

type CategoryFilterProps = {
  categories: Category[]
  isOpen: boolean
  onToggle: () => void
}

export default function CategoryFilter({
  categories,
  isOpen,
  onToggle,
}: CategoryFilterProps) {
  if (categories.length === 0) return null

  return (
    <>
      <div className="mb-4">
        <FilterSectionHeader
          title="Category"
          isOpen={isOpen}
          onToggle={onToggle}
        />

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

