"use client";

import { useCart } from "@/lib/contexts";
import { formatPrice } from "@/lib/utils/product";

export default function OrderSummary() {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.price ?? 0) * (item.quantity || 0)),
    0
  );

  return (
    
      <div className="p-6 w-full ">
        <div className="space-y-6">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg">
              Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
            </h2>
            <span className="text-lg font-medium">
              {formatPrice(subtotal)}
            </span>
          </div>

          {/* Shipping (free) */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Shipping cost</h2>
            <span className="text-lg font-medium ">free</span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold ">Total</h2>
            <span className="text-xl font-semibold">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
      </div>
   
  );
}
