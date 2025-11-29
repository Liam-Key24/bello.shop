import { CaretDown } from '@phosphor-icons/react';

/**
 * Quantity selector - dropdown for selecting product quantity
 */
export default function QuantitySelector(){
  return (
    <button 
      className="bg-gray-200 rounded-full px-6 py-3 flex items-center justify-between w-32 mb-4"
      aria-label="Select quantity"
    >
      <span className="text-base">Qty 1</span>
      <CaretDown className="w-5 h-5 text-gray-700" weight="regular" />
    </button>
  );
};

