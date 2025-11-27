import { PopularBanner } from "../components/products/banners"
import {ProductOfTheWeekCard } from '../components/products/cards'
import { CategoryBanner } from '../components/products/banners'
import type { ShopifyProduct } from '@/lib/shopify/types';

interface FeaturedSectionProps {
  productOfWeek?: ShopifyProduct;
}

export default function FeaturedSection({productOfWeek }: FeaturedSectionProps) {
    return (
        <>
            <div className="w-full h-auto flex flex-col gap-6 mb-10">
                <PopularBanner />
                <ProductOfTheWeekCard product={productOfWeek} />
                <CategoryBanner />
            </div>
        </>
    )
}