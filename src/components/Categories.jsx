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
    <section id="categories" className="py-14 sm:py-18 bg-[#FDE5D4]/30 relative border-t border-[#D6CC99]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-[#445D48] bg-[#D6CC99]/40 border border-[#D6CC99] px-2.5 py-0.5 rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-[#445D48]" /> Curated Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#001524] tracking-tight">
              Explore By Category
            </h2>
          </div>
          <p className="text-[#001524]/70 max-w-sm text-xs sm:text-sm leading-relaxed">
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
                  isSelected ? 'ring-2 ring-[#445D48] border-transparent' : 'border-[#D6CC99] hover:border-[#445D48]'
                }`}
              >
                {/* Background Image */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-[#001524]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001524]/90 via-[#001524]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between text-[#FDE5D4] z-10">
                  
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-[#445D48]/70 backdrop-blur-md flex items-center justify-center text-[#FDE5D4] border border-[#D6CC99]/40 group-hover:bg-[#445D48] transition-colors">
                      <Icon className="w-4 h-4 text-[#D6CC99]" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#001524]/60 border border-[#D6CC99]/30 backdrop-blur-md text-[#D6CC99]">
                      {cat.count} Species
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#FDE5D4] group-hover:text-[#D6CC99] transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <div className="w-6 h-6 rounded-full bg-[#FDE5D4]/15 group-hover:bg-[#D6CC99] group-hover:text-[#001524] flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </h3>
                    <p className="text-[11px] text-[#FDE5D4]/80 mt-1 line-clamp-1 font-light">
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
