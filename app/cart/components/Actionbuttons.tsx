"use client";

import { useTransition } from "react";
import { ArrowUpRightIcon, ShoppingCartSimpleIcon } from "@phosphor-icons/react";
import { useCart } from "@/lib/contexts";
import { createCartItem } from "@/lib/shopify/cart-utils";
import type { CartButtonProps } from "@/lib/shopify/types";

export default function ActionButtons({ variantId, title, price, image }: CartButtonProps) {
  const { addItem, buyNow } = useCart();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(() => {
      addItem(createCartItem({ variantId, title, price, image }));
    });
  };

  const handleBuyNow = () => {
    startTransition(() => {
      buyNow(createCartItem({ variantId, title, price, image }));
    });
  };

  return (
    <div className="flex gap-2 w-full">
      <button
        onClick={handleBuyNow}
        disabled={isPending}
        className="glass rounded-4xl w-1/2 h-12"
      >
        Buy now
        <ArrowUpRightIcon className="inline-block w-4 h-4 ml-1" />
      </button>

      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className="glass rounded-4xl w-1/2 h-12"
      >
        Add to cart
        <ShoppingCartSimpleIcon className="inline-block w-4 h-4 ml-1" />
      </button>
    </div>
  );
}
