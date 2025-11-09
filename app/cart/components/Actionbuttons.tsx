"use client";

import { useCartContext } from "../CartProvider";
import { useTransition } from "react";
import { createCheckout } from "../../../lib/shopify"; // if you use it for buy now
import {ArrowUpRightIcon, ShoppingCartSimpleIcon } from "@phosphor-icons/react";
interface ActionButtonsProps {
  variantId: string;
  title: string;
  price: number;
  image?: string;
}

export default function ActionButtons({ variantId, title, price, image }: ActionButtonsProps) {
  const { addToCart } = useCartContext();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(() => {
      try {
        const item = {
          variantId,
          title: title || "Untitled product",
          price: Number(price ?? 0),
          image: image || "/placeholder.svg",
          quantity: 1,
        };
        console.log("Adding to cart:", item);
        addToCart(item);
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    });
  };

  const handleBuyNow = () => {
    startTransition(async () => {
      try {
        const checkout = await createCheckout(variantId, 1);
        if (checkout?.webUrl) {
          window.location.href = checkout.webUrl;
        }
      } catch (err) {
        console.error("Buy Now failed:", err);
      }
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
        <span>
          <ArrowUpRightIcon className="inline-block w-4 h-4" />
        </span>
      </button>
      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className="glass rounded-4xl w-1/2 h-12"
      >
        Add to cart
        <span>
          <ShoppingCartSimpleIcon className="inline-block w-4 h-4 ml-1" />
        </span>
      </button>

    </div>
  );
}
