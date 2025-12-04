import { notFound } from "next/navigation";

/**
 * Error messages for product-related operations
 */
export const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: "Product not found",
  INVALID_HANDLE: "Invalid product handle",
  NO_PRODUCTS: "No products available",
  FETCH_ERROR: "Failed to fetch product data",
} as const;

/**
 * Handle product not found - redirects to 404
 * This function never returns (throws)
 */
export function handleProductNotFound(): never {
  notFound();
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
  message: string,
  status: number = 500
): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

