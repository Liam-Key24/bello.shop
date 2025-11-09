'use client';

import { useState } from "react";
import FilterHead from "./Filtershead";
import ShopProductCard from "./ShopProductCard"
import { motion } from "framer-motion"

export type ProductItem = {
    id: string;
    handle: string;
    title: string;
    price: number;
    categoryId: string | undefined;
    images: { url: string; altText?: string }[];
};


export default function ProductsGrid({ products }: { products: ProductItem[] }) {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const filteredProducts = selectedCategory
        ? products.filter((p) => p.categoryId === selectedCategory)
        : products;

    return (
        <div className="mt-6">
            <FilterHead viewMode={viewMode} onViewChange={setViewMode}/>

            <motion.div
                layout
                transition={{ duration: 0.3 }}
                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"
                    }`}
            >
                {filteredProducts.map((product) => {
                    const firstImage = product.images?.[0] || { url: "/placeholder.svg", altText: product.title };

                    return (
                        <motion.div layout key={product.id}>
                            <ShopProductCard
                                key={product.handle || product.id}
                                name={product.title}
                                price={product.price}
                                handle={product.handle}
                                image={firstImage}
                            />
                        </motion.div>
                    );
                })}

            </motion.div>
        </div>
    );
}
