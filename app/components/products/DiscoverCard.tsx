import DiscoverButtonSmall from "../ui/DiscoverButtonSmall"
import Link from "next/link";
export default function DiscoverCard(){
    return(
        <Link href={'/shop'} className="glass w-41.5 h-41.5 rounded-4xl relative">
            <div className="absolute bottom-2 left-3">
            <DiscoverButtonSmall />
            </div>
        </Link>
    )
}