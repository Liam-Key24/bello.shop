"use client";

import React from "react";

const handleCheckout = async () => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem("cart");
  if (!stored) {
    alert("Your cart is empty.");
    return;
  }

  let cartItems: any[] = [];
  try {
    cartItems = JSON.parse(stored);
  } catch (err) {
    console.error("Failed to parse cart from localStorage:", err);
    alert("There was a problem with your cart data.");
    return;
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const res = await fetch("/api/create-cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cartItems }),
  });

  const data = await res.json().catch(() => ({}));

  if (res.ok && data.checkoutUrl) {
    window.location.href = data.checkoutUrl;
  } else {
    console.error("create-cart error:", data);
    alert(data?.error || "There was a problem creating your checkout");
  }
};

export default function ContinueCheckout() {
  return (
    <div className="mt-6">
      <button
        onClick={handleCheckout}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Continue to Checkout
      </button>
    </div>
  );
}