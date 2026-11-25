# Bello Rebuild: Quick Reference

## Page Audit Summary

| Current Page | Status | Recommendation | New Page Count |
|--------------|--------|----------------|----------------|
| `/` Homepage | ✅ Exists | 🔨 **REBUILD** - too cluttered | 1 |
| `/shop` | ✅ Exists | 🔨 **SIMPLIFY** - merge into homepage | - |
| `/shop/[category]` | ✅ Exists | ❌ **CUT** - no categories needed | - |
| `/product/[handle]` | ✅ Exists | 🔨 **REBUILD** - add trust elements | 1 |
| `/cart` | ✅ Exists | ✅ **KEEP** - improve design | 1 |
| `/account/login` | ✅ Exists | ❌ **CUT** - guest checkout only | - |
| `/account/register` | ✅ Exists | ❌ **CUT** - guest checkout only | - |
| `/account/profile` | ✅ Exists | ❌ **CUT** - guest checkout only | - |
| `/discover` | ❌ Missing | ❌ **CUT** - nav link to nowhere | - |
| `/about` | ❌ Missing | ✅ **ADD** - essential trust page | 1 |
| Shipping info | ❌ Missing | ✅ **ADD** - critical for conversion | 1 |
| Returns policy | ❌ Missing | ✅ **ADD** - trust & legal requirement | 1 |
| Contact | ❌ Missing | ✅ **ADD** - support credibility | 1 |
| FAQ | ❌ Missing | ✅ **ADD** - reduce support burden | 1 |
| Privacy Policy | ❌ Missing | ✅ **ADD** - legal requirement | 1 |
| Terms of Service | ❌ Missing | ✅ **ADD** - legal requirement | 1 |
| **Totals** | **11 current** | **11 new** | **11** |

**Summary:**
- **Keep:** 2 pages (product, cart - both rebuilt)
- **Cut:** 7 pages (shop sections, auth pages, discover)
- **Add:** 7 pages (about, shipping, returns, contact, FAQ, privacy, terms)
- **Rebuild:** Homepage (1 page)

---

## Design System at a Glance

### Colors
```css
Sun Yellow:    #E8E661  /* Badges, accents */
Sage Green:    #98A65D  /* Primary buttons, CTAs */
Deep Teal:     #2D4654  /* Secondary buttons, footer */
Warm Cream:    #FBF8F3  /* Background */
Soft Sand:     #F5F1E8  /* Section backgrounds */
Charcoal:      #1A1A1A  /* Primary text */
Mid Gray:      #6B7280  /* Secondary text */
```

### Typography
```
Headlines:  72px desktop / 48px mobile (DM Sans, 600-700)
Sections:   48px desktop / 36px mobile (DM Sans, 600)
Products:   28px / 24px mobile (DM Sans, 600)
Body:       16-18px (Inter, 400-500)
Small:      14-15px (Inter, 400)
Badges:     13px (DM Sans, 600)
```

### Component Sizes
```
Nav height:        48px
Button height:     48-56px
Card radius:       24px
Button radius:     999px (pill)
Badge radius:      999px (pill)
Icon size:         20-24px
Avatar size:       40-48px
Trust icon size:   56-72px
Section padding:   80px top/bottom
Max width:         1280px
Side padding:      20px
```

---

## Implementation Phases

| Phase | Focus | Branch Name | Deliverable |
|-------|-------|-------------|-------------|
| **1** | Foundation | `rebuild/phase-1-foundation` | Clean codebase, design system |
| **2** | Homepage | `rebuild/phase-2-homepage` | New homepage with trust elements |
| **3** | Product Page | `rebuild/phase-3-product-page` | Product page with reviews & badges |
| **4** | Cart & Checkout | `rebuild/phase-4-cart-checkout` | Improved cart, guest checkout |
| **5** | Support Pages | `rebuild/phase-5-support-pages` | 7 trust/support pages |
| **6** | AutoDS | `rebuild/phase-6-autods` | Product sync & fulfillment |
| **7** | Performance | `rebuild/phase-7-optimization` | SEO, speed, analytics |
| **8** | Testing | `rebuild/phase-8-testing` | Full QA, launch prep |

