"use client";

import Link from "next/link";
import { Icon } from "@/app/components/ui/Icon";

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close menu overlay"
        className="fixed inset-0 z-[60] bg-charcoal/20 md:hidden"
        onClick={onClose}
      />
      <nav
        aria-label="Mobile navigation"
        className="fixed top-20 right-4 z-[70] w-72 glass-bg glass-border glass-shadow-lg rounded-md p-6 md:hidden"
      >
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-charcoal hover:opacity-70 transition-opacity"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <ul className="space-y-5">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block text-base font-medium text-charcoal hover:opacity-70 transition-opacity py-2"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
