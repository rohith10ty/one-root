import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  TreePine, 
  ArrowRight, 
  Lock 
} from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, cartTotal, discountAmount, appliedCoupon } = useShop();
  const [step, setStep] = useState(1);
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [shippingData, setShippingData] = useState({
    fullName: 'Jane Doe',
    address: '42 Evergreen Terrace',
    city: 'Portland',
    zip: '97201',
    ecoNote: 'Leave at front porch in shaded area',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#445D48', '#D6CC99', '#FDE5D4', '#001524'],
      });
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#001524]/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-[#D6CC99]/40 relative animate-in zoom-in-95 my-4 max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FDE5D4]/60 hover:bg-[#D6CC99]/40 flex items-center justify-center text-[#001524] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Stepper Indicator */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-1.5">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 1 ? 'bg-[#001524] text-[#FDE5D4]' : 'bg-[#D6CC99]/30 text-[#001524]/70'}`}>
                1
              </span>
              <span className="text-xs font-semibold text-[#001524]">Shipping</span>
            </div>
            <div className="w-8 h-0.5 bg-[#D6CC99]/40"></div>
            <div className="flex items-center gap-1.5">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 2 ? 'bg-[#001524] text-[#FDE5D4]' : 'bg-[#D6CC99]/30 text-[#001524]/70'}`}>
                2
              </span>
              <span className="text-xs font-semibold text-[#001524]">Payment</span>
            </div>
          </div>
        )}

        {/* Step 1: Shipping Form */}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#001524]">Delivery Address</h3>
              <p className="text-xs text-[#001524]/75 mt-0.5">
                Where should we hand-deliver your living botanicals?
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#001524]/80 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={shippingData.fullName}
                  onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-[#D6CC99]/50 text-xs font-medium text-[#001524]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#001524]/80 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-[#D6CC99]/50 text-xs font-medium text-[#001524]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#001524]/80 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-[#D6CC99]/50 text-xs font-medium text-[#001524]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#001524]/80 mb-1">
                    Zip / Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.zip}
                    onChange={(e) => setShippingData({ ...shippingData, zip: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-[#D6CC99]/50 text-xs font-medium text-[#001524]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#001524]/80 mb-1">
                  Delivery / Shaded Porch Note
                </label>
                <input
                  type="text"
                  value={shippingData.ecoNote}
                  onChange={(e) => setShippingData({ ...shippingData, ecoNote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-[#D6CC99]/50 text-xs font-medium text-[#001524]"
                  placeholder="e.g. Leave in shaded porch"
                />
              </div>

              <div className="pt-3 flex justify-between items-center">
                <span className="text-xs text-[#001524]/75">Subtotal: <strong>${cartTotal.toFixed(2)}</strong></span>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] font-semibold text-xs cursor-pointer shadow-xs"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Payment Simulator */}
        {step === 2 && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#001524]">Payment Simulation</h3>
              <p className="text-xs text-[#001524]/75 mt-0.5">
                Encrypted 256-bit TLS simulated gateway.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-3">
              <div className="p-3 rounded-xl border-2 border-[#445D48] bg-[#445D48]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4.5 h-4.5 text-[#445D48]" />
                  <div>
                    <span className="text-xs font-bold text-[#001524] block">Instant Card / Digital Wallet</span>
                    <span className="text-[10px] text-[#001524]/60">Apple Pay, Visa, Mastercard, Google Pay</span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#445D48]" />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#001524]/80 mb-1">
                  Card Number (Demo)
                </label>
                <input
                  type="text"
                  readOnly
                  value="4242 •••• •••• 4242"
                  className="w-full px-3 py-2 rounded-xl bg-stone-100 border border-[#D6CC99]/50 text-xs font-mono font-medium text-[#001524]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#FDE5D4]/30 text-xs space-y-1 text-[#001524]/80 border border-[#D6CC99]/30">
                <div className="flex justify-between">
                  <span>Shipping to:</span>
                  <span className="font-semibold text-[#001524]">{shippingData.fullName}, {shippingData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>{cart.length} plant types</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#445D48]">
                    <span>Discount ({appliedCoupon}):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-1.5 border-t border-[#D6CC99]/30 flex justify-between font-bold text-[#001524] text-xs">
                  <span>Total:</span>
                  <span className="text-sm font-extrabold text-[#001524]">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-2 text-xs font-semibold text-[#001524]/70 hover:text-[#001524] cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] font-semibold text-xs cursor-pointer shadow-md"
                >
                  <Lock className="w-3.5 h-3.5 text-[#D6CC99]" />
                  <span>{isProcessing ? 'Packing...' : `Pay $${cartTotal.toFixed(2)}`}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 3 && (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-[#445D48]/15 text-[#445D48] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] uppercase font-bold tracking-wider text-[#001524] bg-[#D6CC99]/40 px-2.5 py-0.5 rounded-full">
              Order #OR-{orderId} Confirmed
            </span>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#001524] mt-2">
              Your Botanicals Are Being Packed!
            </h3>

            <p className="text-xs text-[#001524]/75 mt-1 max-w-sm mx-auto leading-relaxed">
              We've dispatched confirmation to your email. Our horticulturalists will inspect and hydrate your plants.
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-[#FDE5D4]/40 border border-[#D6CC99]/40 max-w-sm mx-auto flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-[#445D48] text-[#D6CC99] flex items-center justify-center shrink-0">
                <TreePine className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#001524]">1 Native Tree Planted!</h4>
                <p className="text-[10.5px] text-[#001524]/70 mt-0.5">
                  A native mangrove seedling has been funded in our coastal restoration program.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] font-semibold text-xs cursor-pointer shadow-md"
              >
                Return to Sanctuary
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
