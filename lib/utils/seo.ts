import type { Metadata } from "next";
import type { ShopifyProduct } from "@/lib/shopify/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bello.shop";
const SITE_NAME = "Bello Shop";

export function generateProductMetadata(
  product: ShopifyProduct
): Metadata {
  const title = `${product.title} | ${SITE_NAME}`;
  const description =
    product.description?.replace(/\s+/g, " ").trim().slice(0, 160) ||
    `Shop ${product.title} at ${SITE_NAME}. Premium health and beauty products.`;
  const image = product.images[0]?.url || "";
  const url = `${SITE_URL}/product/${product.handle}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: image
        ? [
            {
              url: image,
              alt: product.title,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

interface StructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string[];
  brand: {
    "@type": string;
    name: string;
  };
  offers: {
    "@type": string;
    url: string;
    priceCurrency: string;
    price: string;
    availability: string;
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount: string;
  };
}

export function generateProductStructuredData(
  product: ShopifyProduct
): StructuredData {
  const image = product.images[0]?.url || "";
  const url = `${SITE_URL}/product/${product.handle}`;

  const structuredData: StructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || "",
    image: product.images.map((img) => img.url),
    brand: {
      "@type": "Brand",
      name: product.vendor || SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "GBP",
      price: product.price.toString(),
      availability: "https://schema.org/InStock",
    },
  };

  if (product.rating) {
    structuredData.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      reviewCount: "1",
    };
  }

  return structuredData;
}

interface BreadcrumbStructuredData {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
): BreadcrumbStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

