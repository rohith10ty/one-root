import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PLANTS } from '../data/plantsData';
import { Search, X, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setQuickViewPlant, setSelectedCategory } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const handleClose = () => {
    setQuery('');
    setIsSearchOpen(false);
  };

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? PLANTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.botanicalName.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.benefits.some((b) => b.toLowerCase().includes(query.toLowerCase()))
      )
    : PLANTS.slice(0, 4);

  const handleSelectPlant = (plant) => {
    handleClose();
    setQuickViewPlant(plant);
  };

  const handleCategoryClick = (catSlug) => {
    setSelectedCategory(catSlug);
    handleClose();
    const el = document.getElementById('plants-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-forest-950/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Input */}
        <div className="flex items-center px-5 py-4 border-b border-stone-100 gap-3">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search plants by name, botanical species, or air-purifying traits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base sm:text-lg bg-transparent border-none outline-none text-forest-950 placeholder-stone-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-forest-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick category tags */}
        <div className="px-5 py-3 bg-forest-50/60 border-b border-emerald-50 flex items-center gap-2 overflow-x-auto text-xs text-stone-600 no-scrollbar">
          <span className="font-semibold text-emerald-800 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Popular:
          </span>
          {['indoor', 'succulents', 'flowering', 'medicinal'].map((slug) => (
            <button
              key={slug}
              onClick={() => handleCategoryClick(slug)}
              className="px-3 py-1 rounded-full bg-white hover:bg-emerald-100 text-forest-900 border border-emerald-200/60 transition-colors capitalize shrink-0 font-medium"
            >
              {slug}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-stone-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 px-3 pb-2">
            {query.trim() ? `Search Results (${filtered.length})` : 'Recommended Botanical Highlights'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="text-base font-medium text-forest-900">No botanical specimens found</p>
              <p className="text-xs text-stone-400 mt-1">Try searching for "Monstera", "Aloe", or "Purifier"</p>
            </div>
          ) : (
            filtered.map((plant) => (
              <div
                key={plant.id}
                onClick={() => handleSelectPlant(plant)}
                className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-forest-50/80 cursor-pointer transition-all duration-200"
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-14 h-14 rounded-xl object-cover border border-emerald-100 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-semibold text-forest-950 group-hover:text-emerald-700 transition-colors truncate">
                      {plant.name}
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {plant.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 italic truncate mt-0.5">{plant.botanicalName}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm sm:text-base font-bold text-forest-900">${plant.price}</span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium justify-end">
                    <span>View</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border rounded font-mono text-[10px]">ESC</kbd> to close</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3.5 h-3.5" /> Click to open quick view
          </span>
        </div>
      </div>
    </div>
  );
}
