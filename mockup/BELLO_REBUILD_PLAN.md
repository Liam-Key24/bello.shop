# Bello Rebuild: Design & Implementation Plan

**Project:** Bello.today / Bello.shop  
**Purpose:** Full rebuild into a lean, trustworthy, money-making eco-lifestyle dropshipping store  
**Date:** November 25, 2026  
**Status:** Study + Mockup Phase (NO CODE CHANGES)

---

## Executive Summary

This document outlines a complete redesign of Bello from a cluttered multi-category shop into a focused, premium 2-product eco-lifestyle brand. The new design blends calm, premium aesthetics (inspired by minimalist skincare brands) with confident, sunny eco-branding (inspired by festival poster design), featuring light glassmorphism and a warm, trustworthy user experience.

**Key Transformation:**
- **From:** Generic health/beauty shop with complex filtering, authentication, and 50+ products
- **To:** Curated eco-lifestyle brand with 2 hero products, trust-first design, and seamless AutoDS integration

---

## 1. Current Site Audit

### 1.1 Technology Stack
- **Framework:** Next.js 16.0.1 (App Router)
- **Styling:** Tailwind CSS 4.1.17 + Custom CSS (glassmorphism, neumorphism)
- **Backend:** Shopify Storefront API (GraphQL)
- **State:** Zustand (cart management)
- **Fonts:** Cabinet Grotesk (headings), Satoshi (body)
- **Icons:** Phosphor Icons

### 1.2 Current Page Inventory & Recommendations

| Page/Route | Current Status | Recommendation | Reason |
|------------|---------------|----------------|---------|
| `/` (Homepage) | Hero card, product banners, category sections | **REBUILD** | Cluttered layout, too many CTAs, no clear value prop |
| `/shop` | Full catalog with filters (brand, price, rating) | **SIMPLIFY** | Overkill for 2 products; merge into homepage |
| `/shop/[category]` | Category-specific product grids | **CUT** | No categories needed for 2 products |
| `/product/[handle]` | Product detail page | **REBUILD** | Good structure but needs trust elements, cleaner design |
| `/cart` | Cart with order summary | **KEEP & IMPROVE** | Add trust badges, improve checkout flow |
| `/account/*` (login, register, profile) | Full authentication system | **CUT** | Guest checkout only; reduces friction |
| `/discover` | Listed in nav but doesn't exist | **CUT** | Nav link to nowhere |
| `/about` | Listed in nav but doesn't exist | **ADD** | Essential trust page: "Our Story" |
| Shipping/Returns pages | None | **ADD** | Critical trust/conversion pages |
| Contact page | None | **ADD** | Support credibility |
| FAQ page | None | **ADD** | Reduce support burden |
| Privacy/Terms | None | **ADD** | Legal requirement |

### 1.3 Current Component Analysis

**Components to Keep:**
- Product card structure (needs redesign)
- Cart functionality (Zustand store)
- Image optimization (Next.js Image)
- Glass/neumorphism styling (simplify to light glass only)

**Components to Remove:**
- All filter components (BrandFilter, PriceFilter, RatingsFilter, etc.)
- Authentication components (login, register, profile)
- Complex navigation menu
- Product categories/collections
- Empty "Filter" directory
- Unused `src/app/` duplicate directory

**Components to Add:**
- Trust badge components
- Review/testimonial cards
- Guarantee cards
- Simple contact form
- Product comparison (2 products side-by-side)

### 1.4 Current Issues (from Audit Report)
- React Strict Mode disabled
- 34 instances of TypeScript `any`
- Client-side product fetching (should be SSR)
- Hardcoded values (no config)
- Security issues (weak CSP, exposed tokens)
- No error boundaries
- In-memory rate limiting (not production-ready)
- Excessive re-renders in cart
- No tests

---

## 2. New Site Design Proposal

### 2.1 Sitemap (Lean Structure)

