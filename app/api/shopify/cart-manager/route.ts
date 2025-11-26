import { NextRequest, NextResponse } from "next/server";
import {
  createCart,
  getCart,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
} from "@/lib/shopify/cart-manager";
import type { CartItem } from "@/lib/shopify/types";

export async function GET(req: NextRequest) {
  try {
    const cartId = req.cookies.get("shopifyCartId")?.value;

    if (!cartId) {
      return NextResponse.json({ cart: null });
    }

    const cart = await getCart(cartId);
    return NextResponse.json({ cart });
  } catch (err: any) {
    console.error("Get cart error:", err);
    return NextResponse.json({ error: err.message || "Failed to get cart" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, cartId, items, updates, lineIds } = body;

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
        cart = await cartLinesAdd(cartId, items);
        return NextResponse.json({ cart });

      case "update":
        if (!cartId) {
          return NextResponse.json({ error: "Cart ID required" }, { status: 400 });
        }
        cart = await cartLinesUpdate(cartId, updates);
        return NextResponse.json({ cart });

      case "remove":
        if (!cartId) {
          return NextResponse.json({ error: "Cart ID required" }, { status: 400 });
        }
        cart = await cartLinesRemove(cartId, lineIds);
        return NextResponse.json({ cart });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (err: any) {
    console.error("Cart operation error:", err);
    return NextResponse.json({ error: err.message || "Cart operation failed" }, { status: 500 });
  }
}

