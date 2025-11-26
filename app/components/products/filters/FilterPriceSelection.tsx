import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface FilterPriceSelectionProps {
  isOpen: boolean;
  toggleSection: () => void;
}

/**
 * Price filter section - allows filtering products by price range
 */
export default function FilterPriceSelection({ isOpen, toggleSection }: FilterPriceSelectionProps) {
  return (
    <div className="glass rounded-2xl p-4 mb-4">
      <button
        onClick={toggleSection}
        className="flex justify-between items-center w-full mb-4"
        aria-label={isOpen ? 'Collapse price filter' : 'Expand price filter'}
      >
        <h3 className="text-lg font-semibold text-gray-800">Price</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div>
          <div className="bg-gray-700 text-white text-xs px-3 py-1 rounded w-12 mx-auto mb-2">
            ££
          </div>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-white"
            aria-label="Price range slider"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>£</span>
            <span>£££</span>
          </div>
          <div className="text-center mt-3">
            <span className="text-sm text-gray-700">On Offer</span>
          </div>
        </div>
      )}
    </div>
  );
}

