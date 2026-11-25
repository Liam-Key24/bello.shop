import { Metadata } from "next";
import { PageHeading } from "@/app/components/ui/PageHeading";

export const metadata: Metadata = {
  title: "Terms of Service | Bello",
  description: "Terms of service for shopping at Bello.",
};

export default function TermsPage() {
  return (
    <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-24">
      <PageHeading title="Terms of Service" />
      <div className="max-w-2xl space-y-5 text-mid-gray leading-relaxed text-[15px]">
        <p>
          By placing an order with Bello you agree to pay the listed price, provide
          accurate shipping details, and accept our returns policy for unused items
          within 30 days of delivery.
        </p>
        <p>
          Product availability and pricing are shown at checkout via Shopify and may
          change. Fulfilment partners (including AutoDS once connected) may handle
          shipping on our behalf.
        </p>
        <p className="text-sm">
          {/* TODO: Replace with solicitor-reviewed terms before launch */}
          This is a working summary. Liam should replace it with full legal terms
          before public launch.
        </p>
      </div>
    </div>
  );
}
