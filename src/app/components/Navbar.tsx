"use client"

import { Heart, ShoppingCart, Menu } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6" color="#f26a8d"/>
            <span className="text-xl font-medium text-accent-dark">bello.shop</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-primary-600 hover:text-accent-dark transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </button>
            <button className="md:hidden p-2 text-primary-600 hover:text-accent-dark transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

