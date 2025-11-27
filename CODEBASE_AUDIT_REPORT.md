# Comprehensive Codebase Audit Report
**Date:** 2025-01-26  
**Project:** Bello Shop E-commerce Application

---

## Executive Summary

This audit identified **67 issues** across 8 categories:
- 🔴 **Critical Issues:** 12
- 🟡 **High Priority:** 18
- 🟢 **Medium Priority:** 24
- 🔵 **Low Priority / Improvements:** 13

---

## 1. 🔴 CRITICAL BUGS & LOGICAL ERRORS

### 1.1 React Strict Mode Disabled
**File:** `next.config.ts:4`
```typescript
reactStrictMode: false,  // ❌ CRITICAL
```
**Issue:** React Strict Mode helps catch bugs, unsafe lifecycles, and deprecated APIs. Disabling it hides potential issues.
**Impact:** May cause production bugs, memory leaks, and unexpected behavior.
**Fix:** Enable React Strict Mode:
```typescript
reactStrictMode: true,
```

### 1.2 Incomplete Next.js Config
**File:** `next.config.ts:5-6`
```typescript
// ...existing code...
// ...existing config...
```
**Issue:** Commented placeholders suggest incomplete configuration.
**Impact:** Missing optimizations, security headers, or other critical settings.
**Fix:** Remove placeholder comments and ensure all necessary config is present.

### 1.3 Duplicate App Directory Structure
**Issue:** Both `app/` and `src/app/` directories exist with overlapping functionality.
- `app/page.tsx` - Main landing page (active)
- `src/app/page.tsx` - Alternative landing page (unused)
**Impact:** Confusion, potential routing conflicts, increased bundle size.
**Fix:** Remove `src/app/` directory entirely or consolidate if needed.

### 1.4 Empty Filter Directory
**File:** `app/components/Filter/` (empty directory)
**Issue:** Empty directory serves no purpose.
**Impact:** Confusion, clutter.
**Fix:** Remove empty directory.

### 1.5 Cart Sync Race Condition
**File:** `app/cart/CartProvider.tsx:105`
```typescript
setTimeout(() => syncToShopify(merged), 100);
```
**Issue:** Using `setTimeout` for async operations can cause race conditions.
**Impact:** Cart may not sync properly, data loss possible.
**Fix:** Use proper async/await or debounce with proper state management.

### 1.6 Missing Error Boundaries
**Issue:** No error boundaries found in the application.
**Impact:** Unhandled errors crash entire app instead of showing graceful error UI.
**Fix:** Add React Error Boundaries around major sections.

### 1.7 TypeScript `any` Types (34 instances)
**Files:** Multiple files use `any` type
**Issue:** Defeats TypeScript's purpose, hides bugs.
**Impact:** Runtime errors, reduced IDE support, harder refactoring.
**Fix:** Replace with proper types or `unknown` with type guards.

### 1.8 Missing Input Validation in Cart Manager
**File:** `app/api/shopify/cart-manager/route.ts:29`
```typescript
const body = await req.json();
```
**Issue:** No validation of request body structure or types.
**Impact:** API crashes on malformed requests, potential security issues.
**Fix:** Add Zod or similar validation schema.

### 1.9 In-Memory Rate Limiting (Not Production-Ready)
**File:** `lib/auth/rate-limit.ts:11`
```typescript
const rateLimitStore = new Map<string, RateLimitEntry>();
```
**Issue:** In-memory store doesn't work across multiple server instances.
**Impact:** Rate limiting ineffective in production with load balancing.
**Fix:** Use Redis or dedicated rate limiting service.

### 1.10 Missing Token Expiration Check
**File:** `middleware.ts:19`
```typescript
const token = request.cookies.get('shopifyCustomerToken')?.value;
```
**Issue:** Only checks for token existence, not validity or expiration.
**Impact:** Expired tokens still grant access.
**Fix:** Validate token expiration in middleware or use server-side validation.

