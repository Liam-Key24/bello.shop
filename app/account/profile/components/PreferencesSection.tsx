'use client';

import type { Customer } from '@/lib/shopify/types';

interface PreferencesSectionProps {
  customer: Customer;
}

export default function PreferencesSection({ customer }: PreferencesSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        Preferences
      </h2>
      <div className="p-4 bg-white/50 rounded-lg backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-800">Marketing Emails</p>
            <p className="text-sm text-gray-600">Receive updates about new products and offers</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              customer.acceptsMarketing 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {customer.acceptsMarketing ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

