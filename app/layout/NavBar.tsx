"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NavCartIcon } from "../components/common";
import { useAuth } from "../contexts/AuthContext";
import { Search, User, X, Menu, ChevronDown, ExternalLink, LogOut } from "lucide-react";

const iconClass = "w-5 h-5 text-gray-700 cursor-pointer";
const menuItems = [
  { href: "/shop", label: "Shop All" },
  { href: "/discover", label: "Discover" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, customer, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    router.push("/account/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="fixed z-[9999] w-[90%] glass backdrop-blur-xl h-12 rounded-full inline-flex justify-between items-center px-6 top-2 left-1/2 -translate-x-1/2 transition-all duration-300">
        <Link href="/" className="cursor-pointer">
          <h1 className="text-xl">Bello.today</h1>
        </Link>

        <div className="inline-flex gap-x-4 items-center">
          {isAuthenticated ? (
            <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-1" aria-label="User menu">
              <User className={iconClass} />
              {customer?.firstName && <span className="text-sm text-gray-700 hidden sm:inline">{customer.firstName}</span>}
            </button>
          ) : (
            <Link href="/account/login" aria-label="Login"><User className={iconClass} /></Link>
          )}
          <Search className={iconClass} onClick={() => setIsMenuOpen(true)} />
          {isMenuOpen ? <X className={iconClass} onClick={closeMenu} /> : <Menu className={iconClass} onClick={() => setIsMenuOpen(true)} />}
          <Link href="/cart"><NavCartIcon /></Link>
        </div>
      </div>

      <div className={`w-[90%] glass backdrop-blur-xl rounded-4xl fixed z-[9998] left-1/2 -translate-x-1/2 overflow-hidden transition-all duration-400 ease-in-out ${isMenuOpen ? "top-15 opacity-100 max-h-fit-content" : "top-16 opacity-0 max-h-0"}`}>
        <div className="p-6 pt-2">
          {isAuthenticated && (
            <div className="w-full border-b border-gray-300 mb-2 py-2">
              <div className="flex items-center justify-center gap-6">
                <Link href="/account/profile" className="text-sm text-gray-700 hover:bg-gray-100 px-3 py-1 rounded transition-colors flex items-center gap-2" onClick={closeMenu}>
                  <User className="w-5 h-5 text-gray-700" />
                  {customer?.firstName && <span className="text-lg text-gray-800 font-medium">{customer.firstName}</span>}
                </Link>
                <button onClick={handleLogout} className="text-sm text-red-custom hover:bg-red-50 flex items-center gap-2 px-3 py-1 rounded transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          )}

          <div className="glass rounded-full mb-6 h-12">
            <div className="px-6 py-3 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-500" />
              <input type="text" placeholder="Search products..." className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
            <span className="text-xl text-gray-800">Categories</span>
            <ChevronDown className="w-5 h-5 text-gray-700" />
          </div>

          {menuItems.map((item, i) => (
            <Link key={item.href} href={item.href} className={`flex items-center justify-between ${i < menuItems.length - 1 ? "mb-6" : ""} group cursor-pointer`} onClick={closeMenu}>
              <span className="text-lg text-gray-800 group-hover:text-gray-600 transition-colors">{item.label}</span>
              <ExternalLink className="w-5 h-5 text-gray-700 group-hover:text-gray-600 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {isMenuOpen && <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-[9997] transition-opacity duration-500" onClick={closeMenu} />}
    </>
  );
}
