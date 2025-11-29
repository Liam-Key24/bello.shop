"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createCheckout } from "@/lib/shopify/cart";
import { performCheckout } from "@/lib/shopify/cart-utils";
import { useAuth } from "@/lib/contexts/AuthContext";
import type { ShopifyCartItem, CartContextValue } from "@/lib/shopify/types";

// Create context
export const CartContext = createContext<CartContextValue | undefined>(undefined);

// Convert Shopify cart to local cart format
const shopifyCartToLocal = (shopifyCart: any): ShopifyCartItem[] => {
  if (!shopifyCart?.lines?.edges) return [];
  
  return shopifyCart.lines.edges.map((edge: any) => {
    const node = edge.node;
    const variant = node.merchandise;
    const image = variant.product?.images?.edges?.[0]?.node;
    
    return {
      variantId: variant.id,
      title: variant.product?.title || variant.title || "Product",
      price: parseFloat(variant.price?.amount || "0"),
      image: image?.url,
      quantity: node.quantity,
      lineId: node.id, // Store line ID for updates
    };
  });
};

// Convert local cart to Shopify cart items format
const localCartToShopifyItems = (cart: ShopifyCartItem[]) => {
  return cart.map(item => ({
    variantId: item.variantId,
    quantity: item.quantity,
  }));
};

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCartItem[]>([]);
  const [shopifyCartId, setShopifyCartId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load cart from localStorage (for non-authenticated users)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isAuthenticated) return; // Don't load from localStorage if authenticated
    
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage:", err);
      localStorage.removeItem("cart");
    }
  }, [isAuthenticated]);

  // Load Shopify cart when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    async function loadShopifyCart() {
      try {
        setIsSyncing(true);
        
        // Get local cart from localStorage before loading Shopify cart (for merging)
        let localCart: ShopifyCartItem[] = [];
        try {
          const saved = localStorage.getItem("cart");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) localCart = parsed;
          }
        } catch (err) {
          console.error("Failed to load local cart:", err);
        }

        const res = await fetch("/api/shopify/cart-manager");
        const data = await res.json();

        if (data.cart) {
          setShopifyCartId(data.cart.id);
          const shopifyCart = shopifyCartToLocal(data.cart);
          
          // Merge local cart with Shopify cart
          if (localCart.length > 0) {
            const merged = [...shopifyCart];
            localCart.forEach((localItem) => {
              const existing = merged.find(item => item.variantId === localItem.variantId);
              if (existing) {
                existing.quantity += localItem.quantity;
              } else {
                merged.push(localItem);
              }
            });
            setCart(merged);
            // Clear localStorage after merge
            localStorage.removeItem("cart");
            // Sync merged cart to Shopify (await to prevent race conditions)
            await syncToShopify(merged);
          } else {
            setCart(shopifyCart);
          }
        } else {
          // No cart exists, create one with local cart items if any
          const itemsToCreate = localCart.length > 0 ? localCartToShopifyItems(localCart) : [];
          const createRes = await fetch("/api/shopify/cart-manager", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "create", items: itemsToCreate }),
          });
          const createData = await createRes.json();
          if (createData.cart) {
            setShopifyCartId(createData.cart.id);
            setCart(shopifyCartToLocal(createData.cart));
            // Clear localStorage after creating Shopify cart
            if (localCart.length > 0) {
              localStorage.removeItem("cart");
            }
          }
        }
      } catch (err) {
        console.error("Failed to load Shopify cart:", err);
      } finally {
        setIsSyncing(false);
      }
    }

    loadShopifyCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Sync cart to Shopify when authenticated
  const syncToShopify = useCallback(async (newCart: ShopifyCartItem[]) => {
    if (!isAuthenticated) return;

    try {
      setIsSyncing(true);
      
      if (!shopifyCartId) {
        // Create new cart
        const res = await fetch("/api/shopify/cart-manager", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "create",
            items: localCartToShopifyItems(newCart),
          }),
        });
        const data = await res.json();
        if (data.cart) {
          setShopifyCartId(data.cart.id);
        }
      } else if (newCart.length === 0) {
        // Clear cart by removing all lines
        const currentRes = await fetch("/api/shopify/cart-manager");
        const currentData = await currentRes.json();
        if (currentData.cart?.lines?.edges?.length > 0) {
          const lineIds = currentData.cart.lines.edges.map((e: any) => e.node.id);
          await fetch("/api/shopify/cart-manager", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "remove",
              cartId: shopifyCartId,
              lineIds,
            }),
          });
        }
      } else {
        // Update cart - for simplicity, we'll replace all lines
        // Get current cart to get line IDs
        const currentRes = await fetch("/api/shopify/cart-manager");
        const currentData = await currentRes.json();
        
        if (currentData.cart?.lines?.edges?.length > 0) {
          // Remove all existing lines
          const lineIds = currentData.cart.lines.edges.map((e: any) => e.node.id);
          await fetch("/api/shopify/cart-manager", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "remove",
              cartId: shopifyCartId,
              lineIds,
            }),
          });
        }
        
        // Add new items
        if (newCart.length > 0) {
          await fetch("/api/shopify/cart-manager", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "add",
              cartId: shopifyCartId,
              items: localCartToShopifyItems(newCart),
            }),
          });
        }
      }
    } catch (err) {
      console.error("Failed to sync cart to Shopify:", err);
    } finally {
      setIsSyncing(false);
    }
  }, [isAuthenticated, shopifyCartId]);

  // Persist cart to localStorage (for non-authenticated users)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isAuthenticated) {
      // Sync to Shopify instead
      syncToShopify(cart);
      return;
    }
    
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [cart, isAuthenticated, syncToShopify]);

  // Add item to cart
  const addItem = (item: ShopifyCartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.variantId === item.variantId);
      const updated = existing
        ? prev.map(i =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prev, item];
      return updated;
    });
  };

  // Remove item from cart
  const removeItem = (variantId: string) => {
    setCart(prev => {
      const updated = prev.filter(i => i.variantId !== variantId);
      return updated;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    if (typeof window !== "undefined" && !isAuthenticated) {
      localStorage.removeItem("cart");
    }
  };

  // Update quantity
  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  };

  // Checkout entire cart
  const checkout = async () => {
    const checkoutUrl = await performCheckout(cart);
    if (checkoutUrl) window.location.href = checkoutUrl;
  };

  // Buy now (single item)
  const buyNow = async (item: ShopifyCartItem) => {
    try {
      const checkoutSession = await createCheckout(item.variantId, item.quantity);
      if (checkoutSession.webUrl) window.location.href = checkoutSession.webUrl;
      else console.error("Buy Now failed: no URL returned");
    } catch (err) {
      console.error("Buy Now failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clearCart, updateQuantity, checkout, buyNow }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

