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
    <section id="plants-catalog" className="py-14 sm:py-18 bg-[#FDE5D4]/40 border-t border-[#D6CC99]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-[#445D48] bg-[#D6CC99]/40 border border-[#D6CC99] px-2.5 py-0.5 rounded-full mb-2">
            <Sparkles className="w-3 h-3 text-[#445D48]" /> Handpicked Botanicals
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#001524] tracking-tight">
            Featured Nursery Plants
          </h2>
          <p className="mt-2 text-[#001524]/70 text-xs sm:text-sm leading-relaxed">
            Rooted in living soil with tailored light metrics and guaranteed safe delivery from One Root.
          </p>
        </div>

        {/* Filter Toolbar Controls */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xs border border-[#D6CC99] mb-6">
          
          {/* Top Row: Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#D6CC99]/40 no-scrollbar">
            {categoriesList.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-[#001524] text-[#FDE5D4] shadow-xs'
                    : 'bg-[#FDE5D4]/40 text-[#001524] hover:bg-[#D6CC99]/40 hover:text-[#445D48]'
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
              <Search className="w-3.5 h-3.5 text-[#445D48] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plants by name or species..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#FDE5D4]/20 border border-[#D6CC99] focus:border-[#445D48] focus:bg-white outline-none text-[#001524] font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#001524]"
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
                    ? 'bg-[#445D48] border-[#445D48] text-[#FDE5D4]'
                    : 'bg-white border-[#D6CC99] text-[#001524] hover:bg-[#D6CC99]/30'
                }`}
              >
                <span>🐾 Pet-Friendly</span>
              </button>

              {/* Sort selector */}
              <div className="flex items-center gap-1 bg-[#FDE5D4]/30 border border-[#D6CC99] rounded-xl px-2.5 py-1 text-[11px] font-semibold text-[#001524] shrink-0">
                <ArrowUpDown className="w-3 h-3 text-[#445D48]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort plants by"
                  className="bg-transparent border-none outline-none text-[#001524] font-medium cursor-pointer text-[11px]"
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
        <div className="flex items-center justify-between text-[11px] text-[#001524]/70 mb-4 px-1">
          <span>Showing <strong>{filteredPlants.length}</strong> botanical specimens</span>
          {selectedCategory !== 'all' && (
            <span className="text-[#445D48] font-semibold uppercase tracking-wider text-[10px]">
              {selectedCategory}
            </span>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredPlants.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-[#D6CC99] max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#D6CC99]/30 text-[#445D48] flex items-center justify-center mx-auto mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-serif font-bold text-[#001524]">No plants found</h3>
            <p className="text-[#001524]/60 text-xs mt-1">
              Try adjusting your category or search keywords.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-[#001524] text-[#FDE5D4] text-xs font-semibold hover:bg-[#445D48] transition-colors"
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
