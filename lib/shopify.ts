const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
  throw new Error(
    "Shopify environment variables are not defined. Make sure NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN are set in .env.local"
  );
}

export interface ShopifyImage {
  url: string;
  altText?: string | null;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id?: string;
  title: string;
  handle: string;
  description?: string | null;
  categoryId?: string | null;
  vendor?: string;
  images: ShopifyImage[];
  priceRange?: {
    minVariantPrice: ShopifyPrice;
  };
  variants?: {
    edges: {
      node: {
        id: string;
      };
    }[];
  };
}

const token = SHOPIFY_TOKEN;

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2025-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
      "Accept": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "<no body>");
    console.error(`Shopify HTTP error ${res.status} ${res.statusText}:`, text);
    throw new Error(`Shopify HTTP error ${res.status} ${res.statusText}`);
  }

  let data: any;
  try {
    data = await res.json();
  } catch (err) {
    console.error("Failed to parse Shopify response as JSON:", err);
    throw new Error("Invalid JSON response from Shopify");
  }

  if (data.errors) {
    console.dir(data.errors, { depth: null });
    const messages = data.errors.map((e: any) => e.message).join("; ");
    throw new Error(`Shopify GraphQL error: ${messages}`);
  }

  if (!data.data) {
    console.error("Shopify response missing data field:", data);
    throw new Error("Shopify response missing data");
  }

  return data.data as T;
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

  try {
    const data = await shopifyFetch<{ productByHandle: any }>(query, { handle });
    const product = data.productByHandle;
    if (!product) return null;

    return {
      id: product.id,
      title: product.title,
      images: product.images?.edges?.map((edge: any) => ({ url: edge.node.url, altText: edge.node.altText || product.title, })) ?? [],
      handle: product.handle,
      description: product.description,
      priceRange: product.priceRange,
      variants: product.variants,
    };
  } catch (err) {
    console.error("getProductByHandle failed for handle:", handle, err);
    return null;
  }
}

export async function getAllProducts(first: number = 12): Promise<ShopifyProduct[]> {
  const query = `
    query getAllProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            vendor
            tags
            images(first: 3) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ products: any }>(query, { first });
  return (data.products.edges || []).map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.title,
    handle: edge.node.handle,
    vendor: edge.node.vendor,        // <-- added vendor
    tags: edge.node.tags, 
    categoryId: edge.node.tags?.[0] ?? null,
    images: (edge.node.images?.edges || []).map((imgEdge: any) => ({
      url: imgEdge.node.url,
      altText: imgEdge.node.altText ?? null,
    })),
    priceRange: edge.node.priceRange,
  }));
}

export async function createCheckout(
  variantId: string,
  quantity: number = 1
): Promise<ShopifyCheckout> {
  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems: [{ variantId, quantity }],
    },
  };

  const data = await shopifyFetch<{ checkoutCreate: any }>(mutation, variables);
  const errors = data.checkoutCreate.checkoutUserErrors;
  if (errors.length > 0) {
    console.error("Shopify checkoutCreate errors:", errors);
    throw new Error(errors.map((e: any) => e.message).join("; "));
  }

  const checkout = data.checkoutCreate.checkout;
  return {
    id: checkout.id,
    webUrl: checkout.webUrl,
  };
}

export async function createShopifyCart(
  localCartItems: { variantId: string; quantity?: number }[]
): Promise<string> {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
    throw new Error("Shopify env vars not configured");
  }

  const lines = localCartItems
    .map((it) => {
      const qty = Number(it.quantity ?? 1) || 1;
      const rawId = String(it.variantId ?? "");
      // accept either numeric id ("123") or full gid ("gid://shopify/ProductVariant/123")
      const merchandiseId = rawId.startsWith("gid://")
        ? rawId
        : `gid://shopify/ProductVariant/${rawId.replace(/^.*\D/, "")}`;

      return { merchandiseId, quantity: qty };
    })
    .filter(Boolean);

  if (lines.length === 0) {
    throw new Error("No valid line items provided");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines,
      attributes: [
        { key: "_return_url", value: siteUrl },
        { key: "_source", value: "custom_storefront" },
      ],
    },
  };

  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2025-07/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
        Accept: "application/json",
      },
      body: JSON.stringify({ query: mutation, variables }),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "<no body>");
    throw new Error(`Shopify HTTP error ${res.status}: ${text}`);
  }

  const payload = await res.json().catch(() => ({}));
  if (payload.errors) {
    throw new Error(JSON.stringify(payload.errors));
  }

  const result = payload.data?.cartCreate;
  const userErrors = result?.userErrors || [];
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e: any) => e.message).join("; "));
  }

  const checkoutUrl = result?.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error("No checkoutUrl returned from Shopify");
  }

  return checkoutUrl;
}

export interface ShopifyCheckout {
  id: string;
  webUrl: string;
}