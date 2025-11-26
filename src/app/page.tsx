"use client"

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Feature } from "./components/Feature";
import { Categories } from "./components/Categories";
import { ProductShowcaseSection } from "./components/ProductShowcaseSection";
import { SocialsSection } from "./components/SocialsSection";
import { ProductBanner } from "./components/ProductBanner";
import { Footer } from "./components/Footer";
import { ProductSuggestions } from "./components/ProductSuggestions";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16 md:space-y-24">
        <Hero />
        <Categories />
        <ProductBanner />
        <Feature />
        <ProductShowcaseSection />
        <ProductSuggestions />
        <SocialsSection />
        <ProductBanner />
      </main>
      <Footer />
    </>
  )
}