```
bello.shop
│
├─ Home (/)
│  ├─ Hero section (value prop + main CTA)
│  ├─ Trust bar (shipping, eco-cert, ratings, returns)
│  ├─ Featured products (2 products side-by-side)
│  ├─ Guarantees section (quality, carbon-neutral, give-back)
│  └─ Customer reviews
│
├─ Product Page (/product/[slug])
│  ├─ Image gallery
│  ├─ Product info (badges, title, rating, price)
│  ├─ What's included
│  ├─ Quantity selector
│  ├─ Add to cart / Buy now
│  ├─ Trust badges (shipping, returns, carbon-neutral, guarantee)
│  ├─ Details accordion (materials, shipping, sustainability)
│  └─ Customer reviews
│
├─ Cart (/cart)
│  ├─ Cart items
│  ├─ Order summary
│  ├─ Trust badges
│  └─ Checkout CTA
│
├─ Checkout (Shopify hosted)
│  └─ Redirect to Shopify secure checkout
│
├─ About Us (/about)
│  ├─ Brand story
│  ├─ Mission & values
│  └─ Sustainability commitment
│
├─ Shipping & Delivery (/shipping)
│  ├─ Delivery times
│  ├─ Shipping costs
│  └─ Tracking info
│
├─ Returns & Refunds (/returns)
│  ├─ 30-day guarantee
│  ├─ Return process
│  └─ Refund policy
│
├─ Contact (/contact)
│  ├─ Contact form
│  ├─ Email/social links
│  └─ FAQ link
│
├─ FAQ (/faq)
│  └─ Common questions
│
└─ Legal
   ├─ Privacy Policy (/privacy)
   └─ Terms of Service (/terms)
```

**Total Pages:** 11 (down from 15+ current routes)

### 2.2 Design System

#### Color Palette
Blending sunny festival vibes with premium calm aesthetics:

```css
/* Primary Colors */
--color-sun-yellow: #E8E661;      /* Accent, badges, highlights (festival poster) */
--color-sage-green: #98A65D;      /* Primary CTA, trust elements (eco-friendly) */
--color-deep-teal: #2D4654;       /* Secondary CTA, footer (sophistication) */

/* Neutral Base */
--color-warm-cream: #FBF8F3;      /* Background (premium, soft) */
--color-soft-sand: #F5F1E8;       /* Subtle sections, cards */
--color-charcoal: #1A1A1A;        /* Primary text */
--color-mid-gray: #6B7280;        /* Secondary text, borders */

/* Glassmorphism Variables */
--glass-bg: rgba(251, 248, 243, 0.65);
--glass-border: rgba(152, 166, 93, 0.15);
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
```

**Color Psychology:**
- **Yellow:** Optimism, energy, sunshine, eco-consciousness
- **Sage Green:** Nature, sustainability, calm confidence
- **Teal:** Trust, sophistication, stability
- **Cream/Sand:** Premium, natural, organic

#### Typography
Following the "Serum" inspiration (huge thin headlines + refined body):

```css
--font-display: 'DM Sans', sans-serif;  /* Headings (geometric, modern) */
--font-body: 'Inter', sans-serif;       /* Body copy (readable, clean) */

/* Type Scale */
h1: 72px / 56px mobile (product hero, homepage headline)
h2: 48px / 36px mobile (section headers)
h3: 28px / 24px mobile (product titles, subsections)
h4: 20px (feature titles, card headers)
Body: 16-18px (comfortable reading)
Small: 14-15px (captions, metadata)
Tiny: 13px (badges, fine print)

/* Weights */
Display: 600-700 (confident but not aggressive)
Body: 400-500 (light, airy, readable)
```

**Rationale:** Large, airy headlines create premium feel (like high-end skincare); clean sans-serif for trust and modernity.

#### Glassmorphism Style
Light, frosted glass elements (not heavy blur):

```css
.glass-panel {
  background: rgba(251, 248, 243, 0.65);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(152, 166, 93, 0.15);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.glass-button {
  background: rgba(251, 248, 243, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(152, 166, 93, 0.15);
  border-radius: 999px;
  padding: 14px 32px;
}

.primary-button {
  background: #98A65D (sage green);
  color: white;
  border-radius: 999px;
  padding: 16px 40px;
  box-shadow: 0 4px 12px rgba(152, 166, 93, 0.3);
}
```

**Usage:**
- Navigation bar (fixed, frosted)
- Product cards
- Secondary buttons
- Modal overlays
- Review cards

#### Component Styling

**Navigation:**
- Fixed frosted-glass pill at top
- Logo left, icons right (search, cart)
- Minimal links (Shop, About, Contact)
- Cart badge shows item count
- Mobile: hamburger menu

