'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductCarousel({ images, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Si no hay imágenes, mostrar placeholder
  if (!images || images.length === 0) {
    return (
      <div style={{
        position: 'relative',
        height: '256px',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '12px 12px 0 0',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#6b7280' }}>Billede ikke tilgængelig</p>
          </div>
        </div>
      </div>
    );
  }

  const goToSlide = (index) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImage = images[currentIndex];

  return (
    <div style={{ position: 'relative' }}>
      {/* Main image container */}
      <div style={{
        position: 'relative',
        height: '256px',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '12px 12px 0 0',
        backgroundColor: '#f3f4f6'
      }}>
        {/* Current image */}
        <Image
          src={currentImage.src}
          alt={`${productName} - ${currentImage.alt}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={currentIndex === 0}
        />
        
        {/* Navigation arrows - only show if there are multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
              aria-label="Forrige billede"
            >
              ←
            </button>
            
            <button
              onClick={goToNext}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
              aria-label="Næste billede"
            >
              →
            </button>
          </>
        )}

        {/* Image counter - only show if there are multiple images */}
        {images.length > 1 && (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            zIndex: 10
          }}>
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Dots indicator - only show if there are multiple images */}
      {images.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '4px',
          zIndex: 10
        }}>
          {images.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goToSlide(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                transform: index === currentIndex ? 'scale(1.25)' : 'scale(1)',
                transition: 'all 0.3s'
              }}
              aria-label={`Gå til billede ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 