"use client";

import { useTransition, useState, useEffect, useRef } from "react";
import { cartActions } from "@/lib/store/cart";
import { createCartItem } from "@/lib/shopify/cart";
import { showNotification } from "@/lib/utils/notifications";

interface ProductActionsProps {
  variantId: string;
  title: string;
  price: number;
  image?: string;
}

export default function ProductActions({
  variantId,
  title,
  price,
  image,
}: ProductActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [addedToCart, setAddedToCart] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleBuyNow = async () => {
    if (!variantId) {
      showNotification("Product variant not available", "error");
      return;
    }

    try {
      const res = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity: 1 }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.checkout?.webUrl) {
        window.location.href = data.checkout.webUrl;
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("Failed to create checkout: No checkout URL received");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to start checkout";
      showNotification(`Checkout error: ${errorMessage}. Please try again.`, "error");
    }
  };

  const handleAddToCart = () => {
    if (!variantId) {
      showNotification("Product variant not available", "error");
      return;
    }

    startTransition(() => {
      const item = createCartItem({ variantId, title, price, image });
      cartActions.addItem(item);
      setAddedToCart(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setAddedToCart(false);
        timeoutRef.current = null;
      }, 2000);
    });
  };

  return (
    <div className="flex gap-2 w-full">
      {/* Checkout as Guest */}
      <button
        onClick={handleBuyNow}
        disabled={isPending || !variantId}
        className="glass rounded-4xl w-1/2 h-12 flex flex-col items-center justify-center hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-sm font-medium">Checkout as guest</span>
        <span className="text-xs text-gray-600">No account required</span>
      </button>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={isPending || !variantId}
        className="glass rounded-4xl w-1/2 h-12 flex items-center justify-center hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-sm font-medium">
          {isPending ? "Adding..." : addedToCart ? "Added!" : "Add to cart"}
        </span>
      </button>
    </div>
  );
}
