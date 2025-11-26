import { ChevronDown } from 'lucide-react';

/**
 * Details dropdown - collapsible section for product details
 */
export default function DetailsDropdown(){
  return (
    <button 
      className="bg-gray-200 rounded-full px-6 py-3 flex items-center justify-between w-48 mb-4"
      aria-label="Toggle product details"
    >
      <span className="text-base">Details</span>
      <ChevronDown className="w-5 h-5 text-gray-700" />
    </button>
  );
};

