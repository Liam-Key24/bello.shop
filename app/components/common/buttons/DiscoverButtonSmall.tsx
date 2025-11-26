import Link from "next/link";

interface DiscoverButtonSmallProps {
  /**
   * If true, renders as a button instead of a link
   * Use this when the button is inside another link element to avoid nested anchors
   */
  asButton?: boolean;
  /**
   * Custom href when used as a link
   */
  href?: string;
}

/**
 * Small discover button - compact version for product cards
 * Can be used as a link or button to avoid nested anchor tags
 */
export default function DiscoverButtonSmall({ 
  asButton = false, 
  href = "/shop" 
}: DiscoverButtonSmallProps = {}) {
  const className = "w-auto h-5 bg-frosty-green inline-flex justify-center items-center rounded-4xl px-2";
  const content = (
    <>
      <p className="font-[8px]">Discover</p>
      <img src="/icons/angle-small-right.svg" alt=">" className="w-3 h-3" />
    </>
  );

  if (asButton) {
    return (
      <div
        className={className}
        role="button"
        aria-label="Discover products"
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label="Discover products"
    >
      {content}
    </Link>
  );
}

