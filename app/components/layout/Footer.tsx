import Link from "next/link";
import { Icon } from "@/app/components/ui/Icon";

const shopLinks = [{ href: "/shop", label: "All Products" }];

const supportLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/faq", label: "FAQ" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: "instagram" as const },
  { href: "https://facebook.com", label: "Facebook", icon: "facebook" as const },
  { href: "https://twitter.com", label: "Twitter", icon: "twitter" as const },
];

export function Footer() {
  return (
    <footer className="bg-brand-deep text-white mt-auto relative z-10">
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-16">
          <div>
            <h3 className="font-serif text-2xl mb-4 text-white">Bello</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Making sustainable living simple, beautiful, and accessible for everyone.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white hover:opacity-70 transition-opacity"
                >
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold mb-5 uppercase tracking-wide text-white">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold mb-5 uppercase tracking-wide text-white">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold mb-5 uppercase tracking-wide text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Bello. All rights reserved.</p>
          <p>Made with care for the planet</p>
        </div>
      </div>
    </footer>
  );
}
