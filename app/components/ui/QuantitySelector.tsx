import { ChevronDown } from 'lucide-react';


export default function QuantitySelector(){

  return (
    <button className="bg-gray-200 rounded-full px-6 py-3 flex items-center justify-between w-32 mb-4">
      <span className="text-base">Qty 1</span>
      <ChevronDown className="w-5 h-5 text-gray-700" />
    </button>
  );
};