import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Back button - navigates back to shop page
 */
export default function BackButton(){
  return (
      <Link
        href="/shop"
        className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/10 hover:shadow-md hover:shadow-black/50 transition-all duration-100 hover:backdrop-blur-3xl"
        aria-label="Back to shop"
      >
        <ChevronLeft className="w-8 h-8" />
      </Link>
  );
};

