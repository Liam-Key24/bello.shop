'use client';

import { User, Mail, Calendar } from 'lucide-react';

type Customer = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt: string;
};

interface PersonalInfoSectionProps {
  customer: Customer;
}

export default function PersonalInfoSection({ customer }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-4">      
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-4 rounded-lg backdrop-blur-sm">
          <User className="w-5 h-5" />
          <div>
            <p className="text-xs uppercase tracking-wide">Full Name</p>
            <p className="font-medium">
              {customer.firstName || customer.lastName 
                ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
                : 'Not provided'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg backdrop-blur-sm">
          <Mail className="w-5 h-5" />
          <div>
            <p className="text-xs uppercase tracking-wide">Email</p>
            <p className="font-medium">{customer.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg backdrop-blur-sm">
          <Calendar className="w-5 h-5" />
          <div>
            <p className="text-xs uppercase tracking-wide">Member Since</p>
            <p className="text-gray-800 font-medium">
              {new Date(customer.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

