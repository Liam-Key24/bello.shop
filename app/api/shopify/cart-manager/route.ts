import { NextRequest, NextResponse } from "next/server";
import {
  createCart,
  getCart,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
} from "@/lib/shopify/cart-manager";
import { validateCartRequest } from "@/lib/validation/cart-schema";

export async function GET(req: NextRequest) {
  try {
    const cartId = req.cookies.get("shopifyCartId")?.value;

    if (!cartId) {
      return NextResponse.json({ cart: null });
    }

    const cart = await getCart(cartId);
    return NextResponse.json({ cart });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to get cart";
    console.error("Get cart error:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }

    // Validate request structure
    const validation = validateCartRequest(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json({ error: validation.error || "Invalid request" }, { status: 400 });
    }

    const { action } = validation.data;
    const cartId = 'cartId' in validation.data ? validation.data.cartId : undefined;
    const items = 'items' in validation.data ? validation.data.items : undefined;
    const updates = 'updates' in validation.data ? validation.data.updates : undefined;
    const lineIds = 'lineIds' in validation.data ? validation.data.lineIds : undefined;

    let cart;
    let response = NextResponse.json({});

    switch (action) {
      case "create":
        cart = await createCart(items || []);
        response.cookies.set({
          name: "shopifyCartId",
          value: cart.id,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
        return NextResponse.json({ cart }, { headers: response.headers });

      case "add":
        if (!cartId) {
          // Create new cart if none exists
          cart = await createCart(items || []);
          response.cookies.set({
            name: "shopifyCartId",
            value: cart.id,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
          });
          return NextResponse.json({ cart }, { headers: response.headers });
        }
        if (!items) {
          return NextResponse.json({ error: "Items required" }, { status: 400 });
        }
        cart = await cartLinesAdd(cartId, items);
        return NextResponse.json({ cart });

      case "update":
        if (!cartId) {
          return NextResponse.json({ error: "Cart ID required" }, { status: 400 });
        }
        if (!updates) {
          return NextResponse.json({ error: "Updates required" }, { status: 400 });
        }
        cart = await cartLinesUpdate(cartId, updates);
        return NextResponse.json({ cart });

      case "remove":
        if (!cartId) {
          return NextResponse.json({ error: "Cart ID required" }, { status: 400 });
        }
        if (!lineIds) {
          return NextResponse.json({ error: "Line IDs required" }, { status: 400 });
        }
        cart = await cartLinesRemove(cartId, lineIds);
        return NextResponse.json({ cart });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Cart operation failed";
    console.error("Cart operation error:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

