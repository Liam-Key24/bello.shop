'use client';

import { useState } from 'react';
import FiltersBar from './FiltersBar';
import FilterCategorySection, { type Category } from './FilterCategorySection';
import FilterPriceSelection from './FilterPriceSelection';
import FilterRatingsSelect from './FilterRatingsSelect';
import FilterBrandSelect from './FilterBrandSelect';
import { XIcon } from '@phosphor-icons/react';

type ViewMode = "grid" | "list";

interface FilterHeadProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  brands?: string[];
}

/**
 * Filter head component - main filter interface with collapsible sections
 * Combines FiltersBar with all filter sections
 */
export default function FilterHead({ viewMode, onViewChange, brands = ['Nike', 'Adidas', 'Puma', 'Reebok'] }: FilterHeadProps) {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    ratings: true,
    brand: true,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  const [categories, setCategories] = useState<Category[]>([
    { id: 'snowboard', label: 'Snowboard', checked: false },
    { id: 'hydrogen', label: 'Hydrogen', checked: false },
  ]);

  const handleToggleCategory = (id: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  return (
    <div className="pt-20 relative z-5">
      <FiltersBar
        viewMode={viewMode}
        onViewChange={onViewChange}
        onFiltersToggle={() => setIsFilterOpen(prev => !prev)}
      />

      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-start pt-20 px-4">
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
              title="Categories"
              categories={categories}
              open={openSections.category}
              toggleSection={() => toggleSection('category')}
              onToggleCategory={handleToggleCategory}
            />

            {/* Price Section */}
            <FilterPriceSelection
              isOpen={openSections.price}
              toggleSection={() => toggleSection('price')}
            />

            {/* Ratings Section */}
            <FilterRatingsSelect
              isOpen={openSections.ratings}
              toggleSection={() => toggleSection('ratings')}
            />

            {/* Brand Section */}
            <FilterBrandSelect
              isOpen={openSections.brand}
              toggleSection={() => toggleSection('brand')}
              options={brands}
            />
          </div>
        </div>
      )}
    </div>
  );
}