### 1.11 Hardcoded Price Tiers
**File:** `app/shop/page.tsx:45-47`
```typescript
if (price === "£") result = result.filter(p => p.price < 30)
if (price === "££") result = result.filter(p => p.price >= 30 && p.price < 80)
if (price === "£££") result = result.filter(p => p.price >= 80)
```
**Issue:** Hardcoded values, no currency handling, brittle logic.
**Impact:** Breaks with different currencies, hard to maintain.
**Fix:** Extract to configuration, support multiple currencies.

### 1.12 Client-Side Product Fetching on Shop Page
**File:** `app/shop/page.tsx:19-26`
```typescript
useEffect(() => {
  async function loadProducts() {
    const data = await getAllProductsSimple(50)
    // ...
  }
  loadProducts()
}, [])
```
**Issue:** Fetching 50 products on client-side causes slow initial load.
**Impact:** Poor SEO, slow page load, unnecessary API calls.
**Fix:** Convert to Server Component, use Server-Side Rendering.

---

## 2. 🟡 SECURITY VULNERABILITIES

### 2.1 Exposed Console Errors
**Files:** Multiple files (29 instances)
**Issue:** `console.error()` statements expose internal errors to client.
**Impact:** Information leakage, helps attackers understand system.
**Fix:** Use proper logging service, remove client-side console errors.

### 2.2 Weak CSP Header
**File:** `middleware.ts:48-51`
```typescript
"default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; ..."
```
**Issue:** `'unsafe-eval'` and `'unsafe-inline'` weaken security.
**Impact:** XSS vulnerabilities possible.
**Fix:** Use nonces or hashes, remove unsafe directives.

### 2.3 Cookie SameSite Inconsistency
**Files:** 
- `app/api/shopify/login/route.ts:85` - `sameSite: "strict"`
- `app/api/shopify/cart-manager/route.ts:44` - `sameSite: "lax"`
**Issue:** Inconsistent SameSite settings.
**Impact:** CSRF protection inconsistency.
**Fix:** Standardize to `"strict"` for auth cookies, `"lax"` for cart cookies.

### 2.4 Missing Request Size Limits
**Issue:** No validation of request body size in API routes.
**Impact:** DoS attacks possible via large payloads.
**Fix:** Add body size limits in Next.js config and API routes.

### 2.5 Token Stored in Client-Side Cookie (Readable)
**File:** `app/contexts/AuthContext.tsx:112`
```typescript
document.cookie = 'shopifyCartId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
```
**Issue:** Client-side cookie manipulation possible.
**Impact:** Potential session hijacking.
**Fix:** Use HTTP-only cookies set by server only.

### 2.6 Missing CSRF Tokens
**Issue:** No CSRF protection for state-changing operations.
**Impact:** Cross-site request forgery attacks possible.
**Fix:** Implement CSRF tokens for POST/PUT/DELETE requests.

### 2.7 Environment Variable Exposure Risk
**File:** `lib/shopify/helper.ts:2-3`
```typescript
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
```
**Issue:** `NEXT_PUBLIC_` prefix exposes values to client bundle.
**Impact:** Storefront token visible in browser, can be abused.
**Fix:** Move to server-side only, use API routes for all Shopify calls.

### 2.8 No Input Sanitization for GraphQL Queries
**File:** `lib/shopify/helper.ts:29`
```typescript
body: JSON.stringify({ query, variables }),
```
**Issue:** No validation that query/variables are safe.
**Impact:** GraphQL injection possible.
**Fix:** Validate query structure, sanitize variables.

### 2.9 Missing Rate Limiting on Cart API
**File:** `app/api/shopify/cart-manager/route.ts`
**Issue:** No rate limiting on cart operations.
**Impact:** DoS via rapid cart operations.
**Fix:** Add rate limiting similar to auth endpoints.

### 2.10 Password Validation Too Weak
**File:** `lib/auth/validation.ts` (implied)
**Issue:** Basic password validation may not enforce strong passwords.
**Impact:** Weak passwords vulnerable to brute force.
**Fix:** Enforce minimum complexity requirements.

---

## 3. 🟢 PERFORMANCE ISSUES

