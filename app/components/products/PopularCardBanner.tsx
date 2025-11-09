import CardRedirectIcon from "../../cart/components/CardRedirectIcon"
import Link from "next/link";

export default function ProductCardBanner() {
    return (
        <Link href={'/shop'}> 
        <div className="glass w-full h-20 rounded-4xl relative">
            <div className="w-auto h-auto top-1/2 translate-y-1/2 text-center">
                <h3 className="text-xl">
                    Loved Products
                </h3>
                <p className="text-xs">
                    Discover our range of your favourite products
                </p>
            </div>
            <div className="absolute right-3 top-3">
            <CardRedirectIcon /> 
            </div>
        </div>
        </Link>
        
    )
}