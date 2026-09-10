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
    <section id="categories" className="py-20 bg-[#fafaf7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Curated Collections
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 tracking-tight">
              Explore By Plant Category
            </h2>
          </div>
          <p className="text-stone-600 max-w-md text-sm sm:text-base leading-relaxed">
            From easy-care bedroom purifiers to sun-drenched outdoor blossoms and ancient healing botanicals.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.slug;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-botanical hover:shadow-botanical-lg transition-all duration-500 hover:-translate-y-2 border ${
                  isSelected ? 'ring-4 ring-emerald-500 border-transparent' : 'border-stone-200/80 hover:border-emerald-300'
                }`}
              >
                {/* Background Image with Zoom */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  {/* Subtle layered dark gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-85 group-hover:opacity-75 transition-opacity duration-500`}></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between text-white z-10">
                  
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-emerald-500 group-hover:border-emerald-400 group-hover:text-forest-950 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                      {cat.count} Species
                    </span>
                  </div>

                  {/* Bottom Text & CTA */}
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-emerald-200 transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white group-hover:text-forest-950 flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-200/90 mt-2 line-clamp-2 leading-relaxed font-light">
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
