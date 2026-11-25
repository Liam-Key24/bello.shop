import type { ReactNode } from "react";
import { Icon, type IconName } from "@/app/components/ui/Icon";

const items: Array<{ icon: IconName; label: ReactNode }> = [
  {
    icon: "truck",
    label: (
      <>
        <strong className="text-charcoal font-semibold">Free shipping</strong> on
        orders over £30
      </>
    ),
  },
  {
    icon: "check",
    label: (
      <>
        <strong className="text-charcoal font-semibold">30-day returns</strong>{" "}
        hassle-free
      </>
    ),
  },
  {
    icon: "leaf",
    label: (
      <>
        <strong className="text-charcoal font-semibold">Secure checkout</strong>{" "}
        via Shopify
      </>
    ),
  },
];

export function ProductGuarantees() {
  return (
    <div className="mt-12 pt-8 border-t border-light-gray space-y-5">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          <span className="text-brand-mid shrink-0">
            <Icon name={item.icon} size={24} />
          </span>
          <span className="text-sm text-mid-gray">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
