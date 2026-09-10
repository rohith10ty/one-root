import React, { useState, useMemo } from 'react';
import { PLANTS, CATEGORIES } from '../data/plantsData';
import PlantCard from './PlantCard';
import { useShop } from '../context/ShopContext';
import { Search, Sparkles, Filter, X, ArrowUpDown } from 'lucide-react';

export default function PlantCatalog() {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useShop();
  const [sortBy, setSortBy] = useState('featured');
  const [filterPetFriendly, setFilterPetFriendly] = useState(false);

  // Filter & Sort Logic
  const filteredPlants = useMemo(() => {
    return PLANTS.filter((plant) => {
      const matchesCategory =
        selectedCategory === 'all' || plant.categorySlug === selectedCategory;

      const matchesSearch =
        !searchQuery.trim() ||
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPet = !filterPetFriendly || plant.petFriendly;

      return matchesCategory && matchesSearch && matchesPet;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, filterPetFriendly, sortBy]);

  const categoriesList = [
    { slug: 'all', name: 'All Plants' },
    ...CATEGORIES.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setFilterPetFriendly(false);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery || filterPetFriendly;

  return (
    <section id="plants-catalog" className="py-12 sm:py-16 bg-cream-50/50 border-t border-forest-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full mb-2">
            <Sparkles className="w-3 h-3" /> Handpicked Botanicals
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 tracking-tight">
            Featured Nursery Plants
          </h2>
          <p className="mt-2 text-stone-500 text-xs sm:text-sm leading-relaxed">
            Rooted in organic compost soil with tailored light metrics and guaranteed safe delivery.
          </p>
        </div>

        {/* Filter Toolbar Controls */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xs border border-stone-200 mb-6">
          
          {/* Top Row: Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-stone-100 no-scrollbar">
            {categoriesList.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-forest-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-forest-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Bottom Row: Search, Pet Safe, and Sort by */}
          <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Live Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plants by name or species..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:border-emerald-500 focus:bg-white outline-none text-forest-950 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-forest-900"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick Toggle & Sort */}
            <div className="flex items-center gap-2 overflow-x-auto">
              
              {/* Pet safe checkbox */}
              <button
                onClick={() => setFilterPetFriendly(!filterPetFriendly)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer shrink-0 ${
                  filterPetFriendly
                    ? 'bg-emerald-100/80 border-emerald-400 text-emerald-950'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <span>🐾 Pet-Friendly</span>
              </button>

              {/* Sort selector */}
              <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 text-[11px] font-semibold text-stone-700 shrink-0">
                <ArrowUpDown className="w-3 h-3 text-stone-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort plants by"
                  className="bg-transparent border-none outline-none text-forest-950 font-medium cursor-pointer text-[11px]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Reset filter button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-700 font-semibold px-1.5 py-0.5 shrink-0"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-4 px-1">
          <span>Showing <strong>{filteredPlants.length}</strong> botanical specimens</span>
          {selectedCategory !== 'all' && (
            <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">
              {selectedCategory}
            </span>
          )}
        </div>

        {/* Product Cards Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        {filteredPlants.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-stone-300 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-serif font-bold text-forest-950">No plants found</h3>
            <p className="text-stone-500 text-xs mt-1">
              Try adjusting your category or search keywords.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
