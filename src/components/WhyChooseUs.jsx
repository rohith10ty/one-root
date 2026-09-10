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
    <section id="why-us" className="py-12 sm:py-16 bg-[#FDE5D4]/25 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-[#445D48] bg-[#445D48]/15 border border-[#445D48]/20 px-2.5 py-0.5 rounded-full mb-2">
            <Sparkles className="w-3 h-3 text-[#445D48]" /> The One Root Advantage
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#001524] tracking-tight">
            Why Choose One Root
          </h2>
          <p className="mt-2 text-[#001524]/75 text-xs sm:text-sm leading-relaxed">
            Craftsmanship meets climate-controlled delivery so your botanicals arrive thriving.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon] || Sprout;

            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-[#D6CC99]/50 hover:border-[#445D48] shadow-xs hover:shadow-botanical transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#445D48]/10 text-[#445D48] group-hover:bg-[#445D48] group-hover:text-[#FDE5D4] flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D6CC99]/40 text-[#001524]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-serif font-bold text-[#001524] group-hover:text-[#445D48] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#001524]/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D6CC99]/20 flex items-center gap-1 text-[11px] font-semibold text-[#445D48]">
                  <Check className="w-3 h-3" />
                  <span>Standard on orders</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Eco Packaging Detail Banner */}
        <div className="mt-10 rounded-2xl bg-[#001524] text-[#FDE5D4] p-5 sm:p-7 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-5 shadow-lg border border-[#D6CC99]/30">
          <div className="relative z-10 max-w-xl text-left">
            <span className="text-[10.5px] uppercase font-bold tracking-wider text-[#D6CC99]">
              Zero-Waste Guarantee
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-bold mt-1 text-[#FDE5D4]">
              100% Biodegradable Unboxing Experience
            </h3>
            <p className="text-xs text-[#FDE5D4]/80 mt-1.5 leading-relaxed">
              Every box, pot protector, and tape strip dissolves harmlessly in backyard compost within 90 days. We never use plastic bubble wrap or styrofoam.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-[#445D48]/30 backdrop-blur-md border border-[#D6CC99]/30 text-center">
              <span className="text-lg font-serif font-bold text-[#FDE5D4] block">0%</span>
              <span className="text-[10px] text-[#D6CC99]">Petroleum Plastic</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#445D48]/30 backdrop-blur-md border border-[#D6CC99]/30 text-center">
              <span className="text-lg font-serif font-bold text-[#D6CC99] block">100%</span>
              <span className="text-[10px] text-[#D6CC99]">Compostable</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
