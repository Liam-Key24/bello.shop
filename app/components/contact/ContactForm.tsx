"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/app/components/ui/Button";

/**
 * Contact form wired for Vercel Forms.
 * On Vercel: enable Forms for the project; submissions POST to /api/contact
 * and can be viewed / forwarded from the Vercel dashboard once Forms is on.
 * No fake success without a real submit attempt.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setMessage(data.message || "Thanks — we'll get back to you soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form
      name="bello-contact"
      method="POST"
      action="/api/contact"
      onSubmit={handleSubmit}
      className="glass-bg glass-border glass-shadow rounded-md p-6 md:p-8 space-y-5"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-sm border border-light-gray bg-white/80 px-4 py-3 text-charcoal focus:outline-none focus:border-brand"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-sm border border-light-gray bg-white/80 px-4 py-3 text-charcoal focus:outline-none focus:border-brand"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-sm border border-light-gray bg-white/80 px-4 py-3 text-charcoal focus:outline-none focus:border-brand resize-y"
        />
      </div>

      <Button type="submit" variant="primary" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>

      {message && (
        <p
          className={`text-sm ${
            status === "success" ? "text-charcoal" : "text-red-600"
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
