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
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}