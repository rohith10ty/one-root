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
    borderColor: 'border-amber-400/40',
    iconBg: 'bg-amber-100 text-amber-800',
    particleColors: ['#f59e0b', '#d97706', '#10b981', '#059669', '#78350f', '#fef3c7'],
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dry-palm',
    title: 'Overgrown Wild Spore',
    species: 'Invasive Greenhouse Moss',
    status: 'Excess Foliage',
    color: 'from-lime-900/20 to-forest-950/40',
    borderColor: 'border-lime-400/40',
    iconBg: 'bg-lime-100 text-lime-800',
    particleColors: ['#84cc16', '#65a30d', '#10b981', '#34d399', '#a3e635'],
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'wilted-stem',
    title: 'Spent Orchid Blossom',
    species: 'Phalaenopsis Petal',
    status: 'Post-Bloom Phase',
    color: 'from-rose-900/20 to-purple-950/40',
    borderColor: 'border-rose-400/40',
    iconBg: 'bg-rose-100 text-rose-800',
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

    // Trigger canvas particle disintegration physics
    await disintegrateElement(el, {
      particleCount: 180,
      duration: 1100,
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
    <section className="py-20 bg-forest-950 text-white relative overflow-hidden mesh-gradient-dark">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-300 bg-emerald-900/60 border border-emerald-500/30 px-3.5 py-1 rounded-full mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Advanced Particle Animation
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
              Botanical Pruning & Disintegration Studio
            </h2>
            <p className="mt-3 text-stone-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Experience our custom canvas particle disintegration engine. In natural organic permaculture, wilted leaves aren't wasted—they dissolve back into nutrient-rich soil spores. Click below to watch the live particle dispersal!
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-stone-400">Composted Spores</p>
                <p className="text-lg font-bold font-mono text-emerald-300">{compostCount} Elements</p>
              </div>
            </div>

            {disintegratedIds.length > 0 && (
              <button
                onClick={handleRegrowAll}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-emerald-600/30 transition-all cursor-pointer group"
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span>Regrow All</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {samples.map((sample) => {
            const isDisintegrated = disintegratedIds.includes(sample.id);

            return (
              <div
                key={sample.id}
                ref={(el) => (cardRefs.current[sample.id] = el)}
                className={`relative rounded-3xl p-6 border transition-all duration-300 ${
                  isDisintegrated
                    ? 'border-dashed border-emerald-800/50 bg-emerald-950/20 min-h-[320px] flex flex-col items-center justify-center text-center'
                    : `bg-gradient-to-b ${sample.color} ${sample.borderColor} shadow-2xl backdrop-blur-xl hover:border-emerald-400`
                }`}
              >
                {isDisintegrated ? (
                  <div className="animate-in fade-in zoom-in duration-500 p-6 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                      <Sparkles className="w-7 h-7 animate-spin" />
                    </div>
                    <h4 className="text-base font-serif font-bold text-emerald-200">
                      Disintegrated into Soil!
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 max-w-xs">
                      180 wind-borne particles returned to natural compost.
                    </p>
                    <button
                      onClick={() =>
                        setDisintegratedIds((prev) => prev.filter((id) => id !== sample.id))
                      }
                      className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      Regrow Leaf
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 border border-white/10">
                      <img
                        src={sample.image}
                        alt={sample.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent"></div>
                      <span className="absolute bottom-3 left-3 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-stone-300">
                        {sample.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] uppercase font-bold tracking-widest text-emerald-400 block mb-1">
                        {sample.species}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-white mb-2">
                        {sample.title}
                      </h3>
                      <p className="text-xs text-stone-300 leading-relaxed mb-6">
                        Click the pruning tool to trigger the canvas particle disintegration sequence with directional wind velocity.
                      </p>
                    </div>

                    <button
                      onClick={() => handleDisintegrate(sample)}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-white/15 hover:bg-emerald-600 border border-white/20 hover:border-emerald-500 text-white font-semibold text-sm transition-all duration-300 cursor-pointer shadow-lg group hover:scale-[1.02]"
                    >
                      <Scissors className="w-4 h-4 text-emerald-300 group-hover:rotate-45 transition-transform" />
                      <span>Prune & Disintegrate</span>
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Integration Callout */}
        <div className="mt-12 p-5 rounded-2xl bg-emerald-900/20 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/90">
          <div className="flex items-center gap-3 text-left">
            <Award className="w-6 h-6 text-emerald-400 shrink-0" />
            <span>
              <strong>Full Nursery Integration:</strong> This real-time particle disintegration effect is also active in your <strong>Shopping Cart</strong> and <strong>Wishlist</strong> drawers whenever you remove a plant!
            </span>
          </div>
          <span className="shrink-0 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px]">
            HTML5 Canvas + Physics
          </span>
        </div>

      </div>
    </section>
  );
}
