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
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full mb-4"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start">
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
              <p className="text-gray-700 text-sm sm:text-base mb-4">
                At levere det bedste frossne kaninkød til vores kunder i Danmark med fokus på kvalitet, service og pålidelighed.
              </p>
              <h4 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 sm:mb-4">Vores Vision</h4>
              <p className="text-gray-700 text-sm sm:text-base">
                At blive den mest betroede partner for frossent kaninkød i Danmark gennem innovation, bæredygtighed og kundetilfredshed.
              </p>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h4 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4">Vores Historie</h4>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Med mange års erfaring i import og distribution af frossent kaninkød har vi bygget et solidt ry for kvalitet og pålidelighed. 
              Vi arbejder tæt sammen med vores leverandører for at sikre de højeste standarder og leverer til både detailhandel og professionelle køkkener.
            </p>
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