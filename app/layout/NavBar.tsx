"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { NavCartIcon } from "../components/common"
import { useAuth } from "../contexts/AuthContext"
import { Search, User, X, Menu, ChevronDown, ExternalLink, LogOut } from "lucide-react"

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const { isAuthenticated, customer, logout } = useAuth()
    const router = useRouter()
    const userMenuRef = useRef<HTMLDivElement>(null)

    const handleLogout = async () => {
        await logout()
        setShowUserMenu(false)
        router.push('/account/login')
    }

    // Close user menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false)
            }
        }

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showUserMenu])

    return (
        <>
            <div className="fixed z-50 w-[90%] glass h-12 rounded-full inline-flex justify-between items-center px-6 top-5 left-1/2 -translate-x-1/2 transition-all duration-300">
                <Link href={'/'} className="cursor-pointer">
                    <h1 className="text-xl">Bello.today</h1>
                </Link>

                <div className="inline-flex gap-x-4 items-center">
                    <Search
                        className="w-5 h-5 text-gray-700 cursor-pointer"
                        onClick={() => setIsMenuOpen(true)}
                    />
                    {isAuthenticated ? (
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-1"
                                aria-label="User menu"
                            >
                                <User className="w-5 h-5 text-gray-700 cursor-pointer" />
                                {customer?.firstName && (
                                    <span className="text-sm text-gray-700 hidden sm:inline">
                                        {customer.firstName}
                                    </span>
                                )}
                            </button>
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-48 glass rounded-4xl p-2 shadow-lg z-50">
                                    <Link
                                        href="/account/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/account/login" aria-label="Login">
                            <User className="w-5 h-5 text-gray-700 cursor-pointer" />
                        </Link>
                    )}
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
                    <div className="glass border-frosty-green rounded-full mb-6 h-12">
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