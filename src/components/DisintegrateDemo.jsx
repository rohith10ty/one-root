import React, { useState, useRef } from 'react';
import { disintegrateElement } from '../utils/disintegrate';
import { Scissors, Sparkles, RefreshCw, Wind, Award } from 'lucide-react';

const INITIAL_SAMPLES = [
  {
    id: 'diseased-leaf',
    title: 'Yellowed Bottom Leaf',
    species: 'Monstera Deliciosa',
    status: 'Ready for Pruning',
    color: 'from-amber-800/20 to-emerald-950/40',
    borderColor: 'border-amber-400/30',
    particleColors: ['#f59e0b', '#d97706', '#10b981', '#059669', '#78350f', '#fef3c7'],
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dry-palm',
    title: 'Overgrown Wild Spore',
    species: 'Invasive Greenhouse Moss',
    status: 'Excess Foliage',
    color: 'from-lime-900/20 to-forest-950/40',
    borderColor: 'border-lime-400/30',
    particleColors: ['#84cc16', '#65a30d', '#10b981', '#34d399', '#a3e635'],
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'wilted-stem',
    title: 'Spent Orchid Blossom',
    species: 'Phalaenopsis Petal',
    status: 'Post-Bloom Phase',
    color: 'from-rose-900/20 to-purple-950/40',
    borderColor: 'border-rose-400/30',
    particleColors: ['#f43f5e', '#fb7185', '#fda4af', '#10b981', '#e11d48'],
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=80',
  },
];

export default function DisintegrateDemo() {
  const samples = INITIAL_SAMPLES;
  const [disintegratedIds, setDisintegratedIds] = useState([]);
  const [compostCount, setCompostCount] = useState(0);
  const cardRefs = useRef({});

  const handleDisintegrate = async (sample) => {
    const el = cardRefs.current[sample.id];
    if (!el) return;

    await disintegrateElement(el, {
      particleCount: 140,
      duration: 950,
      direction: 'right',
      colors: sample.particleColors,
    });

    setDisintegratedIds((prev) => [...prev, sample.id]);
    setCompostCount((c) => c + 1);
  };

  const handleRegrowAll = () => {
    setDisintegratedIds([]);
  };

  return (
    <section className="py-12 sm:py-16 bg-forest-950 text-white relative overflow-hidden mesh-gradient-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-emerald-300 bg-emerald-900/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Particle Disintegration
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
              Botanical Pruner Studio
            </h2>
            <p className="mt-2 text-stone-300 max-w-xl text-xs sm:text-sm leading-relaxed">
              Watch our canvas disintegration engine dissolve wilted foliage into wind-blown spores that return to organic compost soil.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-stone-400">Composted Spores</p>
                <p className="text-sm font-bold font-mono text-emerald-300">{compostCount} Elements</p>
              </div>
            </div>

            {disintegratedIds.length > 0 && (
              <button
                onClick={handleRegrowAll}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all cursor-pointer group"
              >
                <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
                <span>Regrow All</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {samples.map((sample) => {
            const isDisintegrated = disintegratedIds.includes(sample.id);

            return (
              <div
                key={sample.id}
                ref={(el) => (cardRefs.current[sample.id] = el)}
                className={`relative rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
                  isDisintegrated
                    ? 'border-dashed border-emerald-800/50 bg-emerald-950/20 min-h-[260px] flex flex-col items-center justify-center text-center'
                    : `bg-gradient-to-b ${sample.color} ${sample.borderColor} shadow-md backdrop-blur-xl hover:border-emerald-400`
                }`}
              >
                {isDisintegrated ? (
                  <div className="animate-in fade-in zoom-in p-4 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                      <Sparkles className="w-5 h-5 animate-spin" />
                    </div>
                    <h4 className="text-sm font-serif font-bold text-emerald-200">
                      Disintegrated into Soil!
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-0.5 max-w-xs">
                      Wind-borne particles returned to natural compost.
                    </p>
                    <button
                      onClick={() =>
                        setDisintegratedIds((prev) => prev.filter((id) => id !== sample.id))
                      }
                      className="mt-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-white transition-colors cursor-pointer"
                    >
                      Regrow Leaf
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-white/10">
                      <img
                        src={sample.image}
                        alt={sample.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent"></div>
                      <span className="absolute bottom-2 left-2 text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-black/60 text-stone-300">
                        {sample.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-0.5">
                        {sample.species}
                      </span>
                      <h3 className="text-base font-serif font-bold text-white mb-1">
                        {sample.title}
                      </h3>
                      <p className="text-[11px] text-stone-300 leading-relaxed mb-4">
                        Click below to trigger the real-time canvas particle disintegration sequence.
                      </p>
                    </div>

                    <button
                      onClick={() => handleDisintegrate(sample)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/15 hover:bg-emerald-600 border border-white/20 hover:border-emerald-500 text-white font-semibold text-xs transition-all cursor-pointer group"
                    >
                      <Scissors className="w-3.5 h-3.5 text-emerald-300 group-hover:rotate-45 transition-transform" />
                      <span>Prune & Disintegrate</span>
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Integration Callout */}
        <div className="mt-8 p-3.5 rounded-xl bg-emerald-900/20 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-emerald-200/90">
          <div className="flex items-center gap-2 text-left">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px]">
              <strong>Note:</strong> This particle disintegration effect is also active in your <strong>Shopping Cart</strong> and <strong>Wishlist</strong> drawers when removing plants!
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
