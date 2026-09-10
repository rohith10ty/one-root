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
      setStep(3); // confirmation

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#84cc16'],
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div
        className="bg-white rounded-[2.5rem] max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-forest-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Stepper Indicator */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-forest-900 text-white' : 'bg-stone-200 text-stone-600'}`}>
                1
              </span>
              <span className="text-xs font-semibold text-forest-950">Eco Shipping</span>
            </div>
            <div className="w-10 h-0.5 bg-stone-200"></div>
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-forest-900 text-white' : 'bg-stone-200 text-stone-600'}`}>
                2
              </span>
              <span className="text-xs font-semibold text-forest-950">Secure Payment</span>
            </div>
          </div>
        )}

        {/* Step 1: Shipping Form */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-bold text-forest-950">Climate Delivery Details</h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Where should we hand-deliver your living botanicals?
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={shippingData.fullName}
                  onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Zip / Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.zip}
                    onChange={(e) => setShippingData({ ...shippingData, zip: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Special Delivery / Care Note
                </label>
                <input
                  type="text"
                  value={shippingData.ecoNote}
                  onChange={(e) => setShippingData({ ...shippingData, ecoNote: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium"
                  placeholder="e.g. Leave in shaded porch"
                />
              </div>

              <div className="pt-4 flex justify-between items-center">
                <span className="text-xs text-stone-500">Order Subtotal: <strong>${cartTotal.toFixed(2)}</strong></span>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm cursor-pointer shadow-md"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Payment Simulator */}
        {step === 2 && (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-bold text-forest-950">Payment Simulation</h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Encrypted with 256-bit TLS botanical gateway.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-emerald-700" />
                  <div>
                    <span className="text-xs font-bold text-forest-950 block">Instant Card / Digital Wallet</span>
                    <span className="text-[11px] text-stone-500">Apple Pay, Visa, Mastercard, Google Pay</span>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Card Number (Demo)
                </label>
                <input
                  type="text"
                  readOnly
                  value="4242 •••• •••• 4242"
                  className="w-full px-4 py-3 rounded-xl bg-stone-100 border border-stone-200 text-sm font-mono font-medium text-stone-700"
                />
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 text-xs space-y-1.5 text-stone-600">
                <div className="flex justify-between">
                  <span>Shipping to:</span>
                  <span className="font-semibold text-forest-950">{shippingData.fullName}, {shippingData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>{cart.length} plant types</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount applied ({appliedCoupon}):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t flex justify-between font-bold text-forest-950 text-sm">
                  <span>Final Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  ← Back to Address
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm cursor-pointer shadow-lg"
                >
                  <Lock className="w-4 h-4 text-emerald-300" />
                  <span>{isProcessing ? 'Nurturing & Packing...' : `Confirm & Pay $${cartTotal.toFixed(2)}`}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Order Confirmation & Tree Certificate */}
        {step === 3 && (
          <div className="text-center py-6 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
              Order #VO-{orderId} Confirmed
            </span>

            <h3 className="text-3xl font-serif font-bold text-forest-950 mt-4">
              Your Botanicals Are Being Packed!
            </h3>

            <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
              We've dispatched confirmation to your email. Our horticulturalists will inspect, hydrate, and nestle your plants into zero-plastic thermal packaging.
            </p>

            {/* Tree planted reward */}
            <div className="mt-6 p-5 rounded-2xl bg-forest-50 border border-emerald-200/80 max-w-md mx-auto flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <TreePine className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-forest-950">1 Native Tree Planted!</h4>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Thanks to your adoption today, a native mangrove seedling has been funded in our coastal restoration program.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm cursor-pointer shadow-lg"
              >
                Return to Living Sanctuary
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
