"use client";

import { useCart } from "../CartProvider";
import { createCartItem } from "@/lib/shopify/cart-utils";
import type { CartButtonProps } from "@/lib/shopify/types";

export default function AddtoCartButton({ variantId, title, price, image }: CartButtonProps) {
  const { addItem } = useCart();

  const handleAdd = () => {
    const item = createCartItem({ variantId, title, price, image });
    addItem(item);
    alert(`${title || "Product"} added to cart!`);
  };

  return (
    <button
      onClick={handleAdd}
      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
    >
      Add to Cart
    </button>
  );
}
