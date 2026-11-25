import { Metadata } from "next";
import { PageHeading } from "@/app/components/ui/PageHeading";

export const metadata: Metadata = {
  title: "Returns & Refunds | Bello",
  description: "30-day returns policy for Bello orders.",
};

export default function ReturnsPage() {
  return (
    <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-24">
      <PageHeading title="Returns & Refunds" />
      <div className="max-w-2xl space-y-6 text-[17px] leading-relaxed text-mid-gray">
        <p>
          If something isn&apos;t right, you have 30 days from delivery to request a
          return on unused items in original condition.
        </p>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Email us with your order number and reason for return.</li>
          <li>We&apos;ll confirm the return and share next steps.</li>
          <li>Once we receive the item, refunds are processed to your original payment method.</li>
        </ol>
        <p className="text-sm">
          Contact: use the form on our Contact page. Final policy wording can be
          updated once AutoDS return flows are confirmed.
        </p>
      </div>
    </div>
  );
}
