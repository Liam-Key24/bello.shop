"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "@phosphor-icons/react";
import { useCartStore } from '@/lib/store/cart';

/**
 * Navigation cart icon - displays cart icon with item count badge
 */
export default function NavCartIcon() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only showing count after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // total quantity of all items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <ShoppingCart className="w-6 h-6 text-gray-700" aria-label="Shopping cart" weight="regular" />

      {mounted && totalItems > 0 && (
        <span 
          className="absolute -top-2 -right-2 bg-red-custom text-white-custom text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
          aria-label={`${totalItems} items in cart`}
        >
          {totalItems}
        </span>
      )}
    </div>
  );
}

