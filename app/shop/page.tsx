import { getAllProductsSimple } from "@/lib/shopify/products"
import { mapShopifyToProductItem } from "@/lib/shopify/filter"
import type { ProductItem } from "@/lib/shopify/types"
import ShopClient from "./components/ShopClient"

export default async function ShopPage() {
  // Fetch products on the server
  const data = await getAllProductsSimple(50)
  const products: ProductItem[] = mapShopifyToProductItem(data)

  return <ShopClient products={products} />
}
