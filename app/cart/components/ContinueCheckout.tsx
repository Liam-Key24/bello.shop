"use client";
import { ShoppingCart } from "@phosphor-icons/react";
import { useCart } from "@/lib/contexts";

export default function ContinueCheckout() {
  const { cart, checkout } = useCart();

  const handleCheckout = async () => {
    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    await checkout();
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleCheckout}
        className="epic-button w-full h-16 rounded-4xl flex items-center justify-center gap-7"
        aria-label="Continue to checkout"
      >
        <p className="text-lg font-medium">Continue to Checkout</p>
        <ShoppingCart weight="regular" />
      </button>
    </div>
  );
}
