"use client";
import { ShoppingCart } from "lucide-react";
import { performCheckout } from "@/lib/shopify/cart-utils";
import type { ShopifyCartItem } from "@/lib/shopify/types";

const CHECKOUT_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

const handleCheckout = async () => {
  if (typeof window === "undefined") return;

  let cartItems: ShopifyCartItem[] = [];
  try {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart) {
      alert("Your cart is empty.");
      return;
    }
    cartItems = JSON.parse(storedCart);
    if (!Array.isArray(cartItems) || !cartItems.length) {
      alert("Your cart is empty.");
      return;
    }
  } catch (err) {
    console.error("Failed to parse cart:", err);
    localStorage.removeItem("cart");
    alert("There was a problem with your cart data.");
    return;
  }

  const checkoutUrl = await performCheckout(cartItems);
  
  if (checkoutUrl) {
    window.location.href = checkoutUrl;
    // Clear cart after 5 minutes
    setTimeout(() => {
      localStorage.removeItem("cart");
      console.log("Cart cleared from localStorage after 5 minutes");
    }, CHECKOUT_EXPIRY_MS);
  } else {
    alert("There was a problem creating your checkout");
  }
};

export default function ContinueCheckout() {
  return (
    <div className="mt-6">
      <button
        onClick={handleCheckout}
        className="glass w-full h-16 rounded-4xl flex items-center justify-center gap-7"
      >
        <p className="text-lg font-medium">Continue to Checkout</p>
        <ShoppingCart />
      </button>
    </div>
  );
}
