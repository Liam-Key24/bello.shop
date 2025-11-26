import { DiscoverButtonSmall } from "../../common"
import Link from "next/link";
import ProductImage from "../shared/ProductImage";
import { getProductImage, getProductLink, getProductTitle } from "../shared/utils";
import type { ProductCardBaseProps } from "../shared/types";

interface DiscoverCardProps extends ProductCardBaseProps {}

/**
 * Discover card - small square card for featured/loved products
 * Used in featured sections
 */
export default function DiscoverCard({ product }: DiscoverCardProps){
    const href = getProductLink(product?.handle);
    const image = getProductImage(product);
    const title = getProductTitle(product, 'Discover');

    return(
        <Link 
          href={{pathname: href}} 
          className="glass w-custom-41-5 h-custom-41-5 rounded-4xl relative overflow-hidden group"
          aria-label={`Discover`}
        >
            <ProductImage
              image={image}
              alt={title}
            />
            <div className="absolute bottom-2 left-3 z-10">
              <DiscoverButtonSmall asButton={true} />
            </div>
        </Link>
    )
}

