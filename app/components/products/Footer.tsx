

export default function Footer(){
    return(
        <div className="glass w-full h-96 rounded-4xl p-5 flex flex-col items-center justify-between">
            <h2 className="text-7xl text-center">Bello.today</h2>

            <div className="w-auto h-auto">
                <div className="w-full h-auto inline-flex items-baseline space-x-5">
                <div>
                    <h4 className="text-2xl">Nav</h4>
                    <ul className="text-sm">
                        <li>Home</li>
                        <li>Shop</li>
                        <li>Categories</li>
                        <li>Discover</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-2xl">About Us</h4>
                    <ul className="text-sm">
                        <li>Team</li>
                        <li>Mission</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-2xl">Support</h4>
                    <ul className="text-sm">
                        <li>Contact</li>
                        <li>Refund Policy</li>
                        <li>FAQs</li>
                    </ul>
                </div>
            </div>
            </div>
            
        </div>
    )
}