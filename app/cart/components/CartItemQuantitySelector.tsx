"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

interface CartItemQuantitySelectorProps {
  qty: number;
  onChange?: (newQty: number) => void;
  disabled?: boolean;
}

export default function CartItemQuantitySelector({
  qty,
  onChange,
  disabled = false,
}: CartItemQuantitySelectorProps) {
  const decrease = () => {
    if (disabled) return;
    onChange?.(qty > 1 ? qty - 1 : 1);
  };

  const increase = () => {
    if (disabled) return;
    onChange?.(qty + 1);
  };

  return (
    <div className="glass w-24 h-fit rounded-4xl flex items-center justify-center p-2">
      <button onClick={decrease} disabled={disabled} className="px-2">
        <ChevronDown className="w-5 h-5 text-gray-700" />
      </button>
      <span className="text-sm px-2">{qty}</span>
      <button onClick={increase} disabled={disabled} className="px-2">
        <ChevronUp className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}
