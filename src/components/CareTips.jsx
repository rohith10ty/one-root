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
    <section id="care-tips" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100/80 px-3.5 py-1 rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Horticultural Wisdom
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 tracking-tight">
            Essential Plant Care Guides
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Nurture lush, vibrant leaves with master botanist techniques for light, hydration, soil biology, and seasonal maintenance.
          </p>
        </div>

        {/* 4 Care Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARE_TIPS.map((tip) => {
            const Icon = iconMap[tip.icon] || Droplets;

            return (
              <div
                key={tip.id}
                className="group relative bg-[#fafaf7] hover:bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 hover:border-emerald-400 shadow-sm hover:shadow-botanical-lg transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-forest-900 group-hover:text-emerald-300 transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-medium text-stone-400">
                      {tip.readTime}
                    </span>
                  </div>

                  <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-700 block mb-1">
                    {tip.category}
                  </span>

                  <h3 className="text-xl font-serif font-bold text-forest-950 group-hover:text-emerald-700 transition-colors">
                    {tip.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {tip.summary}
                  </p>

                  <div className="mt-4 space-y-2">
                    {tip.tips.slice(0, 2).map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/60">
                  <button
                    onClick={() => setActiveTip(tip)}
                    className="w-full flex items-center justify-between text-xs font-bold text-forest-900 group-hover:text-emerald-700 transition-colors cursor-pointer py-1"
                  >
                    <span>Read Full Guide</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive "Doctor Plant" Symptom Checker Widget */}
        <div className="mt-16 rounded-[2.5rem] bg-forest-950 text-white p-6 sm:p-10 border border-emerald-500/20 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Intro & Symptom Picker */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-900/60 px-3.5 py-1 rounded-full mb-3 backdrop-blur-sm">
                <Activity className="w-3.5 h-3.5 text-emerald-300" /> Interactive Plant Clinic
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Plant Symptom Checker
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                Is your houseplant showing distress? Select a symptom below for an instant botanical diagnosis and recovery prescription.
              </p>

              {/* Symptom selector buttons */}
              <div className="mt-6 flex flex-col gap-2">
                {PLANT_SYMPTOMS.map((sym) => (
                  <button
                    key={sym.id}
                    onClick={() => setSelectedSymptom(sym)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl text-xs sm:text-sm text-left transition-all cursor-pointer font-medium ${
                      selectedSymptom.id === sym.id
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white/10 hover:bg-white/15 text-stone-200 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className={`w-4 h-4 ${selectedSymptom.id === sym.id ? 'text-amber-300' : 'text-amber-400'}`} />
                      <span>{sym.symptom}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/30">
                      {sym.severity}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Diagnosis & Treatment Card */}
            <div className="lg:col-span-7">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/15 shadow-inner">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Botanical Diagnosis
                </span>
                
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mt-2 flex items-center gap-2">
                  <span>{selectedSymptom.symptom}</span>
                </h4>

                <div className="mt-5 space-y-4">
                  <div className="p-4 rounded-2xl bg-black/20 border border-white/10">
                    <span className="text-[11px] font-bold uppercase text-amber-300 block mb-1">
                      Root Cause:
                    </span>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                      {selectedSymptom.cause}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30">
                    <span className="text-[11px] font-bold uppercase text-emerald-400 block mb-1">
                      Prescription Remedy:
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                      {selectedSymptom.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10 text-xs text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Need 1-on-1 advice?
                  </span>
                  <a
                    href="#contact"
                    className="font-bold text-emerald-300 hover:text-white underline underline-offset-4"
                  >
                    Ask our Horticulturalist Team →
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
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-700">
                {activeTip.category}
              </span>
              <h3 className="text-2xl font-serif font-bold text-forest-950 mt-1">
                {activeTip.title}
              </h3>

              <div className="mt-4 text-sm text-stone-600 leading-relaxed space-y-3">
                <p>{activeTip.details}</p>
                
                <h4 className="text-xs font-bold uppercase text-forest-900 tracking-wider pt-2">
                  Master Guidelines:
                </h4>
                <ul className="space-y-2">
                  {activeTip.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setActiveTip(null)}
                  className="px-5 py-2.5 rounded-xl bg-forest-900 text-white font-semibold text-xs hover:bg-forest-800 transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
