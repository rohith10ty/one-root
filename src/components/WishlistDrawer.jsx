import React, { useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PLANTS } from '../data/plantsData';
import { disintegrateElement } from '../utils/disintegrate';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setQuickViewPlant,
  } = useShop();

  const itemRefs = useRef({});

  if (!isWishlistOpen) return null;

  const savedPlants = PLANTS.filter((p) => wishlist.includes(p.id));

  const handleDisintegrateRemove = async (plant) => {
    const el = itemRefs.current[plant.id];
    if (el) {
      await disintegrateElement(el, {
        particleCount: 120,
        colors: ['#f43f5e', '#fb7185', '#10b981', '#34d399'],
        direction: 'left',
      });
    }
    toggleWishlist(plant.id);
  };

  const handleMoveToCart = (plant) => {
    addToCart(plant, 1, 'Medium (6" Pot)');
    toggleWishlist(plant.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-forest-950/60 backdrop-blur-xs animate-in fade-in"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-forest-950">Saved Plants</h3>
                <span className="text-[11px] text-stone-400">{savedPlants.length} plants favorited</span>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-forest-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-stone-100">
            {savedPlants.length === 0 ? (
              <div className="py-12 text-center text-stone-400">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-forest-950">Wishlist is empty</p>
                <p className="text-[11px] text-stone-400 mt-0.5">Tap the heart icon on any plant to save.</p>
              </div>
            ) : (
              savedPlants.map((plant) => (
                <div
                  key={plant.id}
                  ref={(el) => (itemRefs.current[plant.id] = el)}
                  className="pt-3 first:pt-0 flex items-center gap-3 transition-all"
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-14 h-14 rounded-xl object-cover border border-stone-100 shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setQuickViewPlant(plant);
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        setIsWishlistOpen(false);
                        setQuickViewPlant(plant);
                      }}
                      className="text-xs font-semibold text-forest-950 hover:text-emerald-700 cursor-pointer truncate"
                    >
                      {plant.name}
                    </h4>
                    <p className="text-[10px] text-stone-400 italic truncate">{plant.botanicalName}</p>
                    <p className="text-xs font-bold text-forest-900 mt-0.5">${plant.price}</p>

                    <button
                      onClick={() => handleMoveToCart(plant)}
                      className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" /> Move to Cart
                    </button>
                  </div>

                  <button
                    onClick={() => handleDisintegrateRemove(plant)}
                    title="Disintegrate from wishlist"
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {savedPlants.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50">
              <button
                onClick={() => {
                  savedPlants.forEach((p) => addToCart(p, 1, 'Medium (6" Pot)'));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs rounded-xl text-center shadow-xs transition-all"
              >
                Move All {savedPlants.length} to Cart
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
