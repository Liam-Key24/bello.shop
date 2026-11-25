# Liam Setup Checklist (v5 rebuild)

Complete these before the store can show real products and accept contact messages.

## 1. Shopify Storefront API (required tonight)

Add to `.env.local` and Vercel project env:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_or_storefront_token_here
```

Without these, homepage/shop/product pages show honest empty states (no fake products).

## 2. Featured products tag (required)

In Shopify Admin, tag each launch product with:

```
featured
```

Homepage queries: Storefront API `products(query: "tag:featured")` (limit 2).

## 3. AutoDS (later)

Leave as TODO in code. When AutoDS syncs SKUs into Shopify:

- Ensure launch products still have the `featured` tag
- Confirm shipping/return SLAs and update Shipping / Returns copy

## 4. Contact form — Vercel Forms (required for email delivery)

Either:

**A.** Enable **Vercel Forms** on the bello project in the Vercel dashboard, and/or  

**B.** Set a webhook URL:

```
CONTACT_WEBHOOK_URL=https://your-forms-or-email-webhook
```

`/api/contact` accepts name/email/message. Without A or B, submissions are logged only and the UI says delivery is pending setup.

## 5. Reviews — Judge.me (recommended)

**Recommended app:** [Judge.me](https://apps.shopify.com/judgeme) (free tier, headless-friendly widgets/API).

Why: free plan available, works with custom Storefront / headless embeds, widely used on Shopify.

Install Judge.me on the Shopify store, then wire the widget into `ReviewsPlaceholder` (homepage + product page). Until then, the site shows an honest empty reviews block — no fake ratings.

## 6. Legal copy (before public launch)

Replace Privacy and Terms working summaries with solicitor-reviewed documents.

## 7. Cart persistence (already coded)

Shopify cart ID is stored in:

- httpOnly cookie `shopifyCartId` (30 days)
- localStorage `shopifyCartId` (client backup)

No extra setup required beyond Shopify credentials.
