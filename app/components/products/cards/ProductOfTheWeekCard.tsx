import CardRedirectIcon from "../../../cart/components/CardRedirectIcon";
import Link from "next/link";
import ProductImage from "../shared/ProductImage";
import { formatPrice, normalizeProductData } from "@/lib/utils/product";
import type { ProductCardBaseProps } from "@/lib/types/product";

/**
 * Product of the Week card - large featured product card
 * Used to highlight a special product
 */
export default function ProductOfTheWeekCard(props: ProductCardBaseProps) {
    const { showPrice = true } = props;
    const { title, price, image, href } = normalizeProductData(props);

    return (
        <Link 
          href={href} 
          className="glass w-full h-80 rounded-4xl relative overflow-hidden group"
          aria-label={`View ${title}`}
        >
            <ProductImage
              image={image}
              alt={title}
            />
            <div className="w-auto h-auto absolute top-3 right-3 z-10">
                <CardRedirectIcon />
            </div>
            <div className="absolute w-full bottom-0 left-0 right-0 from-black/70 to-transparent p-4 rounded-b-4xl z-10">
                <div className="w-full h-auto flex flex-col items-center justify-center space-y-3">
                    <h1 className="text-4xl text-white font-bold drop-shadow-lg text-center">{title}</h1>
                    {showPrice && price > 0 && (
                        <div className="w-auto p-2 h-7 text-sm bg-frosty-green rounded-4xl flex items-center justify-center">
                            <p className="font-medium">{formatPrice(price)}</p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

