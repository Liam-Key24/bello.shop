# Edge Cases & Error Handling Documentation

## Overview
This directory contains all error handling pages and components for the Bello Shop e-commerce application. All error-related functionality has been centralized here for better organization and maintainability.

## Directory Structure

```
app/edgecases/
├── README.md                    # This file
├── index.ts                     # Barrel exports for easy imports
├── ErrorBoundary.tsx            # React Error Boundary component
├── not-found.tsx                # 404 Not Found page
├── error.tsx                    # Runtime error page (client)
├── global-error.tsx             # Global error page for root layout
├── unauthorized.tsx             # 403 Unauthorized access page
├── server-error.tsx              # 500 Server error page
├── offline.tsx                   # Network/offline detection page
├── maintenance.tsx               # Maintenance mode page
└── components/
    └── ErrorPage.tsx            # Reusable error page component
```

## Files & Their Purpose

### Core Components

#### `ErrorBoundary.tsx`
- **Location**: `app/edgecases/ErrorBoundary.tsx`
- **Type**: Client Component (React Class Component)
- **Purpose**: Catches React component errors and displays fallback UI
- **Usage**: Wraps components in the app to catch rendering errors
- **Currently Used In**: `app/layout.tsx` (root layout)

#### `components/ErrorPage.tsx`
- **Location**: `app/edgecases/components/ErrorPage.tsx`
- **Type**: Client Component
- **Purpose**: Reusable error page component with consistent styling
- **Props**:
  - `statusCode?: number` - HTTP status code (e.g., 404, 500)
  - `title?: string` - Main error title
  - `message?: string` - Primary error message
  - `description?: string` - Detailed error description
  - `showHomeButton?: boolean` - Show "Go Home" button (default: true)
  - `showBackButton?: boolean` - Show "Go Back" button (default: true)
  - `showRetryButton?: boolean` - Show "Try Again" button (default: false)
  - `onRetry?: () => void` - Custom retry handler

### Next.js Convention Pages

These pages follow Next.js App Router conventions and are automatically used by the framework:

#### `not-found.tsx`
- **Location**: `app/edgecases/not-found.tsx`
- **Root Export**: `app/not-found.tsx` (re-exports from edgecases)
- **Type**: Server Component
- **Purpose**: 404 Not Found page - automatically displayed when a route doesn't exist
- **Metadata**: SEO-optimized with title and description

#### `error.tsx`
- **Location**: `app/edgecases/error.tsx`
- **Root Export**: `app/error.tsx` (re-exports from edgecases)
- **Type**: Client Component
- **Purpose**: Catches runtime errors in the app directory
- **Props**: Receives `error` and `reset` from Next.js
- **Features**: Logs errors and provides retry functionality

#### `global-error.tsx`
- **Location**: `app/edgecases/global-error.tsx`
- **Root Export**: `app/global-error.tsx` (re-exports from edgecases)
- **Type**: Client Component
- **Purpose**: Catches errors in the root layout.tsx
- **Features**: Includes full HTML structure (required for root errors)

### Additional Edge Case Pages

#### `unauthorized.tsx`
- **Location**: `app/edgecases/unauthorized.tsx`
- **Type**: Server Component
- **Purpose**: 403 Unauthorized access page
- **Use Case**: Display when users try to access protected resources without permission
- **Features**: Includes login and home navigation buttons

#### `server-error.tsx`
- **Location**: `app/edgecases/server-error.tsx`
- **Type**: Server Component
- **Purpose**: 500 Server error page
- **Use Case**: Display when server-side errors occur
- **Features**: User-friendly message with retry option

#### `offline.tsx`
- **Location**: `app/edgecases/offline.tsx`
- **Type**: Client Component
- **Purpose**: Network/offline detection page
- **Features**: 
  - Detects online/offline status
  - Automatically redirects when connection is restored
  - Shows appropriate messaging for offline state

#### `maintenance.tsx`
- **Location**: `app/edgecases/maintenance.tsx`
- **Type**: Server Component
- **Purpose**: Maintenance mode page
- **Use Case**: Display when site is under maintenance
- **Features**: Friendly messaging with expected downtime information

### Index File

#### `index.ts`
- **Location**: `app/edgecases/index.ts`
- **Purpose**: Barrel export file for easy imports
- **Exports**: All error handling components and pages

## Usage Examples

### Using ErrorBoundary
```tsx
import { ErrorBoundary } from '@/app/edgecases/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Using Error Pages Programmatically
```tsx
import { NotFound, Unauthorized, ServerError } from '@/app/edgecases';

// In a route handler or component
if (!resource) {
  return <NotFound />;
}

if (!hasPermission) {
  return <Unauthorized />;
}
```

### Using ErrorPage Component
```tsx
import ErrorPage from '@/app/edgecases/components/ErrorPage';

<ErrorPage
  statusCode={404}
  title="Custom Error"
  message="Something went wrong"
  description="Detailed description"
  showRetryButton={true}
  onRetry={() => handleRetry()}
/>
```

## Integration Points

### Root Layout
- **File**: `app/layout.tsx`
- **Integration**: `ErrorBoundary` wraps the entire application
- **Import**: `import { ErrorBoundary } from './edgecases/ErrorBoundary';`

### Next.js Automatic Routing
- **404 Errors**: Automatically handled by `app/not-found.tsx`
- **Runtime Errors**: Automatically handled by `app/error.tsx`
- **Global Errors**: Automatically handled by `app/global-error.tsx`

## Styling

All error pages use the application's design system:
- **Colors**: CSS variables (`--color-green-primary`, `--color-black`, `--color-red`, etc.)
- **Fonts**: Satoshi (body) and CabinetGrotesk (headings)
- **Layout**: Responsive design with Tailwind CSS
- **Background**: Uses `var(--background)` for consistency

## Error Logging

Error pages include console logging for development:
- **Development**: Full error details displayed
- **Production**: User-friendly messages only
- **Future Enhancement**: Can integrate with error reporting services (e.g., Sentry)

## Best Practices

1. **Error Boundaries**: Wrap critical sections with `ErrorBoundary` to prevent full app crashes
2. **404 Handling**: Next.js automatically uses `not-found.tsx` for missing routes
3. **Custom Errors**: Use `ErrorPage` component for consistent styling across custom error scenarios
4. **User Experience**: Always provide navigation options (Home, Back, Retry) on error pages
5. **Maintenance Mode**: Conditionally render `maintenance.tsx` based on environment variables or feature flags

## Future Enhancements

Potential improvements:
- Integration with error reporting service (Sentry, LogRocket, etc.)
- Analytics tracking for error occurrences
- Custom error pages for specific routes
- Error recovery mechanisms
- Offline-first functionality with service workers

