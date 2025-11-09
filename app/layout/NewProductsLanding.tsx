import NewProductCard from '../components/products/NewProductCard'

export default function NewProductLanding(){
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center space-y-5">
            <h2 className="text-3xl m-2">New Products</h2>
            <div className="w-full h-auto inline-flex items-center justify-between">
              <NewProductCard/>  
              <NewProductCard/> 
            </div>
        </div>
    )
}