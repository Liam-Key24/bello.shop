"use client";

import { ShoppingCart } from "lucide-react";

interface CheckOutButtonProps {
  onClick?: () => void;
  href?: string; // optional if you want to use Link instead
}

export default function CheckOutButton({ onClick, href }: CheckOutButtonProps) {
  // Use button if onClick exists, otherwise use Link
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="glass w-full h-16 rounded-4xl flex items-center justify-center gap-7"
      >
        <p className="text-lg font-medium">Continue to Checkout</p>
        <ShoppingCart />
      </button>
    );
  }

  return (
    <a
      href={href}
      className="glass w-full h-16 rounded-4xl flex items-center justify-center gap-7"
    >
      <p className="text-lg font-medium">Continue to Checkout</p>
      <ShoppingCart />
    </a>
  );
}
