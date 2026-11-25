import { Metadata } from "next";
import { PageHeading } from "@/app/components/ui/PageHeading";

export const metadata: Metadata = {
  title: "Our Story | Bello",
  description: "Why Bello exists — sustainable kitchen essentials made simple.",
};

export default function AboutPage() {
  return (
    <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-24">
      <PageHeading title="Our Story" />
      <div className="max-w-2xl space-y-6 text-[17px] leading-relaxed text-mid-gray">
        <p>
          Bello is a small eco-kitchen brand focused on a few well-made essentials —
          products that help you waste less without sacrificing quality or style.
        </p>
        <p>
          We keep the catalogue intentional. Every item we sell should earn its place
          in your kitchen and last long enough to matter.
        </p>
        <p>
          {/* TODO: AutoDS — Liam will connect AutoDS for fulfilment; brand story stays curated here. */}
          As we grow, fulfilment will run through our dropshipping partners. The brand
          promise stays the same: simple, sustainable, trustworthy.
        </p>
      </div>
    </div>
  );
}
