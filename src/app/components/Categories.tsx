'use client'
import React from 'react';

export function Categories () {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Categories</h2>
        <div className="flex gap-2">
          <div className="h-24 bg-gray-100 p-2 w-auto  rounded-lg flex items-center gap-4">
            <img
              className="w-20 h-20 rounded-sm object-cover"
              src="/media/maria-orlova-Ys8VpdbIYxE-unsplash.jpg"
              alt="Electronics category"
            />
            <div>
              <h3 className="text-xl">Daily Skin Care</h3>
            </div>
            </div>
          <div className="h-24 bg-gray-100 p-2 w-auto  rounded-lg flex items-center gap-4">
            <img
              className="w-20 h-20 rounded-sm object-cover"
              src="/media/maria-orlova-Ys8VpdbIYxE-unsplash.jpg"
              alt="Electronics category"
            />
            <div>
              <h3 className="text-xl">Body & Face Oils</h3>
            </div>
            </div>
          <div className="h-24 bg-gray-100 p-2 w-auto  rounded-lg flex items-center gap-4">
            <img
              className="w-20 h-20 rounded-sm object-cover"
              src="/media/maria-orlova-Ys8VpdbIYxE-unsplash.jpg"
              alt="Electronics category"
            />
            <div>
              <h3 className="text-xl">Essential Oils</h3>
            </div>
            </div>
          
        </div>
      </div>
    </section>
  );
};

