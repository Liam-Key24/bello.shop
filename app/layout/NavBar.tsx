"use client"

import Link from "next/link"
import { useState } from "react"
import NavCartIcon from "../components/ui/NavCartIcon"
import { Search, User, X, Menu, ChevronDown, ExternalLink, } from "lucide-react"

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <div className="w-[90%] glass h-12 rounded-full inline-flex justify-between items-center px-6 fixed z-10 top-5 left-1/2 -translate-x-1/2 transition-all duration-300">
                <Link href={'/'} className="cursor-pointer">
                    <h1 className="text-xl">Bello.today</h1>
                </Link>

                <div className="inline-flex gap-x-4 items-center">
                    <Search
                        className="w-5 h-5 text-gray-700 cursor-pointer"
                        onClick={() => setIsMenuOpen(true)}
                    />
                    <User className="w-5 h-5 text-gray-700 cursor-pointer" />
                    {isMenuOpen ? (
                        <X
                            className="w-5 h-5 text-gray-700 cursor-pointer"
                            onClick={() => setIsMenuOpen(false)}
                        />
                    ) : (
                        <Menu
                            className="w-5 h-5 text-gray-700 cursor-pointer"
                            onClick={() => setIsMenuOpen(true)}
                        />
                    )}
                    <Link href={'/cart'}>
                        <NavCartIcon/>

                    </Link>
                </div >
            </div >

            {/* Dropdown Menu */}
            < div
                className={`w-[90%] glass rounded-4xl fixed z-9 left-1/2 -translate-x-1/2 overflow-hidden transition-all duration-400 ease-in-out ${isMenuOpen ? 'top-5 opacity-100 max-h-96 pt-10' : 'top-5 opacity-0 max-h-0'
                    }`
                }
            >
                <div className="p-6 pt-8">

                    {/* Search Bar */}
                    <div className="glass border-[#DAE7DA] rounded-full mb-6 h-12">
                        <div className="px-6 py-3 flex items-center gap-3">
                            <Search className="w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Categories Dropdown */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
                        <span className="text-xl text-gray-800">Categories</span>
                        <ChevronDown className="w-5 h-5 text-gray-700" />
                    </div>

                    {/* Menu Items */}
                    <Link
                        href={'/shop'}
                        className="flex items-center justify-between mb-6 group cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="text-lg text-gray-800 group-hover:text-gray-600 transition-colors">Shop All</span>
                        <ExternalLink className="w-5 h-5 text-gray-700 group-hover:text-gray-600 transition-colors" />
                    </Link>

                    <Link
                        href={'/discover'}
                        className="flex items-center justify-between mb-6 group cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="text-lg text-gray-800 group-hover:text-gray-600 transition-colors">Discover</span>
                        <ExternalLink className="w-5 h-5 text-gray-700 group-hover:text-gray-600 transition-colors" />
                    </Link>

                    <Link
                        href={'/about'}
                        className="flex items-center justify-between group cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="text-lg text-gray-800 group-hover:text-gray-600 transition-colors">About</span>
                        <ExternalLink className="w-5 h-5 text-gray-700 group-hover:text-gray-600 transition-colors" />
                    </Link>
                </div>
            </div >

            {/* Backdrop overlay */}
            {
                isMenuOpen && (
                    <div
                        className="fixed inset-0 backdrop-blur-sm bg-opacity-20 z-8 transition-opacity duration-500"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )
            }
        </>
    )
}