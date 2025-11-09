'use client';

import { useState } from 'react';
import FiltersBar from './FilterBar';
import FilterCategorySection from '../ui/FilterUI/FilterCategorySection';
import FilterPriceSelection from '../ui/FilterUI/FilterPriceSelection';
import RatingsSection from '../ui/FilterUI/FilterRatingsSelect';
import BrandSection from '../ui/FilterUI/FilterBrandSelect';
import { XIcon } from '@phosphor-icons/react';
type ViewMode = "grid" | "list";

interface FilterComponentProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export default function FilterHead({ viewMode, onViewChange }: FilterComponentProps) {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    ratings: true,
    brand: true,
    className: '',
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  const categories = [
    { id: 'skincare', label: 'skincare', checked: true },
    { id: 'haircare', label: 'haircare', checked: true },
    { id: 'footcare', label: 'footcare', checked: true },
    { id: 'home', label: 'home', checked: true },
    { id: 'handcare', label: 'handcare', checked: true },
    { id: 'gifts', label: 'gifts', checked: true }
  ];

  return (
    <div className="pt-20 relative z-5">
      <FiltersBar
        viewMode={viewMode}
        onViewChange={onViewChange}
        onFiltersToggle={() => setIsFilterOpen(prev => !prev)}
      />

      {isFilterOpen && (
        <div className="fixed inset-0  bg-black/30 backdrop-blur-sm flex justify-center items-start pt-20 px-4">
          
          <div className="glass w-full max-w-md h-auto rounded-4xl p-4 space-y-4 pt-10 relative">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="absolute top-3 right-4 text-gray-700 hover:text-gray-900"
              aria-label="Close Filters"
            >
              <XIcon size={20} />
            </button>
            {/* Category Section */}
            <FilterCategorySection
              title="Category"
              categories={categories}
              open={openSections.category}
              toggleSection={() => toggleSection('category')}
            />

            {/* Price Section */}
            <FilterPriceSelection
              isOpen={openSections.price}
              toggleSection={() => toggleSection('price')}
            />

            {/* Ratings Section */}
            <RatingsSection
              isOpen={openSections.ratings}
              toggleSection={() => toggleSection('ratings')}
            />

            {/* Brand Section */}
            <BrandSection
              isOpen={openSections.brand}
              toggleSection={() => toggleSection('brand')}
              options={['Nike', 'Adidas', 'Puma', 'Reebok']}
            />
          </div>
        </div>
      )}
    </div>
  );
}
