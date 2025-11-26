import { shopifyFetch } from "./helper";
import type { ShopifyCheckout, CartItem } from "./types";

// Shared error handler for Shopify mutations
const handleShopifyErrors = (errors: { message: string }[] | undefined): void => {
  if (errors?.length) {
    throw new Error(errors.map(e => e.message).join("; "));
  }
};

// Validate and normalize variant ID to Shopify GID format
const normalizeVariantId = (variantId: string): string => {
  if (!variantId || typeof variantId !== "string") {
    throw new Error("Invalid variant ID");
  }
  // Already in GID format
  if (variantId.startsWith("gid://shopify/ProductVariant/")) {
    return variantId;
  }
  // Extract numeric ID from various formats (e.g., "gid://shopify/ProductVariant/123" or just "123")
  const match = variantId.match(/(\d+)$/);
  if (!match) {
    throw new Error(`Invalid variant ID format: ${variantId}`);
  }
  return `gid://shopify/ProductVariant/${match[1]}`;
};

export async function createShopifyCart(items: CartItem[]): Promise<string> {
  if (!items?.length) throw new Error("Cart is empty");

  const lines = items.map(({ variantId, quantity = 1 }) => {
    if (quantity < 1 || quantity > 999) {
      throw new Error("Quantity must be between 1 and 999");
    }
    return {
      merchandiseId: normalizeVariantId(variantId),
      quantity,
    };
  });

  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }
  `;

  const data = await shopifyFetch<{ cartCreate: { cart: { checkoutUrl: string } | null; userErrors: { message: string }[] } }>(mutation, {
    input: { lines },
  });

  const { cart, userErrors } = data.cartCreate;
  handleShopifyErrors(userErrors);
  if (!cart?.checkoutUrl) throw new Error("Missing checkout URL from Shopify");

  return cart.checkoutUrl;
}

export async function createCheckout(
  variantId: string,
  quantity: number = 1
): Promise<ShopifyCheckout> {
  if (quantity < 1 || quantity > 999) {
    throw new Error("Quantity must be between 1 and 999");
  }

  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout { id webUrl }
        checkoutUserErrors { message }
      }
    }
  `;

  const data = await shopifyFetch<{ checkoutCreate: { checkout: ShopifyCheckout | null; checkoutUserErrors: { message: string }[] } }>(mutation, {
    input: { lineItems: [{ variantId: normalizeVariantId(variantId), quantity }] },
  });

  const { checkout, checkoutUserErrors } = data.checkoutCreate;
  handleShopifyErrors(checkoutUserErrors);
  
  if (!checkout?.webUrl) {
    throw new Error("Failed to create checkout: missing web URL");
  }

  return checkout;
}
