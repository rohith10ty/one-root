import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Eye, 
  Sun, 
  Droplets, 
  Check 
} from 'lucide-react';

export default function PlantCard({ plant }) {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewPlant 
  } = useShop();

  const [isAdding, setIsAdding] = useState(false);
  const isFavorited = isInWishlist(plant.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(plant, 1, 'Medium (6" Pot)');
    setTimeout(() => setIsAdding(false), 700);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(plant.id);
  };

  return (
    <div
      onClick={() => setQuickViewPlant(plant)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200/90 hover:border-emerald-300 shadow-sm hover:shadow-botanical-lg transition-all duration-500 hover:-translate-y-1.5 flex flex-col cursor-pointer"
    >
      {/* Image & Badges Container */}
      <div className="relative aspect-[4/4.5] overflow-hidden bg-stone-100">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start z-10">
          {plant.badge && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-forest-950/85 text-emerald-300 backdrop-blur-md shadow-sm border border-emerald-500/20">
              {plant.badge}
            </span>
          )}
          {plant.petFriendly && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100/95 text-emerald-900 border border-emerald-200">
              🐾 Pet Safe
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3.5 right-3.5 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 cursor-pointer shadow-md backdrop-blur-md ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 scale-105'
              : 'bg-white/85 text-stone-600 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-5 h-5 transition-transform ${isFavorited ? 'fill-rose-500 text-rose-500 scale-110' : 'group-hover/btn:scale-110'}`} />
        </button>

        {/* Quick View Floating Action */}
        <div className="absolute inset-x-4 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10 pointer-events-none">
          <span className="px-4 py-2 rounded-xl bg-white/95 text-forest-900 text-xs font-semibold shadow-lg backdrop-blur-md flex items-center gap-1.5 border border-emerald-100">
            <Eye className="w-3.5 h-3.5 text-emerald-600" /> Quick Botanical View
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Care Tags */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold text-emerald-700 uppercase tracking-wider text-[11px]">
              {plant.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{plant.rating}</span>
              <span className="text-stone-400 font-normal">({plant.reviewsCount})</span>
            </div>
          </div>

          {/* Plant Title */}
          <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-950 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {plant.name}
          </h3>
          <p className="text-xs text-stone-500 italic mt-0.5 line-clamp-1">
            {plant.botanicalName}
          </p>

          {/* Plant specs pills */}
          <div className="mt-3 flex items-center gap-2 text-[11px] text-stone-600">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100">
              <Sun className="w-3 h-3 text-amber-500" /> {plant.sunlight.split(' ')[0]}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100">
              <Droplets className="w-3 h-3 text-sky-500" /> {plant.watering.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-forest-950">${plant.price}</span>
              {plant.originalPrice && (
                <span className="text-xs text-stone-400 line-through">${plant.originalPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium block -mt-0.5">In Nursery Stock</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-sm ${
              isAdding
                ? 'bg-emerald-600 text-white scale-95'
                : 'bg-forest-900 hover:bg-forest-800 text-white hover:shadow-md hover:scale-105 active:scale-95'
            }`}
            aria-label={`Add ${plant.name} to cart`}
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4 animate-bounce" />
                <span>Packed!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-emerald-300" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