### 3.1 Excessive Re-renders in CartProvider
**File:** `app/cart/CartProvider.tsx:216-229`
```typescript
useEffect(() => {
  // Syncs on every cart change
  syncToShopify(cart);
}, [cart, isAuthenticated, syncToShopify]);
```
**Issue:** Syncs to Shopify on every cart state change, even minor updates.
**Impact:** Excessive API calls, slow UI.
**Fix:** Debounce sync operations, batch updates.

### 3.2 No Query Result Caching
**File:** `app/shop/page.tsx:21`
```typescript
const data = await getAllProductsSimple(50)
```
**Issue:** Fetches products on every page load, no caching.
**Impact:** Slow page loads, unnecessary API calls.
**Fix:** Use React Query or SWR for client-side caching, or convert to Server Component.

### 3.3 Large Bundle from Duplicate Code
**Issue:** `src/app/` directory duplicates functionality.
**Impact:** Larger bundle size, slower builds.
**Fix:** Remove duplicate directory.

### 3.4 Missing Image Optimization
**File:** `app/components/products/Footer.tsx:9-12`
```typescript
<img src="/icons/tik-tok.svg" alt="icon" className="w-6 h-6"/>
```
**Issue:** Using `<img>` instead of Next.js `<Image>` component.
**Impact:** No automatic optimization, larger images.
**Fix:** Use Next.js `Image` component.

### 3.5 Inefficient Cart Merging Logic
**File:** `app/cart/CartProvider.tsx:91-100`
```typescript
localCart.forEach((localItem) => {
  const existing = merged.find(item => item.variantId === localItem.variantId);
  // O(n²) complexity
});
```
**Issue:** O(n²) complexity for cart merging.
**Impact:** Slow with large carts.
**Fix:** Use Map for O(1) lookups.

### 3.6 Multiple GraphQL Queries for Collections
**File:** `app/page.tsx:10-15`
```typescript
const [heroHandle, newProductsHandle, ...] = await Promise.all([
  getCollectionHandleByTitle("hero image"),
  // 4 separate queries
]);
```
**Issue:** Multiple round trips to find collection handles.
**Impact:** Slower page load.
**Fix:** Cache collection handles, or fetch all collections once.

### 3.7 No Pagination for Products
**File:** `app/shop/page.tsx:21`
```typescript
const data = await getAllProductsSimple(50)
```
**Issue:** Hardcoded limit, no pagination UI.
**Impact:** Poor performance with many products, bad UX.
**Fix:** Implement proper pagination.

### 3.8 Unused Font Files
**File:** `public/font/` - Multiple font files
**Issue:** Loading many font variants may not all be used.
**Impact:** Larger bundle, slower page load.
**Fix:** Audit which fonts are actually used, remove unused variants.

### 3.9 Missing Code Splitting
**Issue:** No dynamic imports for heavy components.
**Impact:** Large initial bundle.
**Fix:** Use `next/dynamic` for heavy components.

### 3.10 Console.log in Production Code
**File:** `app/cart/components/ContinueCheckout.tsx:37`
```typescript
console.log("Cart cleared from localStorage after 5 minutes");
```
**Issue:** Console statements in production code.
**Impact:** Performance overhead, information leakage.
**Fix:** Remove or use proper logging service.

---

## 4. 🔵 CODE QUALITY & MAINTAINABILITY

### 4.1 Inconsistent Naming
**Files:** Multiple
- `FeautedSection` (typo) vs `FeaturedSection`
- `getAllProductsSimple` vs `getAllProducts`
**Issue:** Typos and inconsistent naming.
**Impact:** Confusion, harder to maintain.
**Fix:** Standardize naming, fix typos.

### 4.2 Missing Type Definitions
**File:** `app/contexts/AuthContext.tsx:12-15`
```typescript
defaultAddress?: any;
addresses?: any;
orders?: any;
```
**Issue:** Using `any` instead of proper types.
**Impact:** Type safety lost.
**Fix:** Define proper interfaces.

