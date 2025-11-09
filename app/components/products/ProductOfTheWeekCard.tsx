import CardRedirectIcon from "../../cart/components/CardRedirectIcon"
import Link from "next/link";

export default function POWCard() {
    return (
        <Link href={'/shop'} className="glass w-full h-80 rounded-4xl relative">
            <div className="w-auto h-auto absolute top-3 right-3">
            <CardRedirectIcon />
            </div>
            <div className="absolute w-full bottom-3 ">
                <div className="w-full h-auto flex flex-col items-center justify-center space-y-3">
                    <h1 className="text-4xl">Product of the Week</h1>
                    <div className="w-auto p-2 h-7 text-sm bg-green-100 rounded-4xl flex items-center justify-center">
                        <p>Use Code ___ for __% Off</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}