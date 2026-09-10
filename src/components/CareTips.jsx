import React, { useState } from 'react';
import { CARE_TIPS, PLANT_SYMPTOMS } from '../data/plantsData';
import { 
  Droplets, 
  SunMedium, 
  Layers, 
  Scissors, 
  BookOpen, 
  ChevronRight, 
  Check, 
  Activity, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';

const iconMap = {
  Droplets,
  SunMedium,
  Layers,
  Scissors,
};

export default function CareTips() {
  const [activeTip, setActiveTip] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState(PLANT_SYMPTOMS[0]);

  return (
    <section id="care-tips" className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-[#445D48] bg-[#445D48]/15 border border-[#445D48]/20 px-2.5 py-0.5 rounded-full mb-2">
            <BookOpen className="w-3 h-3 text-[#445D48]" /> Horticultural Wisdom
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#001524] tracking-tight">
            Essential Plant Care Guides
          </h2>
          <p className="mt-2 text-[#001524]/75 text-xs sm:text-sm leading-relaxed">
            Techniques for hydration, light, aeration, and grooming.
          </p>
        </div>

        {/* 4 Care Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARE_TIPS.map((tip) => {
            const Icon = iconMap[tip.icon] || Droplets;

            return (
              <div
                key={tip.id}
                className="group relative bg-[#FDE5D4]/25 hover:bg-white rounded-2xl p-4 sm:p-5 border border-[#D6CC99]/40 hover:border-[#445D48] shadow-xs hover:shadow-botanical transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#445D48]/15 text-[#445D48] flex items-center justify-center group-hover:bg-[#001524] group-hover:text-[#D6CC99] transition-colors shadow-xs">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[10px] font-medium text-[#001524]/60">
                      {tip.readTime}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#445D48] block mb-0.5">
                    {tip.category}
                  </span>

                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#001524] group-hover:text-[#445D48] transition-colors">
                    {tip.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#001524]/75 leading-relaxed line-clamp-2">
                    {tip.summary}
                  </p>

                  <div className="mt-3 space-y-1.5">
                    {tip.tips.slice(0, 2).map((t, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#001524]/80">
                        <Check className="w-3 h-3 text-[#445D48] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D6CC99]/30">
                  <button
                    onClick={() => setActiveTip(tip)}
                    className="w-full flex items-center justify-between text-[11px] font-bold text-[#001524] group-hover:text-[#445D48] transition-colors cursor-pointer"
                  >
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive "Doctor Plant" Symptom Checker Widget */}
        <div className="mt-12 rounded-3xl bg-[#001524] text-[#FDE5D4] p-5 sm:p-7 border border-[#D6CC99]/30 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Intro & Symptom Picker */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 text-[10.5px] uppercase font-bold tracking-wider text-[#D6CC99] bg-[#445D48]/40 border border-[#D6CC99]/20 px-2.5 py-0.5 rounded-full mb-2">
                <Activity className="w-3 h-3 text-[#D6CC99]" /> Interactive Clinic
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FDE5D4] tracking-tight">
                Plant Symptom Checker
              </h3>
              <p className="text-xs text-[#D6CC99]/80 mt-1 leading-relaxed">
                Select a symptom below for an instant botanical diagnosis and remedy.
              </p>

              {/* Symptom selector buttons */}
              <div className="mt-4 flex flex-col gap-1.5">
                {PLANT_SYMPTOMS.map((sym) => (
                  <button
                    key={sym.id}
                    onClick={() => setSelectedSymptom(sym)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs text-left transition-all cursor-pointer font-medium ${
                      selectedSymptom.id === sym.id
                        ? 'bg-[#445D48] text-[#FDE5D4] border border-[#D6CC99]/40 shadow-xs'
                        : 'bg-white/10 hover:bg-white/15 text-[#FDE5D4]/80 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-3.5 h-3.5 ${selectedSymptom.id === sym.id ? 'text-[#D6CC99]' : 'text-[#D6CC99]/70'}`} />
                      <span>{sym.symptom}</span>
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-black/40 text-[#D6CC99]">
                      {sym.severity}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Diagnosis & Treatment Card */}
            <div className="lg:col-span-7">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#D6CC99]/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6CC99]">
                  Botanical Diagnosis
                </span>
                
                <h4 className="text-lg sm:text-xl font-serif font-bold text-[#FDE5D4] mt-1">
                  {selectedSymptom.symptom}
                </h4>

                <div className="mt-3 space-y-2.5">
                  <div className="p-3 rounded-xl bg-black/25 border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-[#D6CC99] block mb-0.5">
                      Root Cause:
                    </span>
                    <p className="text-xs text-[#FDE5D4]/85 leading-relaxed">
                      {selectedSymptom.cause}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#445D48]/35 border border-[#D6CC99]/30">
                    <span className="text-[10px] font-bold uppercase text-[#D6CC99] block mb-0.5">
                      Remedy:
                    </span>
                    <p className="text-xs text-[#FDE5D4] leading-relaxed">
                      {selectedSymptom.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-[#D6CC99]/80">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D6CC99]" /> Need 1-on-1 advice?
                  </span>
                  <a
                    href="#contact"
                    className="font-bold text-[#D6CC99] hover:text-[#FDE5D4] underline underline-offset-2"
                  >
                    Ask our team →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal for Full Article View */}
        {activeTip && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001524]/80 backdrop-blur-md animate-in fade-in"
            onClick={() => setActiveTip(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-[#D6CC99]/40 relative animate-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#445D48]">
                {activeTip.category}
              </span>
              <h3 className="text-xl font-serif font-bold text-[#001524] mt-0.5">
                {activeTip.title}
              </h3>

              <div className="mt-3 text-xs text-[#001524]/80 leading-relaxed space-y-2.5">
                <p>{activeTip.details}</p>
                
                <h4 className="text-[11px] font-bold uppercase text-[#001524] tracking-wider pt-1">
                  Guidelines:
                </h4>
                <ul className="space-y-1.5">
                  {activeTip.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-[#001524]/85">
                      <Check className="w-3.5 h-3.5 text-[#445D48] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-[#D6CC99]/30 flex justify-end">
                <button
                  onClick={() => setActiveTip(null)}
                  className="px-4 py-2 rounded-xl bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
