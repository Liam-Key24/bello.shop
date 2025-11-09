import CardRedirectIcon from "../../cart/components/CardRedirectIcon";
import Link from "next/link";

export default function NewProductCard() {
    return (
        <Link href={'/shop'} className="glass w-[167px] h-56 relative rounded-4xl">
            <div className='w-auto h-auto absolute right-2 top-2'>
                <CardRedirectIcon />
            </div>
            <h3 className='w-full absolute bottom-3 left-1/2 -translate-x-1/2 text-center'> Product Name </h3>
        </Link>
    )
};