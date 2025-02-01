import React from 'react';

export function SocialsSection () {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {/* First large square */}
      <div className="w-[425px] h-[450px] bg-gray-200 rounded-lg relative hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
        <img
          src="/media/maria-orlova-Ys8VpdbIYxE-unsplash.jpg"
          alt="Large Square"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className='bg-white absolute bottom-4 right-4 p-2 rounded-lg shadow-md'> 
          <p>@lydia-is-beauty</p>
        </div>
      </div>

      {/* Second large square */}
      <div className="w-[425px] h-[450px] bg-gray-200 rounded-lg relative hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
        <img
          src="/media/maria-orlova-Ys8VpdbIYxE-unsplash.jpg"
          alt="Large Square"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className='bg-white absolute bottom-4 right-4 p-2 rounded-lg shadow-md'> 
          <p>@lydia-is-beauty</p>
        </div>
      </div>

      {/* Third smaller square (1/3 size) */}
      <div className="w-[360-px] md:w-[300px] h-[450px] bg-gray-200 rounded-lg flex flex-col justify-between p-4">
        <h2 className="p-3">Follow our journey, to find the best health and beauty products money can buy</h2>
        <div className="w-[150px] h-[150px] bg-gray-700 mb-4 ml-4">
            <h1>QR</h1>
        </div>
      </div>
    </div>
  );
};
