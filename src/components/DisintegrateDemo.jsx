import React, { useState, useRef } from 'react';
import { disintegrateElement } from '../utils/disintegrate';
import { Scissors, Sparkles, RefreshCw, Wind, Award } from 'lucide-react';

const INITIAL_SAMPLES = [
  {
    id: 'diseased-leaf',
    title: 'Yellowed Bottom Leaf',
    species: 'Monstera Deliciosa',
    status: 'Ready for Pruning',
    color: 'from-[#445D48]/30 to-[#001524]/60',
    borderColor: 'border-[#D6CC99]/30',
    particleColors: ['#D6CC99', '#445D48', '#FDE5D4', '#001524', '#7a967f'],
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dry-palm',
    title: 'Overgrown Wild Spore',
    species: 'Invasive Greenhouse Moss',
    status: 'Excess Foliage',
    color: 'from-[#445D48]/40 to-[#001524]/70',
    borderColor: 'border-[#D6CC99]/30',
    particleColors: ['#445D48', '#D6CC99', '#7a967f', '#a3b6a6', '#FDE5D4'],
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'wilted-stem',
    title: 'Spent Orchid Blossom',
    species: 'Phalaenopsis Petal',
    status: 'Post-Bloom Phase',
    color: 'from-[#445D48]/25 to-[#001524]/60',
    borderColor: 'border-[#D6CC99]/30',
    particleColors: ['#FDE5D4', '#D6CC99', '#445D48', '#001524'],
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
    <section className="py-12 sm:py-16 bg-[#001524] text-[#FDE5D4] relative overflow-hidden mesh-gradient-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-[#D6CC99] bg-[#445D48]/40 border border-[#D6CC99]/30 px-2.5 py-0.5 rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-[#D6CC99]" /> Particle Disintegration
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#FDE5D4]">
              Botanical Pruner Studio
            </h2>
            <p className="mt-2 text-[#D6CC99]/80 max-w-xl text-xs sm:text-sm leading-relaxed">
              Watch our canvas disintegration engine dissolve wilted foliage into wind-blown spores that return to organic compost soil.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#FDE5D4]/10 backdrop-blur-md border border-[#D6CC99]/20 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#445D48]/40 text-[#D6CC99] flex items-center justify-center">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#D6CC99]/70">Composted Spores</p>
                <p className="text-sm font-bold font-mono text-[#FDE5D4]">{compostCount} Elements</p>
              </div>
            </div>

            {disintegratedIds.length > 0 && (
              <button
                onClick={handleRegrowAll}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#445D48] hover:bg-[#D6CC99] hover:text-[#001524] text-[#FDE5D4] font-semibold text-xs transition-all cursor-pointer group"
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
                    ? 'border-dashed border-[#445D48] bg-[#445D48]/15 min-h-[260px] flex flex-col items-center justify-center text-center'
                    : `bg-gradient-to-b ${sample.color} ${sample.borderColor} shadow-md backdrop-blur-xl hover:border-[#D6CC99]`
                }`}
              >
                {isDisintegrated ? (
                  <div className="animate-in fade-in zoom-in p-4 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#445D48]/30 text-[#D6CC99] flex items-center justify-center mb-2">
                      <Sparkles className="w-5 h-5 animate-spin" />
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#FDE5D4]">
                      Disintegrated into Soil!
                    </h4>
                    <p className="text-[11px] text-[#D6CC99]/70 mt-0.5 max-w-xs">
                      Wind-borne particles returned to natural compost.
                    </p>
                    <button
                      onClick={() =>
                        setDisintegratedIds((prev) => prev.filter((id) => id !== sample.id))
                      }
                      className="mt-3 px-3 py-1.5 rounded-lg bg-[#FDE5D4]/15 hover:bg-[#FDE5D4]/25 text-[11px] font-semibold text-[#FDE5D4] transition-colors cursor-pointer"
                    >
                      Regrow Leaf
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-[#D6CC99]/20">
                      <img
                        src={sample.image}
                        alt={sample.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001524]/80 via-transparent to-transparent"></div>
                      <span className="absolute bottom-2 left-2 text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-[#001524]/80 text-[#D6CC99]">
                        {sample.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#D6CC99] block mb-0.5">
                        {sample.species}
                      </span>
                      <h3 className="text-base font-serif font-bold text-[#FDE5D4] mb-1">
                        {sample.title}
                      </h3>
                      <p className="text-[11px] text-[#D6CC99]/80 leading-relaxed mb-4">
                        Click below to trigger the real-time canvas particle disintegration sequence.
                      </p>
                    </div>

                    <button
                      onClick={() => handleDisintegrate(sample)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#445D48] hover:bg-[#D6CC99] hover:text-[#001524] border border-[#D6CC99]/30 text-[#FDE5D4] font-semibold text-xs transition-all cursor-pointer group"
                    >
                      <Scissors className="w-3.5 h-3.5 text-[#D6CC99] group-hover:text-[#001524] group-hover:rotate-45 transition-transform" />
                      <span>Prune & Disintegrate</span>
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Integration Callout */}
        <div className="mt-8 p-3.5 rounded-xl bg-[#445D48]/20 border border-[#D6CC99]/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#D6CC99]">
          <div className="flex items-center gap-2 text-left">
            <Award className="w-4 h-4 text-[#D6CC99] shrink-0" />
            <span className="text-[11px]">
              <strong>Note:</strong> This particle disintegration effect is also active in your <strong>Shopping Cart</strong> and <strong>Wishlist</strong> drawers when removing plants!
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
