'use client';

export default function ProfileLoading() {
  return (
    <div className="neumorphism-bg p-12 rounded-4xl text-center">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Loading your profile...</p>
    </div>
  );
}

