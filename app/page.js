'use client';

import { useState } from 'react';
import Image from "next/image";
import ScrollToTop from "./components/ScrollToTop";
import LoadingSpinner from "./components/LoadingSpinner";
import ProductCarousel from "./components/ProductCarousel";
import TestimonialsSection from "./components/TestimonialsSection";
import StatsSection from "./components/StatsSection";
import CTASection from "./components/CTASection";
import AboutModal from "./components/AboutModal";
import ContactModal from "./components/ContactModal";
import SearchBar from "./components/SearchBar";

export default function Home() {
  // Estados para los modales
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Estados para la búsqueda
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [searchActive, setSearchActive] = useState(false);

  // Definición de los 3 productos con sus respectivas imágenes
  const products = [
    {
      id: 1,
      name: "Premium Kaninkød Serie A",
      description: "Kvalitets kaninkød til professionelle køkkener og restauranter",
      category: "Professionel Serie",
      images: [
        { src: "/1.jpeg", alt: "Premium kaninkød produkt 1" },
        { src: "/2.jpeg", alt: "Premium kaninkød produkt 2" },
        { src: "/3.jpeg", alt: "Premium kaninkød produkt 3" },
        { src: "/4.jpeg", alt: "Premium kaninkød produkt 4" },
      ]
    },
    {
      id: 2,
      name: "Gourmet Kaninkød Serie B",
      description: "Eksklusivt kaninkød til detailhandel og specialbutikker",
      category: "Gourmet Serie",
      image: { src: "/6.jpeg", alt: "Gourmet kaninkød produkt 6" }
    },
    {
      id: 3,
      name: "Standard Kaninkød Serie C",
      description: "Pålideligt kaninkød til grossister og detailhandel",
      category: "Standard Serie",
      images: [
        { src: "/7.jpeg", alt: "Standard kaninkød produkt 7" },
        { src: "/8.jpeg", alt: "Standard kaninkød produkt 8" },
        { src: "/9.jpeg", alt: "Standard kaninkød produkt 9" },
      ]
    }
  ];

  // Función de búsqueda y filtrado
  const handleSearch = (searchTerm, selectedCategory) => {
    if (!searchTerm.trim() && selectedCategory === 'all') {
      setFilteredProducts(null);
      setSearchActive(false);
      return;
    }

    const filtered = products.filter(product => {
      const matchesSearch = searchTerm.trim() === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || 
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
    setSearchActive(true);
  };

  // Función para limpiar búsqueda
  const handleClearSearch = () => {
    setFilteredProducts(null);
    setSearchActive(false);
  };

  // Productos a mostrar (filtrados o todos)
  const productsToShow = filteredProducts || products;

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-start">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Gå til hovedindhold
      </a>

      {/* Header fijo */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2 sm:gap-4">
          <Image 
            src="/logo.jpg" 
            alt="Heintz Nordic Frezzen logo" 
            width={60} 
            height={60}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg"
            priority
          />
          <span className="font-bold text-blue-700 text-sm sm:text-lg">Heintz Nordic Frezzen</span>
        </div>
        <nav className="flex gap-3 sm:gap-6" role="navigation" aria-label="Hovednavigation">
          <button 
            onClick={() => setIsAboutModalOpen(true)}
            className="text-blue-700 font-medium hover:underline transition-colors text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-2 py-1 bg-transparent border-none cursor-pointer"
          >
            Om os
          </button>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="text-blue-700 font-medium hover:underline transition-colors text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-2 py-1 bg-transparent border-none cursor-pointer"
          >
            Kontakt
          </button>
        </nav>
      </header>

      {/* Espaciador para el header fijo */}
      <div className="h-16" />

      {/* Imagen de fondo optimizada */}
      <div className="absolute top-0 left-0 w-full h-48 sm:h-64 md:h-80 lg:h-96 -z-10">
        <Image
          src="/globe.svg"
          alt="Baggrundsbillede - Verdensglobus der symboliserer international handel"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
      </div>

      {/* Contenido principal */}
      <main id="main-content" className="w-full flex flex-col items-center justify-start">
        {/* Encabezado principal */}
        <section className="w-full flex flex-col items-center justify-center pt-8 sm:pt-12 pb-6 sm:pb-8 animate-fade-in-up">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center text-blue-800 drop-shadow-lg px-4 max-w-4xl">
            Importør og distributør af frossent kaninkød i Danmark
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-700 mt-4 px-4 text-center max-w-2xl">
            Din pålidelige partner for kvalitets frossent kaninkød med fokus på service og leveringssikkerhed
          </p>
        </section>
        
        {/* Sección del Catálogo */}
        <section className="w-full max-w-7xl px-4 mt-6 sm:mt-8" aria-labelledby="catalog-heading">
          <h2 id="catalog-heading" className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6 sm:mb-8 animate-fade-in-up">
            Vores Produktkatalog
          </h2>
          
          {/* Barra de búsqueda */}
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
          
          {/* Indicador de resultados */}
          {searchActive && (
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                {productsToShow.length === 1 
                  ? '1 produkt fundet' 
                  : `${productsToShow.length} produkter fundet`
                }
                {filteredProducts && filteredProducts.length !== products.length && (
                  <span className="text-gray-500"> af {products.length} total</span>
                )}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {productsToShow.map((product, index) => (
              <article 
                key={product.id} 
                className="main-card bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100 animate-fade-in-scale"
                style={{ '--stagger-index': index }}
                tabIndex="0"
                role="article"
                aria-labelledby={`product-${product.id}`}
              >
                {/* Imagen del producto */}
                {product.images ? (
                  <ProductCarousel 
                    images={product.images} 
                    productName={product.name}
                  />
                ) : (
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'relative',
                      height: '256px',
                      width: '100%',
                      overflow: 'hidden',
                      borderRadius: '12px 12px 0 0',
                      backgroundColor: '#f3f4f6'
                    }}>
                      <Image
                        src={product.image.src}
                        alt={`${product.name} - ${product.image.alt}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority
                      />
                    </div>
                  </div>
                )}
                
                {/* Información del producto */}
                <div className="p-4 sm:p-6">
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 id={`product-${product.id}`} className="text-lg sm:text-xl font-bold text-blue-800 mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">5.0</span>
                    </div>
                    
                    <button className="btn-primary text-sm px-4 py-2">
                      Se mere
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Mensaje cuando no hay resultados */}
          {searchActive && productsToShow.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen produkter fundet</h3>
              <p className="text-gray-600 mb-4">Prøv at ændre dine søgekriterier eller ryd søgningen.</p>
              <button
                onClick={handleClearSearch}
                className="btn-primary px-6 py-2"
              >
                Ryd søgning
              </button>
            </div>
          )}
          
          <div className="text-center mt-12 sm:mt-16 animate-fade-in-up">
            <p className="text-xl sm:text-2xl font-bold text-blue-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Kataloget udvides snart!
            </p>
            <p className="text-gray-600 mt-2 text-base sm:text-lg">
              Nye produkter kommer til
            </p>
          </div>
        </section>

        {/* Sección de Estadísticas */}
        <StatsSection />

        {/* Sección de Testimonios */}
        <TestimonialsSection />

        {/* Sección Om os */}
        <section id="about" className="w-full max-w-4xl mt-12 sm:mt-20 px-4" aria-labelledby="about-heading">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100 animate-slide-in-left">
            <div className="text-center mb-6 sm:mb-8">
              <h3 id="about-heading" className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">Om os</h3>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  Heintz Nordic Frezzen er importør og distributør af frossent kaninkød i Danmark, dedikeret til kvalitet og service.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm sm:text-base">Kvalitetsprodukter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm sm:text-base">Pålidelig levering</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm sm:text-base">Ekspert service</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 sm:mb-4">Vores Mission</h4>
                <p className="text-gray-700 text-sm sm:text-base">
                  At levere det bedste frossne kaninkød til vores kunder i Danmark med fokus på kvalitet, service og pålidelighed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección CTA */}
        <CTASection />

        {/* Sección Kontakt */}
        <section id="contact" className="w-full max-w-4xl mt-12 sm:mt-16 px-4" aria-labelledby="contact-heading">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100 animate-slide-in-right">
            <div className="text-center mb-6 sm:mb-8">
              <h3 id="contact-heading" className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">Kontakt</h3>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-800 text-sm sm:text-base">Email</p>
                    <a 
                      href="mailto:thb@heintz-nordic-frezzen.dk" 
                      className="text-blue-700 hover:underline text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-1"
                    >
                      thb@heintz-nordic-frezzen.dk
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-800 text-sm sm:text-base">Telefon</p>
                    <a 
                      href="tel:+4591718794" 
                      className="text-blue-700 hover:underline text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-1"
                    >
                      +45 91718794
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-800 text-sm sm:text-base">Adresse</p>
                    <address className="text-gray-700 text-sm sm:text-base not-italic">
                      Ernst Carlsens Vej 2 - Fredericia (7000)
                    </address>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 sm:mb-4">Åbningstider</h4>
                <div className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span>Mandag - Torsdag:</span>
                    <span className="font-semibold">07.00 - 18.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fredag:</span>
                    <span className="font-semibold">07.00 - 17.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekend:</span>
                    <span className="font-semibold">Lukket</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer virksomhed */}
      <footer className="w-full bg-blue-50 border-t border-blue-100 mt-12 sm:mt-16 py-8 sm:py-10 px-4" role="contentinfo">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-start gap-6 sm:gap-8 md:gap-16 text-blue-900">
          {/* Logo */}
          <div className="flex-1 flex flex-col items-center md:items-start mb-4 md:mb-0">
            <Image 
              src="/logo.jpg" 
              alt="Heintz Nordic Frezzen logo" 
              width={80} 
              height={80} 
              className="mb-2 rounded-lg"
            />
          </div>
          {/* Virksomhedsoplysninger */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="font-bold text-base sm:text-lg mb-2">Heintz Nordic Frezzen</h3>
            <address className="mb-2 text-sm sm:text-base not-italic">Ernst Carlsens Vej 2 - Fredericia (7000)</address>
            <div className="mb-2 text-sm sm:text-base">CVR: 45611132</div>
            <div className="mt-3 sm:mt-4">
              <span className="font-semibold text-sm sm:text-base">Åbningstider</span><br />
              <span className="text-sm sm:text-base">Man-tor: 07.00-18.00</span><br />
              <span className="text-sm sm:text-base">Fre: 07.00 - 17.00</span>
            </div>
          </div>
          {/* Kontakt og links */}
          <div className="flex-1 min-w-[200px]">
            <div className="mb-2 text-sm sm:text-base">
              <span className="font-semibold">Email:</span> 
              <a 
                href="mailto:thb@heintz-nordic-frezzen.dk" 
                className="text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-1"
              >
                thb@heintz-nordic-frezzen.dk
              </a>
            </div>
            <div className="mb-2 text-sm sm:text-base">
              <span className="font-semibold">Tlf.:</span> 
              <a 
                href="tel:+4591718794" 
                className="text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-1"
              >
                +45 91718794
              </a>
            </div>
            <div className="mt-3 sm:mt-4">
              <h4 className="font-semibold mb-1 text-sm sm:text-base">Links</h4>
              <ul className="list-disc list-inside text-xs sm:text-sm text-blue-800 space-y-1">
                <li><a href="#" className="hover:underline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-1">Cookiepolitik</a></li>
                <li><a href="#" className="hover:underline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-1">Privatlivspolitik</a></li>
                <li><a href="#" className="hover:underline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-1">Whistleblowerordning</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Botón Volver arriba */}
      <ScrollToTop />

      {/* Modales */}
      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
      />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
