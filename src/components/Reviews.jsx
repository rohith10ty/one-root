import React, { useState, useEffect } from 'react';
import { REVIEWS } from '../data/plantsData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Heart } from 'lucide-react';

function WireArtAvatar({ index, isCurrent }) {
  const wireArts = [
    // Wire Art 1: Flowing botanical wire portrait
    (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1">
        <path d="M12 28C13 25 14 23 16 23C18 23 19 25 20 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 7C14 7 12 10 12 14C12 17 14 20 18 20C22 20 24 17 24 14C24 10 22 7 18 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 10V14L20 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 12H15.01M21 12H21.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 17Q18 18.5 20 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 8C25 9 27 12 26 15C25 18 23 17 21 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    // Wire Art 2: Geometric continuous-line silhouette with botanical motif
    (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1">
        <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
        <path d="M18 6C15 6 13 9 13 13C13 18 15 21 18 21C21 21 23 18 23 13C23 9 21 6 18 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 29C13 25 15 24 18 24C21 24 23 25 25 29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 12C16.5 13 16.5 15 18 16C19.5 15 19.5 13 18 12Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M18 6V3M15 4L18 3L21 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    // Wire Art 3: Minimalist continuous-line contour face
    (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1">
        <path d="M13 28C14 24 16 23 18 23C20 23 22 24 23 28M14 11C14 11 16 8 19 8C22 8 23 11 23 14C23 17 21 19 18 20C16 19 14 17 14 15V13C14 13 17 13 19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="13" r="1" fill="currentColor" />
        <path d="M22 10C24 11 25 13 24 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M13 16C12 18 11 21 11 25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    // Wire Art 4: Elegant single wire sculpture silhouette
    (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1">
        <path d="M10 28C11 24 14 23 18 23C22 23 25 24 26 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 15C15 15 16 18 18 18C20 18 21 15 21 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M18 8C14.5 8 13 10.5 13 14C13 17.5 15 21 18 21C21 21 23 17.5 23 14C23 10.5 21.5 8 18 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 12L17 12M19 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 13V15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    )
  ];

  const art = wireArts[index % wireArts.length];

  return (
    <div
      className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
        isCurrent
          ? 'bg-[#445D48] text-[#D6CC99] ring-2 ring-[#D6CC99]/70 shadow-sm'
          : 'bg-[#001524] text-[#D6CC99] ring-1 ring-[#445D48]/50 shadow-xs'
      }`}
      aria-hidden="true"
    >
      {art}
    </div>
  );
}

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
                  <WireArtAvatar index={idx} isCurrent={isCurrent} />
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
