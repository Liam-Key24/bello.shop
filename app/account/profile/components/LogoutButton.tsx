'use client';

import { SignOutIcon } from '@phosphor-icons/react';

interface LogoutButtonProps {
  onLogout: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <button
      onClick={onLogout}
      className="mt-4 px-6 py-3 bg-red-custom text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <SignOutIcon className="w-5 h-5" weight="regular" />
      <span>Logout</span>
    </button>
  );
}

