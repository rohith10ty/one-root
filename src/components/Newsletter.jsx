import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { Mail, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Newsletter() {
  const { showToast, applyCoupon } = useShop();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email format (e.g. name@domain.com).');
      return;
    }

    // Success
    setIsSubscribed(true);
    applyCoupon('PLANTLOVE15');
    showToast(
      'Welcome to the Botanical Circle!',
      'Your 15% OFF coupon "PLANTLOVE15" has been auto-applied to your cart.',
      'success'
    );

    // Leaf and emerald confetti
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#10b981', '#34d399', '#fef08a', '#84cc16'],
    });
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-[3rem] overflow-hidden bg-forest-950 text-white p-8 sm:p-12 lg:p-16 border border-emerald-500/30 shadow-2xl mesh-gradient-dark">
          
          {/* Ambient blurred glowing orbs */}
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-300 bg-emerald-900/80 px-4 py-1.5 rounded-full mb-6 border border-emerald-500/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Botanical Club & Rare Drops
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
              Grow With Us & Enjoy <span className="text-emerald-400 italic">15% Off</span> Your First Plant
            </h2>

            <p className="mt-4 text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Subscribe to weekly watering alerts, repotting schedules, and first access to rare variegated greenhouse drops.
            </p>

            {isSubscribed ? (
              <div className="mt-8 p-6 rounded-2xl bg-emerald-900/60 border border-emerald-400/40 max-w-md mx-auto text-center animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-white">
                  You're in the Botanical Circle!
                </h4>
                <p className="text-xs text-emerald-200 mt-1">
                  We've applied code <strong className="text-white font-mono">PLANTLOVE15</strong> to your cart.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-3 p-1.5 rounded-2xl sm:rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl focus-within:border-emerald-400 transition-colors">
                  <div className="flex items-center gap-3 pl-4 pr-2 py-2 flex-1">
                    <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full bg-transparent border-none outline-none text-white placeholder-stone-400 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl sm:rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-lg hover:shadow-emerald-600/30 shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {error && (
                  <p className="text-xs text-rose-300 font-medium mt-2.5 text-center">
                    {error}
                  </p>
                )}

                <div className="mt-4 flex items-center justify-center gap-6 text-[11px] text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> No spam, ever
                  </span>
                  <span>Unsubscribe anytime</span>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
