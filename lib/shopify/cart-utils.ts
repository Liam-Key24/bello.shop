import { ShopifyCartItem, CartButtonProps } from "./types";

// Shared utility to create a cart item from props
export const createCartItem = ({ variantId, title, price, image }: CartButtonProps, quantity: number = 1): ShopifyCartItem => ({
  variantId,
  title: title || "Untitled product",
  price: Number(price || 0),
  image: image || "/placeholder.svg",
  quantity,
});

// Shared checkout function
export const performCheckout = async (items: ShopifyCartItem[]): Promise<string | null> => {
  if (!items.length) {
    console.warn("Cart is empty");
    return null;
  }

  try {
    const res = await fetch("/api/shopify/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json().catch(() => ({}));
    
    if (res.ok && data.checkoutUrl) {
      return data.checkoutUrl;
    }
    
    console.error("Checkout URL missing:", data);
    return null;
  } catch (err) {
    console.error("Checkout failed:", err);
    return null;
  }
};

