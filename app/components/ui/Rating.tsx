import { Star } from 'lucide-react';

export default function Rating({ rating = 0, reviewCount = 0 }: { rating?: number; reviewCount?: number }) {
  return (
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-2">({reviewCount} ratings)</span>
    </div>
  );
}
