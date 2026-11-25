"use client";

import { Icon } from "@/app/components/ui/Icon";

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-5">
      <span className="text-[15px] font-semibold text-charcoal">Quantity</span>
      <div className="flex items-center gap-4 bg-white border border-light-gray rounded-sm px-5 py-2">
        <button
          type="button"
          aria-label="Decrease quantity"
          className="p-1 text-mid-gray hover:text-brand-deep transition-colors"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Icon name="minus" size={16} />
        </button>
        <span className="min-w-8 text-center font-bold text-charcoal">{value}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          className="p-1 text-mid-gray hover:text-brand-deep transition-colors"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          <Icon name="plus" size={16} />
        </button>
      </div>
    </div>
  );
}