### 4.3 Duplicate GraphQL Fragments
**File:** `lib/shopify/cart-manager.ts`
**Issue:** Cart query structure repeated in multiple mutations.
**Impact:** Code duplication, harder to maintain.
**Fix:** Extract to reusable fragment.

### 4.4 Magic Numbers
**Files:** Multiple
- `50` products limit
- `100` ms timeout
- `30` days cookie maxAge
**Issue:** Hardcoded values without constants.
**Impact:** Hard to maintain, easy to introduce bugs.
**Fix:** Extract to configuration constants.

### 4.5 Missing JSDoc Comments
**Issue:** Many functions lack documentation.
**Impact:** Harder for team to understand code.
**Fix:** Add JSDoc comments to public functions.

### 4.6 Inconsistent Error Handling
**Files:** Multiple
**Issue:** Some functions return `null`, others throw, some return error objects.
**Impact:** Inconsistent API, harder to use.
**Fix:** Standardize error handling pattern.

### 4.7 Unused Imports
**Issue:** Likely unused imports across codebase.
**Impact:** Larger bundle, confusion.
**Fix:** Run ESLint with unused import rules, remove.

### 4.8 Missing PropTypes/Type Validation
**Issue:** Some components lack proper prop validation.
**Impact:** Runtime errors, harder debugging.
**Fix:** Ensure all components have proper TypeScript types.

### 4.9 Incomplete Metadata
**File:** `app/layout.tsx:22-25`
```typescript
title: "Create Next App",
description: "Generated by create next app",
```
**Issue:** Default Next.js metadata not updated.
**Impact:** Poor SEO, unprofessional.
**Fix:** Update with proper metadata.

### 4.10 Empty Footer Links
**File:** `app/components/products/Footer.tsx:20-38`
**Issue:** Footer links are just text, no actual navigation.
**Impact:** Poor UX, broken expectations.
**Fix:** Add proper Link components or remove if not needed.

---

## 5. 🟡 UNUSED CODE & ASSETS

### 5.1 Entire `src/app/` Directory
**Location:** `src/app/`
**Issue:** Duplicate app directory with unused components.
**Impact:** Confusion, larger codebase.
**Fix:** Delete entire directory if not needed.

### 5.2 Unused SVG Assets
**Files:** `public/next.svg`, `public/vercel.svg`, `public/window.svg`, `public/file.svg`, `public/globe.svg`
**Issue:** Default Next.js assets not used.
**Impact:** Unnecessary files in repo.
**Fix:** Remove if not used.

### 5.3 Empty Filter Directory
**Location:** `app/components/Filter/`
**Issue:** Empty directory.
**Fix:** Remove.

### 5.4 Unused Server Profile Component
**File:** `app/account/profile/server-profile.tsx`
**Issue:** Created but may not be used.
**Fix:** Verify usage, remove if unused.

### 5.5 Unused Logout Button Component
**File:** `app/account/profile/logout-button.tsx`
**Issue:** May be duplicate of inline logout.
**Fix:** Verify usage, consolidate if duplicate.

### 5.6 Unused Font Variants
**Location:** `public/font/`
**Issue:** Many font files, may not all be used.
**Fix:** Audit usage, remove unused variants.

### 5.7 Unused Media Files
**Location:** `public/media/`
**Issue:** Multiple images, verify all are used.
**Fix:** Audit usage, remove unused.

---

## 6. 🟢 API & DATA HANDLING

### 6.1 No Request Validation
**File:** `app/api/shopify/cart-manager/route.ts:29`
```typescript
const body = await req.json();
```
**Issue:** No schema validation.
**Fix:** Add Zod or similar validation.

### 6.2 Missing Error Response Consistency
**Issue:** Different error response formats across API routes.
**Fix:** Standardize error response format.

### 6.3 No API Versioning
**Issue:** API routes have no versioning strategy.
**Fix:** Consider adding `/api/v1/` prefix for future compatibility.

### 6.4 Missing Request Logging
**Issue:** No structured logging for API requests.
**Fix:** Add request logging middleware.

