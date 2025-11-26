'use client';
import { useState, useMemo } from "react";
import ProductCard from "../cards/ProductCard";
import { motion } from "framer-motion";
import type { ProductItem } from "@/lib/shopify/types";
import type { ShopifyProduct } from "@/lib/shopify/types";

interface ProductsGridProps {
  products: ProductItem[] | ShopifyProduct[];
  showCategoryFilter?: boolean;
  className?: string;
}

/**
 * Products grid component - displays products in a responsive grid
 * Supports category filtering and handles both ProductItem and ShopifyProduct types
 */
export default function ProductsGrid({ 
  products, 
  showCategoryFilter = false,
  className = "mt-28"
}: ProductsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories from products
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map(p => {
            if ('categoryId' in p) {
              return p.categoryId;
            }
            // ShopifyProduct has tags
            const sp = p as ShopifyProduct;
            return sp.tags?.[0];
          })
          .filter(Boolean)
      )
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(p => {
      if ('categoryId' in p) {
        return p.categoryId === selectedCategory;
      }
      // ShopifyProduct has tags
      const sp = p as ShopifyProduct;
      return sp.tags?.[0] === selectedCategory;
    });
  }, [products, selectedCategory]);

  // Convert ProductItem to ShopifyProduct format for ProductCard
  const normalizedProducts = useMemo(() => {
    return filteredProducts.map(p => {
      if ('categoryId' in p) {
        // ProductItem - convert to ShopifyProduct format
        return {
          id: p.id,
          title: p.title,
          handle: p.handle,
          price: p.price,
          images: p.images,
        } as ShopifyProduct;
      }
      return p as ShopifyProduct;
    });
  }, [filteredProducts]);

  return (
    <div className={className}>
      {showCategoryFilter && categories.length > 0 && (
        <div className="mb-6">
          <select 
            value={selectedCategory ?? ""} 
            onChange={e => setSelectedCategory(e.target.value || null)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white"
            aria-label="Filter by category"
          >
            <option value="">All categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      )}
      {normalizedProducts.length > 0 ? (
        <motion.div 
          layout 
          transition={{ duration: 0.3 }} 
          className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {normalizedProducts.map((product) => (
            <motion.div layout key={product.id || product.handle}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 py-10">No products found.</p>
      )}
    </div>
  );
}

