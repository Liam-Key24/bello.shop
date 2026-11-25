import { Metadata } from "next";
import { PageHeading } from "@/app/components/ui/PageHeading";
import { FAQItem } from "@/app/components/faq/FAQItem";

export const metadata: Metadata = {
  title: "FAQ | Bello",
  description: "Frequently asked questions about Bello orders and products.",
};

const faqs = [
  {
    question: "How many products do you sell?",
    answer:
      "We launch with a focused set of kitchen essentials — quality over catalogue size.",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes — free UK shipping on orders over £30.",
  },
  {
    question: "How do returns work?",
    answer:
      "You have 30 days from delivery to request a return on unused items. See our Returns page for steps.",
  },
  {
    question: "When will my order ship?",
    answer:
      "Orders typically dispatch shortly after payment. Tracking is emailed when the parcel ships. Exact timing depends on fulfilment partners (AutoDS once connected).",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-24">
      <PageHeading title="FAQ" />
      <div className="max-w-2xl space-y-4">
        {faqs.map((item) => (
          <FAQItem key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
}
