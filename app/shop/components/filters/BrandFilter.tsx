import FilterSectionHeader from "./FilterSectionHeader"

type BrandFilterProps = {
  brands: string[]
  selectedBrand: string | null
  isOpen: boolean
  onToggle: () => void
  onBrandChange: (brand: string | null) => void
}

export default function BrandFilter({
  brands,
  selectedBrand,
  isOpen,
  onToggle,
  onBrandChange,
}: BrandFilterProps) {
  if (brands.length === 0) return null

  return (
    <>
      <div className="mb-4">
        <FilterSectionHeader title="Brand" isOpen={isOpen} onToggle={onToggle} />

        {isOpen && (
          <div className="filter-section-content">
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  className={`filter-button px-3 py-1.5 glass rounded-full text-xs font-medium ${
                    selectedBrand === brand
                      ? "bg-gray-800 text-white shadow-lg scale-105"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    onBrandChange(selectedBrand === brand ? null : brand)
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

