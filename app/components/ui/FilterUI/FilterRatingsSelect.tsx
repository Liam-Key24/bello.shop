import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface RatingsSectionProps {
  isOpen: boolean;
  toggleSection: () => void;
}

const RatingsSection: React.FC<RatingsSectionProps> = ({ isOpen, toggleSection }) => {
  return (
    <div className="glass rounded-2xl p-4 mb-4">
      <button
        onClick={toggleSection}
        className="flex justify-between items-center w-full mb-4"
      >
        <h3 className="text-lg font-semibold text-gray-800">Ratings</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="text-3xl text-gray-400 hover:text-yellow-400 transition-colors"
            >
              ☆
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingsSection;
