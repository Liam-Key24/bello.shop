/**
 * Footer Component - Stage 1 Skeleton
 * 
 * Footer with 4-column grid layout and social links.
 * Full implementation in Stage 2 (all links, social icons).
 * 
 * Design: Deep green background, white text, sticky to bottom
 */

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-brand-deep)] text-white mt-auto relative z-10">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--spacing-horizontal)] py-20">
        {/* Footer Grid - Skeleton (Stage 2: complete content) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          {/* Brand Column */}
          <div>
            <h3 className="font-serif text-2xl mb-4">Bello</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Making sustainable living simple, beautiful, and accessible for everyone.
            </p>
            {/* Social Links (Stage 2: icons) */}
            <div className="flex gap-4">
              <span className="text-xs text-white/60">Social icons: Stage 2</span>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-display text-sm font-bold mb-5 uppercase tracking-wide">Shop</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-white/80 hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-display text-sm font-bold mb-5 uppercase tracking-wide">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm text-white/80 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-sm text-white/80 hover:text-white transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-sm text-white/80 hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="text-sm text-white/80 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-display text-sm font-bold mb-5 uppercase tracking-wide">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy" className="text-sm text-white/80 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-white/80 hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-white/70">
          <p>&copy; 2026 Bello. All rights reserved.</p>
          <p>Made with care for the planet</p>
        </div>
      </div>
    </footer>
  );
}
