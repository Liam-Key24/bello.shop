"use client";

import { useCartStore, cartActions } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils/product";
import { Button } from "@/app/components/ui/Button";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { Icon } from "@/app/components/ui/Icon";
import { useState } from "react";

export function CartSummary() {
  const items = useCartStore((state) => state.items);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price ?? 0) * (item.quantity || 0),
    0
  );
  const shipping = subtotal >= 30 ? 0 : null; // null = calculated at Shopify checkout
  const total = subtotal;

  const handleCheckout = async () => {
    if (!items.length) return;
    setIsCheckingOut(true);
    try {
      await cartActions.checkout();
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <GlassCard padding="lg" className="space-y-6">
      <h2 className="font-display text-xl font-bold text-charcoal">Order Summary</h2>

      <div className="space-y-4 text-[15px]">
        <div className="flex justify-between">
          <span className="text-mid-gray">
            Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
          <span className="font-semibold text-charcoal">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-mid-gray">Shipping</span>
          <span className="font-semibold text-charcoal">
            {shipping === 0 ? "Free" : "Calculated at checkout"}
          </span>
        </div>
        <div className="flex justify-between pt-4 border-t border-light-gray">
          <span className="font-display text-lg font-bold text-charcoal">Total</span>
          <span className="font-display text-lg font-bold text-charcoal">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      <Button
        variant="primary"
        className="w-full"
        onClick={handleCheckout}
        disabled={isCheckingOut || items.length === 0}
      >
        {isCheckingOut ? "Redirecting…" : "Checkout"}
      </Button>

      <ul className="space-y-3 pt-2">
        <li className="flex items-center gap-3 text-sm text-mid-gray">
          <Icon name="truck" size={18} className="text-brand" />
          Free shipping on orders over £30
        </li>
        <li className="flex items-center gap-3 text-sm text-mid-gray">
          <Icon name="check" size={18} className="text-brand" />
          Secure Shopify checkout
        </li>
      </ul>
    </GlassCard>
  );
}
