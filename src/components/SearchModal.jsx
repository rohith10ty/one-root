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
        handleClose();
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-forest-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Input */}
        <div className="flex items-center px-4 py-3 border-b border-stone-100 gap-2.5">
          <Search className="w-4 h-4 text-emerald-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search plants by name or species..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm bg-transparent border-none outline-none text-forest-950 placeholder-stone-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-forest-900 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick category tags */}
        <div className="px-4 py-2 bg-forest-50/60 border-b border-emerald-50 flex items-center gap-1.5 overflow-x-auto text-xs text-stone-600 no-scrollbar">
          <span className="font-semibold text-emerald-800 shrink-0 flex items-center gap-1 text-[11px]">
            <Sparkles className="w-3 h-3 text-emerald-600" /> Popular:
          </span>
          {['indoor', 'succulents', 'flowering', 'medicinal'].map((slug) => (
            <button
              key={slug}
              onClick={() => handleCategoryClick(slug)}
              className="px-2.5 py-0.5 rounded-full bg-white hover:bg-emerald-100 text-forest-900 border border-emerald-200/60 transition-colors capitalize shrink-0 text-[11px] font-medium"
            >
              {slug}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-3 divide-y divide-stone-100">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 px-2 pb-1.5">
            {query.trim() ? `Search Results (${filtered.length})` : 'Recommended Specimens'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-stone-500">
              <p className="text-sm font-medium text-forest-950">No plants found</p>
              <p className="text-xs text-stone-400 mt-0.5">Try searching for "Monstera" or "Aloe"</p>
            </div>
          ) : (
            filtered.map((plant) => (
              <div
                key={plant.id}
                onClick={() => handleSelectPlant(plant)}
                className="group flex items-center gap-3 p-2 rounded-xl hover:bg-forest-50/80 cursor-pointer transition-all"
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-11 h-11 rounded-lg object-cover border border-stone-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-semibold text-forest-950 group-hover:text-emerald-700 transition-colors truncate">
                      {plant.name}
                    </h4>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {plant.category.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-stone-400 italic truncate mt-0.5">{plant.botanicalName}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-forest-900">${plant.price}</span>
                  <div className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-medium justify-end">
                    <span>View</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
          <span>Press <kbd className="px-1 py-0.5 bg-white border rounded font-mono text-[9px]">ESC</kbd> to close</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" /> Quick view
          </span>
        </div>
      </div>
    </div>
  );
}
