import { ChevronDown, Grid3x3, List } from "lucide-react";

interface FiltersBarProps {
  viewMode: "grid" | "list";
  onViewChange: (mode: "grid" | "list") => void;
  onFiltersToggle: () => void;
}

export default function FiltersBar({ viewMode, onViewChange, onFiltersToggle }: FiltersBarProps) {
  return (
    <div className="glass h-10 rounded-full px-5 flex items-center justify-between mb-6">
      <button
        className="flex items-center gap-1"
        onClick={onFiltersToggle}
      >
        <span className="text-lg">Filters</span>
        <ChevronDown size={16} />
      </button>

      <div className="flex items-center space-x-2">
        <button
          aria-label="Grid view"
          onClick={() => onViewChange("grid")}
          className={`rounded-lg p-1 ${viewMode === "grid" ? "bg-gray-200" : ""}`}
        >
          <Grid3x3 className="w-5 h-5 text-gray-700" />
        </button>
        <button
          aria-label="List view"
          onClick={() => onViewChange("list")}
          className={`rounded-lg p-1 ${viewMode === "list" ? "bg-gray-200" : ""}`}
        >
          <List className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
