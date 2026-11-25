import { Metadata } from "next";
import { PageHeading } from "@/app/components/ui/PageHeading";

export const metadata: Metadata = {
  title: "Privacy Policy | Bello",
  description: "How Bello handles personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-24">
      <PageHeading title="Privacy Policy" />
      <div className="max-w-2xl space-y-5 text-mid-gray leading-relaxed text-[15px]">
        <p>
          We collect only what we need to fulfil orders and respond to support
          messages — typically name, email, shipping address, and payment details
          processed by Shopify.
        </p>
        <p>
          We do not sell personal data. Analytics and marketing tools, if added
          later, will be disclosed here.
        </p>
        <p className="text-sm">
          {/* TODO: Replace with solicitor-reviewed policy before launch */}
          This is a working summary. Liam should replace it with a full legal policy
          before public launch.
        </p>
      </div>
    </div>
  );
}