**Timeline:** 8 weeks (1 phase per week)

---

## Trust Elements Checklist

### Homepage Must-Haves
- ✅ Trust bar (4 indicators: shipping, eco-cert, rating, returns)
- ✅ Customer reviews section (3+ reviews)
- ✅ Guarantees section (quality, carbon-neutral, give-back)
- ✅ Star rating + review count visible
- ✅ Clear value proposition headline
- ✅ Prominent CTAs on featured products

### Product Page Must-Haves
- ✅ Star rating + review count (top of page)
- ✅ Badges (eco-friendly, bestseller, etc.)
- ✅ "What's Included" detailed list
- ✅ Trust badge grid (shipping, returns, carbon-neutral, guarantee)
- ✅ Customer reviews section (3+ reviews)
- ✅ Details accordion (materials, shipping, sustainability)
- ✅ Clear, large product photos
- ✅ Prominent "Add to Cart" button

### Cart Must-Haves
- ✅ Trust badges below order summary
- ✅ Free shipping progress indicator (if applicable)
- ✅ Secure checkout badge
- ✅ 30-day return reminder
- ✅ Clear "Continue to Checkout" button

### Footer Must-Haves
- ✅ Links to all support pages (shipping, returns, contact, FAQ)
- ✅ Links to legal pages (privacy, terms)
- ✅ Social media links
- ✅ Brand tagline
- ✅ Copyright notice

---

## Conversion Funnel Targets

```
Homepage Visit
    ↓ (40%+ click-through)
Product Page
    ↓ (15%+ add to cart)
Cart
    ↓ (70%+ proceed to checkout)
Checkout
    ↓ (overall 2-3% conversion rate)
Purchase Complete
```

---

## Component Inventory

### Components to Remove
```
app/components/Filter/           (empty directory)
app/shop/components/filters/*    (all filter components)
app/account/*                    (all auth pages)
app/components/products/banners/ (category banners)
src/app/                         (duplicate directory)
```

### Components to Keep (Rebuild)
```
app/layout/NavBar.tsx           → Simplify to frosted pill
app/layout/Footer.tsx           → Add trust links
app/cart/page.tsx               → Add trust badges
app/product/[handle]/page.tsx   → Full redesign
```

### Components to Add
```
app/components/trust/TrustBar.tsx
app/components/trust/TrustBadge.tsx
app/components/trust/GuaranteeCard.tsx
app/components/product/ImageGallery.tsx
app/components/product/FeatureList.tsx
app/components/product/DetailsAccordion.tsx
app/components/reviews/ReviewCard.tsx
app/components/reviews/ReviewSection.tsx
app/components/home/Hero.tsx
app/components/home/FeaturedProducts.tsx
```

---

## AutoDS Integration Checklist

### Setup Steps
1. ☐ Sign up for AutoDS account
2. ☐ Install AutoDS Shopify app
3. ☐ Select 2 products from suppliers
4. ☐ Import products to AutoDS
5. ☐ Verify products sync to Shopify
6. ☐ Configure pricing rules
7. ☐ Configure fulfillment settings
8. ☐ Test order placement
9. ☐ Test inventory sync
10. ☐ Document setup process

### Testing Checklist
- ☐ Products display correctly on site
- ☐ Images load properly
- ☐ Descriptions are accurate
- ☐ Prices match expected margins
- ☐ Place test order
- ☐ Order appears in AutoDS
- ☐ Order fulfillment triggers
- ☐ Tracking number syncs to Shopify
- ☐ Inventory updates when stock changes
- ☐ Price updates when supplier changes price

---

## Pre-Launch Checklist

### Content
- ☐ 2 products configured in AutoDS/Shopify
- ☐ Product photos (high quality)
- ☐ Product descriptions written
- ☐ About Us page content
- ☐ Shipping & delivery info
- ☐ Returns & refunds policy
- ☐ FAQ content (10+ questions)
- ☐ Privacy policy
- ☐ Terms of service
- ☐ Contact form configured
- ☐ Social media links added