**Buttons:**
- Primary: Sage green, rounded pill, strong shadow
- Secondary: White with green border, rounded pill
- Glass: Frosted, subtle, non-intrusive
- Hover: Scale 1.02-1.05, subtle shadow increase

**Cards:**
- Product cards: Glass panel, 24px border-radius
- Review cards: Glass panel, avatar + stars + text
- Guarantee cards: White background, centered icon, shadow

**Badges:**
- Yellow background (#E8E661)
- Teal text (#2D4654)
- Rounded pill (999px)
- Small (13-14px font)
- Use emoji icons (🌿 ♻️ ⭐ ✓)

**Spacing:**
- Section padding: 80px top/bottom
- Card gaps: 32-40px
- Element gaps: 16-24px
- Max width: 1280px
- Side padding: 20px

#### Motion & Interaction

```css
/* Transitions */
all 0.2s ease (buttons, hover states)
all 0.3s ease (cards, panels)

/* Hover Effects */
Cards: translateY(-4px to -8px)
Buttons: scale(1.02-1.05)
Icons: background color change

/* Loading States */
Skeleton screens with pulse animation
Spinner for cart operations

/* Scroll Behavior */
Smooth scroll
Sticky navigation
Fade-in on scroll for sections
```

### 2.3 Page-by-Page Structure

#### Homepage

**Hero Section:**
- Large headline (72px): "Live Better, Waste Less"
- Subheadline (20px): Value proposition
- Dual CTA: Primary "Shop Now" + Secondary "Learn More"
- Hero image: Lifestyle photo with product context
- Badge overlay: "🌿 100% Eco-Friendly"

**Trust Bar:**
- 4 trust indicators in a row
- Icon + headline + subtext
- Free shipping | Eco-certified | Rated 4.9/5 | 30-day returns

**Featured Products:**
- 2 products side-by-side (desktop) or stacked (mobile)
- Glass panel cards
- Product image (400px height)
- Title + price
- Short description
- Feature tags (badges)
- Dual CTA: "Add to Cart" + "Learn More"

**Guarantees Section:**
- Soft sand background section
- 3 cards: Quality Guarantee | Carbon Neutral | Give Back Program
- Icon + headline + description

**Reviews Section:**
- 3 review cards
- 5-star rating
- Quote
- Avatar + name + "Verified Customer"

**Footer:**
- Deep teal background
- 4 columns: Brand | Shop | Support | Company
- Social links
- Copyright + tagline

#### Product Page

**Layout:**
- Two-column (desktop): Images left, info right
- Single column (mobile): Images top, info below

**Product Images:**
- Sticky main image (600px height)
- Thumbnail grid (4 images)
- Click to change main image

**Product Info:**
- Badges (eco-friendly, bestseller)
- Huge headline (56px)
- Star rating + review count
- Large price (36px)
- Description (18px, airy)
- "What's Included" feature list with icons
- Quantity selector
- Dual CTA: "Add to Cart" + "Buy Now"
- Trust badges grid (4 badges, 2x2)
- Details accordion (materials, shipping, sustainability)

**Reviews Section:**
- Average rating display
- 3+ individual reviews
- Reviewer avatar, name, stars, text

#### Cart Page

**Structure:**
- Cart item cards (image, title, price, quantity, remove)
- Order summary panel (subtotal, shipping, total)
- Trust badges
- Primary CTA: "Continue to Checkout"
- Secondary link: "Continue Shopping"

**Trust Elements:**
- Free shipping indicator if over £30
- Secure checkout badge
- 30-day return reminder

#### Support Pages

**About Page:**
- Hero section: Brand story
- Mission statement
- Sustainability commitment
- Team photo (optional)
- Call-to-action to shop

**Shipping Page:**
- Delivery times table
- Shipping cost breakdown
- Tracking instructions
- International shipping info

**Returns Page:**
- 30-day guarantee headline
- Step-by-step return process
- Refund timeline
- Contact info for support

**Contact Page:**
- Simple form (name, email, message)
- Email address
- Social media links
- Link to FAQ

**FAQ Page:**
- Accordion-style questions
- Categories: Orders, Shipping, Returns, Products, Sustainability

**Legal Pages:**
- Simple text layouts
- Privacy Policy (data handling, cookies, GDPR)
- Terms of Service (purchase terms, liability)

### 2.4 Conversion & Trust Elements

**On Every Page:**
- Frosted glass nav with cart count
- Secure payment badge in footer
- Clear return policy link

**Homepage:**
- Trust bar (4 key indicators)
- Customer review section
- Guarantee section
- Social proof (rating, review count)

**Product Page:**
- Star rating + review count (top of page)
- Badge indicators (eco-friendly, bestseller)
- Trust badge grid (shipping, returns, carbon-neutral, guarantee)
- Customer reviews section
- "What's Included" detailed list
- Sustainability details in accordion

**Cart:**
- Free shipping progress bar (if applicable)
- Trust badges below order summary
- Secure checkout indicator
- 30-day return reminder

**Checkout:**
- Shopify-hosted (secure, trusted)
- SSL badge
- Payment method icons

**Key Trust Signals:**
1. ⭐ 4.9/5 rating (256+ reviews)
2. 🚚 Free shipping over £30
3. 🔄 30-day money-back guarantee
4. ♻️ 100% eco-certified materials
5. 🌍 Carbon-neutral delivery
6. ❤️ 5% donated to conservation
7. ✓ Secure checkout (Shopify)

---

## 3. Technical Implementation Plan

### 3.1 Phase 1: Foundation (Week 1)
**Branch:** `rebuild/phase-1-foundation`

**Tasks:**
1. Enable React Strict Mode
2. Remove unused code:
   - Delete `src/app/` directory
   - Remove filter components
   - Remove auth components
   - Delete empty directories
3. Update dependencies (security patches)
4. Create new design system CSS
5. Set up environment variables properly
6. Add error boundaries

**Files Changed:**
- `next.config.ts`
- `app/globals.css`
- Delete: `src/`, `app/components/Filter/`, `app/account/`, `app/shop/components/filters/`
- New: `app/components/trust/`, `app/components/guarantee/`

**PR:** "Phase 1: Clean foundation and design system"

### 3.2 Phase 2: Homepage Rebuild (Week 2)
**Branch:** `rebuild/phase-2-homepage`

**Tasks:**
1. Rebuild homepage layout
2. Create new hero section
3. Add trust bar component
4. Build featured products section (2 products)
5. Add guarantees section
6. Add reviews section
7. Update footer
8. Update navigation

**New Components:**
- `app/components/home/Hero.tsx`
- `app/components/home/TrustBar.tsx`
- `app/components/home/FeaturedProducts.tsx`
- `app/components/home/Guarantees.tsx`
- `app/components/home/Reviews.tsx`

**PR:** "Phase 2: New homepage with trust-first design"

### 3.3 Phase 3: Product Page Redesign (Week 3)
**Branch:** `rebuild/phase-3-product-page`

**Tasks:**
1. Rebuild product page layout
2. Add image gallery with thumbnails
3. Improve product info section
4. Add "What's Included" feature list
5. Add trust badge grid
6. Add details accordion
7. Add reviews section
8. Improve quantity selector
9. Update buy buttons

**Files Changed:**
- `app/product/[handle]/page.tsx`
- New: `app/components/product/ImageGallery.tsx`
- New: `app/components/product/FeatureList.tsx`
- New: `app/components/product/TrustBadges.tsx`
- New: `app/components/product/DetailsAccordion.tsx`

**PR:** "Phase 3: Product page with enhanced trust elements"

### 3.4 Phase 4: Cart & Checkout (Week 4)
**Branch:** `rebuild/phase-4-cart-checkout`

**Tasks:**
1. Improve cart page design
2. Add trust badges to cart
3. Add free shipping progress indicator
4. Simplify checkout flow (guest only)
5. Add order summary improvements
6. Test Shopify checkout integration

**Files Changed:**
- `app/cart/page.tsx`
- `app/cart/components/OrderSummary.tsx`
- `app/api/shopify/checkout/route.ts`
- New: `app/components/cart/TrustBadges.tsx`
- New: `app/components/cart/ShippingProgress.tsx`

**PR:** "Phase 4: Improved cart and streamlined checkout"

### 3.5 Phase 5: Support Pages (Week 5)
**Branch:** `rebuild/phase-5-support-pages`

**Tasks:**
1. Create About Us page
2. Create Shipping & Delivery page
3. Create Returns & Refunds page
4. Create Contact page (with form)
5. Create FAQ page (accordion)
6. Create Privacy Policy page
7. Create Terms of Service page
8. Update footer links

**New Files:**
- `app/about/page.tsx`
- `app/shipping/page.tsx`
- `app/returns/page.tsx`
- `app/contact/page.tsx`
- `app/faq/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`

**PR:** "Phase 5: Essential trust and support pages"

### 3.6 Phase 6: AutoDS Integration (Week 6)
**Branch:** `rebuild/phase-6-autods`

**Tasks:**
1. Research AutoDS Shopify integration
2. Test product sync (2 products)
3. Configure inventory sync
4. Test order fulfillment flow
5. Add AutoDS webhook handlers (if needed)
6. Document AutoDS setup process

**Files:**
- `app/api/autods/` (new)
- Update: Product fetching logic to handle AutoDS products
- Documentation: `docs/AUTODS_SETUP.md`

**PR:** "Phase 6: AutoDS integration and documentation"

### 3.7 Phase 7: Performance & SEO (Week 7)
**Branch:** `rebuild/phase-7-optimization`

**Tasks:**
1. Add proper metadata to all pages
2. Implement structured data (JSON-LD)
3. Add Open Graph tags
4. Optimize images (WebP, lazy loading)
5. Add sitemap.xml
6. Add robots.txt
7. Implement analytics (Google Analytics / Vercel Analytics)
8. Add performance monitoring
9. Run Lighthouse audits
10. Fix Core Web Vitals issues

**Files:**
- Update all `page.tsx` files with metadata
- New: `app/sitemap.ts`
- New: `public/robots.txt`
- Update: `app/layout.tsx` (analytics)

**PR:** "Phase 7: Performance optimization and SEO"

### 3.8 Phase 8: Testing & Launch Prep (Week 8)
**Branch:** `rebuild/phase-8-testing`

**Tasks:**
1. Add unit tests (key components)
2. Add integration tests (checkout flow)
3. E2E tests (Playwright)
4. Mobile responsiveness testing
5. Cross-browser testing
6. Security audit
7. Load testing
8. Final design polish
9. Documentation update
10. Staging deployment

**New Files:**
- `tests/unit/` (Vitest tests)
- `tests/e2e/` (Playwright tests)
- `docs/TESTING.md`
- `docs/DEPLOYMENT.md`

**PR:** "Phase 8: Testing suite and launch preparation"

### 3.9 Deployment Strategy

**Environments:**
1. **Development:** Local (`npm run dev`)
2. **Staging:** Vercel preview branch (`staging`)
3. **Production:** Vercel production (`main`)

**Deployment Flow:**
1. Each phase PR merges into `staging` branch
2. Test on staging environment
3. User acceptance testing (Liam reviews)
4. Merge `staging` → `main` for production
5. Monitor production (Vercel Analytics, Sentry)

**Rollback Plan:**
- Vercel instant rollback available
- Keep `main` branch stable
- Never merge untested code to `main`

---

## 4. AutoDS Integration Notes

### 4.1 AutoDS Overview
AutoDS is a dropshipping automation platform that syncs with Shopify:
- **Product Import:** Automatically import products from suppliers
- **Inventory Sync:** Real-time stock updates
- **Price Monitoring:** Automatic price adjustments
- **Order Fulfillment:** Automated order placement with suppliers

### 4.2 Integration Requirements

**Shopify Setup:**
1. AutoDS app installed on Shopify store
2. Product sync configured (2 products)
3. Fulfillment settings configured

**Frontend Changes:**
- Product data comes from Shopify (no frontend changes needed)
- Handle AutoDS-specific product metadata (if any)
- Display supplier info (optional, for transparency)

**Backend Considerations:**
- Shopify Storefront API continues to work normally
- No direct AutoDS API calls needed (AutoDS ↔ Shopify handles it)
- May need webhook handlers for inventory updates (optional)

**Testing:**
1. Import 2 test products via AutoDS
2. Verify product data appears correctly
3. Place test order
4. Verify order sent to AutoDS for fulfillment
5. Test inventory sync (product goes out of stock)
6. Test price sync (supplier price changes)

**Documentation Needed:**
- AutoDS account setup
- Product import process
- Fulfillment settings
- Inventory/price sync configuration
- Troubleshooting guide

---

## 5. Visual Mockup Summary

### 5.1 Mockup Files Created
Located in `/workspace/mockup/`:

1. **`homepage.html`** - Full homepage design
   - Hero section with large headline
   - Trust bar with 4 indicators
   - 2 featured products side-by-side
   - Guarantees section (3 cards)
   - Customer reviews (3 cards)
   - Footer with 4 columns

2. **`product-page.html`** - Product detail page
   - Image gallery (main + 4 thumbnails)
   - Product info (badges, title, rating, price)
   - What's Included feature list
   - Quantity selector
   - Dual CTA buttons
   - Trust badges grid (2x2)
   - Details accordion
   - Customer reviews section

3. **Screenshots** (in `/opt/cursor/artifacts/`):
   - `homepage-desktop.png` (1440x900)
   - `product-desktop.png` (1440x900)

### 5.2 Design System Implementation

**Color Usage:**
- Background: Warm cream (#FBF8F3)
- Primary CTA: Sage green (#98A65D)
- Accent: Sun yellow (#E8E661) for badges
- Text: Charcoal (#1A1A1A) and mid-gray (#6B7280)
- Glass panels: Frosted cream with subtle green border

**Typography:**
- Headings: DM Sans (600-700 weight)
- Body: Inter (400-500 weight)
- Large headlines: 72px (desktop), 48px (mobile)
- Body text: 16-18px for readability

**Components:**
- Frosted glass navigation (fixed)
- Rounded pill buttons (999px border-radius)
- Glass cards (24px border-radius)
- Yellow badge pills for features/indicators
- Circular emoji icons in trust elements

**Responsive:**
- Mobile-first CSS with @media breakpoints
- Grid layouts collapse to single column
- Navigation simplifies to hamburger menu
- Touch-friendly button sizes (48px min)

---

## 6. Brand Positioning & Messaging

### 6.1 Brand Voice
- **Tone:** Warm, optimistic, honest, approachable
- **Style:** Simple, clear, confident (not preachy or guilt-inducing)
- **Values:** Sustainability, quality, transparency, community

### 6.2 Key Messages

**Homepage Headline:**
"Live Better, Waste Less"
(Aspirational + actionable, positive framing)

**Value Proposition:**
"Discover sustainable essentials for your everyday life. Quality products that care for you and the planet."
(Focus on benefits, not just eco-credentials)

**Product Headlines:**
- "Reusable Kitchen Set" → "Transform your kitchen into a zero-waste haven"
- "Organic Cotton Basics" → "Soft, sustainable, and ethically made"

**Trust Messages:**
- "100% plastic-free packaging"
- "Carbon-neutral delivery"
- "5% of profits support ocean conservation"
- "30-day money-back guarantee"
- "Rated 4.9/5 by 1,000+ customers"

### 6.3 Differentiation
- **Not:** Generic dropship store, greenwashing, low quality
- **But:** Curated, trusted, premium feel, transparent, community-driven

---

## 7. Success Metrics

### 7.1 Conversion Rate Optimization (CRO)
**Target Metrics:**
- Homepage → Product: 40%+
- Product → Add to Cart: 15%+
- Cart → Checkout: 70%+
- Overall conversion rate: 2-3%+

**A/B Test Opportunities:**
- Hero CTA wording
- Product card layout
- Trust badge placement
- Review section prominence

### 7.2 Trust & Credibility
- Average time on site: 2+ minutes
- Bounce rate: <60%
- Pages per session: 2.5+
- Return visitor rate: 20%+

### 7.3 Performance
- Lighthouse score: 90+ (all categories)
- LCP: <2.5s
- FID: <100ms
- CLS: <0.1
- Mobile page load: <3s

---

## 8. Risks & Mitigation

### 8.1 Identified Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| AutoDS integration issues | High | Medium | Phase 6 dedicated to testing; fallback to manual Shopify |
| Poor mobile experience | High | Low | Mobile-first design; extensive testing |
| Slow page load | Medium | Low | Performance optimization in Phase 7 |
| Low conversion rate | High | Medium | Trust-first design; A/B testing post-launch |
| Security vulnerabilities | High | Low | Security audit in Phase 8; use Shopify checkout |
| Shopify API rate limits | Medium | Low | Implement caching; use Shopify webhooks |

### 8.2 Contingency Plans
- **AutoDS fails:** Revert to standard Shopify inventory
- **Performance issues:** Aggressive caching, CDN optimization
- **Low conversions:** Rapid iteration cycle, A/B testing
- **Technical bugs:** Vercel instant rollback, staging environment

---

## 9. Post-Launch Roadmap

### 9.1 Short-Term (Month 1-2)
1. Monitor analytics daily
2. Collect customer feedback
3. A/B test key conversion points
4. Fix any bugs immediately
5. Add customer testimonials (real ones)

### 9.2 Medium-Term (Month 3-6)
1. Add 1-2 more products (carefully curated)
2. Launch email capture popup
3. Implement abandoned cart emails
4. Add blog for SEO (sustainability tips)
5. Launch referral program

### 9.3 Long-Term (6+ months)
1. Expand to 5-10 hero products
2. Launch subscription model (recurring eco boxes)
3. Wholesale partnerships
4. Influencer collaborations
5. Mobile app (if justified by traffic)

---

## 10. Final Recommendations

### 10.1 Must-Haves Before Launch
✅ 2 products fully configured in AutoDS/Shopify  
✅ All support pages (shipping, returns, contact, FAQ, privacy, terms)  
✅ Trust elements on every page  
✅ Mobile responsiveness tested  
✅ Checkout flow tested end-to-end  
✅ Analytics installed and working  
✅ SEO metadata complete  
✅ Performance targets met (Lighthouse 90+)  

### 10.2 Nice-to-Haves (Post-Launch)
- Email signup popup with discount
- Live chat support
- Product comparison tool
- Gift wrapping option
- Loyalty/referral program
- Blog content

### 10.3 Key Success Factors
1. **Trust First:** Every design decision should answer "Will this make visitors trust us?"
2. **Simplicity:** Less is more; don't overwhelm with choices
3. **Quality Over Quantity:** 2 great products > 20 mediocre ones
4. **Transparency:** Be honest about dropshipping, sustainability, pricing
5. **Performance:** Fast pages = higher conversions
6. **Mobile-First:** Most traffic will be mobile

---

## Appendix: Design Inspiration Synthesis

### Inspiration 1: "By The River" Festival Poster
**What We Took:**
- Bold, sunny yellow-green color (#E8E661)
- Confident, friendly tone
- Simple line-art iconography
- Rounded typography
- Badge/stamp aesthetic

**Applied To:**
- Accent color (badges, highlights)
- Trust icons (emoji-based, simple)
- Badge pills (eco-friendly, bestseller)
- Overall optimistic, energetic vibe

### Inspiration 2: "Serum" Skincare Page
**What We Took:**
- Huge, thin sans-serif headline
- Minimal navigation
- Clean white/cream background
- Soft, warm photography
- Circular cut-out design elements
- Premium, calm aesthetic

**Applied To:**
- Large product titles (56-72px)
- Airy layout with generous whitespace
- Warm cream background
- Glass panel frosted effect (soft, not heavy)
- Product photography style (close-up, warm)

### Combined Result: "Sunny Premium"
A unique blend of:
- **Premium feel** (clean, airy, sophisticated) from skincare aesthetic
- **Eco confidence** (sunny, optimistic, friendly) from festival poster
- **Trustworthy** (transparent, honest, helpful) from clear structure
- **Approachable** (not elitist, not preachy) from warm colors and simple copy

---

## Contact & Next Steps

**This Document Covers:**
✅ Current site audit (page inventory, component analysis)  
✅ New site design proposal (sitemap, design system, page structures)  
✅ Visual mockups (homepage + product page, desktop)  
✅ Implementation plan (8 phases, branch-by-branch)  
✅ AutoDS integration notes  
✅ Success metrics and risk mitigation  

**Next Actions (When Implementation Begins):**
1. Review and approve this plan
2. Begin Phase 1 (Foundation) on new branch
3. Merge phases into staging one at a time
4. Test thoroughly on staging before production
5. Launch only when all must-haves are complete

**Repository:**
- Mockups: `/workspace/mockup/`
- Screenshots: `/opt/cursor/artifacts/`
- Branch: `mockup/bello-rebuild-514c` (not merged)

---

**End of Report**

