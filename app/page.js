'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import ScrollToTop from "./components/ScrollToTop";
import LoadingSpinner from "./components/LoadingSpinner";
import ProductCarousel from "./components/ProductCarousel";
import TestimonialsSection from "./components/TestimonialsSection";
import StatsSection from "./components/StatsSection";

import AboutModal from "./components/AboutModal";
import ContactModal from "./components/ContactModal";
import SearchBar from "./components/SearchBar";
import HomeCarousel from "./components/HomeCarousel"; // Added import for HomeCarousel

export default function Home() {
  // Tilstande for modaler
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Tilstande for søgning
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [searchActive, setSearchActive] = useState(false);

  // Ny tilstand for valgt produkt
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Tilstand for at styre hvilken sektion der er aktiv
  const [activeSection, setActiveSection] = useState('home'); // 'home', 'products', 'why-us', 'why-rabbit', 'om-os', 'contact'
  
  // Tilstand for at styre mobilmenu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Tilstand for at styre bløde overgange
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 1. Agregar estados para el formulario de contacto
  const [contactForm, setContactForm] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    country: '',
    residence: '',
    language: '',
    mode: '',
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(null);
  const [contactError, setContactError] = useState(null);

  // Handler para cambios en los inputs del formulario de contacto
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handler para el envío del formulario de contacto
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    setContactSuccess(null);
    setContactError(null);
    // Validación básica
    if (!contactForm.name || !contactForm.email) {
      setContactError('Navn og email er påkrævet.');
      setContactLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        setContactSuccess('Din besked er sendt!');
        setContactError(null);
        setContactForm({ name: '', lastname: '', email: '', phone: '', country: '', residence: '', language: '', mode: '' });
      } else {
        setContactError('Noget gik galt. Prøv igen senere.');
        setContactSuccess(null);
      }
    } catch (error) {
      setContactError('Noget gik galt. Prøv igen senere.');
      setContactSuccess(null);
    } finally {
      setContactLoading(false);
    }
  };

  // Definición de los 3 productos con sus respectivas imágenes de las carpetas
  const products = [
    {
      id: 1,
      name: "Frosne kaninlår",
      description: "100% kaninkød. Bagparti, to krydsede lår vakuumpakket og frosset.",
      category: "Muslos de conejo",
      images: [
        "/product1/2.jpeg",
        "/product1/3.jpeg",
        "/product1/4.jpeg",
        "/product2/3.jpeg",
        "/product2/4.jpeg"
      ]
    },
    {
      id: 2,
      name: "Hakket frossen kanin",
      description: "100% kaninkød hakket og frosset, klar til tilberedning.",
      category: "Conejo troceado",
      images: [
        "/product2/1.jpeg",
        "/product2/2.jpeg"
      ]
    },
    {
      id: 3,
      name: "Hele frosne kanin",
      description: "100% kaninkød hele, udtarmet, med lever og hoved, individuel frosset.",
      category: "Conejo entero",
      images: [
        "/product3/1.jpeg",
        "/product3/2.jpeg"
      ]
    }
  ];

  // Søge- og filterfunktion
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

  // Funktion til at rydde søgning
  const handleClearSearch = () => {
    setFilteredProducts(null);
    setSearchActive(false);
  };

  // Produkter at vise (filtrerede eller alle)
  const productsToShow = filteredProducts || products;

  // Funktion til at skifte aktiv sektion
  const handleSectionChange = (section) => {
    if (section === activeSection) return; // No hacer nada si ya estamos en esa sección
    
    // Iniciar transición
    setIsTransitioning(true);
    
    // Scroll suave hacia arriba
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Cambio con timing optimizado para slide
    setTimeout(() => {
      setActiveSection(section);
      // Cerrar menú móvil al navegar
      setIsMobileMenuOpen(false);
      // Limpiar búsqueda cuando se cambia de sección
      if (section !== 'products') {
        setFilteredProducts(null);
        setSearchActive(false);
      }
      
      // Finalizar transición después de la animación
      setTimeout(() => {
        setIsTransitioning(false);
      }, 30);
    }, 90);
  };

  // Función para renderizar la sección activa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <section className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] pt-8 sm:pt-12 pb-6 sm:pb-8 animate-fade-in-up">
            <div className="text-center max-w-6xl px-4 w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 mb-6 drop-shadow-lg">
                Importør og distributør af frossent kaninkød i Danmark
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-blue-600 mb-8 italic">
                Det første skridt mod en ny generation af sund ernæring.
              </p>
              
              {/* Hovedkarusel */}
              <div className="relative w-full max-w-5xl mx-auto">
                <HomeCarousel onNavigate={handleSectionChange} />
              </div>
            </div>
          </section>
        );

             case 'products':
         return (
           <section className="px-4 pt-6 sm:pt-8 flex justify-center" aria-labelledby="catalog-heading">
            <div className="w-full max-w-5xl">
              <h2 id="catalog-heading" className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6 sm:mb-8 animate-fade-in-up">
                Vores Produktkatalog
              </h2>
              {/* Søgebar */}
              <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
              {/* Resultatindikator */}
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
              {/* Grilla de productos centrada */}
              <div className="flex justify-center w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 justify-center w-auto">
                  {productsToShow.map((product, index) => (
                    <article 
                      key={product.id} 
                      className="main-card bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100 animate-fade-in-scale"
                      style={{ '--stagger-index': index }}
                      tabIndex="0"
                      role="article"
                      aria-labelledby={`product-${product.id}`}
                    >
                      {/* Produktbillede */}
                      <ProductCarousel 
                        images={product.images} 
                        productName={product.name}
                      />
                      {/* Produktinformation */}
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
                            <span className="text-sm text-gray-500 ml-1">5.0</span>
                          </div>
                          <button
                            className="btn-primary text-sm px-4 py-2"
                            onClick={() => setSelectedProduct(product)}
                          >
                            Se mere
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              {/* Besked når der ikke er resultater */}
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
            </div>
          </section>
        );

             case 'why-us':
         return (
           <section className="w-full pt-6 sm:pt-8">
            <StatsSection />
          </section>
        );

             case 'why-rabbit':
         return (
           <section className="w-full max-w-6xl mx-auto px-4 pt-6 sm:pt-8">
            {/* Banner superior */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-xl">
              <Image
                src="/product2/1.jpeg"
                alt="Banner kaninkød - Produkt 2"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                    Hvorfor vælge kaninkød?
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl opacity-90 drop-shadow-lg">
                    Sundt, bæredygtigt og velsmagende valg
                  </p>
                </div>
              </div>
            </div>
            {/* Contenido principal */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100 animate-slide-in-right">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6 sm:space-y-8">
                {/* Introducción */}
                <div className="text-center">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
                    Hos Heintz Nordic Frezzen tror vi, at bevidst ernæring starter med at vælge kvalitetsprodukter, 
                    der er balancerede og bæredygtige. Kaninkød er et af de sundeste alternativer tilgængelige på 
                    det nuværende marked, ideelt for dem, der ønsker at tage vare på deres sundhed uden at opgive 
                    smag eller næringsværdi.
                  </p>
                </div>

                {/* Puntos principales */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Punto 1 */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <span className="text-blue-600 text-xl">1.</span>
                      Høj protein, lavt fedtindhold
                    </h4>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      Med 21 gram protein per 100g tilbyder kaninkød et proteinindhold svarende til andre populære 
                      kødtyper, men med en betydeligt mindre mængde fedt (kun 6,8g sammenlignet med 15g oksekød 
                      eller 28,2g svinekød).
                    </p>
                  </div>

                  {/* Punto 2 */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <span className="text-blue-600 text-xl">2.</span>
                      Lavere kolesterolindhold
                    </h4>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      En af de mest fremtrædende faktorer ved kaninkød er dets lave kolesterolniveau: kun 47 mg 
                      per 100g, meget under oksekød (114,5 mg), svinekød (85 mg) eller endda kylling (61,2 mg). 
                      Dette gør det til et fremragende alternativ for personer med kardiovaskulære problemer eller 
                      dem, der blot ønsker en sundere kost.
                    </p>
                  </div>

                  {/* Punto 3 */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <span className="text-blue-600 text-xl">3.</span>
                      Let fordøjelse og alsidighed
                    </h4>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      Kaninkød er blødt, let at fordøje og med en delikat smag, der tilpasser sig til flere 
                      tilberedninger. Det er ideelt til både traditionelle retter og innovative forslag til 
                      sund madlavning.
                    </p>
                  </div>

                  {/* Punto 4 */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <span className="text-blue-600 text-xl">4.</span>
                      Bæredygtighed
                    </h4>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      Produktionen af kaninkød kræver færre ressourcer sammenlignet med andre kødtyper, hvilket 
                      gør det til et mere ansvarligt valg for miljøet.
                    </p>
                  </div>
                </div>

                {/* Cierre */}
                <div className="text-center space-y-4">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    Hos Heintz Nordic Frezzen satser vi på kvalitet, sporing og respekt for processerne. 
                    Vores frossent kaninkød opfylder de højeste fødevarestandarder og er designet til krævende, 
                    bevidste forbrugere, der er engagerede i deres velvære.
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-4 sm:p-6 text-white">
                    <p className="text-lg sm:text-xl font-semibold">
                      Spis bedre. Lev bedre. Vælg kanin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

                    case 'om-os':
  return (
    <section className="w-full max-w-4xl mx-auto px-4 pt-8 pb-16 animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-blue-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6 text-center">Om os</h2>

        <div className="space-y-6 text-gray-800 text-base sm:text-lg leading-relaxed">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4 text-center">Vores historie begynder her</h3>
          <p>Alt begyndte med et simpelt spørgsmål: Hvorfor spiser man ikke kaninkød i Danmark?</p>
          <p>Oprindelsen til Heintz Nordic Frozzen kommer fra den opmærksomme observation af grundlæggeren, Tibor Heintz, som ved ankomsten til Danmark bemærkede en tydelig mangel: Kaninkød var ikke en del af det almindelige forbrug.</p>
          <p>Med sin erfaring inden for fødevarebranchen og sin rejse gennem forskellige lande forstod han, at dette produkt, så værdsat for dets ernæringsmæssige værdi og sunde egenskaber, var fuldstændig fraværende på et marked, der i stigende grad kræver kvalitet og sundhed i kosten.</p>
          <blockquote className="italic border-l-4 border-blue-400 pl-4 text-blue-700">“Jeg så en mangel, noget der manglede. Kanin er et sundt kød, spist i mange lande i verden, men her var det bare ikke. Jeg spurgte mig selv: Hvorfor ikke bringe denne fødevare, som var en del af mit liv, til et sted, der også søger bedre ernæring for sine nye generationer?”</blockquote>
          
          <div className="flex justify-center mb-8">
          <Image
            src="/History.jpg"
            alt="Vores historie - Heintz Nordic Frozzen"
            width={600}
            height={350}
            className="rounded-xl shadow-lg object-cover"
            priority
          />
       </div>
          <p>Tibors forhold til dette produkt er ikke tilfældigt: Hans barndom i Argentina foregik blandt familiens kaninfarme, hvor han fra en tidlig alder lærte fordelene og værdien af dette kød. Han blev uddannet som agronom, specialiserede sig i kaninavl og lærte hele processen fra produktion til ansvarligt forbrug.</p>
          <h4 className="text-xl font-semibold text-blue-700 mt-8 mb-2">Fra idé til projekt</h4>
          
          <p>Med professionel støtte fra Business Manager i Fredericia forvandlede Tibor denne bekymring til et konkret projekt. Efter måneder med research, studier af regler og lovgivning, specialiseret rådgivning og mange timers arbejde med fødevarelogistik blev Heintz Nordic Frozzen etableret som den første virksomhed specialiseret i frossen kaninkød i Danmark.</p>
          <blockquote className="italic border-l-4 border-blue-400 pl-4 text-blue-700">“At arbejde med fødevarer er ikke let, og slet ikke i et land, hvor du ikke kender alle lovene fra starten. Men med indsats, research og engagement lykkedes det os at skabe noget, der ikke fandtes her før.”</blockquote>
          <h4 className="text-xl font-semibold text-blue-700 mt-8 mb-2">Vores vision er klar: Bidrage til en sundere kost</h4>
          <p>Ud over at bringe et nyt produkt er Tibors vision at bidrage til en forandring: At danske familier og nye generationer kan få adgang til sunde, bæredygtige og meget kvalitetsrige proteiner. Hans erfaring med frossen fødevarelogistik i Danmark, hvor han arbejdede som koordinator i store lagre, gav ham den nødvendige viden til at designe sikre, effektive og kvalitetsorienterede processer.</p>
          <h4 className="text-xl font-semibold text-blue-700 mt-8 mb-2">En personlig besked til dem, der møder os for første gang</h4>
          <blockquote className="italic border-l-4 border-blue-400 pl-4 text-blue-700">“Vi er ikke kun her for at sælge kød. Vi er her for at tilbyde et sundt alternativ, med omhu og overbevisning om at gøre tingene rigtigt. Vi mener, at kaninkød skal være en del af familiens daglige kost, ikke som noget sporadisk, men som en del af en mere bevidst og moderne ernæring.”</blockquote>
          <p className="mt-8 font-bold text-blue-800 text-center">Heintz Nordic Frozzen: Det første skridt mod en ny generation af sund ernæring.</p>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">Om os</h3>
          <div className="space-y-4 text-gray-800 text-base sm:text-lg">
            <div>
              <span className="font-semibold text-blue-700">🔹 MISSION</span>
              <p>At gøre sundt kaninkød tilgængeligt i Danmark ved at tilbyde et produkt af høj kvalitet, pålideligt og med processer, der sikrer sikkerhed, sporbarhed og fremragende service. Vi arbejder for at bidrage til en moderne, bevidst og fremtidssikret kost.</p>
            </div>
            <div>
              <span className="font-semibold text-blue-700">🔹 VISION</span>
              <p>At blive den førende distributør af sundt kaninkød i Danmark, anerkendt for vores engagement i kvalitet, sporbarhed og ernæringsmæssigt velvære for nye generationer.</p>
            </div>
            <div>
              <span className="font-semibold text-blue-700">🔹 VÆRDIER</span>
              <ul className="list-disc list-inside ml-6">
                <li>✅ Kvalitet uden kompromis</li>
                <li>✅ Engagement for sundhed</li>
                <li>✅ Gennemsigtighed og tillid</li>
                <li>✅ Professionel og menneskelig service</li>
                <li>✅ Fremtidsvision</li>
                <li>✅ Bæredygtighed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

                    case 'contact':
         return (
           <section className="w-full max-w-6xl mx-auto px-4 pt-6 sm:pt-8" aria-labelledby="contact-heading">
             {/* Øverste banner */}
             <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-xl">
               <Image
                 src="/banner.jpg"
                 alt="Kontakt banner - Professionel service og kvalitet"
                 fill
                 className="object-cover"
                 priority
                 sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center text-white">
                   <h3 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                     Kontakt Os
                   </h3>
                   <p className="text-lg sm:text-xl md:text-2xl opacity-90 drop-shadow-lg">
                     Lad os starte en samarbejde
                   </p>
                 </div>
               </div>
             </div>

             {/* Kontaktindhold */}
             <div className="grid lg:grid-cols-2 gap-8">
               {/* Kontaktinformation og åbningstider */}
               <div className="space-y-6">
                 <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100 animate-slide-in-right">
                   <div className="text-center mb-6 sm:mb-8">
                     <h4 className="text-xl sm:text-2xl font-bold text-blue-800 mb-4">Kontaktoplysninger</h4>
                     <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
                   </div>
                   
                   <div className="space-y-4">
                     <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all duration-300">
                       <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                         </svg>
                       </div>
                       <div>
                         <p className="font-semibold text-blue-800 text-sm sm:text-base">Email</p>
                         <a 
                           href="mailto:thb@heintz-nordic-frezzen.dk" 
                           className="text-blue-700 hover:underline text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-1 transition-colors duration-200"
                         >
                           thb@heintz-nordic-frezzen.dk
                         </a>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all duration-300">
                       <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                         </svg>
                       </div>
                       <div>
                         <p className="font-semibold text-blue-800 text-sm sm:text-base">Telefon</p>
                         <a 
                           href="tel:+4551430797" 
                           className="text-blue-700 hover:underline text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-1 transition-colors duration-200"
                         >
                           +45 51430797
                         </a>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all duration-300">
                       <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                       </div>
                       <div>
                         <p className="font-semibold text-blue-800 text-sm sm:text-base">Adresse</p>
                         <address className="text-gray-700 text-sm sm:text-base not-italic">
                           Ernst Carlsens Vej 2<br />
                           Fredericia (7000)
                         </address>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all duration-300">
                       <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                       </div>
                       <div>
                         <p className="font-semibold text-blue-800 text-sm sm:text-base">CVR Nummer</p>
                         <span className="text-gray-700 text-sm sm:text-base">45611132</span>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                   <h4 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     Åbningstider
                   </h4>
                   <div className="space-y-3 text-sm sm:text-base">
                     <div className="flex justify-between items-center py-2 border-b border-blue-500/30">
                       <span>Mandag - Torsdag:</span>
                       <span className="font-semibold">07.00 - 18.00</span>
                     </div>
                     <div className="flex justify-between items-center py-2 border-b border-blue-500/30">
                       <span>Fredag:</span>
                       <span className="font-semibold">07.00 - 17.00</span>
                     </div>
                     <div className="flex justify-between items-center py-2">
                       <span>Weekend:</span>
                       <span className="font-semibold">Lukket</span>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Kontaktformular */}
               <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100 animate-slide-in-left">
                 <div className="text-center mb-6 sm:mb-8">
                   <h4 className="text-xl sm:text-2xl font-bold text-blue-800 mb-4">Send os en besked</h4>
                   <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
                 </div>
                 
                 <form className="space-y-6" onSubmit={handleContactSubmit}>
                   <div className="grid sm:grid-cols-2 gap-4">
                     <div>
                       <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Fornavn *</label>
                       <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="Dit fornavn" value={contactForm.name} onChange={handleContactInputChange} />
                     </div>
                     <div>
                       <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">Efternavn *</label>
                       <input type="text" id="lastname" name="lastname" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="Dit efternavn" value={contactForm.lastname} onChange={handleContactInputChange} />
                     </div>
                   </div>
                   <div>
                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                     <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="din@email.dk" value={contactForm.email} onChange={handleContactInputChange} />
                   </div>
                   <div>
                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                     <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="+45 12345678" value={contactForm.phone} onChange={handleContactInputChange} />
                   </div>
                   <div>
                     <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Land (oprindelse)</label>
                     <input type="text" id="country" name="country" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="Land" value={contactForm.country} onChange={handleContactInputChange} />
                   </div>
                   <div>
                     <label htmlFor="residence" className="block text-sm font-medium text-gray-700 mb-2">Land (bopæl)</label>
                     <input type="text" id="residence" name="residence" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="Land" value={contactForm.residence} onChange={handleContactInputChange} />
                   </div>
                   <div>
                     <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">Kontakt sprog</label>
                     <input type="text" id="language" name="language" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="Sprog" value={contactForm.language} onChange={handleContactInputChange} />
                   </div>
                   <div>
                     <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-2">Kontaktform</label>
                     <input type="text" id="mode" name="mode" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" placeholder="F.eks. telefon, email" value={contactForm.mode} onChange={handleContactInputChange} />
                   </div>
                   <div className="flex items-center gap-3">
                     <input type="checkbox" id="privacy" name="privacy" required className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                     <label htmlFor="privacy" className="text-sm text-gray-700">Jeg accepterer at Heintz Nordic Frezzen må kontakte mig vedrørende min forespørgsel *</label>
                   </div>
                   <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" disabled={contactLoading}>{contactLoading ? 'Sender...' : 'Send besked'}</button>
                   {contactSuccess && <p className="text-green-600 mt-2">{contactSuccess}</p>}
                   {contactError && <p className="text-red-600 mt-2">{contactError}</p>}
                 </form>
               </div>
             </div>
           </section>
         );

      default:
        return null;
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Limpieza por si el componente se desmonta
    return () => document.body.classList.remove('overflow-hidden');
  }, [selectedProduct]);

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-start">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Gå til hovedindhold
      </a>

      {/* Header fijo */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo y nombre */}
                  <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => handleSectionChange('home')}
            className="flex items-center gap-2 sm:gap-4 hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
            aria-label="Gå til hjemmeside"
          >
            <Image 
              src="/logo.jpg" 
              alt="Heintz Nordic Frezzen logo" 
              width={60} 
              height={60}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg"
              priority
            />
            <span className="font-bold text-blue-700 text-sm sm:text-lg">Heintz Nordic Frezzen</span>
          </button>
        </div>

          {/* Menú de escritorio */}
          <nav className="hidden lg:flex gap-6" role="navigation" aria-label="Hovednavigation">
            <button 
              onClick={() => handleSectionChange('home')}
              className={`font-medium transition-colors text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-2 py-1 ${
                activeSection === 'home' 
                  ? 'text-blue-600 underline' 
                  : 'text-blue-700 hover:underline'
              }`}
            >
              Forside
            </button>
            <button 
              onClick={() => handleSectionChange('om-os')}
              className={`font-medium transition-colors text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-2 py-1 ${
                activeSection === 'om-os' 
                  ? 'text-blue-600 underline' 
                  : 'text-blue-700 hover:underline'
              }`}
            >
              Om os
            </button>
            <button 
              onClick={() => handleSectionChange('products')}
              className={`font-medium transition-colors text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-2 py-1 ${
                activeSection === 'products' 
                  ? 'text-blue-600 underline' 
                  : 'text-blue-700 hover:underline'
              }`}
            >
              Produkter
            </button>
            <button 
              onClick={() => handleSectionChange('why-us')}
              className={`font-medium transition-colors text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-2 py-1 ${
                activeSection === 'why-us' 
                  ? 'text-blue-600 underline' 
                  : 'text-blue-700 hover:underline'
              }`}
            >
              Hvorfor vælge os
            </button>
            <button 
              onClick={() => handleSectionChange('why-rabbit')}
              className={`font-medium transition-colors text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-2 py-1 ${
                activeSection === 'why-rabbit' 
                  ? 'text-blue-600 underline' 
                  : 'text-blue-700 hover:underline'
              }`}
            >
              Hvorfor vælge kanin
            </button>
            <button 
              onClick={() => handleSectionChange('contact')}
              className={`font-medium transition-colors text-base focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-2 py-1 ${
                activeSection === 'contact' 
                  ? 'text-blue-600 underline' 
                  : 'text-blue-700 hover:underline'
              }`}
            >
              Kontakt
            </button>
          </nav>

          {/* Botón hamburguesa para móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Åbn menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-blue-700 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-blue-700 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-blue-700 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Menú móvil */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="px-4 pb-4 space-y-2" role="navigation" aria-label="Mobil navigation">
            <button 
              onClick={() => handleSectionChange('home')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'home' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              Forside
            </button>
            <button 
              onClick={() => handleSectionChange('om-os')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'om-os' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              Om os
            </button>
            <button 
              onClick={() => handleSectionChange('products')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'products' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              Produkter
            </button>
            <button 
              onClick={() => handleSectionChange('why-us')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'why-us' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              Hvorfor vælge os
            </button>
            <button 
              onClick={() => handleSectionChange('why-rabbit')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'why-rabbit' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              Hvorfor vælge kanin
            </button>
            <button 
              onClick={() => handleSectionChange('contact')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'contact' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              Kontakt
            </button>
          </nav>
        </div>
      </header>

      {/* Espaciador para el header fijo */}
      <div className="h-20 sm:h-24" />

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
        <div className={`w-full page-transition ${
          isTransitioning ? 'page-transition-exit page-transition-exit-active' : 'page-transition-enter-active section-fade-in'
        }`}>
          {renderActiveSection()}
        </div>
      </main>

      {/* Footer virksomhed */}
      <footer className="w-full bg-blue-50 border-t border-blue-100 mt-12 sm:mt-16 py-8 sm:py-10 px-4" role="contentinfo">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-start gap-6 sm:gap-8 md:gap-16 text-blue-900">
          {/* Banner Image */}
          <div className="flex-1 flex flex-col items-center md:items-start mb-4 md:mb-0">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4 rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/banner.jpg" 
                alt="Heintz Nordic Frezzen banner" 
                fill
                className="object-cover"
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
              />
            </div>
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
                href="tel:+4551430797" 
                className="text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 rounded px-1"
              >
                +45 51430797
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

      {/* Nueva sección de detalle de producto (solo si selectedProduct) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in-up p-2 sm:p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full mx-auto overflow-hidden animate-fade-in-scale max-h-[95vh] overflow-y-auto pt-14">
            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-blue-700 hover:text-blue-900 text-2xl font-bold focus:outline-none"
              aria-label="Luk produktdetaljer"
            >
              ×
            </button>
            {/* Imagen destacada */}
            <div className="w-full flex items-center justify-center bg-gray-100" style={{padding: '2rem 0'}}>
              <div className="relative w-full h-64 sm:h-80">
                <ProductCarousel images={selectedProduct.images} productName={selectedProduct.name} isModal={true} />
              </div>
            </div>
            {/* Info principal */}
            <div className="px-6 sm:px-10 pb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center mb-4 mt-2">{selectedProduct.name}</h2>
              {selectedProduct.id === 1 && (
                <>
                  <p className="text-gray-700 text-lg text-center mb-6">100% kaninkød. Bagparti, to krydsede lår vakuumpakket og frosset.</p>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Præsentation</h4>
                    <p className="text-gray-700 text-sm">To krydsede lår vakuumpakket, vægt per pakke mellem 0,4 og 0,6 kg.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Holdbarhed</h4>
                    <p className="text-gray-700 text-sm">24 måneder fra frysningsdatoen ved -18°C</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Brug</h4>
                    <p className="text-gray-700 text-sm">Kog helt før forbrug. Ikke genfrys efter optøning.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Allergener</h4>
                    <p className="text-gray-700 text-sm">Indeholder ikke hovedallergener eller GMO.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-blue-700 mb-2">Mikrobiologiske parametre</h4>
                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                      <li><b>Salmonella:</b> Ikke påvist</li>
                      <li><b>Listeria monocytogenes:</b> Fravær</li>
                      <li><b>E. coli:</b> ≤ 1x10² cfu/g</li>
                    </ul>
                  </div>
                </>
              )}
              {selectedProduct.id === 2 && (
                <>
                  <p className="text-gray-700 text-lg text-center mb-6">100% kaninkød hakket og frosset, klar til tilberedning.</p>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Præsentation</h4>
                    <p className="text-gray-700 text-sm">3-5 kg i bulk i papkasser, komplette kanaler hakket.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Holdbarhed</h4>
                    <p className="text-gray-700 text-sm">Op til 24 måneder ved -18°C</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Brug</h4>
                    <p className="text-gray-700 text-sm">Kog helt før forbrug. Ikke genfrys efter optøning.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Allergener</h4>
                    <p className="text-gray-700 text-sm">Indeholder ikke hovedallergener eller GMO.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-blue-700 mb-2">Mikrobiologiske parametre</h4>
                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                      <li><b>Salmonella:</b> Fraværende</li>
                      <li><b>Listeria monocytogenes:</b> Ikke påvist</li>
                      <li><b>E. coli:</b> ≤ 1x10² cfu/g</li>
                    </ul>
                  </div>
                </>
              )}
              {selectedProduct.id === 3 && (
                <>
                  <p className="text-gray-700 text-lg text-center mb-6">100% kaninkød hele, udtarmet, med lever og hoved, individuel frosset.</p>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Præsentation</h4>
                    <p className="text-gray-700 text-sm">Hele kanaler i flow-pack, vægt mellem 0,9 og 1,8 kg per kanal.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Holdbarhed</h4>
                    <p className="text-gray-700 text-sm">24 måneder fra frysningsdatoen ved -18°C</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Brug</h4>
                    <p className="text-gray-700 text-sm">Kog helt før forbrug. Ikke genfrys efter optøning.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Allergener</h4>
                    <p className="text-gray-700 text-sm">Indeholder ikke hovedallergener eller GMO.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-blue-700 mb-2">Mikrobiologiske parametre</h4>
                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                      <li><b>Salmonella:</b> Ikke påvist</li>
                      <li><b>Listeria monocytogenes:</b> Fravær</li>
                      <li><b>E. coli:</b> ≤ 1x10² cfu/g</li>
                    </ul>
                  </div>
                </>
              )}
              {/* Botón sticky siempre visible al fondo del modal */}
              <div className="sticky bottom-0 left-0 w-full bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.06)] px-6 sm:px-10 py-4 flex justify-center z-10">
                <button
                  className="btn-primary px-8 py-3 text-lg w-full max-w-xs"
                  onClick={() => setSelectedProduct(null)}
                >
                  Tilbage til katalog
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
