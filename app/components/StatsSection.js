'use client';

import { useState, useEffect } from 'react';

export default function StatsSection() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            🚀 Vores forpligtelse fra dag ét
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Garanteret kvalitet
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Vi arbejder med de bedste standarder fra starten.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Personlig opmærksomhed
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Fordi hver kunde betyder noget, lytter vi og følger med på hvert skridt.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-white mb-3">
              International vision
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Vi vil bringe nye løsninger tættere på det danske og europæiske marked.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Innovativ tilgang
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Vi bringer ikke mere af det samme: vi vælger det, der virkelig tilføjer værdi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 