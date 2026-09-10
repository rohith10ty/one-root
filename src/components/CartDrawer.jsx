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
      await disintegrateElement(el, {
        particleCount: 120,
        duration: 850,
        direction: 'right',
        colors: ['#445D48', '#D6CC99', '#FDE5D4', '#001524'],
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
      <div
        className="absolute inset-0 bg-[#001524]/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#D6CC99]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#445D48] text-[#D6CC99] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#001524]">Nursery Cart</h3>
                <span className="text-[11px] text-[#001524]/60">{cartItemsCount} living items</span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#001524]/60 hover:text-[#001524] hover:bg-[#FDE5D4]/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-4 sm:px-5 py-2.5 bg-[#FDE5D4]/30 border-b border-[#D6CC99]/30">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-semibold text-[#001524] flex items-center gap-1 truncate">
                <Truck className="w-3 h-3 text-[#445D48] shrink-0" />
                {cartSubtotal >= freeShippingThreshold ? (
                  <span className="text-[#445D48] font-bold">Free Delivery unlocked! 🎉</span>
                ) : (
                  <span>Add <strong>${amountToFreeShipping}</strong> for Free Delivery</span>
                )}
              </span>
              <span className="font-bold text-[#445D48] ml-1">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#D6CC99]/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#445D48] to-[#D6CC99] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-[#D6CC99]/20">
            {cart.length === 0 ? (
              <div className="py-12 text-center text-[#001524]/50">
                <div className="w-12 h-12 rounded-full bg-[#FDE5D4]/40 text-[#445D48] flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-[#001524]">Your cart is empty</p>
                <p className="text-[11px] text-[#001524]/50 mt-0.5">Explore our indoor & outdoor flora</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-5 py-2 rounded-xl bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemKey = `${item.id}-${item.size}`;

                return (
                  <div
                    key={itemKey}
                    ref={(el) => (itemRefs.current[itemKey] = el)}
                    className="pt-3 first:pt-0 flex items-center gap-3 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover border border-[#D6CC99]/30 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#001524] truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-[#001524]/60 truncate">{item.size}</p>
                      <p className="text-[11px] font-bold text-[#001524] mt-0.5">
                        ${item.price}
                      </p>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center border border-[#D6CC99]/40 rounded-md bg-[#FDE5D4]/20 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="px-1.5 py-0.5 text-xs text-[#001524] hover:bg-[#FDE5D4]"
                          >
                            -
                          </button>
                          <span className="px-1.5 py-0.5 text-[11px] font-bold text-[#001524]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="px-1.5 py-0.5 text-xs text-[#001524] hover:bg-[#FDE5D4]"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#001524]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Disintegrate Particle Removal */}
                    <button
                      onClick={() => handleDisintegrateRemove(item)}
                      title="Disintegrate and remove item"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer / Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#D6CC99]/30 bg-[#FDE5D4]/20 space-y-3">
              
              {/* Promo code */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#445D48]/15 border border-[#445D48]/30 text-[11px]">
                  <div className="flex items-center gap-1 text-[#001524] font-semibold">
                    <Tag className="w-3 h-3 text-[#445D48]" />
                    <span>Coupon <strong>{appliedCoupon}</strong> (-{discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#001524]/60 hover:text-[#001524] font-bold cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Coupon (PLANTLOVE15)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#D6CC99]/60 focus:border-[#445D48] outline-none uppercase font-mono text-[#001524]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1 text-xs text-[#001524]/75">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#001524]">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#445D48] font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#445D48]">FREE</strong> : `$${shippingFee}`}</span>
                </div>
                <div className="pt-1.5 border-t border-[#D6CC99]/30 flex justify-between text-xs font-bold text-[#001524]">
                  <span>Total Due</span>
                  <span className="text-sm font-extrabold text-[#001524]">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  if (onOpenCheckout) onOpenCheckout();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer group"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[9.5px] text-[#001524]/50">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#445D48]" /> 256-Bit Encrypted
                </span>
                <span>•</span>
                <span>30-Day Guarantee</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
