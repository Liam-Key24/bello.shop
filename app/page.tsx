import HeroCard from "./components/products/Hero-Card";
import NewProductLanding from "./layout/NewProductsLanding";
import FeautedSection from './layout/FeaturedSection';
import LastLanding from './layout/LastLanding'


export default function Home() {
  return (
   <>
   <div className="space-y-10 mt-28">
   <HeroCard  />
   <NewProductLanding />
   <FeautedSection />
   <LastLanding/>
   </div>
   </>
  );
}
