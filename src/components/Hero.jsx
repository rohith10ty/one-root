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
    const leaves = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 9 + 5,
      speedX: Math.random() * 0.8 - 0.2,
      speedY: Math.random() * 0.6 + 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.45 + 0.2,
      color: ['#10b981', '#34d399', '#84cc16', '#6ee7b7', '#ca8a04'][Math.floor(Math.random() * 5)],
      aspect: Math.random() * 0.6 + 0.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      leaves.forEach((leaf) => {
        leaf.y += leaf.speedY;
        leaf.x += Math.sin(leaf.y * 0.01) * 0.7 + leaf.speedX;
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

        // Draw petal/leaf
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
    <section id="hero" className="relative overflow-hidden mesh-gradient-hero pt-10 pb-20 lg:pt-16 lg:pb-32">
      {/* Background canvas for ambient organic floating leaves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
      />

      {/* Decorative ambient blurred blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-emerald-200/80 shadow-sm backdrop-blur-md mb-6 hover:border-emerald-400 transition-colors">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs sm:text-sm font-semibold text-forest-900 tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Handcrafted Botanical Nursery & Rare Species
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-forest-950 tracking-tight leading-[1.12]">
              Bring Living Nature <br className="hidden sm:inline" />
              Into Your <span className="relative inline-block text-emerald-700 italic">
                Sanctuary
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400/60" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-forest-800/85 max-w-2xl leading-relaxed font-normal">
              Discover ethically nurtured indoor houseplants, resilient succulents, and vibrant perennials delivered with zero plastic in climate-protective packaging.
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={scrollToPlants}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-base shadow-xl shadow-forest-950/25 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer group"
              >
                <span>Shop All Plants</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={scrollToCare}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/80 hover:bg-white text-forest-900 font-semibold text-base border border-forest-200/80 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <Leaf className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform" />
                <span>Explore Care Guides</span>
              </button>
            </div>

            {/* Trust Proof Points */}
            <div className="mt-12 pt-8 border-t border-forest-200/60 grid grid-cols-3 gap-6 w-full max-w-xl">
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">1,200+</p>
                <p className="text-xs text-forest-700/90 font-medium mt-1">Healthy Botanical Species</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">99.4%</p>
                <p className="text-xs text-forest-700/90 font-medium mt-1">Safe Arrival Guarantee</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-emerald-700">100%</p>
                <p className="text-xs text-forest-700/90 font-medium mt-1">Plastic-Free Packaging</p>
              </div>
            </div>

          </div>

          {/* Right Hero Visuals */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Plant Stage Frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-botanical-lg border-4 border-white/80 bg-gradient-to-b from-white/40 to-emerald-100/40 p-3 group">
                <div className="overflow-hidden rounded-[2rem] aspect-[4/5] relative">
                  <img
                    src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=85"
                    alt="Lush Monstera Deliciosa Houseplant"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent"></div>

                  {/* Caption overlay */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/90 text-forest-950 backdrop-blur-sm">
                      Nursery Spotlight
                    </span>
                    <h3 className="text-xl font-serif font-bold mt-2">Monstera Deliciosa Giant</h3>
                    <p className="text-xs text-emerald-200 mt-0.5">Air-Purifying Botanical Centerpiece</p>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card 1: Carbon Negative */}
              <div className="absolute -top-6 -left-6 sm:-left-8 glass-card p-3.5 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/80 animate-float-slow">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-forest-950">Carbon-Negative</p>
                  <p className="text-[11px] text-stone-500">1 Tree planted per order</p>
                </div>
              </div>

              {/* Floating Stat Card 2: 30-Day Guarantee */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/80 animate-float-medium">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-forest-950">30-Day Guarantee</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">Free replacement if wilts</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
