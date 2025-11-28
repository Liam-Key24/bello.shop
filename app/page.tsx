import { HeroCard } from "./components/products/cards";
import NewProductLanding from "./layout/NewProductsLanding";
import FeaturedSection from './layout/FeaturedSection';
import LastLanding from './layout/LastLanding';
import { getProductsByCollection, getCollectionHandleByTitle } from "@/lib/shopify/collection";

export default async function Home() {

  const [heroHandle, newProductsHandle, productOfWeekHandle] = await Promise.all([
    getCollectionHandleByTitle("hero image"),
    getCollectionHandleByTitle("new products"),
    getCollectionHandleByTitle("product of the week"),
  ]);

  // Fetch products from collections
  const [heroProducts, newProducts, productOfWeek] = await Promise.all([
    heroHandle ? getProductsByCollection(heroHandle, 1) : Promise.resolve([]),
    newProductsHandle ? getProductsByCollection(newProductsHandle, 4) : Promise.resolve([]),
    productOfWeekHandle ? getProductsByCollection(productOfWeekHandle, 1) : Promise.resolve([]),
  ]);

  return (
   <>
   <div className="space-y-10 mt-20">
   <HeroCard product={heroProducts[0]} />
   <NewProductLanding products={newProducts} />
  <FeaturedSection productOfWeek={productOfWeek[0]} />
   <LastLanding/>
   </div>
   </>
  );
}
