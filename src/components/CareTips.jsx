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
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full mb-2">
            <BookOpen className="w-3 h-3" /> Horticultural Wisdom
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 tracking-tight">
            Essential Plant Care Guides
          </h2>
          <p className="mt-2 text-stone-500 text-xs sm:text-sm leading-relaxed">
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
                className="group relative bg-[#fafaf7] hover:bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 hover:border-emerald-400 shadow-xs hover:shadow-botanical transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-forest-900 group-hover:text-emerald-300 transition-colors shadow-xs">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[10px] font-medium text-stone-400">
                      {tip.readTime}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 block mb-0.5">
                    {tip.category}
                  </span>

                  <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950 group-hover:text-emerald-700 transition-colors">
                    {tip.title}
                  </h3>

                  <p className="mt-2 text-xs text-stone-500 leading-relaxed line-clamp-2">
                    {tip.summary}
                  </p>

                  <div className="mt-3 space-y-1.5">
                    {tip.tips.slice(0, 2).map((t, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-stone-700">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/60">
                  <button
                    onClick={() => setActiveTip(tip)}
                    className="w-full flex items-center justify-between text-[11px] font-bold text-forest-900 group-hover:text-emerald-700 transition-colors cursor-pointer"
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
        <div className="mt-12 rounded-3xl bg-forest-950 text-white p-5 sm:p-7 border border-emerald-500/20 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Intro & Symptom Picker */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 text-[10.5px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-900/60 px-2.5 py-0.5 rounded-full mb-2">
                <Activity className="w-3 h-3 text-emerald-300" /> Interactive Clinic
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Plant Symptom Checker
              </h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
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
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white/10 hover:bg-white/15 text-stone-200 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-3.5 h-3.5 ${selectedSymptom.id === sym.id ? 'text-amber-300' : 'text-amber-400'}`} />
                      <span>{sym.symptom}</span>
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-black/30">
                      {sym.severity}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Diagnosis & Treatment Card */}
            <div className="lg:col-span-7">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/15">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Botanical Diagnosis
                </span>
                
                <h4 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                  {selectedSymptom.symptom}
                </h4>

                <div className="mt-3 space-y-2.5">
                  <div className="p-3 rounded-xl bg-black/20 border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-amber-300 block mb-0.5">
                      Root Cause:
                    </span>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      {selectedSymptom.cause}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-0.5">
                      Remedy:
                    </span>
                    <p className="text-xs text-emerald-100 leading-relaxed">
                      {selectedSymptom.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-stone-300">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" /> Need 1-on-1 advice?
                  </span>
                  <a
                    href="#contact"
                    className="font-bold text-emerald-300 hover:text-white underline underline-offset-2"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-md animate-in fade-in"
            onClick={() => setActiveTip(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-stone-200 relative animate-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">
                {activeTip.category}
              </span>
              <h3 className="text-xl font-serif font-bold text-forest-950 mt-0.5">
                {activeTip.title}
              </h3>

              <div className="mt-3 text-xs text-stone-600 leading-relaxed space-y-2.5">
                <p>{activeTip.details}</p>
                
                <h4 className="text-[11px] font-bold uppercase text-forest-900 tracking-wider pt-1">
                  Guidelines:
                </h4>
                <ul className="space-y-1.5">
                  {activeTip.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setActiveTip(null)}
                  className="px-4 py-2 rounded-xl bg-forest-900 text-white font-semibold text-xs hover:bg-forest-800 transition-colors cursor-pointer"
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
