import CardRedirectIcon from "../../cart/components/CardRedirectIcon"
import Link from "next/link";

export default function CategoryProductionBanner(){
    return (

        <Link href={'/shop'} className="glass w-full h-28 relative rounded-4xl">
            <div className="w-auto h-auto absolute top-5 right-3">
                <CardRedirectIcon/>
            </div>
            <div className="w-auto h-auto absolute top-1/2 -translate-y-1/2 left-4">
                <h3 className="text-2xl">
                    Category Slogan
                </h3>
                <p className="text-xs">
                    Have a look at our Category mentioned.
                </p>
            </div>
        </Link>
    )
}