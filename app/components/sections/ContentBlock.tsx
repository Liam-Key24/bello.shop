import Link from "next/link";
import { Icon } from "@/app/components/ui/Icon";
import { ProductMedia } from "@/app/components/products/ProductMedia";

export interface ContentBlockProps {
  title: string;
  paragraphs: string[];
  imageSrc?: string | null;
  imageAlt?: string;
  linkHref?: string;
  linkText?: string;
}

export function ContentBlock({
  title,
  paragraphs,
  imageSrc,
  imageAlt = "Editorial image",
  linkHref,
  linkText,
}: ContentBlockProps) {
  return (
    <section className="max-w-[var(--max-width)] mx-auto px-6 md:px-[var(--spacing-horizontal)] py-20 md:py-[140px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <ProductMedia
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-80 md:h-[480px] rounded-md glass-border"
        />
        <div>
          <h2 className="mb-6">{title}</h2>
          {paragraphs.map((text) => (
            <p key={text.slice(0, 24)} className="text-base md:text-[17px] leading-relaxed text-mid-gray mb-5">
              {text}
            </p>
          ))}
          {linkHref && linkText && (
            <Link
              href={linkHref}
              className="inline-flex items-center gap-2 text-charcoal font-semibold hover:gap-3 transition-all"
            >
              {linkText}
              <Icon name="arrowRight" size={16} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
