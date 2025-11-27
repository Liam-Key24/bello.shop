/**
 * Token utility functions for validation
 */

/**
 * Parse JWT token to extract expiration (if token is JWT format)
 * Note: Shopify customer access tokens are not JWTs, but we can check format
 */
export function isTokenExpired(token: string): boolean {
  // Shopify customer access tokens are opaque strings, not JWTs
  // We can't parse expiration from the token itself
  // This function is a placeholder - actual expiration should be checked via API
  return false;
}

/**
 * Validate token format (basic check)
 */
export function isValidTokenFormat(token: string | undefined): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }
  // Shopify customer access tokens are typically long alphanumeric strings
  // Basic format validation
  return token.length > 10 && /^[a-zA-Z0-9_-]+$/.test(token);
}

/**
 * Check if token exists and has valid format
 * For actual expiration, we need to call Shopify API (done in API routes)
 */
export function validateTokenPresence(token: string | undefined): boolean {
  return isValidTokenFormat(token);
}

