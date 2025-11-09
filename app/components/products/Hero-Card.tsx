import ShopButton from '../ui/ShopButton'
import DiscoverButton from '../ui/DiscoverButton';

export default function HeroCard() {
    return ( 
        <div className="glass w-full h-105 rounded-4xl relative p-5">
            <div className='absolute bottom-5'>
            <div className='mb-8'>
            <h2 className='text-4xl border-b w-[90%] h-24'>
                Your new Favourite Obsession.
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