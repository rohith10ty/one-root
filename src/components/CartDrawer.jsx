import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { disintegrateElement } from '../utils/disintegrate';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag 
} from 'lucide-react';

export default function CartDrawer({ onOpenCheckout }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    discountAmount,
    discountPercent,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingFee,
    freeShippingThreshold,
    cartTotal,
    cartItemsCount,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const itemRefs = useRef({});

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, (freeShippingThreshold - cartSubtotal)).toFixed(2);

  const handleDisintegrateRemove = async (item) => {
    const key = `${item.id}-${item.size}`;
    const el = itemRefs.current[key];
    
    if (el) {
      // Trigger canvas particle disintegration
      await disintegrateElement(el, {
        particleCount: 140,
        duration: 900,
        direction: 'right',
        colors: ['#10b981', '#34d399', '#84cc16', '#eab308', '#059669'],
      });
    }

    removeFromCart(item.id, item.size);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-forest-950/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-forest-900 text-emerald-300 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-forest-950">Nursery Cart</h3>
                <span className="text-xs text-stone-400">{cartItemsCount} living items</span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-stone-400 hover:text-forest-900 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3 bg-forest-50/80 border-b border-emerald-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-forest-950 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                {cartSubtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-700 font-bold">You unlocked Free Climate Delivery! 🎉</span>
                ) : (
                  <span>Add <strong>${amountToFreeShipping}</strong> more for Free Delivery</span>
                )}
              </span>
              <span className="font-bold text-emerald-700">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-stone-400">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-medium text-forest-950">Your cart is currently empty</p>
                <p className="text-xs text-stone-400 mt-1">Explore our indoor & outdoor botanicals</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition-colors cursor-pointer"
                >
                  Start Plant Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemKey = `${item.id}-${item.size}`;

                return (
                  <div
                    key={itemKey}
                    ref={(el) => (itemRefs.current[itemKey] = el)}
                    className="pt-4 first:pt-0 flex items-center gap-4 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-stone-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-forest-950 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-400 truncate">{item.size}</p>
                      <p className="text-xs font-bold text-forest-900 mt-1">
                        ${item.price} <span className="text-[10px] text-stone-400 font-normal">each</span>
                      </p>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-bold text-forest-950">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-forest-950">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Disintegrate Particle Removal Button */}
                    <button
                      onClick={() => handleDisintegrateRemove(item)}
                      title="Disintegrate and compost item"
                      className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer group shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer / Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-100 bg-stone-50/70 space-y-4">
              
              {/* Promo code input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedCoupon}</strong> applied (-{discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-stone-900 font-bold"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. PLANTLOVE15)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:border-emerald-500 outline-none uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-forest-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-forest-950">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Eco-Protective Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingFee}`}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-forest-950">
                  <span>Total Due</span>
                  <span className="text-base font-extrabold text-forest-950">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  if (onOpenCheckout) onOpenCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm transition-all shadow-xl hover:shadow-forest-950/20 cursor-pointer group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit Encrypted
                </span>
                <span>•</span>
                <span>30-Day Plant Guarantee</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
