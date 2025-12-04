"use client";

import Image from "next/image";
import {useTransition } from "react";
import CartItemQuantitySelector from "./CartItemQuantitySelector";
import { cartActions } from "@/lib/store/cart";
import { ShopifyCartItem } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils/product";

interface CartItemCardProps {
  item: ShopifyCartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(() => cartActions.removeItem(item.variantId));
  };

  const handleQuantityChange = (newQty: number) => {
    startTransition(() => cartActions.updateQuantity(item.variantId, newQty));
  };

  return (
    <div className="w-[90%] h-44 rounded-4xl flex items-center justify-between px-3 mx-1">
      {/* Product image */}
      <div className="w-40 h-40 bg-amber-400 rounded-4xl overflow-hidden">
        {item.image ? (
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title || "Product image"}
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Product info */}
      <div className="w-full flex flex-col justify-center px-5 gap-2">
        <h2 className="text-lg font-medium">{item.title}</h2>
        <p className="text-gray-600">{formatPrice(item.price * item.quantity)}</p>

        <div className="w-full flex items-center justify-between">
          <button
            onClick={handleRemove}
            disabled={isPending}
            className="text-xs underline disabled:opacity-50"
          >
            Remove
          </button>

          <CartItemQuantitySelector
            qty={item.quantity}
            onChange={handleQuantityChange}
            disabled={isPending}
          />
        </div>
      </div>
    </div>
  );
}