### Technical
- ☐ All pages have SEO metadata
- ☐ Analytics installed (Google Analytics or Vercel)
- ☐ Error tracking setup (optional: Sentry)
- ☐ Sitemap.xml generated
- ☐ Robots.txt configured
- ☐ SSL certificate active
- ☐ Domain configured (bello.today / bello.shop)
- ☐ Email notifications working (order confirmations)

### Testing
- ☐ Desktop browser testing (Chrome, Safari, Firefox)
- ☐ Mobile device testing (iPhone, Android)
- ☐ Tablet testing (iPad)
- ☐ End-to-end purchase test
- ☐ Cart functionality tested
- ☐ Checkout flow tested
- ☐ Order fulfillment tested
- ☐ Performance test (Lighthouse 90+)
- ☐ Accessibility test (WCAG AA)
- ☐ Security audit passed

### Legal & Compliance
- ☐ Privacy policy reviewed
- ☐ Terms of service reviewed
- ☐ GDPR compliance (if EU customers)
- ☐ Cookie banner (if required)
- ☐ Business registered
- ☐ Payment processor configured
- ☐ Tax settings configured

---

## Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Performance | 90+ | Chrome DevTools |
| Lighthouse Accessibility | 90+ | Chrome DevTools |
| Lighthouse Best Practices | 90+ | Chrome DevTools |
| Lighthouse SEO | 90+ | Chrome DevTools |
| LCP (Largest Contentful Paint) | <2.5s | PageSpeed Insights |
| FID (First Input Delay) | <100ms | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | <0.1 | PageSpeed Insights |
| Mobile Page Load | <3s | WebPageTest |
| Desktop Page Load | <2s | WebPageTest |

---

## Key Files Location

### Mockups
```
/workspace/mockup/homepage.html
/workspace/mockup/product-page.html
/workspace/mockup/screenshots/homepage-desktop.png
/workspace/mockup/screenshots/product-desktop.png
```

### Documentation
```
/workspace/mockup/BELLO_REBUILD_PLAN.md      (full technical plan)
/workspace/mockup/EXECUTIVE_SUMMARY.md        (non-technical overview)
/workspace/mockup/QUICK_REFERENCE.md          (this file)
```

### Artifacts
```
/opt/cursor/artifacts/homepage-desktop.png
/opt/cursor/artifacts/product-desktop.png
```

### Branch
```
mockup/bello-rebuild-514c  (not merged to main)
```

---

## Decision Points

### Design Decisions Needed
- ☐ Approve color palette (sunny premium aesthetic)
- ☐ Approve typography (large headlines, clean body)
- ☐ Approve glassmorphism style (light frosted panels)
- ☐ Approve mockups (homepage + product page)

### Business Decisions Needed
- ☐ Select 2 hero products (names, suppliers)
- ☐ Set pricing (what margins?)
- ☐ Write brand story (for About page)
- ☐ Define sustainability claims (what certifications?)
- ☐ Choose shipping partner (for accurate delivery times)
- ☐ Define return policy (who pays return shipping?)
- ☐ Set up business email (for contact form)

### Technical Decisions Needed
- ☐ Approve 8-week timeline (or adjust?)
- ☐ Confirm AutoDS as fulfillment method
- ☐ Choose analytics provider (Google Analytics or Vercel?)
- ☐ Decide on live chat (yes/no?)
- ☐ Decide on email capture popup (yes/no?)

---

## Contact & Next Actions

**Current Status:** Study complete, mockups ready, awaiting approval

**Review Items:**
1. Open `mockup/homepage.html` in browser
2. Open `mockup/product-page.html` in browser
3. Review `EXECUTIVE_SUMMARY.md` for overview
4. Review `BELLO_REBUILD_PLAN.md` for details

**Approval Needed:**
- Design aesthetic (colors, fonts, layout)
- Page structure (11 pages, trust elements)
- Implementation timeline (8 phases, 8 weeks)

**Next Steps (When Approved):**
1. Create Phase 1 branch (`rebuild/phase-1-foundation`)
2. Begin foundation work (clean code, design system)
3. Merge to staging for review
4. Proceed to Phase 2 (homepage)

---

**Last Updated:** November 25, 2026  
**Branch:** `mockup/bello-rebuild-514c`  
**Status:** ⏸️ Planning complete, no code changes made
