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
    <section id="reviews" className="py-12 sm:py-16 bg-[#FDE5D4]/25 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider text-[#445D48] bg-[#445D48]/15 border border-[#445D48]/20 px-2.5 py-0.5 rounded-full mb-2">
              <Heart className="w-3 h-3 fill-[#445D48] text-[#445D48]" /> Plant Parent Stories
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#001524] tracking-tight">
              Loved by Over 45,000 Homes
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-[#D6CC99]/70 bg-white hover:bg-[#FDE5D4] hover:border-[#445D48] text-[#001524] flex items-center justify-center transition-all cursor-pointer shadow-xs"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-[#D6CC99]/70 bg-white hover:bg-[#FDE5D4] hover:border-[#445D48] text-[#001524] flex items-center justify-center transition-all cursor-pointer shadow-xs"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Testimonials Showcase */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {REVIEWS.map((review, idx) => {
            const isCurrent = idx === currentIndex;

            return (
              <div
                key={review.id}
                className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#001524] text-[#FDE5D4] border-[#D6CC99]/40 shadow-lg scale-101'
                    : 'bg-white text-[#001524] border-[#D6CC99]/40 shadow-xs hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Rating Stars & Quote */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#D6CC99] text-[#D6CC99]"
                        />
                      ))}
                    </div>
                    <Quote
                      className={`w-5 h-5 ${
                        isCurrent ? 'text-[#D6CC99]/40' : 'text-[#D6CC99]/50'
                      }`}
                    />
                  </div>

                  <h3
                    className={`font-serif font-bold text-sm sm:text-base mb-1.5 ${
                      isCurrent ? 'text-[#D6CC99]' : 'text-[#001524]'
                    }`}
                  >
                    "{review.title}"
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      isCurrent ? 'text-[#FDE5D4]/85' : 'text-[#001524]/75'
                    }`}
                  >
                    {review.review}
                  </p>

                  <div className="mt-3 inline-block">
                    <span
                      className={`text-[10.5px] font-medium px-2 py-0.5 rounded-full ${
                        isCurrent
                          ? 'bg-[#445D48]/50 text-[#D6CC99] border border-[#D6CC99]/30'
                          : 'bg-[#FDE5D4] text-[#001524] border border-[#D6CC99]/50'
                      }`}
                    >
                      🌿 {review.plant}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div
                  className={`mt-4 pt-3 border-t flex items-center gap-2.5 ${
                    isCurrent ? 'border-white/15' : 'border-[#D6CC99]/30'
                  }`}
                >
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-[#D6CC99]/40"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4
                        className={`text-xs font-bold ${
                          isCurrent ? 'text-[#FDE5D4]' : 'text-[#001524]'
                        }`}
                      >
                        {review.name}
                      </h4>
                      <CheckCircle2 className="w-3 h-3 text-[#445D48]" />
                    </div>
                    <p
                      className={`text-[10.5px] ${
                        isCurrent ? 'text-[#D6CC99]/70' : 'text-[#001524]/60'
                      }`}
                    >
                      {review.location}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Carousel indicators */}
        <div className="mt-6 flex justify-center gap-1.5">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? 'w-6 bg-[#445D48]' : 'w-1.5 bg-[#D6CC99] hover:bg-[#445D48]'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
