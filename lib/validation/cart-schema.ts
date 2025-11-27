/**
 * Validation schema for cart API requests
 */

export interface CartCreateRequest {
  action: 'create';
  items?: Array<{
    variantId: string;
    quantity: number;
  }>;
}

export interface CartAddRequest {
  action: 'add';
  cartId?: string;
  items: Array<{
    variantId: string;
    quantity: number;
  }>;
}

export interface CartUpdateRequest {
  action: 'update';
  cartId: string;
  updates: Array<{
    id: string;
    quantity: number;
  }>;
}

export interface CartRemoveRequest {
  action: 'remove';
  cartId: string;
  lineIds: string[];
}

export type CartRequest = CartCreateRequest | CartAddRequest | CartUpdateRequest | CartRemoveRequest;

/**
 * Validate cart request body
 */
export function validateCartRequest(body: unknown): { valid: boolean; data?: CartRequest; error?: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be an object' };
  }

  const obj = body as Record<string, unknown>;
  const action = obj.action;

  if (typeof action !== 'string' || !['create', 'add', 'update', 'remove'].includes(action)) {
    return { valid: false, error: 'Invalid action. Must be one of: create, add, update, remove' };
  }

  // Validate create action
  if (action === 'create') {
    if (obj.items && !Array.isArray(obj.items)) {
      return { valid: false, error: 'Items must be an array' };
    }
    if (obj.items) {
      for (const item of obj.items) {
        if (!item || typeof item !== 'object') {
          return { valid: false, error: 'Each item must be an object' };
        }
        if (typeof (item as any).variantId !== 'string' || !(item as any).variantId) {
          return { valid: false, error: 'Each item must have a valid variantId' };
        }
        const quantity = (item as any).quantity;
        if (typeof quantity !== 'number' || quantity < 1 || quantity > 999) {
          return { valid: false, error: 'Quantity must be a number between 1 and 999' };
        }
      }
    }
    return { valid: true, data: body as CartCreateRequest };
  }

  // Validate add action
  if (action === 'add') {
    if (!Array.isArray(obj.items)) {
      return { valid: false, error: 'Items must be an array' };
    }
    if (obj.items.length === 0) {
      return { valid: false, error: 'Items array cannot be empty' };
    }
    for (const item of obj.items) {
      if (!item || typeof item !== 'object') {
        return { valid: false, error: 'Each item must be an object' };
      }
      if (typeof (item as any).variantId !== 'string' || !(item as any).variantId) {
        return { valid: false, error: 'Each item must have a valid variantId' };
      }
      const quantity = (item as any).quantity;
      if (typeof quantity !== 'number' || quantity < 1 || quantity > 999) {
        return { valid: false, error: 'Quantity must be a number between 1 and 999' };
      }
    }
    return { valid: true, data: body as CartAddRequest };
  }

  // Validate update action
  if (action === 'update') {
    if (typeof obj.cartId !== 'string' || !obj.cartId) {
      return { valid: false, error: 'Cart ID is required' };
    }
    if (!Array.isArray(obj.updates)) {
      return { valid: false, error: 'Updates must be an array' };
    }
    for (const update of obj.updates) {
      if (!update || typeof update !== 'object') {
        return { valid: false, error: 'Each update must be an object' };
      }
      if (typeof (update as any).id !== 'string' || !(update as any).id) {
        return { valid: false, error: 'Each update must have a valid id' };
      }
      const quantity = (update as any).quantity;
      if (typeof quantity !== 'number' || quantity < 0 || quantity > 999) {
        return { valid: false, error: 'Quantity must be a number between 0 and 999' };
      }
    }
    return { valid: true, data: body as CartUpdateRequest };
  }

  // Validate remove action
  if (action === 'remove') {
    if (typeof obj.cartId !== 'string' || !obj.cartId) {
      return { valid: false, error: 'Cart ID is required' };
    }
    if (!Array.isArray(obj.lineIds)) {
      return { valid: false, error: 'Line IDs must be an array' };
    }
    if (obj.lineIds.length === 0) {
      return { valid: false, error: 'Line IDs array cannot be empty' };
    }
    for (const lineId of obj.lineIds) {
      if (typeof lineId !== 'string' || !lineId) {
        return { valid: false, error: 'Each line ID must be a non-empty string' };
      }
    }
    return { valid: true, data: body as CartRemoveRequest };
  }

  return { valid: false, error: 'Unknown error' };
}

