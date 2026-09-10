import React, { useState, useEffect } from 'react';
import { REVIEWS } from '../data/plantsData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Heart } from 'lucide-react';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  return (
    <section id="reviews" className="py-24 bg-[#fafaf7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100/80 px-3.5 py-1 rounded-full mb-3">
              <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" /> Plant Parent Stories
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 tracking-tight">
              Loved by Over 45,000 Homes
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-stone-300 bg-white hover:bg-emerald-50 hover:border-emerald-400 text-forest-900 flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-stone-300 bg-white hover:bg-emerald-50 hover:border-emerald-400 text-forest-900 flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonials Showcase */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {REVIEWS.map((review, idx) => {
            const isCurrent = idx === currentIndex;

            return (
              <div
                key={review.id}
                className={`rounded-3xl p-7 border transition-all duration-500 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-forest-900 text-white border-forest-800 shadow-2xl scale-102 lg:-translate-y-2'
                    : 'bg-white text-forest-950 border-stone-200/90 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Rating Stars & Quote */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <Quote
                      className={`w-6 h-6 ${
                        isCurrent ? 'text-emerald-400/40' : 'text-stone-300'
                      }`}
                    />
                  </div>

                  <h3
                    className={`font-serif font-bold text-lg mb-2 ${
                      isCurrent ? 'text-emerald-200' : 'text-forest-950'
                    }`}
                  >
                    "{review.title}"
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isCurrent ? 'text-stone-200/90' : 'text-stone-600'
                    }`}
                  >
                    {review.review}
                  </p>

                  <div className="mt-4 inline-block">
                    <span
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                        isCurrent
                          ? 'bg-white/15 text-emerald-300'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                      }`}
                    >
                      🌿 Adopted: {review.plant}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div
                  className={`mt-6 pt-5 border-t flex items-center gap-3.5 ${
                    isCurrent ? 'border-white/15' : 'border-stone-100'
                  }`}
                >
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/40"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4
                        className={`text-sm font-bold ${
                          isCurrent ? 'text-white' : 'text-forest-950'
                        }`}
                      >
                        {review.name}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" title="Verified Plant Parent" />
                    </div>
                    <p
                      className={`text-xs ${
                        isCurrent ? 'text-stone-400' : 'text-stone-500'
                      }`}
                    >
                      {review.location} · {review.date}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Carousel indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? 'w-8 bg-emerald-600' : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
