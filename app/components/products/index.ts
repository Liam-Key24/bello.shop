/**
 * Main barrel export for product components
 * Provides clean imports: import { ProductCard, ProductsGrid } from '@/app/components/products'
 */

// Individual card exports (no index in cards/)
export { default as HeroCard } from './cards/HeroCard';
export { default as NewProductCard } from './cards/NewProductCard';
export { default as ProductCard } from './cards/ProductCard';
export { default as ProductOfTheWeekCard } from './cards/ProductOfTheWeekCard';

// Layouts
export { default as ProductsGrid } from './layouts/ProductsGrid';

// Banners
export { default as CategoryBanner } from './banners/CategoryBanner';
export { default as PopularBanner } from './banners/PopularBanner';

// Shared
export { default as ProductImage } from './shared/ProductImage';

// Other
export { default as PromiseCard } from './PromiseCard';

