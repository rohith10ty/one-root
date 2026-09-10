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
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#D6CC99] hover:border-[#445D48] shadow-xs hover:shadow-botanical transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      {/* Image & Badges Container */}
      <div className="relative aspect-[4/4] overflow-hidden bg-[#FDE5D4]/30">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10">
          {plant.badge && (
            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider bg-[#001524]/90 text-[#D6CC99] backdrop-blur-xs shadow-xs border border-[#D6CC99]/30">
              {plant.badge}
            </span>
          )}
          {plant.petFriendly && (
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-[#D6CC99]/80 text-[#001524] border border-[#D6CC99]">
              🐾 Pet Safe
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer shadow-xs backdrop-blur-xs ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 scale-105'
              : 'bg-white/85 text-[#001524] hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 transition-transform ${isFavorited ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
        </button>

        {/* Quick View Floating Action */}
        <div className="hidden sm:flex absolute inset-x-3 bottom-3 justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg bg-[#FDE5D4]/95 text-[#001524] text-[11px] font-semibold shadow-md backdrop-blur-xs flex items-center gap-1 border border-[#D6CC99]">
            <Eye className="w-3 h-3 text-[#445D48]" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10.5px] text-[#001524]/60 mb-1">
            <span className="font-semibold text-[#445D48] uppercase tracking-wider text-[10px] truncate">
              {plant.category.split(' ')[0]}
            </span>
            <div className="flex items-center gap-0.5 text-[#001524] font-bold shrink-0">
              <Star className="w-3 h-3 fill-[#D6CC99] text-[#445D48]" />
              <span>{plant.rating}</span>
            </div>
          </div>

          {/* Plant Title */}
          <h3 className="text-sm sm:text-base font-serif font-bold text-[#001524] group-hover:text-[#445D48] transition-colors line-clamp-1">
            {plant.name}
          </h3>
          <p className="text-[11px] text-[#001524]/60 italic line-clamp-1">
            {plant.botanicalName}
          </p>

          {/* Plant specs pills */}
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#001524]/70">
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#FDE5D4]/60 border border-[#D6CC99]/40">
              <Sun className="w-2.5 h-2.5 text-[#445D48]" /> {plant.sunlight.split(' ')[0]}
            </span>
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#FDE5D4]/60 border border-[#D6CC99]/40">
              <Droplets className="w-2.5 h-2.5 text-[#445D48]" /> {plant.watering.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-[#D6CC99]/30 flex items-center justify-between gap-1.5">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-bold text-[#001524]">${plant.price}</span>
              {plant.originalPrice && (
                <span className="text-[10px] text-[#001524]/40 line-through">${plant.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center gap-1 py-1.5 px-2.5 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
              isAdding
                ? 'bg-[#445D48] text-[#FDE5D4]'
                : 'bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] shadow-xs'
            }`}
            aria-label={`Add ${plant.name} to cart`}
          >
            {isAdding ? (
              <>
                <Check className="w-3 h-3 text-[#D6CC99]" />
                <span className="hidden sm:inline">Packed</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 text-[#D6CC99]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
