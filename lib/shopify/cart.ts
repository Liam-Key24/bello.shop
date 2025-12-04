import { shopifyFetch } from "./helper";
import type { ShopifyCheckout, CartItem, CartButtonProps, ShopifyCartItem } from "./types";

// Normalize variant ID to Shopify GID format
const normalizeVariantId = (variantId: string): string => {
  if (!variantId || typeof variantId !== "string") {
    throw new Error("Invalid variant ID");
  }
  if (variantId.startsWith("gid://shopify/ProductVariant/")) {
    return variantId;
  }
  const match = variantId.match(/(\d+)$/);
  if (!match) {
    throw new Error(`Invalid variant ID format: ${variantId}`);
  }
  return `gid://shopify/ProductVariant/${match[1]}`;
};

// Shared error handler
const handleShopifyErrors = (errors: { message: string }[] | undefined): void => {
  if (errors?.length) {
    throw new Error(errors.map(e => e.message).join("; "));
  }
};

// Cart item creation utility
export const createCartItem = (
  { variantId, title, price, image }: CartButtonProps,
  quantity: number = 1
): ShopifyCartItem => ({
  variantId,
  title: title || "Untitled product",
  price: Number(price || 0),
  image: image || "/placeholder.svg",
      quantity,
});

// Shopify Cart interface
export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: {
            title: string;
            images: {
              edges: Array<{
                node: {
                  url: string;
                  altText?: string;
                };
              }>;
            };
          };
          price: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

/**
 * Create a new Shopify cart
 */
export async function createShopifyCart(items: CartItem[] = []): Promise<ShopifyCart> {
  const lines = items.map(({ variantId, quantity = 1 }) => ({
    merchandiseId: normalizeVariantId(variantId),
    quantity: Math.max(1, Math.min(999, quantity)),
  }));

  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 250) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          message
          field
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCart | null;
      userErrors: { message: string; field?: string[] }[];
    };
  }>(mutation, {
    input: lines.length > 0 ? { lines } : {},
  });

  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors.map(e => e.message).join("; "));
  }

  if (!data.cartCreate.cart) {
    throw new Error("Failed to create cart");
  }

  return data.cartCreate.cart;
}

/**
 * Get cart by ID
 */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    query getCart($id: ID!) {
      cart(id: $id) {
        id
        checkoutUrl
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>(query, { id: cartId });
    return data.cart;
  } catch {
    return null;
  }
}

/**
 * Add lines to cart
 */
export async function cartLinesAdd(cartId: string, items: CartItem[]): Promise<ShopifyCart> {
  const lines = items.map(({ variantId, quantity = 1 }) => ({
    merchandiseId: normalizeVariantId(variantId),
    quantity: Math.max(1, Math.min(999, quantity)),
  }));

  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 250) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          message
          field
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: ShopifyCart | null;
      userErrors: { message: string; field?: string[] }[];
    };
  }>(mutation, { cartId, lines });

  if (data.cartLinesAdd.userErrors?.length) {
    throw new Error(data.cartLinesAdd.userErrors.map(e => e.message).join("; "));
  }

  if (!data.cartLinesAdd.cart) {
    throw new Error("Failed to add lines to cart");
  }

  return data.cartLinesAdd.cart;
}

/**
 * Update cart line quantities
 */
export async function cartLinesUpdate(
  cartId: string,
  updates: Array<{ id: string; quantity: number }>
): Promise<ShopifyCart> {
  const lines = updates.map(({ id, quantity }) => ({
    id,
    quantity: Math.max(0, Math.min(999, quantity)),
  }));

  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 250) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          message
          field
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: ShopifyCart | null;
      userErrors: { message: string; field?: string[] }[];
    };
  }>(mutation, { cartId, lines });

  if (data.cartLinesUpdate.userErrors?.length) {
    throw new Error(data.cartLinesUpdate.userErrors.map(e => e.message).join("; "));
  }

  if (!data.cartLinesUpdate.cart) {
    throw new Error("Failed to update cart lines");
  }

  return data.cartLinesUpdate.cart;
}

/**
 * Remove lines from cart
 */
export async function cartLinesRemove(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 250) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          message
          field
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: ShopifyCart | null;
      userErrors: { message: string; field?: string[] }[];
    };
  }>(mutation, { cartId, lineIds });

  if (data.cartLinesRemove.userErrors?.length) {
    throw new Error(data.cartLinesRemove.userErrors.map(e => e.message).join("; "));
  }

  if (!data.cartLinesRemove.cart) {
    throw new Error("Failed to remove cart lines");
}

  return data.cartLinesRemove.cart;
}

/**
 * Create checkout (single item quick checkout)
 * Uses Cart API instead of deprecated checkoutCreate
 */
export async function createCheckout(
  variantId: string,
  quantity: number = 1
): Promise<ShopifyCheckout> {
  if (quantity < 1 || quantity > 999) {
    throw new Error("Quantity must be between 1 and 999");
  }

  // Use Cart API instead of deprecated checkoutCreate
  const cart = await createShopifyCart([
    {
      variantId: normalizeVariantId(variantId),
      quantity: Math.max(1, Math.min(999, quantity)),
    },
  ]);

  if (!cart.checkoutUrl) {
    throw new Error("Failed to create checkout: missing checkout URL");
  }

  // Return in the format expected by ShopifyCheckout interface
  return {
    id: cart.id,
    webUrl: cart.checkoutUrl,
  };
}

/**
 * Client-side checkout helper (calls API)
 */
export const performCheckout = async (items: ShopifyCartItem[]): Promise<string | null> => {
  if (!items.length) {
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
    
    return null;
  } catch {
    return null;
  }
};