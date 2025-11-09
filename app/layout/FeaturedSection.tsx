import ProductCardBanner from "../components/products/PopularCardBanner"
import DiscoverCard from '../components/products/DiscoverCard'
import POWCard from '../components/products/ProductOfTheWeekCard'
import CategoryProductionBanner from '../components/products/CategoryProductBanner'

export default function FeautedSection() {
    return (
        <>
            <div className="w-full h-auto flex flex-col gap-6 mb-10">
                <ProductCardBanner />
                <div className="w-full h-auto inline-flex items-center justify-evenly ">
                    <DiscoverCard />
                    <DiscoverCard />
                </div>
                <POWCard />
                <CategoryProductionBanner />
            </div>
        </>
    )
}