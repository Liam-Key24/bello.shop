import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface FilterBrandSelectProps {
  isOpen: boolean;
  toggleSection: () => void;
  options?: string[];
}

/**
 * Brand filter section - allows filtering products by brand
 */
export default function FilterBrandSelect({
  isOpen,
  toggleSection,
  options = ['Select', 'Option', 'Option', 'Option', 'Option', 'Option', 'Option'],
}: FilterBrandSelectProps) {
  return (
    <div className="glass rounded-2xl p-4">
      <button
        onClick={toggleSection}
        className="flex justify-between items-center w-full mb-4"
        aria-label={isOpen ? 'Collapse brand filter' : 'Expand brand filter'}
      >
        <h3 className="text-lg font-semibold text-gray-800">Brand</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <select 
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Select brand"
        >
          {options.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}

