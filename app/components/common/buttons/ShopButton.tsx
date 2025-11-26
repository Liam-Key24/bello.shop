/**
 * Shop button - call-to-action button for shopping
 */
export default function ShopButton(){
    return(
        <div className="w-auto h-7 bg-frosty-green inline-flex justify-center items-center rounded-4xl px-2">
            <p className="font-[10px]">Shop now</p>
            <img src="/icons/angle-small-right.svg" alt=">" className="w-4 h-4"/>
        </div>
    )
};

