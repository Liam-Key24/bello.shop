import { ChevronUp, ChevronDown } from 'lucide-react';

interface FilterCategorySectionProps {
  title: string;
  categories: { id: string | number; label: string; checked: boolean }[];
  open: boolean;
  toggleSection: () => void;
}

export default function FilterCategorySection({
  title,
  categories,
  open,
  toggleSection,
}: FilterCategorySectionProps) {
  return (
    <div className="glass rounded-2xl p-4 mb-4">
      <button
        onClick={toggleSection}
        className="flex justify-between items-center w-full mb-4"
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {open && (
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{cat.label}</span>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" defaultChecked={cat.checked} className="sr-only peer" />
                <div className="w-12 h-6 glass rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-300 peer-checked:bg-[#8e968e] transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
