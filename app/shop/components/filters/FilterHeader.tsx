import { ChevronDown } from "lucide-react"

export default function FilterHeader() {
  return (
    <div className="filter-header glass">
      <div className="flex items-center gap-1">
        <span className="text-base">Filters</span>
        <ChevronDown size={14} className="filter-chevron" />
      </div>
    </div>
  )
}

