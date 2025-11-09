import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface BrandSectionProps {
  isOpen: boolean;
  toggleSection: () => void;
  options?: string[]; // optional, defaults to some placeholders
}

const BrandSection: React.FC<BrandSectionProps> = ({
  isOpen,
  toggleSection,
  options = ['Select', 'Option', 'Option', 'Option', 'Option', 'Option', 'Option'],
}) => {
  return (
    <div className="glass rounded-2xl p-4">
      <button
        onClick={toggleSection}
        className="flex justify-between items-center w-full mb-4"
      >
        <h3 className="text-lg font-semibold text-gray-800">Brand</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400">
          {options.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default BrandSection;
