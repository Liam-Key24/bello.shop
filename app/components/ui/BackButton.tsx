import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackButton(){
  return (
    <Link href={'/shop'} className="glass rounded-full w-8 h-8">
      <ChevronLeft className="w-8 h-8 text-gray-700" />
    </Link>
  );
};