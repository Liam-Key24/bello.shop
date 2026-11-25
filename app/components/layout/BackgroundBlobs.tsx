/**
 * BackgroundBlobs Component
 * 
 * Renders 4 fixed gradient blobs that create the soft colored atmosphere
 * behind glass elements. Positioned strategically across the page to provide
 * ambient green/blue gradient effect visible through frosted glass cards.
 * 
 * Design: v5 glassmorphism - 45% opacity, 100px blur, overlapping greens + blues
 */

export function BackgroundBlobs() {
  return (
    <>
      {/* Blob 1: Top Right - Green */}
      <div 
        className="gradient-blob"
        style={{
          width: '650px',
          height: '650px',
          background: 'radial-gradient(circle, #6FAA82 0%, transparent 65%)',
          top: '-120px',
          right: '-80px',
        }}
        aria-hidden="true"
      />
      
      {/* Blob 2: Mid Left - Blue */}
      <div 
        className="gradient-blob"
        style={{
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, #A0D7E7 0%, transparent 65%)',
          top: '280px',
          left: '-120px',
        }}
        aria-hidden="true"
      />
      
      {/* Blob 3: Lower Right - Light Green */}
      <div 
        className="gradient-blob"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, #7DB694 0%, transparent 65%)',
          top: '850px',
          right: '8%',
        }}
        aria-hidden="true"
      />
      
      {/* Blob 4: Lower Mid Left - Soft Blue */}
      <div 
        className="gradient-blob"
        style={{
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, #B5E3F3 0%, transparent 65%)',
          top: '1450px',
          left: '12%',
        }}
        aria-hidden="true"
      />
    </>
  );
}
