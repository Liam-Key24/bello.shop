"use client";

import Image from "next/image";
import { cartActions } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils/product";
import { QuantitySelector } from "@/app/components/product/QuantitySelector";
import type { ShopifyCartItem } from "@/lib/shopify/types";

export interface CartLineItemProps {
  item: ShopifyCartItem;
}

export function CartLineItem({ item }: CartLineItemProps) {
  return (
    <article className="glass-bg glass-border glass-shadow rounded-md p-5 md:p-6 flex flex-col sm:flex-row gap-5">
      <div className="relative w-full sm:w-28 h-40 sm:h-28 rounded-sm overflow-hidden bg-brand-pale/40 shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="112px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-mid-gray">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <h3 className="font-display text-lg font-bold text-charcoal">
            {item.title}
          </h3>
          <p className="font-display font-bold text-charcoal shrink-0">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <QuantitySelector
          value={item.quantity}
          onChange={(qty) => cartActions.updateQuantity(item.variantId, qty)}
        />

        <button
          type="button"
          onClick={() => cartActions.removeItem(item.variantId)}
          className="self-start text-sm text-mid-gray hover:text-charcoal transition-colors"
        >
          Remove
        </button>
      </div>
    </article>
  );
}
