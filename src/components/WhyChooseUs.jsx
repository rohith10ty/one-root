import React from 'react';
import { WHY_CHOOSE_US } from '../data/plantsData';
import { Sprout, Truck, Recycle, UserCheck, ShieldCheck, Sparkles, Check } from 'lucide-react';

const iconMap = {
  Sprout,
  Truck,
  Recycle,
  UserCheck,
  ShieldCheck,
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-[#f8f9f6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100/80 px-3.5 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" /> The Verdant Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 tracking-tight">
            Why Choose Verdant Oasis
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            We bridge the gap between traditional nursery craftsmanship and modern climate-controlled delivery so your plants flourish on arrival.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon] || Sprout;

            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 hover:border-emerald-400 shadow-sm hover:shadow-botanical-lg transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-forest-50 text-forest-900 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-forest-950 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <Check className="w-3.5 h-3.5" />
                  <span>Standard on all orders</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Eco Packaging Detail Banner */}
        <div className="mt-14 rounded-3xl bg-emerald-900 text-white p-8 sm:p-10 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
              Zero-Waste Guarantee
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-2">
              Our 100% Biodegradable Unboxing Experience
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
              Every cardboard box, pulp protector, and tape strip dissolves harmlessly in your backyard compost within 90 days. We never use plastic air pillows or styrofoam pellets.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex items-center gap-4">
            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <span className="text-2xl font-serif font-bold text-white block">0%</span>
              <span className="text-[11px] text-emerald-200">Petroleum Plastic</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <span className="text-2xl font-serif font-bold text-emerald-300 block">100%</span>
              <span className="text-[11px] text-emerald-200">Compostable</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
