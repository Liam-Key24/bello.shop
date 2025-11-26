import { HeroCard } from "./components/products/cards";
import NewProductLanding from "./layout/NewProductsLanding";
import FeautedSection from './layout/FeaturedSection';
import LastLanding from './layout/LastLanding';
import { getProductsByCollection, getCollectionHandleByTitle } from "@/lib/shopify/collection";

export default async function Home() {
  // Find collection handles by title (case-insensitive partial match)
  // This allows flexibility if collection names vary slightly
  const [heroHandle, newProductsHandle, lovedProductsHandle, productOfWeekHandle] = await Promise.all([
    getCollectionHandleByTitle("hero image"),
    getCollectionHandleByTitle("new products"),
    getCollectionHandleByTitle("loved products"),
    getCollectionHandleByTitle("product of the week"),
  ]);

  // Fetch products from collections
  const [heroProducts, newProducts, lovedProducts, productOfWeek] = await Promise.all([
    heroHandle ? getProductsByCollection(heroHandle, 1) : Promise.resolve([]),
    newProductsHandle ? getProductsByCollection(newProductsHandle, 4) : Promise.resolve([]),
    lovedProductsHandle ? getProductsByCollection(lovedProductsHandle, 2) : Promise.resolve([]),
    productOfWeekHandle ? getProductsByCollection(productOfWeekHandle, 1) : Promise.resolve([]),
  ]);

  return (
   <>
   <div className="space-y-10 mt-28">
   <HeroCard product={heroProducts[0]} />
   <NewProductLanding products={newProducts} />
   <FeautedSection lovedProducts={lovedProducts} productOfWeek={productOfWeek[0]} />
   <LastLanding/>
   </div>
   </>
  );
}
