import FilterSectionHeader from "./FilterSectionHeader"

type PriceFilterProps = {
  priceTiers: string[]
  selectedPrice: string | null
  isOpen: boolean
  onToggle: () => void
  onPriceChange: (price: string | null) => void
}

export default function PriceFilter({
  priceTiers,
  selectedPrice,
  isOpen,
  onToggle,
  onPriceChange,
}: PriceFilterProps) {
  return (
    <>
      <div className="mb-4">
        <FilterSectionHeader title="Price" isOpen={isOpen} onToggle={onToggle} />

        {isOpen && (
          <div className="filter-section-content">
            <div className="flex gap-2 flex-wrap">
              {priceTiers.map((tier) => (
                <button
                  key={tier}
                  className={`filter-button px-3 py-1.5 glass rounded-full text-xs font-medium ${
                    selectedPrice === tier
                      ? "bg-gray-800 text-white shadow-lg scale-105"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    onPriceChange(selectedPrice === tier ? null : tier)
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

