"use client";

import { useSyncExternalStore } from "react";
import { performCheckout } from "@/lib/shopify/cart";
import { createCheckoutClient } from "@/lib/shopify/cart-client";
import {
  getStoredCartId,
  persistCartIdFromResponse,
} from "@/lib/shopify/cart-id";
import type { ShopifyCartItem, CartButtonProps, CartItem } from "@/lib/shopify/types";

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
    // Update last activity timestamp (for 30-minute timer)
    localStorage.setItem("cartLastActivity", Date.now().toString());
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

// Convert ShopifyCartItem to CartItem format for API
const convertToCartItems = (items: ShopifyCartItem[]): CartItem[] => {
  return items.map((item) => ({
    variantId: item.variantId,
    quantity: item.quantity,
  }));
};

// Sync a single new item to Shopify Storefront cart (guest or logged-in).
// Persists shopifyCartId via httpOnly cookie + localStorage for return visits.
const syncSingleItemToShopify = async (item: ShopifyCartItem): Promise<void> => {
  try {
    const cartItem = convertToCartItems([item])[0];
    const storedCartId = getStoredCartId();

    const res = await fetch("/api/shopify/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        action: "add",
        cartId: storedCartId || undefined,
        items: [cartItem],
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to sync item to Shopify:", errorData.error || "Unknown error");
      return;
    }

    const data = await res.json().catch(() => ({}));
    persistCartIdFromResponse(data);

    try {
      localStorage.setItem("cartLastShopifySync", Date.now().toString());
    } catch {
      // Ignore
    }

    // Refresh lines from the Storefront cart cookie so remove/update have lineIds.
    const shopifyItems = await loadFromShopify();
    if (shopifyItems.length > 0) {
      const shopifyVariantIds = new Set(shopifyItems.map((i) => i.variantId));
      const localOnlyItems = state.items.filter(
        (i) => !shopifyVariantIds.has(i.variantId)
      );
      state.items = [...shopifyItems, ...localOnlyItems];
      persistStore(state);
      emitChange();
    }
  } catch (error) {
    console.error("Error syncing item to Shopify:", error);
  }
};

// Sync entire cart to Shopify (used for initial sync or fallback)
const syncToShopify = async (items: ShopifyCartItem[]): Promise<void> => {
  try {
    // If cart is empty, don't sync (let Shopify cart persist)
    if (items.length === 0) {
      return;
    }

    // First, get current Shopify cart to see what's already there
    const existingShopifyItems = await loadFromShopify();
    const existingVariantIds = new Set(existingShopifyItems.map(item => item.variantId));

    // Only add items that don't exist in Shopify yet
    const newItems = items.filter(item => !existingVariantIds.has(item.variantId));
    
    if (newItems.length === 0) {
      // All items already exist, just update quantities if needed
      // For now, reload from Shopify to get accurate state
      const shopifyItems = await loadFromShopify();
      if (shopifyItems.length > 0) {
        state.items = shopifyItems;
        persistStore(state);
        emitChange();
      }
      return;
    }

    const cartItems = convertToCartItems(newItems);

    const res = await fetch("/api/shopify/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        action: "add",
        items: cartItems,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to sync cart to Shopify:", errorData.error || "Unknown error");
    } else {
      // Update sync timestamp
      try {
        localStorage.setItem("cartLastShopifySync", Date.now().toString());
      } catch {
        // Ignore
      }
      
      // After successful sync, reload from Shopify to get updated lineIds
      const shopifyItems = await loadFromShopify();
      if (shopifyItems.length > 0) {
        // Merge: Keep local items that aren't in Shopify, update those that are
        const shopifyVariantIds = new Set(shopifyItems.map(item => item.variantId));
        const localOnlyItems = items.filter(item => !shopifyVariantIds.has(item.variantId));
        state.items = [...shopifyItems, ...localOnlyItems];
        persistStore(state);
        emitChange();
      }
    }
  } catch (error) {
    console.error("Error syncing cart to Shopify:", error);
  }
};

// Load cart from Shopify (when logged in)
const loadFromShopify = async (): Promise<ShopifyCartItem[]> => {
  try {
    const res = await fetch("/api/shopify/cart", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      if (res.status === 404 || res.status === 400) {
        // No cart exists yet, return empty
        return [];
      }
      console.error("Failed to load cart from Shopify:", res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    
    // Handle case where cart is null (no cart exists)
    if (!data.cart) {
      return [];
    }
    
    const shopifyCart = data.cart;

    if (!shopifyCart?.lines?.edges || shopifyCart.lines.edges.length === 0) {
      return [];
    }

    // Convert Shopify cart lines to ShopifyCartItem format
    return shopifyCart.lines.edges.map((edge: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title?: string;
          price?: { amount?: string };
          image?: { url?: string };
          product?: {
            title?: string;
            images?: { edges?: Array<{ node?: { url?: string } }> };
          };
        };
        cost?: { totalAmount?: { amount?: string } };
      };
    }) => {
      const node = edge.node;
      const variant = node.merchandise;
      // Price per item (not total)
      const pricePerItem = parseFloat(variant.price?.amount || node.cost?.totalAmount?.amount || "0");
      const quantity = node.quantity;
      // Calculate price per unit (divide total by quantity if needed)
      const unitPrice = node.cost?.totalAmount?.amount 
        ? parseFloat(node.cost.totalAmount.amount) / quantity 
        : pricePerItem;
      
      // Get first image from product images
      const imageUrl = variant.image?.url || 
                      variant.product?.images?.edges?.[0]?.node?.url || 
                      "/placeholder.svg";
      
      return {
        variantId: variant.id,
        title: variant.product?.title || variant.title || "Product",
        price: unitPrice,
        image: imageUrl,
        quantity: quantity,
        lineId: node.id,
      };
    });
  } catch (error) {
    console.error("Error loading cart from Shopify:", error);
    return [];
  }
};

