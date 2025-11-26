"use client";

import { BackButton } from "../components/common";
import CartItemCard from "./components/CartItemCard";
import OrderSummary from "./components/OrderSummary";
import ContinueCheckout from "./components/ContinueCheckout";

import {useCart} from "./CartProvider";

export default function CartPage() {
  const { cart } = useCart();

  return (

    <div className="mt-20 space-y-4 mb-6 flex flex-col items-center">
      <div className="w-full flex justify-start p-2">
        <BackButton />
      </div>

      <h1 className="text-2xl font-semibold">Cart</h1>

      {cart.length > 0 ? (
        cart.map((item) => <CartItemCard key={item.variantId} item={item} />)
      ) : (
        <p>Your cart is empty.</p>
      )}
      {/* Checkout button */}
      
    <OrderSummary/>
    {cart.length > 0 && (
        <ContinueCheckout/>
      )}
    </div>

  );
}
