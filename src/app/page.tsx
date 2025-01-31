"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/app/components/Navbar"
import { Hero } from "@/app/components/Hero"
import { Feature } from "@/app/components/Feature"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        
          <Hero />
          <Feature />

        {/* Featured Products */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-800 mb-8">Featured Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-800 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Supplements", "Skincare", "Nutrition", "Wellness"].map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                className="relative h-40 rounded-lg overflow-hidden"
              >
                <Image src="/placeholder.svg" alt={category} width={240} height={160} className="object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-white font-medium text-lg">{category}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Deal Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-accent-light rounded-lg p-8 text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-accent-dark mb-4">Special Offer</h2>
          <p className="text-primary-600 mb-6">Get 20% off on your first purchase with code WELCOME20</p>
          <button className="bg-accent-dark hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Shop Now
          </button>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">About Us</h3>
              <p className="text-primary-200">
                Dedicated to bringing you the finest natural health and wellness products.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-primary-200 hover:text-white transition-colors">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-200 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-200 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Newsletter</h3>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded flex-1 text-primary-800"
                />
                <button className="bg-accent hover:bg-accent-dark px-4 py-2 rounded transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