export const cartActions = {
  addItem: async (item: ShopifyCartItem) => {
    const existing = state.items.find((i) => i.variantId === item.variantId);
    if (existing) {
      // Item already exists, update quantity locally
      state.items = state.items.map((i) =>
        i.variantId === item.variantId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
      persistStore(state);
      emitChange();

      // Sync to Shopify cart (persists cart ID for return visits)
      const updatedItem = state.items.find((i) => i.variantId === item.variantId);
      if (updatedItem?.lineId) {
        try {
          const res = await fetch("/api/shopify/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              action: "update",
              cartId: getStoredCartId() || undefined,
              updates: [{ id: updatedItem.lineId, quantity: updatedItem.quantity }],
            }),
          });
          if (!res.ok) {
            await syncSingleItemToShopify(item);
          } else {
            const data = await res.json().catch(() => ({}));
            persistCartIdFromResponse(data);
          }
        } catch (error) {
          console.error("Error updating item in Shopify:", error);
          await syncSingleItemToShopify(item);
        }
      } else {
        await syncSingleItemToShopify(item);
      }
    } else {
      // New item, add to local state then sync to Shopify Storefront cart
      state.items = [...state.items, item];
      persistStore(state);
      emitChange();
      await syncSingleItemToShopify(item);
    }
  },

  removeItem: async (variantId: string) => {
    const itemToRemove = state.items.find((i) => i.variantId === variantId);
    const lineId = itemToRemove?.lineId;
    
    state.items = state.items.filter((i) => i.variantId !== variantId);
    persistStore(state);
    emitChange();
    
    if (lineId) {
      try {
        const res = await fetch("/api/shopify/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            action: "remove",
            lineIds: [lineId],
          }),
        });
        if (!res.ok) {
          await syncToShopify(state.items);
        }
      } catch (error) {
        console.error("Error removing item from Shopify:", error);
        await syncToShopify(state.items);
      }
    } else {
      await syncToShopify(state.items);
    }
  },

  updateQuantity: async (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      await cartActions.removeItem(variantId);
      return;
    }
    
    const itemToUpdate = state.items.find((i) => i.variantId === variantId);
    const lineId = itemToUpdate?.lineId;
    
    state.items = state.items.map((item) =>
      item.variantId === variantId ? { ...item, quantity } : item
    );
    persistStore(state);
    emitChange();
    
    if (lineId) {
      try {
        const res = await fetch("/api/shopify/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            action: "update",
            updates: [{ id: lineId, quantity }],
          }),
        });
        if (!res.ok) {
          await syncToShopify(state.items);
        } else {
          try {
            localStorage.setItem("cartLastShopifySync", Date.now().toString());
          } catch {
            // Ignore
          }
          const shopifyItems = await loadFromShopify();
          if (shopifyItems.length > 0) {
            const shopifyVariantIds = new Set(shopifyItems.map((item) => item.variantId));
            const localOnlyItems = state.items.filter(
              (item) => !shopifyVariantIds.has(item.variantId)
            );
            state.items = [...shopifyItems, ...localOnlyItems];
            persistStore(state);
            emitChange();
          }
        }
      } catch (error) {
        console.error("Error updating item in Shopify:", error);
        await syncToShopify(state.items);
      }
    } else {
      await syncToShopify(state.items);
    }
  },

  clearCart: () => {
    state.items = [];
    persistStore(state);
    emitChange();
    // Note: Don't sync clear to Shopify - let user keep their Shopify cart
  },

  // Load cart from Shopify and merge with localStorage
  loadFromShopify: async () => {
    const shopifyItems = await loadFromShopify();
    if (shopifyItems.length > 0) {
      // Shopify cart takes precedence - replace local cart
      state.items = shopifyItems;
      persistStore(state);
      emitChange();
    }
    // Don't sync local to Shopify here - that should happen on addItem
    // This prevents infinite loops and duplicate syncing
  },

  // Set cart items directly (used when loading)
  setItems: (items: ShopifyCartItem[]) => {
    state.items = items;
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
