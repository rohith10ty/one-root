import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef(null);

  // Interactive Floating Leaf & Pollen Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const leaves = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 4,
      speedX: Math.random() * 0.7 - 0.2,
      speedY: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.4 + 0.2,
      color: ['#10b981', '#34d399', '#84cc16', '#6ee7b7', '#ca8a04'][Math.floor(Math.random() * 5)],
      aspect: Math.random() * 0.6 + 0.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      leaves.forEach((leaf) => {
        leaf.y += leaf.speedY;
        leaf.x += Math.sin(leaf.y * 0.01) * 0.6 + leaf.speedX;
        leaf.rotation += leaf.rotationSpeed;

        if (leaf.y > height + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * width;
        }
        if (leaf.x > width + 20) leaf.x = -20;
        if (leaf.x < -20) leaf.x = width + 20;

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.globalAlpha = leaf.opacity;
        ctx.fillStyle = leaf.color;

        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.size * leaf.aspect, leaf.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToPlants = () => {
    const el = document.getElementById('plants-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCare = () => {
    const el = document.getElementById('care-tips');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden mesh-gradient-hero pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-20">
      {/* Background canvas for ambient organic floating leaves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
      />

      {/* Decorative ambient blurred blobs */}
      <div className="absolute top-8 left-1/4 w-72 h-72 bg-emerald-300/25 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle"></div>
      <div className="absolute bottom-8 right-8 w-60 h-60 bg-amber-200/25 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 border border-emerald-200/80 shadow-xs backdrop-blur-md mb-4 hover:border-emerald-400 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[11px] sm:text-xs font-semibold text-forest-900 tracking-wide flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Handcrafted Organic Botanical Nursery
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 tracking-tight leading-[1.18]">
              Bring Living Nature <br className="hidden sm:inline" />
              Into Your <span className="relative inline-block text-emerald-700 italic">
                Sanctuary
                <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-emerald-400/60" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm lg:text-base text-forest-800/80 max-w-lg leading-relaxed font-normal">
              Ethically nurtured indoor houseplants, resilient succulents, and vibrant botanicals delivered with zero plastic in climate-protective packaging.
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={scrollToPlants}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Shop All Plants</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToCare}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/90 hover:bg-white text-forest-900 font-semibold text-xs sm:text-sm border border-stone-200 hover:border-emerald-400 shadow-xs transition-all cursor-pointer group"
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-600 group-hover:rotate-12 transition-transform" />
                <span>Care Guides</span>
              </button>
            </div>

            {/* Trust Proof Points */}
            <div className="mt-8 pt-6 border-t border-forest-200/50 grid grid-cols-3 gap-4 w-full max-w-md">
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-forest-950">1,200+</p>
                <p className="text-[10.5px] text-forest-700/80 font-medium mt-0.5">Healthy Species</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-forest-950">99.4%</p>
                <p className="text-[10.5px] text-forest-700/80 font-medium mt-0.5">Survival Guarantee</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-emerald-700">100%</p>
                <p className="text-[10.5px] text-forest-700/80 font-medium mt-0.5">Zero Plastic</p>
              </div>
            </div>

          </div>

          {/* Right Hero Visuals */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-[300px] sm:max-w-xs lg:max-w-sm">
              
              {/* Primary Plant Stage Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-botanical border-3 border-white/90 bg-gradient-to-b from-white/40 to-emerald-100/30 p-2.5 group">
                <div className="overflow-hidden rounded-2xl aspect-[4/4.6] relative">
                  <img
                    src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=85"
                    alt="Lush Monstera Deliciosa Houseplant"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent"></div>

                  {/* Caption overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/90 text-forest-950 backdrop-blur-xs">
                      Spotlight
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold mt-1">Monstera Deliciosa</h3>
                    <p className="text-[11px] text-emerald-200">Air-Purifying Centerpiece</p>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card 1: Carbon Negative */}
              <div className="absolute -top-4 -left-4 sm:-left-6 glass-card p-2.5 sm:p-3 rounded-2xl shadow-md flex items-center gap-2.5 border border-white/80 animate-float-slow">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-forest-950">Carbon-Negative</p>
                  <p className="text-[9.5px] text-stone-500">1 Tree planted/order</p>
                </div>
              </div>

              {/* Floating Stat Card 2: 30-Day Guarantee */}
              <div className="absolute -bottom-4 -right-3 sm:-right-5 glass-card p-2.5 sm:p-3 rounded-2xl shadow-md flex items-center gap-2.5 border border-white/80 animate-float-medium">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-forest-950">30-Day Guarantee</p>
                  <p className="text-[9.5px] text-emerald-700 font-semibold">Free replacement</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
