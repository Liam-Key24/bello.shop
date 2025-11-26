/**
 * GraphQL Fragments for Shopify Storefront API
 * These fragments are reusable across multiple queries to reduce duplication
 */

export const PRODUCT_IMAGE_FRAGMENT = `
  fragment ProductImage on Image {
    url
    altText
  }
`;

export const PRODUCT_PRICE_FRAGMENT = `
  fragment ProductPrice on Product {
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

export const PRODUCT_BASE_FRAGMENT = `
  fragment ProductBase on Product {
    id
    title
    handle
    description
    vendor
    tags
  }
`;

export const PRODUCT_RATING_FRAGMENT = `
  fragment ProductRating on Product {
    metafield(namespace: "custom", key: "rating") {
      value
    }
  }
`;

export const PRODUCT_VARIANT_FRAGMENT = `
  fragment ProductVariant on ProductVariant {
    id
    title
    price {
      amount
      currencyCode
    }
  }
`;

