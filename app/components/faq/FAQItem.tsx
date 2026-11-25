"use client";

import { useState } from "react";
import { Icon } from "@/app/components/ui/Icon";

export interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-bg glass-border glass-shadow rounded-md overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="font-body font-semibold text-charcoal">{question}</span>
        <span className="text-brand shrink-0">
          <Icon name={open ? "close" : "plus"} size={18} />
        </span>
      </button>
      {open && (
        <div className="px-5 md:px-6 pb-5 md:pb-6 text-mid-gray text-[15px] leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
