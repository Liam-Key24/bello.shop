"use client";

import { useSyncExternalStore } from "react";
import { createCartItem, performCheckout } from "@/lib/shopify/cart";
import { createCheckoutClient } from "@/lib/shopify/cart-client";
import type { ShopifyCartItem, CartButtonProps } from "@/lib/shopify/types";

type CartStore = {
  items: ShopifyCartItem[];
};

type Listener = () => void;

let state: CartStore = { items: [] };
const listeners = new Set<Listener>();

const loadStore = (): CartStore => {
  if (typeof window === "undefined") return { items: [] };
  try {
    const saved = localStorage.getItem("cart");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return { items: parsed };
      }
    }
  } catch {
    return { items: [] };
  }
  return { items: [] };
};

const persistStore = (store: CartStore) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cart", JSON.stringify(store.items));
  } catch {
    return;
  }
};

state = loadStore();

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

export const cartActions = {
  addItem: (item: ShopifyCartItem) => {
    const existing = state.items.find((i) => i.variantId === item.variantId);
    if (existing) {
      state.items = state.items.map((i) =>
        i.variantId === item.variantId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      state.items = [...state.items, item];
    }
    persistStore(state);
    emitChange();
  },

  removeItem: (variantId: string) => {
    state.items = state.items.filter((i) => i.variantId !== variantId);
    persistStore(state);
    emitChange();
  },

  updateQuantity: (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      cartActions.removeItem(variantId);
      return;
    }
    state.items = state.items.map((item) =>
      item.variantId === variantId ? { ...item, quantity } : item
    );
    persistStore(state);
    emitChange();
  },

  clearCart: () => {
    state.items = [];
    persistStore(state);
    emitChange();
  },

  checkout: async () => {
    const checkoutUrl = await performCheckout(state.items);
    if (checkoutUrl) window.location.href = checkoutUrl;
  },

  buyNow: async (props: CartButtonProps, quantity: number = 1) => {
    try {
      const checkoutSession = await createCheckoutClient(props.variantId, quantity);
      if (checkoutSession.webUrl) {
        window.location.href = checkoutSession.webUrl;
      }
    } catch {
      return;
    }
  },
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state)
  );
};

export const getCartState = (): CartStore => state;
