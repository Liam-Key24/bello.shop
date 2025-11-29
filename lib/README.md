# `/lib` Directory Structure

This directory contains all shared utilities, types, contexts, hooks, and business logic for the Bello Shop e-commerce application.

## Directory Structure

```
lib/
├── contexts/          # React Context providers and hooks
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── index.ts
│
├── hooks/            # Custom React hooks
│   ├── account/      # Account-related hooks
│   │   ├── useAddressOperations.ts
│   │   ├── useCustomerAddresses.ts
│   │   └── index.ts
│   ├── cart/         # Cart-related hooks
│   │   ├── useCartStorage.ts
│   │   └── index.ts
│   ├── shop/         # Shop/filter hooks
│   │   ├── useFilterState.ts
│   │   ├── useSectionToggle.ts
│   │   └── index.ts
│   └── index.ts
│
├── types/            # TypeScript type definitions
│   ├── product.ts    # Product component types
│   ├── filter.ts     # Filter component types
│   ├── form.ts       # Form component types
│   └── index.ts
│
├── utils/            # Utility functions
│   ├── product.ts    # Product-related utilities
│   └── index.ts
│
├── auth/             # Server-side authentication utilities
│   ├── rate-limit.ts
│   ├── server-auth.ts
│   ├── token-utils.ts
│   └── validation.ts
│
├── shopify/          # Shopify API integration
│   ├── address-list.ts
│   ├── cart-manager.ts
│   ├── cart-utils.ts
│   ├── cart.ts
│   ├── collection.ts
│   ├── customer.ts
│   ├── filter.ts
│   ├── helper.ts
│   ├── products.ts
│   ├── types.ts
│   └── ...
│
├── config/           # Configuration files
│   └── price-tiers.ts
│
├── data/             # Data fetching utilities
│   └── home-data.tsx
│
└── validation/       # Validation schemas
    └── cart-schema.ts
```

## Usage Examples

### Contexts
```typescript
// Import contexts
import { AuthProvider, CartProvider, useAuth, useCart } from '@/lib/contexts';

// Use in components
const { customer, isAuthenticated } = useAuth();
const { cart, addItem } = useCart();
```

### Hooks
```typescript
// Account hooks
import { useAddressOperations, useCustomerAddresses } from '@/lib/hooks/account';

// Cart hooks
import { useCartStorage } from '@/lib/hooks/cart';

// Shop hooks
import { useFilterState, useSectionToggle } from '@/lib/hooks/shop';

// Or import all hooks
import { useAddressOperations, useFilterState } from '@/lib/hooks';
```

### Types
```typescript
// Product types
import type { ProductCardBaseProps, ProductImageCardProps } from '@/lib/types/product';

// Filter types
import type { Category, SectionKey } from '@/lib/types/filter';
import { DEFAULT_RATINGS } from '@/lib/types/filter';

// Form types
import type { EmailInputRef, PasswordInputRef } from '@/lib/types/form';

// Or import all types
import type { ProductCardBaseProps, Category } from '@/lib/types';
```

### Utils
```typescript
// Product utilities
import { formatPrice, getProductImage, getProductLink, getProductTitle } from '@/lib/utils/product';

// Or import all utils
import { formatPrice } from '@/lib/utils';
```

## Migration Notes

All files have been moved from their previous locations:

- **Contexts**: `app/contexts/` and `lib/auth/AuthContext.tsx` → `lib/contexts/`
- **Hooks**: `app/account/hooks/`, `app/cart/hooks/`, `app/shop/components/hooks/` → `lib/hooks/`
- **Types**: `app/components/products/shared/types.ts`, `app/shop/components/filters/types.ts` → `lib/types/`
- **Utils**: `app/components/products/shared/utils.ts` → `lib/utils/`

All import statements have been updated throughout the codebase to use the new paths.

