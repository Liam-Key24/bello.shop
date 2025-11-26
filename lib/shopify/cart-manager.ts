import { shopifyFetch } from "./helper";
import type { CartItem } from "./types";

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
export async function createCart(items: CartItem[] = []): Promise<ShopifyCart> {
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
  } catch (err) {
    console.error("Failed to get cart:", err);
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

