'use client'

import { ArrowRight, ArrowUpRight } from 'lucide-react';

export function ProductSuggestions () {
    return ( 
        <>
            <section className="container mx-auto p-4">
                <h1>Most Popular</h1>
                <div className="grid grid-cols-2 grid-rows-2 gap-2">

                    <div className="relative">
                        <img 
                            src="/media/nataliya-melnychuk-tnWjbdPmk1M-unsplash.jpg" 
                            alt="Product 1"
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                        <p className="absolute bottom-4 left-4 text-white font-semibold bg-black/50 px-3 py-1 rounded">
                            Product 1
                        </p>
                    </div>
                    <div className="relative">
                        <img 
                            src="/media/neauthy-skincare-M8Vl5jWSV9s-unsplash.jpg" 
                            alt="Product 2"
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                        <p className="absolute bottom-4 left-4 text-white font-semibold bg-black/50 px-3 py-1 rounded">
                            Product 2
                        </p>
                    </div>
                    <div className="relative">
                        <img 
                            src="/media/nataliya-melnychuk-PdzMmdHqN2c-unsplash.jpg" 
                            alt="Product 3"
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                        <p className="absolute bottom-4 left-4 text-white font-semibold bg-black/50 px-3 py-1 rounded">
                            Product 3
                        </p>
                    </div>
                    <div className="relative">
                        <img 
                            src="/media/enecta-cannabis-extracts-80wCkpt-IKE-unsplash.jpg" 
                            alt="Product 4"
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                        <p className="absolute bottom-4 left-4 text-white font-semibold bg-black/50 px-3 py-1 rounded">
                            Product 4
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}