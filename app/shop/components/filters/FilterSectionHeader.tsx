import { ChevronDown } from "lucide-react"

type FilterSectionHeaderProps = {
  title: string
  isOpen: boolean
  onToggle: () => void
}

export default function FilterSectionHeader({
  title,
  isOpen,
  onToggle,
}: FilterSectionHeaderProps) {
  return (
    <button onClick={onToggle} className="filter-section-header">
      <h3 className="filter-section-title">{title}</h3>
      <ChevronDown
        size={18}
        className={`filter-chevron transition-transform duration-300 ${
          isOpen ? "filter-chevron-open" : ""
        }`}
      />
    </button>
  )
}

