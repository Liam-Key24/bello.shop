import { Sparkle } from "@/app/components/ui/Sparkle";

/**
 * Placed sparkles: hero corners + page accents.
 * Footer sparkle lives in Footer (top-right of that section).
 */
export function DecorativeSparkles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Sparkle
        size="lg"
        className="absolute top-28 right-10 text-brand/35 md:top-32 md:right-16 md:text-brand/40"
      />
      <Sparkle
        size="sm"
        className="absolute top-[58%] right-[18%] hidden text-brand/25 md:block"
      />
      <Sparkle
        size="md"
        className="absolute top-[22%] left-[8%] text-brand/20 md:left-[12%] md:text-brand/30"
      />
    </div>
  );
}
