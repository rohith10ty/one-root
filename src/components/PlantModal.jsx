import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Sun, 
  Droplets, 
  ShieldCheck, 
  Check 
} from 'lucide-react';

export default function PlantModal() {
  const { 
    quickViewPlant, 
    setQuickViewPlant, 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useShop();

  const [selectedSize, setSelectedSize] = useState('Medium (6" Pot)');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewPlant) return null;

  const isFavorited = isInWishlist(quickViewPlant.id);

  const sizes = [
    { name: 'Small (4" Pot)', priceOffset: -8, height: '8" - 12"' },
    { name: 'Medium (6" Pot)', priceOffset: 0, height: quickViewPlant.height || '14" - 20"' },
    { name: 'Large (10" Ceramic)', priceOffset: 24, height: '26" - 36"' },
  ];

  const currentSizeObj = sizes.find((s) => s.name === selectedSize) || sizes[1];
  const finalPrice = Math.max(10, quickViewPlant.price + currentSizeObj.priceOffset);

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(
      {
        ...quickViewPlant,
        price: finalPrice,
      },
      quantity,
      selectedSize
    );
    setTimeout(() => setIsAdded(false), 900);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-forest-950/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={() => setQuickViewPlant(null)}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewPlant(null)}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-stone-100 text-forest-900 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[82vh] overflow-y-auto">
          
          {/* Left Column: Image Stage */}
          <div className="md:col-span-5 bg-stone-100 relative min-h-[200px] md:min-h-full">
            <img
              src={quickViewPlant.image}
              alt={quickViewPlant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent"></div>

            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest-950/90 text-emerald-300">
                {quickViewPlant.category}
              </span>
              {quickViewPlant.petFriendly && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100/90 text-emerald-950">
                  🐾 Pet-Safe
                </span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="text-xs font-serif italic text-white/90">
                {quickViewPlant.botanicalName}
              </p>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="md:col-span-7 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              
              {/* Rating & Reviews */}
              <div className="flex items-center gap-1.5 mb-1">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(quickViewPlant.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-forest-950">{quickViewPlant.rating}</span>
                <span className="text-[10px] text-stone-400">({quickViewPlant.reviewsCount} reviews)</span>
              </div>

              {/* Title & Price */}
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-950">
                {quickViewPlant.name}
              </h2>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-forest-950">${finalPrice}</span>
                {quickViewPlant.originalPrice && (
                  <span className="text-xs text-stone-400 line-through">
                    ${quickViewPlant.originalPrice + (currentSizeObj.priceOffset || 0)}
                  </span>
                )}
                <span className="text-[10.5px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Save ${(quickViewPlant.originalPrice || finalPrice + 10) - finalPrice}
                </span>
              </div>

              {/* Description */}
              <p className="mt-2.5 text-xs text-stone-600 leading-relaxed">
                {quickViewPlant.description}
              </p>

              {/* Benefits Checklist */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {quickViewPlant.benefits?.map((benefit, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-[10px] font-semibold text-emerald-900 border border-emerald-200/60"
                  >
                    <Check className="w-2.5 h-2.5 text-emerald-600" /> {benefit}
                  </span>
                ))}
              </div>

              {/* Care Metrics Grid */}
              <div className="mt-4 grid grid-cols-3 gap-1.5 p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                <div className="flex flex-col items-center text-center p-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
                  <span className="text-[9px] uppercase font-bold text-stone-400">Sunlight</span>
                  <span className="text-[11px] font-semibold text-forest-900">{quickViewPlant.sunlight.split(' ')[0]}</span>
                </div>
                <div className="flex flex-col items-center text-center p-1 border-x border-stone-200">
                  <Droplets className="w-3.5 h-3.5 text-sky-500 mb-0.5" />
                  <span className="text-[9px] uppercase font-bold text-stone-400">Watering</span>
                  <span className="text-[11px] font-semibold text-forest-900">{quickViewPlant.watering.split(' ')[0]}</span>
                </div>
                <div className="flex flex-col items-center text-center p-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mb-0.5" />
                  <span className="text-[9px] uppercase font-bold text-stone-400">Difficulty</span>
                  <span className="text-[11px] font-semibold text-forest-900">{quickViewPlant.difficulty}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-3.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Planter Size
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSize(s.name)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                        selectedSize === s.name
                          ? 'border-forest-900 bg-forest-900 text-white shadow-xs'
                          : 'border-stone-200 hover:border-emerald-300 text-stone-700 bg-white'
                      }`}
                    >
                      <div className="font-semibold text-[11px]">{s.name.split(' ')[0]}</div>
                      <div className={`text-[9.5px] ${selectedSize === s.name ? 'text-emerald-200' : 'text-stone-400'}`}>
                        {s.height}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
              
              {/* Stepper */}
              <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1.5 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                >
                  -
                </button>
                <span className="px-2 py-1.5 text-xs font-bold text-forest-950 min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1.5 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-xs transition-all cursor-pointer shadow-xs ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-forest-900 hover:bg-forest-800 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Add to Cart · ${(finalPrice * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Wishlist Toggle */}
              <button
                onClick={() => toggleWishlist(quickViewPlant.id)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                  isFavorited
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-stone-200 text-stone-600 hover:text-rose-600'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
