"use client";

import { useTransition } from "react";
import { ArrowUpRight, ShoppingCartSimple } from "@phosphor-icons/react";
import { useCartStore, cartActions } from "@/lib/store/cart";
import { createCartItem } from "@/lib/shopify/cart";
import type { CartButtonProps } from "@/lib/shopify/types";

export default function ActionButtons({
  variantId,
  title,
  price,
  image,
}: CartButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(() => {
      cartActions.addItem(createCartItem({ variantId, title, price, image }));
    });
  };

  const handleBuyNow = () => {
      startTransition(() => {
      cartActions.buyNow({ variantId, title, price, image });
    });
  };

  return (
    <div className="flex gap-2 w-full">
      <button
        onClick={handleBuyNow}
        disabled={isPending}
        className="glass rounded-4xl w-1/2 h-12 flex flex-col items-center justify-center"
      >
        <span className="text-sm font-medium">Checkout as guest</span>
        <span className="text-xs text-gray-600">No account required</span>
        <ArrowUpRight className="inline-block w-4 h-4 mt-1" />
      </button>

      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className="glass rounded-4xl w-1/2 h-12"
      >
        Add to cart
        <ShoppingCartSimple className="inline-block w-4 h-4 ml-1" />
      </button>
    </div>
  );
}

