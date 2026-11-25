/**
 * Reviews integration point.
 *
 * Recommended Shopify review app for headless Storefront API:
 * **Judge.me** (free tier available)
 * - Works with headless/custom storefronts via widget embed or API
 * - Free plan supports basic product reviews
 * - Liam needs to install Judge.me on the Shopify store and connect it
 *
 * Alternatives considered: Loox (paid-focused), Stamped.io (heavier),
 * Shopify Product Reviews (legacy / limited headless support).
 *
 * Do not fake review content. Render this empty state until Judge.me is connected.
 */

export function ReviewsPlaceholder() {
  return (
    <section className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-20 md:py-[140px]">
      <div className="text-center mb-10 md:mb-12">
        <h2>Loved by Customers</h2>
      </div>
      <div className="max-w-3xl mx-auto glass-bg glass-border glass-shadow rounded-md p-10 md:p-12 text-center">
        <p className="font-body text-lg font-bold text-charcoal mb-3">
          Customer Reviews Will Appear Here
        </p>
        <p className="text-mid-gray text-sm leading-relaxed">
          Reviews will show once Judge.me (or another Shopify review app) is
          connected. No placeholder reviews are shown.
        </p>
        {/* Integration point: mount Judge.me widget / fetch reviews API here */}
      </div>
    </section>
  );
}
