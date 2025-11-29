import  ShopButton  from '@/app/components/common/buttons/ShopButton';
import  DiscoverButton  from '@/app/components/common/buttons/DiscoverButtonSmall';

import { getProductImage, getProductTitle } from '@/lib/utils/product';
import type { ProductCardBaseProps } from '@/lib/types/product';

export default function HeroCard(props: ProductCardBaseProps) {
    const { product } = props;
    const heroImage = getProductImage(product);
    const title = getProductTitle(product, 'Your new Favourite Obsession.');
    
    return ( 
        <div 
          className="neumorphism-bg w-full h-[calc(100vh-10rem)] rounded-4xl relative p-5 overflow-hidden"
          style={{
            backgroundImage: heroImage ? `url(${heroImage.url})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          role="banner"
          aria-label={`Hero: ${title}`}
        >
            {heroImage && (
              <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />
            )}
            <div className='absolute bottom-5 z-10'>
            <div className='mb-8'>
            <h2 className='text-4xl border-b w-[90%] h-24 text-white drop-shadow-lg'>
                {title}
            </h2>
            </div>
            <div className='w-auto h-auto space-x-2'>
                <ShopButton />
                <DiscoverButton/>
            </div>
            </div>
        </div>
    );
};

