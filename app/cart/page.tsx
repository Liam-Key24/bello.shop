"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { CartLineItem } from "@/app/components/cart/CartLineItem";
import { CartSummary } from "@/app/components/cart/CartSummary";
import { EmptyCart } from "@/app/components/cart/EmptyCart";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  return (
    <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-24">
      <Link
        href="/shop"
        className="inline-flex text-sm text-mid-gray hover:text-charcoal mb-8 transition-colors"
      >
        ← Continue shopping
      </Link>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <h1 className="mb-10">Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
            <div className="lg:col-span-2 space-y-5">
              {items.map((item) => (
                <CartLineItem key={item.variantId} item={item} />
              ))}
            </div>
            <div>
              <CartSummary />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
