'use client';

import { WarningCircle } from '@phosphor-icons/react';

export default function ProfileError( props : { error: string }) {
  const { error } = props;
  return (
    <div className="neumorphism-bg p-8 rounded-4xl">
      <div className="p-4 bg-white rounded-lg flex items-center gap-3">
        <WarningCircle className="w-5 h-5 text-red-600 mt-0.5" weight="regular" />
        <div>
          <p className="text-red-600 font-semibold">Error loading profile</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    </div>
  );
}

