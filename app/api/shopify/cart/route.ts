import { NextRequest, NextResponse } from "next/server";
import {
  createShopifyCart,
  getCart,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
} from "@/lib/shopify/cart";

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
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    
    // Simple checkout (create cart and return URL)
    if (body.items && !body.action) {
    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

      const cart = await createShopifyCart(items);
      const response = NextResponse.json({ checkoutUrl: cart.checkoutUrl });
      response.cookies.set("shopifyCartId", cart.id, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return response;
    }

    // Cart management operations
    const { action, cartId, items, updates, lineIds } = body;

    if (!action || !["create", "add", "update", "remove"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    let cart;
    let response = NextResponse.json({});

    switch (action) {
      case "create":
        cart = await createShopifyCart(items || []);
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

      case "add":
        const addCartId = cartId || req.cookies.get("shopifyCartId")?.value;
        if (!addCartId) {
          cart = await createShopifyCart(items || []);
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
        if (!items || !Array.isArray(items)) {
          return NextResponse.json({ error: "Items required" }, { status: 400 });
        }
        cart = await cartLinesAdd(addCartId, items);
        return NextResponse.json({ cart });

      case "update":
        const updateCartId = cartId || req.cookies.get("shopifyCartId")?.value;
        if (!updateCartId) {
          return NextResponse.json({ error: "Cart ID required" }, { status: 400 });
        }
        if (!updates || !Array.isArray(updates)) {
          return NextResponse.json({ error: "Updates required" }, { status: 400 });
        }
        cart = await cartLinesUpdate(updateCartId, updates);
        return NextResponse.json({ cart });

      case "remove":
        const removeCartId = cartId || req.cookies.get("shopifyCartId")?.value;
        if (!removeCartId) {
          return NextResponse.json({ error: "Cart ID required" }, { status: 400 });
        }
        if (!lineIds || !Array.isArray(lineIds)) {
          return NextResponse.json({ error: "Line IDs required" }, { status: 400 });
        }
        cart = await cartLinesRemove(removeCartId, lineIds);
        return NextResponse.json({ cart });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Cart operation failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
