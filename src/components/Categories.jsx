import React from 'react';
import { CATEGORIES } from '../data/plantsData';
import { useShop } from '../context/ShopContext';
import { ArrowUpRight, Sparkles, Home, Sun, Feather, HeartPulse, Gem } from 'lucide-react';

const iconMap = {
  Home,
  Sun,
  Sparkles,
  Feather,
  HeartPulse,
  Gem,
};

export default function Categories() {
  const { setSelectedCategory, selectedCategory } = useShop();

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    const catalogEl = document.getElementById('plants-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-12 sm:py-16 bg-[#fafaf7] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full mb-2">
              <Sparkles className="w-3 h-3" /> Curated Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 tracking-tight">
              Explore By Category
            </h2>
          </div>
          <p className="text-stone-500 max-w-sm text-xs sm:text-sm leading-relaxed">
            From easy-care bedroom purifiers to sun-drenched outdoor blossoms and soothing medicinal herbs.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.slug;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-botanical transition-all duration-300 hover:-translate-y-1 border ${
                  isSelected ? 'ring-2 ring-emerald-500 border-transparent' : 'border-stone-200 hover:border-emerald-300'
                }`}
              >
                {/* Background Image */}
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-85 group-hover:opacity-75 transition-opacity`}></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between text-white z-10">
                  
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-emerald-500 group-hover:border-emerald-400 group-hover:text-forest-950 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                      {cat.count} Species
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-emerald-200 transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-white group-hover:text-forest-950 flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </h3>
                    <p className="text-[11px] text-stone-200/90 mt-1 line-clamp-1 font-light">
                      {cat.description}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
