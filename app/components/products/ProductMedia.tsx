import Image from "next/image";

export interface ProductMediaProps {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Product image with honest translucent placeholder when no src is available.
 */
export function ProductMedia({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: ProductMediaProps) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-brand-pale/40 text-mid-gray text-sm ${className}`}
        role="img"
        aria-label={alt}
      >
        Product image coming soon
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
