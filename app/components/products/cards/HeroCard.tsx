import { ShopButton, DiscoverButton } from '../../common';
import { getProductImage, getProductTitle } from '../shared/utils';
import type { ProductCardBaseProps } from '../shared/types';

interface HeroCardProps extends ProductCardBaseProps {}

/**
 * Hero card - large banner card for featured hero product
 * Used on landing page as main hero section
 */
export default function HeroCard({ product }: HeroCardProps) {
    const heroImage = getProductImage(product);
    const title = getProductTitle(product, 'Your new Favourite Obsession.');
    
    return ( 
        <div 
          className="neumorphism-bg w-full h-105 rounded-4xl relative p-5 overflow-hidden"
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

