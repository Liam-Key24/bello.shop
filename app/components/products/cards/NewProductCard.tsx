import CardRedirectIcon from "../../../cart/components/CardRedirectIcon";
import Link from "next/link";
import ProductImage from "../shared/ProductImage";
import { formatPrice, normalizeProductData } from "@/lib/utils/product";
import type { ProductCardBaseProps } from "@/lib/types/product";

export default function NewProductCard(props: ProductCardBaseProps) {
    const { showPrice = true } = props;
    const { title, price, image, href } = normalizeProductData(props);

    return (
        <Link 
          href={href} 
          className="glass w-[167px] h-56 relative rounded-4xl overflow-hidden group"
          aria-label={`View ${title}`}
        >
            <ProductImage
              image={image}
              alt={title}
            />
            <div className='w-auto h-auto absolute right-2 top-2 z-10'>
                <CardRedirectIcon />
            </div>
            <div className='w-full absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-4xl z-10'>
                <h3 className='text-white text-sm font-semibold text-center mb-1 truncate'>{title}</h3>
                {showPrice && price > 0 && (
                    <p className='text-white text-xs text-center'>{formatPrice(price)}</p>
                )}
            </div>
        </Link>
    )
};

