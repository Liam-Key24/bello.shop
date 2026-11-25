/**
 * Persist Shopify Cart ID between visits.
 * Server also sets an httpOnly `shopifyCartId` cookie (30 days).
 * This localStorage copy helps the client pass cartId explicitly when needed.
 */

const STORAGE_KEY = "shopifyCartId";

export function getStoredCartId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredCartId(cartId: string): void {
  if (typeof window === "undefined" || !cartId) return;
  try {
    localStorage.setItem(STORAGE_KEY, cartId);
  } catch {
    // Ignore quota / private mode errors
  }
}

export function clearStoredCartId(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export function persistCartIdFromResponse(data: { cart?: { id?: string } | null }): void {
  const id = data?.cart?.id;
  if (id) setStoredCartId(id);
}
