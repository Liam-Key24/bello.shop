import { Metadata } from "next";
import { PageHeading } from "@/app/components/ui/PageHeading";
import { ContactForm } from "@/app/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Bello",
  description: "Get in touch with the Bello team.",
};

export default function ContactPage() {
  return (
    <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-24">
      <PageHeading title="Contact" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
        <div className="text-mid-gray leading-relaxed space-y-4">
          <p>
            Questions about an order, a product, or our sustainability practices?
            Send a message and we&apos;ll reply by email.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
