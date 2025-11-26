import CardRedirectIcon from "../../../cart/components/CardRedirectIcon"
import Link from "next/link";
import ProductImage from "../shared/ProductImage";
import { formatPrice, getProductImage, getProductLink, getProductTitle } from "../shared/utils";
import type { ProductCardBaseProps } from "../shared/types";

interface ProductOfTheWeekCardProps extends ProductCardBaseProps {
  showPrice?: boolean;
}

/**
 * Product of the Week card - large featured product card
 * Used to highlight a special product
 */
export default function ProductOfTheWeekCard({ product, showPrice = true }: ProductOfTheWeekCardProps) {
    const href = getProductLink(product?.handle);
    const image = getProductImage(product);
    const title = getProductTitle(product, 'Product of the Week');
    const price = product?.price;

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
            <div className="absolute w-full bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-4xl z-10">
                <div className="w-full h-auto flex flex-col items-center justify-center space-y-3">
                    <h1 className="text-4xl text-white font-bold drop-shadow-lg text-center">{title}</h1>
                    {showPrice && price !== undefined && (
                        <div className="w-auto p-2 h-7 text-sm bg-frosty-green rounded-4xl flex items-center justify-center">
                            <p className="font-medium">{formatPrice(price)}</p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}