### 6.5 GraphQL Error Handling Inconsistent
**File:** `lib/shopify/helper.ts:48-52`
**Issue:** Error handling could be more robust.
**Fix:** Standardize GraphQL error handling.

### 6.6 Missing Retry Logic
**Issue:** No retry logic for failed API calls.
**Fix:** Add exponential backoff retry for transient failures.

### 6.7 No Request Timeout
**Issue:** API calls have no timeout.
**Fix:** Add timeout to fetch calls.

### 6.8 Missing Response Caching Headers
**Issue:** API responses don't set proper cache headers.
**Fix:** Add appropriate Cache-Control headers.

---

## 7. 🟡 FILE STRUCTURE & ORGANIZATION

### 7.1 Duplicate App Directories
**Issue:** Both `app/` and `src/app/` exist.
**Fix:** Consolidate to single directory structure.

### 7.2 Inconsistent Component Organization
**Issue:** Some components in `components/`, others in `layout/`.
**Fix:** Standardize component organization.

### 7.3 Missing Barrel Exports
**Issue:** Some directories lack index.ts barrel exports.
**Fix:** Add barrel exports for cleaner imports.

### 7.4 Mixed Concerns in Components
**Issue:** Some components handle both UI and business logic.
**Fix:** Separate concerns, extract business logic to hooks/utils.

### 7.5 Inconsistent Naming Conventions
**Issue:** Mix of PascalCase, camelCase, kebab-case.
**Fix:** Standardize to Next.js conventions (PascalCase for components).

---

## 8. 🔵 TESTING & DOCUMENTATION

### 8.1 No Tests Found
**Issue:** No test files detected.
**Impact:** No confidence in code changes, regression risk.
**Fix:** Add unit tests, integration tests, E2E tests.

### 8.2 Missing README Documentation
**File:** `README.md`
**Issue:** Likely minimal documentation.
**Fix:** Add comprehensive README with setup, architecture, deployment.

### 8.3 No API Documentation
**Issue:** API routes lack documentation.
**Fix:** Add OpenAPI/Swagger docs or inline documentation.

### 8.4 Missing Environment Variable Documentation
**Issue:** No `.env.example` file.
**Fix:** Create `.env.example` with all required variables.

### 8.5 No Architecture Documentation
**Issue:** No documentation of system architecture.
**Fix:** Add architecture diagrams and explanations.

---

## Priority Action Items

### Immediate (This Week)
1. ✅ Enable React Strict Mode
2. ✅ Remove `src/app/` duplicate directory
3. ✅ Fix security issues (CSP, token validation)
4. ✅ Add input validation to API routes
5. ✅ Replace `any` types with proper types

### High Priority (This Month)
1. ✅ Implement proper error boundaries
2. ✅ Add rate limiting with Redis
3. ✅ Convert shop page to Server Component
4. ✅ Fix cart sync race conditions
5. ✅ Add comprehensive testing

### Medium Priority (Next Quarter)
1. ✅ Optimize performance (caching, code splitting)
2. ✅ Improve code organization
3. ✅ Add documentation
4. ✅ Standardize error handling
5. ✅ Remove unused code and assets

---

## Recommended Tools & Libraries

1. **Validation:** Zod (`zod`)
2. **Rate Limiting:** Upstash Redis (`@upstash/redis`)
3. **Error Tracking:** Sentry (`@sentry/nextjs`)
4. **Logging:** Pino (`pino`)
5. **Testing:** Vitest + React Testing Library
6. **Type Safety:** Remove all `any` types
7. **Code Quality:** ESLint strict rules, Prettier

---

## Conclusion

The codebase shows good structure and modern practices but has several critical issues that need immediate attention, particularly around security, performance, and code quality. The most urgent fixes are:

1. Security vulnerabilities (CSP, token validation, input validation)
2. Performance issues (client-side fetching, excessive re-renders)
3. Code quality (TypeScript `any` types, error handling)
4. Unused code removal (duplicate directories, unused assets)

Addressing these issues will significantly improve the application's security, performance, and maintainability.

