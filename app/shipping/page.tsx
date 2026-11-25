import { Metadata } from "next";
import { PageHeading } from "@/app/components/ui/PageHeading";
import { GlassCard } from "@/app/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Shipping & Delivery | Bello",
  description: "Shipping times, costs, and tracking for Bello orders.",
};

export default function ShippingPage() {
  return (
    <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-16 md:py-24">
      <PageHeading title="Shipping & Delivery" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        <GlassCard>
          <h2 className="font-display text-lg font-bold text-charcoal mb-3">UK Delivery</h2>
          <p className="text-mid-gray text-[15px] leading-relaxed">
            Standard delivery typically arrives within 3–7 working days after dispatch.
            Free shipping on orders over £30.
          </p>
        </GlassCard>
        <GlassCard>
          <h2 className="font-display text-lg font-bold text-charcoal mb-3">Tracking</h2>
          <p className="text-mid-gray text-[15px] leading-relaxed">
            Tracking details are emailed when your order ships. If you need help,
            contact us with your order number.
          </p>
        </GlassCard>
      </div>
      <p className="mt-8 text-sm text-mid-gray max-w-2xl">
        {/* TODO: AutoDS — confirm exact carrier SLAs once AutoDS is connected */}
        Exact carrier options will be confirmed once AutoDS fulfilment is live.
      </p>
    </div>
  );
}
