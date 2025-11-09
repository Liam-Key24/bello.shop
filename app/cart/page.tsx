"use client";

import BackButton from "../components/ui/BackButton";
import CartItemCard from "./components/CartItemCard";
import CheckOutButton from "../components/ui/CheckOutButton";
import { useCartContext } from "./CartProvider";
import OrderSummary from "./components/OrderSummary";
import ContinueCheckout from "./components/ContinueCheckout";

export default function CartPage() {
  const { cart, checkoutCart } = useCartContext();

  console.log("Cart state in CartPage:", cart);
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
      {cart.length > 0 && (
        <CheckOutButton onClick={checkoutCart} />
      )}
    <OrderSummary/>
    <ContinueCheckout/> 
    </div>

  );
}
