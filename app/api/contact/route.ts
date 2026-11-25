import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form endpoint for Vercel Forms / email delivery.
 *
 * Liam setup:
 * 1. Enable Vercel Forms on the bello project (Vercel dashboard → project → Forms), OR
 * 2. Set CONTACT_WEBHOOK_URL to a Forms/email webhook that accepts JSON posts.
 *
 * Until configured, we accept valid submissions and return an honest message
 * that delivery is not yet wired — we do not fake email send success.
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const payload = {
      form: "bello-contact",
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    };

    const webhook = process.env.CONTACT_WEBHOOK_URL;

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        return NextResponse.json(
          { error: "Could not deliver your message. Please try again later." },
          { status: 502 }
        );
      }

      return NextResponse.json({
        message: "Thanks — your message was sent. We'll reply by email.",
      });
    }

    // Honest empty/wiring state — no fake delivery
    console.info("[contact] Submission received (webhook not configured):", {
      name,
      email,
      messageLength: message.length,
    });

    return NextResponse.json({
      message:
        "Thanks — we received your details, but email delivery isn’t connected yet. Please try again later or email us directly.",
      pendingSetup: true,
    });
  } catch (error) {
    console.error("[contact] Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
