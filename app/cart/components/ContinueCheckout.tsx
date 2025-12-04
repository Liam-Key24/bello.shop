"use client";
import { ShoppingCart } from "@phosphor-icons/react";
import { useCartStore, cartActions } from "@/lib/store/cart";

export default function ContinueCheckout() {
  const cart = useCartStore((state) => state.items);

  const handleCheckout = async () => {
    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    await cartActions.checkout();
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
