'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch, onClear }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'Alle kategorier' },
    { value: 'Professionel Serie', label: 'Professionel Serie' },
    { value: 'Gourmet Serie', label: 'Gourmet Serie' },
    { value: 'Standard Serie', label: 'Standard Serie' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    onClear();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      onClear();
    }
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    // Búsqueda automática al cambiar categoría
    onSearch(searchTerm, newCategory);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          {/* Barra de búsqueda */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Søg efter produkter..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filtro de categoría */}
          <div className="sm:w-48">
            <label className="block text-xs text-gray-600 mb-1">Kategori (automatisk)</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex gap-2">
            <button
              type="submit"
              className={`px-6 py-3 font-medium rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors shadow-sm ${
                searchTerm.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!searchTerm.trim()}
            >
              Søg tekst
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors shadow-sm"
            >
              Ryd
            </button>
          </div>
        </div>

        {/* Búsqueda en tiempo real */}
        {searchTerm && (
          <div className="text-sm text-gray-600">
            Søger efter: <span className="font-medium">"{searchTerm}"</span>
            {selectedCategory !== 'all' && (
              <span> i kategorien <span className="font-medium">"{categories.find(c => c.value === selectedCategory)?.label}"</span></span>
            )}
          </div>
        )}
      </form>
    </div>
  );
} 