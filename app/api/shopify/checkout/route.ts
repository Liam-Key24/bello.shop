import { NextRequest, NextResponse } from "next/server";
import { createCheckout } from "@/lib/shopify/cart";

export async function POST(req: NextRequest) {
  try {
    let variantId: string;
    let quantity: number = 1;
    
    const contentType = req.headers.get("content-type");
    const isJsonRequest = contentType?.includes("application/json") ?? false;
    
    if (isJsonRequest) {
      const body = await req.json();
      variantId = body.variantId;
      quantity = body.quantity || 1;
    } else {
      const formData = await req.formData();
      variantId = formData.get("variantId") as string;
      quantity = Number(formData.get("quantity")) || 1;
    }
    
    if (!variantId || typeof variantId !== "string") {
      return NextResponse.json(
        { error: "Variant ID is required" }, 
        { status: 400 }
      );
    }

    if (!variantId.trim()) {
      return NextResponse.json(
        { error: "Variant ID cannot be empty" }, 
        { status: 400 }
      );
    }

    const checkout = await createCheckout(variantId, quantity);
    
    if (isJsonRequest) {
      return NextResponse.json({ checkout });
    } else {
      return NextResponse.redirect(checkout.webUrl);
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error 
      ? err.message 
      : "Failed to create checkout";
    
    return NextResponse.json(
      { 
        error: errorMessage,
      }, 
      { status: 500 }
    );
  }
}

