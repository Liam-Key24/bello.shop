"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/app/components/ui/Icon";
import { MobileDrawer } from "@/app/components/layout/MobileDrawer";
import { useCartStore } from "@/lib/store/cart";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <>
      <div className="sticky top-0 z-50 glass-nav glass-border border-b">
        <nav className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-5 md:py-6 flex justify-between items-center">
          <Link
            href="/"
            className="font-heading text-2xl md:text-[26px] text-charcoal tracking-tight"
          >
            Bello
          </Link>

          <ul className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-charcoal hover:opacity-70 font-medium text-[15px] transition-opacity"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 md:gap-4 items-center">
            <button
              type="button"
              className="md:hidden p-2 text-charcoal hover:opacity-70 transition-opacity"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <Icon name="menu" size={20} />
            </button>

            <button
              type="button"
              className="hidden md:inline-flex p-2 text-charcoal hover:opacity-70 transition-opacity"
              aria-label="Search"
              // TODO: Wire search when product catalogue grows beyond 2 items
            >
              <Icon name="search" size={20} />
            </button>

            <Link
              href="/cart"
              className="relative p-2 text-charcoal hover:opacity-70 transition-opacity"
              aria-label={`Cart, ${cartCount} items`}
            >
              <Icon name="bag" size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full bg-brand text-charcoal text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>

      <MobileDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
