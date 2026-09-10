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
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || plant.categorySlug === selectedCategory;

      // Search query
      const matchesSearch =
        !searchQuery.trim() ||
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Pet safe filter
      const matchesPet = !filterPetFriendly || plant.petFriendly;

      return matchesCategory && matchesSearch && matchesPet;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
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
    <section id="plants-catalog" className="py-20 bg-cream-50/60 border-t border-forest-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100/80 px-3.5 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Handpicked Botanicals
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 tracking-tight">
            Featured Nursery Plants
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Each plant arrives rooted in organic soil, accompanied by tailored light metrics and our signature survival guarantee.
          </p>
        </div>

        {/* Filter Toolbar Controls */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-stone-200/80 mb-10">
          
          {/* Top Row: Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 border-b border-stone-100 no-scrollbar">
            {categoriesList.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-forest-900 text-white shadow-md shadow-forest-950/20 scale-102'
                    : 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-forest-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Bottom Row: Search, Pet Safe, and Sort by */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Live Search within Grid */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter plants by name or trait..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:border-emerald-500 focus:bg-white outline-none text-forest-950 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-forest-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Toggle & Sort */}
            <div className="flex items-center gap-3 overflow-x-auto">
              
              {/* Pet safe checkbox pill */}
              <button
                onClick={() => setFilterPetFriendly(!filterPetFriendly)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                  filterPetFriendly
                    ? 'bg-emerald-100/80 border-emerald-400 text-emerald-950'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <span>🐾 Pet-Friendly Only</span>
              </button>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-700 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort plants by"
                  className="bg-transparent border-none outline-none text-forest-950 font-medium cursor-pointer"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Reset filter button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 shrink-0"
                >
                  <X className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6 px-1">
          <span>Showing <strong>{filteredPlants.length}</strong> botanical specimens</span>
          {selectedCategory !== 'all' && (
            <span className="text-emerald-700 font-semibold uppercase tracking-wider">
              Category: {selectedCategory}
            </span>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredPlants.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-forest-950">No plants match your criteria</h3>
            <p className="text-stone-500 text-sm mt-2">
              Try adjusting your category selection or clearing the search terms.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 rounded-xl bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
