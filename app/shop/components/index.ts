/**
 * Main barrel export for shop components
 * Provides clean imports: import { ShopClient, FilterMenu, ProductGrid } from '@/app/shop/components'
 */

export { default as ShopClient } from './ShopClient'
export { default as FilterMenu } from './filters/FilterMenu'
export { default as ProductGrid } from './ProductGrid'

// Hooks are now in @/lib/hooks/shop
// Types are now in @/lib/types/filter

