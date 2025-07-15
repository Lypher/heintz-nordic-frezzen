'use client';

import { useEffect } from 'react';

export default function AboutModal({ isOpen, onClose }) {
  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800">Om os</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
            aria-label="Luk modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          <div className="space-y-6 sm:space-y-8">
            {/* Introducción */}
            <div className="text-center">
              <h4 className="text-xl sm:text-2xl font-bold text-blue-800 mb-4">
                Vores historie starter her
              </h4>
              <p className="text-lg sm:text-xl text-gray-700 mb-4 leading-relaxed">
                Alt startede med et simpelt spørgsmål: Hvorfor spiser man ikke kaninkød i Danmark?
              </p>
            </div>

            {/* Origen */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
              <h5 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3">Oprindelsen</h5>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                Oprindelsen af Heintz Nordic Frozzen opstår fra grunderen Tibor Heintz' opmærksomme blik, 
                der ved ankomsten til Danmark bemærkede en åbenlys fraværen: kaninkød var ikke en del af 
                den sædvanlige forbrug.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Med sin erfaring i fødevarebranchen og sin rejse gennem forskellige lande forstod han, 
                at dette produkt, så værdsat for sin næringsmæssige bidrag og sine sundhedsegenskaber, 
                var helt fraværende i et marked, der i stigende grad kræver mere kvalitet og sundhed i 
                deres kost.
              </p>
            </div>

            {/* Cita de Tibor */}
            <div className="border-l-4 border-blue-600 pl-4 sm:pl-6 bg-blue-50 rounded-r-xl p-4">
              <blockquote className="text-gray-700 text-sm sm:text-base italic leading-relaxed">
                "Jeg så en mangel, noget der manglede. Kanin er et sundt kød, der spises i mange lande 
                verden over, men her var det simpelthen ikke til stede. Jeg spurgte mig selv: Hvorfor 
                ikke bringe denne føde, der var en del af mit liv, til et sted, der også søger en bedre 
                kost til deres nye generationer?"
              </blockquote>
            </div>

            {/* Experiencia de Tibor */}
            <div>
              <h5 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3">Tibors baggrund</h5>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Tibors forhold til dette produkt er ikke tilfældigt: hans barndom i Argentina forløb 
                mellem familiens kanineopdræt, hvor han lærte fra en tidlig alder fordelene og 
                ædelheden af dette kød. Han uddannede sig som Agronomisk Tekniker, specialiserede sig 
                i kanineopdræt og kendte hele processen, fra produktion til ansvarlig forbrug.
              </p>
            </div>

            {/* De la idea al proyecto */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
              <h5 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3">Fra idé til projekt</h5>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                Med støtte fra Fredericia Business Manager forvandlede Tibor denne bekymring til et 
                konkret projekt. Efter måneder af forskning, undersøgelse af regler og forskrifter, 
                specialiseret rådgivning og timer af arbejde med frossen fødevarelogistik, 
                konsoliderede Heintz Nordic Frozzen sig som det første firma specialiseret i 
                frossent kaninkød i Danmark.
              </p>
              <blockquote className="text-gray-700 text-sm sm:text-base italic leading-relaxed border-l-4 border-blue-600 pl-3">
                "At arbejde med fødevarer er ikke nemt, og endnu mindre i et land, hvor du ikke 
                kender alle love fra starten. Men med indsats, forskning og engagement lykkedes det 
                os at skabe noget, der ikke eksisterede her før."
              </blockquote>
            </div>

            {/* Visión */}
            <div>
              <h5 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3">Vores vision</h5>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                Vores vision er klar: at bidrage til en sundere kost. Uden for at bringe et nyt produkt 
                er Tibors vision at bidrage med en ændring: at danske familier, de nye generationer, 
                kan få adgang til sunde, bæredygtige og højeste kvalitetsproteiner.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Hans erfaring med frossen fødevarelogistik i Danmark, hvor han fungerede som 
                koordinator i vigtige warehouses, gav ham den nødvendige viden til at designe sikre, 
                effektive processer rettet mod excellence.
              </p>
            </div>

            {/* Mensaje personal */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
              <h5 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3">
                Et personligt budskab til dem, der møder os for første gang
              </h5>
              <blockquote className="text-gray-700 text-sm sm:text-base italic leading-relaxed">
                "Vi kommer ikke kun for at sælge kød. Vi kommer for at tilbyde et sundt alternativ, 
                plejet og med overbevisningen om at gøre tingene rigtigt. Vi tror, at kaninkød skal 
                være til stede i familiens daglige kost, ikke som noget sporadisk, men som en del af 
                en mere bevidst og moderne kost."
              </blockquote>
            </div>

            {/* Misión, Visión y Valores */}
            <div className="space-y-6 sm:space-y-8">
              {/* Misión */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
                <h5 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">🔹</span>
                  Mission
                </h5>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  At lette adgangen til sundt kaninkød i Danmark ved at tilbyde et produkt af høj kvalitet, 
                  pålideligt og med processer, der garanterer sikkerhed, sporing og excellence i service. 
                  Vi arbejder for at bidrage til en moderne, bevidst kost, der er i overensstemmelse med 
                  de nye generationer.
                </p>
              </div>

              {/* Visión */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
                <h5 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">🔹</span>
                  Vision
                </h5>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  At blive referencen i Danmark for distribution af sundt kaninkød, hvor vi bliver 
                  anerkendt for vores engagement for kvalitet, sporing og de nye generationers 
                  fødevarevelvære.
                </p>
              </div>

              {/* Valores */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
                <h5 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">🔹</span>
                  Værdier
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span className="text-gray-700 text-sm sm:text-base">Kvalitet uden kompromis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span className="text-gray-700 text-sm sm:text-base">Engagement for sundhed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span className="text-gray-700 text-sm sm:text-base">Transparens og tillid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span className="text-gray-700 text-sm sm:text-base">Professionel og menneskelig service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span className="text-gray-700 text-sm sm:text-base">Fremtidssyn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span className="text-gray-700 text-sm sm:text-base">Bæredygtighed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cierre */}
            <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-4 sm:p-6 text-white">
              <h5 className="text-lg sm:text-xl font-bold mb-3">
                Heintz Nordic Frozzen
              </h5>
              <p className="text-base sm:text-lg font-semibold">
                Det første skridt mod en ny generation af sund ernæring.
              </p>
            </div>
          </div>
        </div>

        {/* Footer del modal */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn-primary px-6 py-2"
          >
            Luk
          </button>
        </div>
      </div>
    </div>
  );
} 