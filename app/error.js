'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Image
          src="/logo.jpg"
          alt="Heintz Nordic Frezzen logo"
          width={120}
          height={120}
          className="mx-auto mb-8 rounded-lg"
        />
        
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          Noget gik galt
        </h1>
        
        <p className="text-gray-600 mb-8">
          Der opstod en uventet fejl. Prøv venligst igen.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
          >
            Prøv igen
          </button>
          
          <a 
            href="/"
            className="block w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors focus-visible:outline-2 focus-visible:outline-gray-500 focus-visible:outline-offset-2 text-center"
          >
            Gå tilbage til forsiden
          </a>
        </div>
      </div>
    </div>
  );
} 