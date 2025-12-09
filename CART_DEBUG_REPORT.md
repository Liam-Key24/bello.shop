# Cart System Debug Report

## Issues Identified and Fixed

### 1. **Duplicate Items Issue** ✅ FIXED
**Problem**: When adding items, `syncToShopify` was syncing the ENTIRE cart state to Shopify every time, causing duplicates.

**Root Cause**: 
- `addItem` called `syncToShopify(state.items)` which added ALL items
- If Shopify already had items, they were added again
- This created exponential growth of quantities

**Fix Applied**:
- Created `syncSingleItemToShopify()` to sync only the new/updated item
- Modified `addItem` to sync only the specific item being added
- For existing items with lineId, use "update" action instead of "add"
- For new items, use "add" action for just that item

### 2. **Infinite Sync Loop** ✅ FIXED
**Problem**: `loadFromShopify` was calling `syncToShopify` which called `loadFromShopify` again, creating loops.

**Root Cause**:
- When Shopify cart was empty but local had items, it would sync
- Sync would reload from Shopify, which was empty, so it would sync again
- This created an infinite loop

**Fix Applied**:
- Removed automatic sync from `loadFromShopify`
- Sync only happens on `addItem`, `updateQuantity`, or `removeItem`
- Added sync timestamp to prevent rapid re-syncing

### 3. **State Overwriting Issue** ✅ FIXED
**Problem**: After syncing, reloading from Shopify would completely replace local state, losing any items that weren't in Shopify yet.

**Root Cause**:
- `syncSingleItemToShopify` would reload from Shopify and replace entire state
- If user had local items that weren't synced yet, they would be lost

**Fix Applied**:
- Changed reload logic to merge: keep local items not in Shopify, update those that are
- Preserves items that haven't been synced yet

### 4. **Missing LineId Updates** ✅ FIXED
**Problem**: After adding items, lineIds weren't being updated in local state, preventing efficient updates/removes.

**Root Cause**:
- After syncing, we reloaded from Shopify but didn't merge properly
- Local items kept old state without lineIds

**Fix Applied**:
- After successful sync, reload from Shopify and merge with local
- Local items get updated with lineIds from Shopify
- Enables efficient update/remove operations

## Current Cart Flow

### Adding Items (Logged In)
1. User clicks "Add to cart"
2. Item added to local state (localStorage)
3. Check if item exists locally
   - If exists: Update quantity locally, then update in Shopify (if lineId exists) or add increment
   - If new: Add to local, then add single item to Shopify
4. After Shopify sync, reload cart to get lineIds
5. Merge Shopify cart with local cart (preserve unsynced items)

### Adding Items (Not Logged In)
1. User clicks "Add to cart"
2. Item added to local state (localStorage)
3. No Shopify sync
4. Cart persists for 30 minutes, then clears on page leave

### Loading Cart (Logged In)
1. On app initialization, `useCartSync` runs
2. Checks auth status
3. If authenticated: Load from Shopify
4. Replace local cart with Shopify cart (Shopify is source of truth)

### Loading Cart (Not Logged In)
1. On app initialization, `useCartSync` runs
2. Checks auth status
3. If not authenticated: Load from localStorage
4. Set activity timestamp

## Potential Remaining Issues

### 1. **Race Conditions**
- Multiple rapid clicks on "Add to cart" could cause issues
- **Mitigation**: `useTransition` in components prevents rapid clicks

### 2. **Network Failures**
- If Shopify sync fails, local state might be out of sync
- **Current Behavior**: Local state is updated first, sync happens async
- **Risk**: User sees item in cart but it's not in Shopify
- **Mitigation**: Error logging, fallback to full sync on next operation

### 3. **Quantity Mismatches**
- If Shopify API merges quantities differently than expected
- **Current Behavior**: We reload from Shopify after sync to get accurate state
- **Risk**: Quantities might not match user's expectation
- **Mitigation**: Always reload from Shopify after sync to get source of truth

## Recommendations

1. **Add Retry Logic**: If sync fails, retry once before giving up
2. **Add Optimistic UI**: Show item immediately, sync in background
3. **Add Sync Status Indicator**: Show when cart is syncing
4. **Add Error Notifications**: Inform user if sync fails
5. **Add Conflict Resolution**: Handle cases where Shopify and local differ significantly

## Additional Fixes Applied

### 5. **State Merging After Updates** ✅ FIXED
**Problem**: After updating quantity in Shopify, reloading would replace entire state, losing unsynced items.

**Fix Applied**:
- After successful update, merge Shopify cart with local cart
- Preserve local items that aren't in Shopify yet
- Update items that exist in both with Shopify's version (source of truth)

### 6. **Sync Timestamp Management** ✅ FIXED
**Problem**: No tracking of when last sync occurred, causing potential loops.

**Fix Applied**:
- Added `cartLastShopifySync` timestamp
- Updated after every successful sync operation
- Prevents rapid re-syncing

## Final Implementation Summary

### Key Changes Made:
1. **Separated single item sync from full cart sync**
   - `syncSingleItemToShopify()` - syncs one item
   - `syncToShopify()` - syncs multiple new items (used for initial sync)

2. **Smart addItem logic**
   - If item exists locally with lineId → Update in Shopify
   - If item exists locally without lineId → Add to Shopify (will merge)
   - If item is new → Add to Shopify

3. **Proper state merging**
   - After any Shopify operation, reload and merge
   - Keep local items not in Shopify
   - Update items that exist in both

4. **Prevented infinite loops**
   - Removed auto-sync from `loadFromShopify`
   - Sync only happens on user actions (add/update/remove)

5. **30-minute timer for non-authenticated users**
   - Cart persists on reload if within 30 minutes
   - Clears only when leaving page after 30+ minutes

## Testing Checklist

- [ ] Add single item when logged in
- [ ] Add same item twice when logged in (should increase quantity)
- [ ] Add different items when logged in
- [ ] Remove item when logged in
- [ ] Update quantity when logged in
- [ ] Add items when not logged in
- [ ] Reload page when logged in (should load from Shopify)
- [ ] Reload page when not logged in (should load from localStorage)
- [ ] Leave page after 30+ minutes when not logged in (should clear)
- [ ] Leave page within 30 minutes when not logged in (should persist)
- [ ] Rapid clicks on "Add to cart" (should handle gracefully)
- [ ] Network failure during sync (should keep local state)

