/**
 * Price tier configuration
 * Centralized configuration for product price filtering
 */

export interface PriceTier {
  id: string;
  label: string;
  min: number;
  max: number | null; // null means no upper limit
}

export const PRICE_TIERS: PriceTier[] = [
  {
    id: 'low',
    label: '£',
    min: 0,
    max: 30,
  },
  {
    id: 'medium',
    label: '££',
    min: 30,
    max: 80,
  },
  {
    id: 'high',
    label: '£££',
    min: 80,
    max: null,
  },
];

/**
 * Get price tier by label
 */
export function getPriceTierByLabel(label: string): PriceTier | undefined {
  return PRICE_TIERS.find(tier => tier.label === label);
}

/**
 * Filter products by price tier
 */
export function filterByPriceTier(products: Array<{ price: number }>, tierLabel: string): Array<{ price: number }> {
  const tier = getPriceTierByLabel(tierLabel);
  if (!tier) return products;

  return products.filter(product => {
    if (tier.max === null) {
      return product.price >= tier.min;
    }
    return product.price >= tier.min && product.price < tier.max;
  });
}

/**
 * Get price tier labels for UI
 */
export function getPriceTierLabels(): string[] {
  return PRICE_TIERS.map(tier => tier.label);
}

