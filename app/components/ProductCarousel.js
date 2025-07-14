'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductCarousel({ images, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Si no hay imágenes, mostrar placeholder
  if (!images || images.length === 0) {
    return (
      <div className="carousel-container relative h-64 w-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Billede ikke tilgængelig</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container relative h-64 w-full">
      {/* Imagen principal */}
      <Image
        src={images[currentIndex]}
        alt={`${productName} - Imagen ${currentIndex + 1}`}
        fill
        className="carousel-image object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
      />
      
      {/* Botones de navegación */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="carousel-nav-button absolute left-2 top-1/2 transform -translate-y-1/2"
            aria-label="Imagen anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextImage}
            className="carousel-nav-button absolute right-2 top-1/2 transform -translate-y-1/2"
            aria-label="Siguiente imagen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      {/* Indicadores de puntos */}
      {images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Contador de imágenes */}
      {images.length > 1 && (
        <div className="carousel-counter">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
} 