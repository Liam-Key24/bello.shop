/**
 * BackgroundBlobs Component
 *
 * Renders 4 fixed gradient blobs that create the soft colored atmosphere
 * behind glass elements. Colours come from theme tokens (brand + accent).
 */

export function BackgroundBlobs() {
  return (
    <>
      <div
        className="gradient-blob blob-brand w-[650px] h-[650px] -top-[120px] -right-[80px]"
        aria-hidden="true"
      />

      <div
        className="gradient-blob blob-accent w-[550px] h-[550px] top-[280px] -left-[120px]"
        aria-hidden="true"
      />

      <div
        className="gradient-blob blob-brand-soft w-[600px] h-[600px] top-[850px] right-[8%]"
        aria-hidden="true"
      />

      <div
        className="gradient-blob blob-accent-soft w-[520px] h-[520px] top-[1450px] left-[12%]"
        aria-hidden="true"
      />
    </>
  );
}
