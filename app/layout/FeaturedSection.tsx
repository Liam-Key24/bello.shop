import { PopularBanner } from "../components/products/banners"
import { DiscoverCard, ProductOfTheWeekCard } from '../components/products/cards'
import { CategoryBanner } from '../components/products/banners'
import type { ShopifyProduct } from '@/lib/shopify/types';

interface FeaturedSectionProps {
  lovedProducts?: ShopifyProduct[];
  productOfWeek?: ShopifyProduct;
}

export default function FeaturedSection({ lovedProducts = [], productOfWeek }: FeaturedSectionProps) {
    return (
        <>
            <div className="w-full h-auto flex flex-col gap-6 mb-10">
                <PopularBanner />
                <div className="w-full h-auto inline-flex items-center justify-evenly gap-4 flex-wrap">
                    {lovedProducts.slice(0, 2).map((product, index) => (
                        <DiscoverCard key={product.id || index} product={product} />
                    ))}
                    {/* Show placeholders if not enough products */}
                    {lovedProducts.length < 2 && (
                        <DiscoverCard />
                    )}
                </div>
                <ProductOfTheWeekCard product={productOfWeek} />
                <CategoryBanner />
            </div>
        </>
    )
}