"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/app/components/Navbar"
import { Hero } from "@/app/components/Hero"
import { Feature } from "@/app/components/Feature"
import { Categories } from "@/app/components/Categories"
import {ProductShowcaseSection} from  '@/app/components/ProductShowcaseSection'
import { SocialsSection } from "@/app/components/SocialsSection"
import { ProductBanner } from "@/app/components/ProductBanner"
import { Footer } from "@/app/components/Footer"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16 md:space-y-24">
        {/* Hero Section */}
        <section className="w-full">
          <Hero />
        </section>

        {/* Featured Products */}
        <section className="w-full">
          <ProductBanner />
        </section>

        {/* Featured Products */}
        <section>
          <Feature />
        </section>

        {/* Categories */}
        <section className="w-full">
          <Categories />
        </section>

        {/* Deal Section */}
        <section className="w-full">
          <ProductShowcaseSection />
        </section>

        <section className="w-full">
          <ProductBanner />
        </section>

        <section className="w-full">
          <SocialsSection />
        </section>
      </main>

      {/* Footer */}
      <section className="w-full"> 
      <Footer />
      </section>
    </>
  )
}

