import FilterSectionHeader from "./FilterSectionHeader"

type RatingsFilterProps = {
  ratings: number[]
  selectedRating: number | null
  isOpen: boolean
  onToggle: () => void
  onRatingChange: (rating: number | null) => void
}

export default function RatingsFilter({
  ratings,
  selectedRating,
  isOpen,
  onToggle,
  onRatingChange,
}: RatingsFilterProps) {
  return (
    <>
      <div className="mb-4">
        <FilterSectionHeader
          title="Ratings"
          isOpen={isOpen}
          onToggle={onToggle}
        />

        {isOpen && (
          <div className="filter-section-content">
            <div className="flex gap-1.5 justify-center">
              {ratings.map((star) => (
                <button
                  key={star}
                  className={`filter-button text-2xl transition-all duration-200 ${
                    selectedRating === star
                      ? "text-yellow-400 scale-110"
                      : "text-gray-400 hover:text-yellow-400 hover:scale-110"
                  }`}
                  onClick={() =>
                    onRatingChange(selectedRating === star ? null : star)
                  }
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

