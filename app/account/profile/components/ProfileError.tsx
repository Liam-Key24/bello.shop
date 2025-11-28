'use client';

import { AlertCircle } from 'lucide-react';

interface ProfileErrorProps {
  error: string;
}

export default function ProfileError({ error }: ProfileErrorProps) {
  return (
    <div className="neumorphism-bg p-8 rounded-4xl">
      <div className="p-4 bg-white rounded-lg flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
        <div>
          <p className="text-red-600 font-semibold">Error loading profile</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    </div>
  );
}

