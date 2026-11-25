"use client";

import { useState, useTransition } from "react";
import { cartActions } from "@/lib/store/cart";
import { createCartItem } from "@/lib/shopify/cart";
import { showNotification } from "@/lib/utils/notifications";
import { Button } from "@/app/components/ui/Button";
import { QuantitySelector } from "@/app/components/product/QuantitySelector";

interface ProductBuyButtonsProps {
  variantId: string;
  title: string;
  price: number;
  image?: string;
}

export default function ProductBuyButtons({
  variantId,
  title,
  price,
  image,
}: ProductBuyButtonsProps) {
  const [isPending, startTransition] = useTransition();
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = async () => {
    if (!variantId) {
      showNotification("Product variant not available", "error");
      return;
    }

    try {
      const res = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity }),
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
      const errorMessage =
        error instanceof Error ? error.message : "Failed to start checkout";
      showNotification(
        `Checkout error: ${errorMessage}. Please try again.`,
        "error"
      );
    }
  };

  const handleAddToCart = () => {
    if (!variantId) {
      showNotification("Product variant not available", "error");
      return;
    }

    startTransition(async () => {
      const item = createCartItem(
        { variantId, title, price, image },
        quantity
      );
      await cartActions.addItem(item);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <QuantitySelector value={quantity} onChange={setQuantity} />
      <Button
        variant="primary"
        className="w-full"
        onClick={handleAddToCart}
        disabled={isPending || !variantId}
      >
        {addedToCart ? "Added to Cart" : isPending ? "Adding…" : "Add to Cart"}
      </Button>
      <Button
        variant="glass"
        className="w-full"
        onClick={handleBuyNow}
        disabled={!variantId}
      >
        Buy Now
      </Button>
    </div>
  );
}
