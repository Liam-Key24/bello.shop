import NewProductLanding from "./layout/NewProductsLanding";
import HeroCard from "./components/products/cards/HeroCard";
import ProductOfTheWeekCard from "./components/products/cards/ProductOfTheWeekCard";
import PromiseCard from "./components/products/PromiseCard";
import CategoryBanner from "./components/products/banners/CategoryBanner";
import PopularBanner from "./components/products/banners/PopularBanner";

import { Metadata } from "next";
import { getHomePageData } from "@/lib/data/home-data";

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
  const { heroProducts, newProducts, productOfWeek } = await getHomePageData();

  return (
    <>
      <div className="gap-y-10 mt-20">
        <HeroCard product={heroProducts[0]} />
        <NewProductLanding products={newProducts} />
        <div className="w-full h-auto flex flex-col gap-6 my-3">
        <PopularBanner />
        <ProductOfTheWeekCard product={productOfWeek[0]} />
        <CategoryBanner />
        </div>
        <PromiseCard />
      </div>
    </>
  );
}