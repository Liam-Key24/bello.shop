import { Metadata } from "next";
import { getHomePageData } from "@/lib/shopify/home-data";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { ProductsSection } from "@/app/components/sections/ProductsSection";
import { ContentBlock } from "@/app/components/sections/ContentBlock";
import { GuaranteesSection } from "@/app/components/sections/GuaranteesSection";
import { PromisesSection } from "@/app/components/sections/PromisesSection";
import { ReviewsPlaceholder } from "@/app/components/sections/ReviewsPlaceholder";
import type { ShopifyProduct } from "@/lib/shopify/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bello - Sustainable Kitchen Essentials",
  description:
    "Discover sustainable kitchen essentials designed to elevate your everyday life while caring for the planet.",
};

export default async function Home() {
  let featuredProducts: ShopifyProduct[] = [];
  let loadError = false;

  try {
    const data = await getHomePageData();
    featuredProducts = data.featuredProducts;
  } catch (error) {
    console.error("Error loading homepage data:", error);
    loadError = true;
  }

  if (loadError) {
    return (
      <div className="text-center py-20 px-6">
        <h1 className="mb-4">Welcome to Bello</h1>
        <p className="text-mid-gray">
          Products will appear once Shopify credentials are configured and
          products are tagged <code className="text-brand-deep">featured</code>.
        </p>
      </div>
    );
  }

  return (
    <>
      <HeroSection featuredProduct={featuredProducts[0] ?? null} />
      <ProductsSection products={featuredProducts} />
      <ContentBlock
        title="Thoughtfully Made for Everyday Life"
        paragraphs={[
          "Every product we offer is carefully selected with both quality and sustainability in mind. We believe that the small choices we make in our kitchens can create meaningful change.",
          "From the materials we source to the partners we work with, everything is designed to help you live more sustainably without compromise.",
        ]}
        linkHref="/about"
        linkText="Learn More About Our Values"
      />
      <GuaranteesSection />
      <PromisesSection />
      <ReviewsPlaceholder />
    </>
  );
}
