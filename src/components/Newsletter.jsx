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
      setError('Please provide a valid email format.');
      return;
    }

    setIsSubscribed(true);
    applyCoupon('PLANTLOVE15');
    showToast(
      'Welcome to the Botanical Circle!',
      '15% OFF coupon "PLANTLOVE15" auto-applied to your cart.',
      'success'
    );

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#445D48', '#D6CC99', '#FDE5D4', '#001524'],
    });
  };

  return (
    <section className="py-10 sm:py-14 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="relative rounded-3xl overflow-hidden bg-[#001524] text-[#FDE5D4] p-6 sm:p-10 border border-[#D6CC99]/35 shadow-xl mesh-gradient-dark">
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-1.5 text-[10.5px] uppercase font-bold tracking-wider text-[#D6CC99] bg-[#445D48]/40 px-3 py-1 rounded-full mb-4 border border-[#D6CC99]/30 backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-[#D6CC99]" /> Botanical Club & Rare Drops
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold tracking-tight text-[#FDE5D4] leading-tight">
              Grow With Us & Enjoy <span className="text-[#D6CC99] italic">15% Off</span> Your First Plant
            </h2>

            <p className="mt-2.5 text-[#D6CC99]/80 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Receive weekly watering alerts, repotting schedules, and early access to rare greenhouse drops.
            </p>

            {isSubscribed ? (
              <div className="mt-6 p-4 rounded-xl bg-[#445D48]/40 border border-[#D6CC99]/40 max-w-sm mx-auto text-center">
                <div className="w-8 h-8 rounded-full bg-[#D6CC99]/20 text-[#D6CC99] flex items-center justify-center mx-auto mb-2">
                  <Check className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-serif font-bold text-[#FDE5D4]">
                  You're in the Botanical Circle!
                </h4>
                <p className="text-[11px] text-[#D6CC99] mt-0.5">
                  Code <strong className="text-[#FDE5D4] font-mono">PLANTLOVE15</strong> applied.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-2 p-1 rounded-2xl sm:rounded-full bg-white/10 backdrop-blur-xl border border-[#D6CC99]/30 shadow-lg focus-within:border-[#D6CC99] transition-colors">
                  <div className="flex items-center gap-2 pl-3 pr-2 py-1.5 flex-1">
                    <Mail className="w-4 h-4 text-[#D6CC99] shrink-0" />
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full bg-transparent border-none outline-none text-[#FDE5D4] placeholder-[#D6CC99]/50 text-xs sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl sm:rounded-full bg-[#445D48] hover:bg-[#D6CC99] hover:text-[#001524] text-[#FDE5D4] font-semibold text-xs transition-all cursor-pointer shadow-md shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {error && (
                  <p className="text-[11px] text-rose-300 font-medium mt-1.5 text-center">
                    {error}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-[#D6CC99]/70">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#D6CC99]" /> No spam, ever
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
