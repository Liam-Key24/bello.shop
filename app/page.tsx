import HeroCard from "./components/products/cards/HeroCard";
import ProductOfTheWeekCard from "./components/products/cards/ProductOfTheWeekCard";
import PromiseCard from "./components/products/PromiseCard";
import CategoryBanner from "./components/products/banners/CategoryBanner";
import PopularBanner from "./components/products/banners/PopularBanner";

import { Metadata } from "next";
import { getHomePageData } from "@/lib/shopify/home-data";

// Shopify Storefront API requires runtime env vars
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home | Bello Shop",
  description: "Discover the best health and beauty products. Shop premium healthcare, wellness, and beauty products at Bello Shop.",
  keywords: ["health", "beauty", "wellness", "products", "shop", "bello", "shop"],
  authors: [{ name: "Bello Shop", url: "https://bello.shop" }],
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Home() {
  let heroProducts;
  let productOfWeek;
  let loadError = false;

  try {
    const data = await getHomePageData();
    heroProducts = data.heroProducts;
    productOfWeek = data.productOfWeek;
  } catch (error) {
    console.error("Error loading homepage data:", error);
    loadError = true;
  }

  if (loadError) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Bello</h1>
        <p className="text-mid-gray">Sustainable Kitchen Essentials</p>
        <p className="text-sm text-mid-gray mt-4">
          Products will appear once Shopify credentials are configured.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="gap-y-10 mt-20">
        <HeroCard product={heroProducts?.[0]} />
        <div className="w-full h-auto flex flex-col gap-6 my-3">
          <PopularBanner />
          <ProductOfTheWeekCard product={productOfWeek?.[0]} />
          <CategoryBanner />
        </div>
        <PromiseCard />
      </div>
    </>
  );
}
