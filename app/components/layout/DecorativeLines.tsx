/**
 * Thin sweeping SVG curves behind page content (with the blobs).
 * Kept faint; second path hidden on small screens.
 */
export function DecorativeLines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute -top-8 -left-16 w-[720px] h-[520px] text-brand/25 md:w-[980px] md:h-[700px] md:text-brand/30"
        viewBox="0 0 980 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-40 80 C 120 40, 220 220, 360 180 S 560 40, 720 120 S 900 280, 1040 220"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute top-[42%] -left-24 hidden w-[640px] h-[360px] text-brand/20 md:block md:w-[860px] md:h-[480px]"
        viewBox="0 0 860 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-20 260 C 140 200, 260 360, 420 300 S 620 160, 780 240 S 920 360, 1020 300"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
