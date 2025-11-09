"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  variantId: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface Checkout {
  id: string;
  webUrl: string;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  checkoutCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
  const saved = localStorage.getItem("cart");
  if (saved) {
    try {
      const parsedCart = JSON.parse(saved);
      console.log("Cart loaded from localStorage:", parsedCart); // Debugging log
      setCart(parsedCart);
    } catch {
      console.error("Failed to parse saved cart");
    }
  }
}, []); 

  useEffect(() => {
    console.log("Cart state updated:", cart); // Debugging log
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const updated = [...prev];
      const existing = updated.find(i => i.variantId === item.variantId);

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        updated.push(item);
      }


    console.log("Updated cart in addToCart:", updated);
      return updated;
    });
  };

  const removeFromCart = (variantId: string) => {
    setCart(prev => prev.filter(i => i.variantId !== variantId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const removeItem = (variantId: string) => {
    setCart(prev => prev.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  };

  const checkoutCart = async () => {
    if (cart.length === 0) {
      console.error("Cart is empty. Cannot proceed to checkout.");
      return;
    }

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();
      if (data?.webUrl) {
        window.location.href = data.webUrl;
      } else {
        console.error("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        removeItem,
        updateQuantity,
        checkoutCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};