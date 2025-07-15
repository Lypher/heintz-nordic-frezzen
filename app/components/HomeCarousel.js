'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const HomeCarousel = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlayPaused, setAutoPlayPaused] = useState(false);

  const slides = [
    {
      id: 'products',
      image: '/products.jpeg',
      title: 'Vores Produkter',
      description: 'Udforsk vores kvalitets kaninkød',
      buttonText: 'Se produkter'
    },
    {
      id: 'why-us',
      image: '/whychooseus.jpg',
      title: 'Hvorfor Vælge Os',
      description: 'Din pålidelige partner for kvalitet',
      buttonText: 'Lær mere'
    },
    {
      id: 'why-rabbit',
      image: '/whychooserabbit.jpg',
      title: 'Hvorfor Vælge Kanin',
      description: 'Sundt og bæredygtigt valg',
      buttonText: 'Udforsk fordele'
    },
    {
      id: 'contact',
      image: '/contact.jpg',
      title: 'Kontakt Os',
      description: 'Lad os starte en samarbejde',
      buttonText: 'Kontakt os'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayPaused) return; // Don't auto-play if paused

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide for better viewing

    return () => clearInterval(interval);
  }, [slides.length, autoPlayPaused]); // Reset timer when autoPlayPaused changes

  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Pause auto-play temporarily
    setAutoPlayPaused(true);
    setTimeout(() => setAutoPlayPaused(false), 3000); // Resume after 3 seconds
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    // Pause auto-play temporarily
    setAutoPlayPaused(true);
    setTimeout(() => setAutoPlayPaused(false), 3000); // Resume after 3 seconds
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    // Pause auto-play temporarily
    setAutoPlayPaused(true);
    setTimeout(() => setAutoPlayPaused(false), 3000); // Resume after 3 seconds
  };

  const handleNavigate = (sectionId) => {
    onNavigate(sectionId);
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 transform translate-x-0'
              : index < currentSlide
              ? 'opacity-0 transform -translate-x-full'
              : 'opacity-0 transform translate-x-full'
          }`}
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 sm:p-8">
              <div className="text-center max-w-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg animate-fade-in-up">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 drop-shadow-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  {slide.description}
                </p>
                <button
                  onClick={() => handleNavigate(slide.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: '400ms' }}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Forrige slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Næste slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Gå til slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black/30 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default HomeCarousel; 