/**
 * Check authentication status via API
 * No context imports - safe for use in any component
 */
export async function checkAuthStatus(): Promise<boolean> {
  try {
    const res = await fetch('/api/shopify/customer', {
      method: 'GET',
      credentials: 'include',
    });
    return res.ok;
  } catch {
    return false;
  }
}

