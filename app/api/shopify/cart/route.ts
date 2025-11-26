import { NextResponse } from "next/server";
import { createShopifyCart } from "@/lib/shopify/cart";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const items = Array.isArray(body.items) ? body.items : [];

    if (items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const checkoutUrl = await createShopifyCart(items);
    return NextResponse.json({ checkoutUrl });
  } catch (err: any) {
    console.error("Cart creation failed:", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
