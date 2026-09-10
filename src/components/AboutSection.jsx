import React from 'react';
import { NURSERY_STATS } from '../data/plantsData';
import { Sprout, Users, Flower2, ShieldCheck, TreePine, CheckCircle2, ArrowRight } from 'lucide-react';

const statIcons = {
  Users,
  Flower2,
  ShieldCheck,
  TreePine,
};

export default function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Layered Visuals */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Main nursery photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-botanical border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80"
                  alt="Verdant Oasis Master Greenhouse"
                  className="w-full h-[260px] sm:h-[320px] object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                    Est. 2014 · Organic Conservatory
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold mt-0.5">Our Living Greenhouse</h3>
                  <p className="text-[11px] text-stone-200 mt-0.5">
                    Solar-powered climatic domes nurturing 180+ rare botanicals.
                  </p>
                </div>
              </div>

              {/* Floating Botanical Quote Card */}
              <div className="hidden sm:block absolute -bottom-5 -right-4 max-w-[240px] bg-forest-900 text-white p-3.5 rounded-2xl shadow-xl border border-emerald-500/30 backdrop-blur-xl">
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <Sprout className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Permaculture Oath</span>
                </div>
                <p className="text-[11px] text-emerald-100/90 leading-relaxed italic">
                  "We deliver rooted ecosystems engineered to flourish for decades."
                </p>
                <div className="mt-2 pt-1 border-t border-emerald-800 text-[10px] text-emerald-300 font-medium">
                  — Dr. Julian Vane, Horticulturist
                </div>
              </div>

            </div>
          </div>

          {/* Right: Story & Message */}
          <div className="lg:col-span-6">
            
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full mb-3">
              <Sprout className="w-3 h-3" /> Our Living Heritage
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 tracking-tight leading-snug">
              Rooted in Sustainability, Grown with Botanical Devotion
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
              Founded with a mission to heal the urban disconnect from living earth, <strong>Verdant Oasis</strong> connects modern homes with ethically grown, nutrient-rich botanicals.
            </p>

            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
              Every specimen is grown without synthetic chemical fertilizers or disposable plastics. We formulate living micro-biome soil blends enriched with mycorrhizal fungi.
            </p>

            {/* Core Commitments Checklist */}
            <div className="mt-4 space-y-2">
              {[
                '100% Biodegradable coconut coir and recycled packaging',
                'One native mangrove tree planted for every plant adopted',
                '30-Day unconditional plant happiness guarantee',
                'Lifetime direct messaging access to our botanists'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-forest-900 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Link */}
            <div className="mt-5">
              <a
                href="#why-us"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 group"
              >
                <span>Discover our zero-plastic packaging journey</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>

        {/* Nursery Statistics Counters */}
        <div className="mt-12 pt-8 border-t border-stone-100 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {NURSERY_STATS.map((stat, idx) => {
            const IconComponent = statIcons[stat.icon] || Sprout;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-forest-50/50 hover:bg-forest-50 border border-emerald-100/60 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-4.5 h-4.5" />
                </div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-forest-950 tracking-tight">
                  {stat.value}
                </div>
                <p className="text-[11px] text-stone-600 font-medium mt-0.5">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
