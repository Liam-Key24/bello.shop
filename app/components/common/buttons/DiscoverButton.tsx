import Link from "next/link";

/**
 * Discover button - links to shop page with discover styling
 */
export default function DiscoverButton() {
  return (
    <Link
      href="/shop"
      className="w-auto h-7 bg-frosty-green inline-flex justify-center items-center rounded-4xl px-2"
      aria-label="Discover products"
    >
      <p className="font-[10px]">Discover now</p>
      <img src="/icons/angle-small-right.svg" alt=">" className="w-4 h-4" />
    </Link>
  );
}

