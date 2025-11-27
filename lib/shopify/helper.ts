const getShopifyConfig = () => {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;


  if (!domain || !token) {
    throw new Error(
      "Shopify environment variables are not defined. Make sure SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN are set in .env.local"
    );
  }

  return { domain, token };
};

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { cache?: RequestCache; revalidate?: number }
): Promise<T> {
  const { domain, token } = getShopifyConfig();
  
  const res = await fetch(`https://${domain}/api/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
      "Accept": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: options?.cache,
    next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "<no body>");
    console.error(`Shopify HTTP error ${res.status} ${res.statusText}:`, text);
    throw new Error(`Shopify HTTP error ${res.status} ${res.statusText}`);
  }

  interface ShopifyResponse<T> {
    data?: T;
    errors?: Array<{ message: string; locations?: unknown[]; path?: unknown[] }>;
  }

  let data: ShopifyResponse<T>;
  try {
    data = await res.json();
  } catch (err) {
    console.error("Failed to parse Shopify response as JSON:", err);
    throw new Error("Invalid JSON response from Shopify");
  }

  if (data.errors) {
    console.dir(data.errors, { depth: null });
    const messages = data.errors.map((e) => e.message).join("; ");
    throw new Error(`Shopify GraphQL error: ${messages}`);
  }

  if (!data.data) {
    console.error("Shopify response missing data field:", data);
    throw new Error("Shopify response missing data");
  }

  return data.data as T;
}