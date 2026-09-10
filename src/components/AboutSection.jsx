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
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Lush Layered Visuals */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main nursery photo */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-botanical-lg border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80"
                  alt="Verdant Oasis Master Greenhouse"
                  className="w-full h-[420px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
                    Est. 2014 · Organic Conservatory
                  </span>
                  <h3 className="text-xl font-serif font-bold mt-1">Our Living Greenhouse</h3>
                  <p className="text-xs text-stone-200 mt-1">
                    Solar-powered climatic domes nurturing 180+ rare and heirloom plant lineages.
                  </p>
                </div>
              </div>

              {/* Floating Botanical Quote Card */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 max-w-xs bg-forest-900 text-white p-5 rounded-3xl shadow-2xl border border-emerald-500/30 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <Sprout className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Permaculture Oath</span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed italic">
                  "We don’t just ship plants in cardboard boxes. We deliver rooted ecosystems engineered to thrive for decades."
                </p>
                <div className="mt-3 pt-2 border-t border-emerald-800 text-[11px] text-emerald-300 font-medium">
                  — Dr. Julian Vane, Chief Horticulturist
                </div>
              </div>

            </div>
          </div>

          {/* Right: Story & Message */}
          <div className="lg:col-span-6">
            
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100/80 px-3.5 py-1 rounded-full mb-4">
              <Sprout className="w-3.5 h-3.5" /> Our Living Heritage
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 tracking-tight leading-tight">
              Rooted in Sustainability, Grown with Botanical Devotion
            </h2>

            <p className="mt-5 text-base sm:text-lg text-stone-600 leading-relaxed">
              Founded with a mission to heal the urban disconnect from living earth, <strong>Verdant Oasis</strong> connects modern homes with ethically grown, nutrient-rich botanicals.
            </p>

            <p className="mt-4 text-sm text-stone-600 leading-relaxed">
              Every specimen is grown without synthetic chemical fertilizers or disposable plastics. We formulate custom living micro-biome soil blends enriched with mycorrhizal fungi, ensuring rapid root establishment in your home.
            </p>

            {/* Core Commitments Checklist */}
            <div className="mt-6 space-y-3">
              {[
                '100% Biodegradable coconut coir and recycled packaging',
                'One native mangrove or forest tree planted for every plant adopted',
                '30-Day unconditional plant happiness and survival guarantee',
                'Lifetime direct messaging access to our horticulturalists'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-forest-900 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Learn more CTA button */}
            <div className="mt-8">
              <a
                href="#why-us"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 group"
              >
                <span>Discover our zero-plastic packaging journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>

        {/* Nursery Statistics Counters */}
        <div className="mt-20 pt-12 border-t border-stone-100 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {NURSERY_STATS.map((stat, idx) => {
            const IconComponent = statIcons[stat.icon] || Sprout;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-forest-50/50 hover:bg-forest-50 border border-emerald-100/60 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 tracking-tight">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
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
