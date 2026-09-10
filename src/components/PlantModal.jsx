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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={() => setQuickViewPlant(null)}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-emerald-100 overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewPlant(null)}
          className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-stone-100 text-forest-900 flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Stage */}
          <div className="md:col-span-6 bg-stone-100 relative min-h-[320px] md:min-h-full">
            <img
              src={quickViewPlant.image}
              alt={quickViewPlant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent"></div>

            {/* Badges */}
            <div className="absolute top-5 left-5 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-950/90 text-emerald-300 backdrop-blur-md">
                {quickViewPlant.category}
              </span>
              {quickViewPlant.petFriendly && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/90 text-emerald-950 backdrop-blur-md">
                  🐾 100% Pet-Safe
                </span>
              )}
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-xs text-emerald-300 font-mono italic">
                Botanical Classification:
              </span>
              <p className="text-sm font-serif italic text-white/90">
                {quickViewPlant.botanicalName}
              </p>
            </div>
          </div>

          {/* Right Column: Information & Options */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              
              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(quickViewPlant.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-forest-950">{quickViewPlant.rating}</span>
                <span className="text-xs text-stone-400">({quickViewPlant.reviewsCount} reviews)</span>
              </div>

              {/* Title & Price */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
                {quickViewPlant.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-forest-950">${finalPrice}</span>
                {quickViewPlant.originalPrice && (
                  <span className="text-base text-stone-400 line-through">
                    ${quickViewPlant.originalPrice + (currentSizeObj.priceOffset || 0)}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Save ${(quickViewPlant.originalPrice || finalPrice + 10) - finalPrice}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {quickViewPlant.description}
              </p>

              {/* Benefits Checklist */}
              <div className="mt-4 flex flex-wrap gap-2">
                {quickViewPlant.benefits?.map((benefit, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-[11px] font-semibold text-emerald-900 border border-emerald-200/60"
                  >
                    <Check className="w-3 h-3 text-emerald-600" /> {benefit}
                  </span>
                ))}
              </div>

              {/* Care Metrics Grid */}
              <div className="mt-6 grid grid-cols-3 gap-2.5 p-3.5 bg-stone-50 rounded-2xl border border-stone-100">
                <div className="flex flex-col items-center text-center p-1.5">
                  <Sun className="w-4 h-4 text-amber-500 mb-1" />
                  <span className="text-[10px] uppercase font-bold text-stone-400">Sunlight</span>
                  <span className="text-xs font-semibold text-forest-900 mt-0.5">{quickViewPlant.sunlight.split(' ')[0]}</span>
                </div>
                <div className="flex flex-col items-center text-center p-1.5 border-x border-stone-200">
                  <Droplets className="w-4 h-4 text-sky-500 mb-1" />
                  <span className="text-[10px] uppercase font-bold text-stone-400">Watering</span>
                  <span className="text-xs font-semibold text-forest-900 mt-0.5">{quickViewPlant.watering.split(' ')[0]}</span>
                </div>
                <div className="flex flex-col items-center text-center p-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                  <span className="text-[10px] uppercase font-bold text-stone-400">Care Level</span>
                  <span className="text-xs font-semibold text-forest-900 mt-0.5">{quickViewPlant.difficulty}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Select Nursery Planter Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSize(s.name)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all cursor-pointer ${
                        selectedSize === s.name
                          ? 'border-forest-900 bg-forest-900 text-white shadow-md'
                          : 'border-stone-200 hover:border-emerald-300 text-stone-700 bg-white'
                      }`}
                    >
                      <div className="font-semibold">{s.name.split(' ')[0]}</div>
                      <div className={`text-[10px] ${selectedSize === s.name ? 'text-emerald-200' : 'text-stone-400'}`}>
                        {s.height}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions: Quantity + Add To Cart + Wishlist */}
            <div className="mt-6 pt-5 border-t border-stone-100 flex items-center gap-3">
              
              {/* Quantity Stepper */}
              <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-200 font-bold text-sm transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-forest-950 min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-200 font-bold text-sm transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-forest-900 hover:bg-forest-800 text-white hover:shadow-lg'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Nursery Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-emerald-300" />
                    <span>Add {quantity} to Cart · ${(finalPrice * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Wishlist Toggle */}
              <button
                onClick={() => toggleWishlist(quickViewPlant.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                  isFavorited
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-stone-200 text-stone-600 hover:text-rose-600 hover:border-rose-200'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
