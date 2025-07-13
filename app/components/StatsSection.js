'use client';

import { useState, useEffect } from 'react';

export default function StatsSection() {
  const [counts, setCounts] = useState({
    years: 0,
    clients: 0,
    products: 0,
    satisfaction: 0
  });

  const stats = [
    {
      number: 25,
      suffix: "+",
      label: "Års erfaring",
      description: "I branchen"
    },
    {
      number: 500,
      suffix: "+",
      label: "Tilfredse kunder",
      description: "I hele Danmark"
    },
    {
      number: 50,
      suffix: "+",
      label: "Produkter",
      description: "I vores sortiment"
    },
    {
      number: 98,
      suffix: "%",
      label: "Kundetilfredshed",
      description: "Gennemsnit"
    }
  ];

  useEffect(() => {
    const animateCounts = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounts({
          years: Math.floor(stats[0].number * progress),
          clients: Math.floor(stats[1].number * progress),
          products: Math.floor(stats[2].number * progress),
          satisfaction: Math.floor(stats[3].number * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    // Start animation when component mounts
    const timer = setTimeout(animateCounts, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Vores Succes i Tal
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Årelang erfaring og tusindvis af tilfredse kunder gør os til din pålidelige partner
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {counts[Object.keys(counts)[index]]}
                  <span className="text-blue-200">{stat.suffix}</span>
                </div>
                <div className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-blue-100">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">100% Sikker</h3>
              <p className="text-blue-100 text-sm">
                Alle vores produkter følger de strengeste sikkerhedsstandarder
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-blue-100 text-sm">
                Vi er altid tilgængelige når du har brug for os
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Hurtig Levering</h3>
              <p className="text-blue-100 text-sm">
                Levering til hele Danmark inden for 24 timer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 