import Link from "next/link";
import { Icon } from "@/app/components/ui/Icon";
import { Sparkle } from "@/app/components/ui/Sparkle";

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

/** Add real profile URLs when ready — empty until then so we don't ship bare domain links. */
const socialLinks: Array<{
  href: string;
  label: string;
  icon: "instagram" | "facebook" | "twitter";
}> = [];


export function Footer() {
  return (
    <footer className="bg-brand text-charcoal mt-auto relative z-10 overflow-hidden">
      <Sparkle
        size="lg"
        className="pointer-events-none absolute top-6 right-6 text-charcoal/20 md:top-10 md:right-12 md:text-charcoal/25"
      />
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-16">
          <div>
            <h3 className="font-heading text-2xl mb-4 text-charcoal">Bello</h3>
            <p className="text-sm text-charcoal/80 leading-relaxed mb-6">
              Making sustainable living simple, beautiful, and accessible for everyone.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-charcoal hover:opacity-70 transition-opacity"
                  >
                    <Icon name={social.icon} size={20} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-body text-sm font-bold mb-5 uppercase tracking-wide text-charcoal">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal/80 hover:text-charcoal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-sm font-bold mb-5 uppercase tracking-wide text-charcoal">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal/80 hover:text-charcoal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-sm font-bold mb-5 uppercase tracking-wide text-charcoal">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal/80 hover:text-charcoal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-charcoal/15 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-charcoal/70">
          <p>&copy; {new Date().getFullYear()} Bello. All rights reserved.</p>
          <p>Made with care for the planet</p>
        </div>
      </div>
    </footer>
  );
}
