/**
 * Navbar Component - Stage 1 Skeleton
 * 
 * Sticky frosted glass navbar at top of page.
 * Full implementation in Stage 2 (nav links, mobile menu, cart icon).
 * 
 * Design: v5 glassmorphism - frosted white, backdrop blur, sticky positioning
 */

"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <div className="sticky top-0 z-50 glass-nav glass-border border-b shadow-sm">
      <nav className="max-w-[var(--max-width)] mx-auto px-[var(--spacing-horizontal)] py-6 flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className="font-serif text-[28px] font-semibold text-[var(--color-brand-deep)] tracking-tight"
        >
          Bello
        </Link>

        {/* Navigation Links - Desktop (Stage 2) */}
        <ul className="hidden md:flex gap-10">
          <li><Link href="/" className="text-[var(--color-charcoal)] hover:text-[var(--color-brand-deep)] font-medium text-[15px] transition-colors">Home</Link></li>
          <li><Link href="/about" className="text-[var(--color-charcoal)] hover:text-[var(--color-brand-deep)] font-medium text-[15px] transition-colors">Our Story</Link></li>
          <li><Link href="/contact" className="text-[var(--color-charcoal)] hover:text-[var(--color-brand-deep)] font-medium text-[15px] transition-colors">Contact</Link></li>
        </ul>

        {/* Icons (Stage 2: search, cart with count, hamburger) */}
        <div className="flex gap-4 items-center">
          <span className="text-[var(--color-mid-gray)] text-sm">Stage 2: Icons</span>
        </div>
      </nav>
    </div>
  );
}
