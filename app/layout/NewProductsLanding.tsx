import NewProductCard from '../components/products/cards/NewProductCard';
import type { ShopifyProduct } from '@/lib/shopify/types';


export default function NewProductLanding(props: { products: ShopifyProduct[] }){
    const { products } = props;
    // Show up to 4 products, or empty placeholders if no 
    const displayProducts = products.slice(0, 4);
    const placeholders = Array.from({ length: Math.max(0, 4 - displayProducts.length) });

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center space-y-5">
            <h2 className="text-3xl m-2">New Products</h2>
            <div className="w-full h-auto inline-flex items-center justify-between gap-4 flex-wrap">
              {displayProducts.map((product) => (
                <NewProductCard 
                  key={product.id}
                  product={product}
                />
              ))}
              {placeholders.map((_, index) => (
                <NewProductCard key={`placeholder-${index}`} />
              ))}
            </div>
        </div>
    )
}