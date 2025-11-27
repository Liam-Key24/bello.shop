/**
 * Main barrel export for shop components
 * Provides clean imports: import { ShopClient, FilterMenu, ProductGrid } from '@/app/shop/components'
 */

export { default as ShopClient } from './ShopClient'
export { default as FilterMenu } from './FilterMenu'
export { default as ProductGrid } from './ProductGrid'

// Re-export filters and hooks for convenience
export * from './filters'
export * from './hooks'

