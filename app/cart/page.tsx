"use client";

import BackButton from "@/app/components/common/navigation/BackButton";
import CartItemCard from "./components/CartItemCard";
import OrderSummary from "./components/OrderSummary";
import ContinueCheckout from "./components/ContinueCheckout";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { ArrowRight } from "@phosphor-icons/react";

export default function CartPage() {
  const cart = useCartStore((state) => state.items);

  return (

    <div className="mt-20 space-y-4 mb-6 flex flex-col items-center neumorphism-bg pb-20">
      <div className="w-full flex justify-start p-2">
        <BackButton useIcon />
      </div>

      <h1 className="text-2xl font-semibold">Cart</h1>

      {cart.length > 0 ? (
        <>
          {cart.map((item) => <CartItemCard key={item.variantId} item={item} />)}
          <OrderSummary/>
          <ContinueCheckout/>
        </>
      ) : (
        <>
        <p>Your cart is empty.</p>
        <Link href="/shop" className="underline flex items-center gap-2">
          <span>
          Continue Shopping!
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link> 
        </>
      )}
    </div>

  );
}
