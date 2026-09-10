import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Sprout } from 'lucide-react';
import heroImg from '../assets/hero-img.jpg';

export default function Hero() {
  const containerRef = useRef(null);

  const scrollToPlants = () => {
    const el = document.getElementById('plants-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCare = () => {
    const el = document.getElementById('care-tips');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Split characters for hero card title
      const cardTitle = document.querySelector('.hero-reveal-card .card-title-text');
      if (cardTitle) {
        const text = cardTitle.textContent.trim();
        cardTitle.innerHTML = text
          .split('')
          .map((char) => {
            if (char === ' ') return '<span class="name-space">&nbsp;</span>';
            return `<span class="char"><span style="display:inline-block; transform:translateY(105%); will-change:transform;">${char}</span></span>`;
          })
          .join('');
      }

      // Initial States
      gsap.set(['.preloader .intro-title .char span', '.split-overlay .intro-title .char span'], {
        y: '0%',
      });

      gsap.set('.tag .word', {
        y: '0%',
      });

      gsap.set('.scroll-prompt', {
        opacity: 0.85,
      });

      gsap.set('.hero-container-reveal', {
        clipPath: 'polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)',
      });

      gsap.set('.hero-reveal-card', {
        clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
      });

      gsap.set('.preloader', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: '0%',
      });

      gsap.set('.split-overlay', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: '0%',
      });

      // Master ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: '.hero-pinned-wrapper',
          anticipatePin: 1,
        },
        defaults: { ease: 'power1.inOut' },
      });

      // 1. Scroll prompt fades out
      tl.to(
        '.scroll-prompt',
        {
          opacity: 0,
          duration: 0.3,
        },
        0
      );

      // 2. Letters dissolve: "NE" and "OOT" slide down into mask
      tl.to(
        ['.preloader .intro-title .rest .char span', '.split-overlay .intro-title .rest .char span'],
        {
          y: '105%',
          duration: 0.9,
          stagger: 0.04,
        },
        0.1
      );

      // 3. Initials "O" and "R" smoothly move together into bold "OR" monogram
      tl.to(
        ['.preloader .intro-title .rest', '.split-overlay .intro-title .rest'],
        {
          width: 0,
          opacity: 0,
          duration: 1.2,
        },
        0.8
      )
        .to(
          ['.preloader .intro-title .name-space', '.split-overlay .intro-title .name-space'],
          {
            width: 0,
            opacity: 0,
            duration: 1.2,
          },
          0.8
        )
        .to(
          ['.preloader .intro-title .initial', '.split-overlay .intro-title .initial'],
          {
            scale: 1.35,
            duration: 1.2,
            color: '#D6CC99',
          },
          0.8
        );

      // 4. Tags slide down and exit
      tl.to(
        '.tag .word',
        {
          y: '105%',
          duration: 0.7,
          stagger: 0.03,
        },
        1.5
      );

      // 5. Set split clip-paths for preloader (top half) & split-overlay (bottom half)
      tl.to(
        '.preloader',
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)',
          duration: 0.05,
        },
        2.1
      ).to(
        '.split-overlay',
        {
          clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)',
          duration: 0.05,
        },
        2.1
      );

      // 6. Split Curtain Reveal: Preloader slides UP, split-overlay slides DOWN, container opens
      tl.to(
        '.preloader',
        {
          y: '-100%',
          duration: 1.4,
        },
        2.2
      )
        .to(
          '.split-overlay',
          {
            y: '100%',
            duration: 1.4,
          },
          2.2
        )
        .to(
          '.hero-container-reveal',
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.4,
          },
          2.2
        );

      // 7. Hero card expand and title character reveal
      tl.to(
        '.hero-reveal-card',
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.0,
        },
        3.0
      ).to(
        '.hero-reveal-card .char span',
        {
          y: '0%',
          duration: 0.8,
          stagger: 0.04,
        },
        3.4
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative w-full">
      {/* Scroll Container for Pinned Hero Animation */}
      <div className="hero-scroll-container relative w-full h-[320vh]">
        <div className="hero-pinned-wrapper sticky top-0 w-full h-screen overflow-hidden bg-[#001524]">
          
          {/* 1. Preloader Screen (Top Split Half) */}
          <div className="preloader absolute inset-0 z-30 bg-[#001524] text-[#FDE5D4] pointer-events-none will-change-[clip-path,transform]">
            <div className="intro-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full flex justify-center items-center pointer-events-none px-4">
              <h1 className="inline-flex justify-center items-baseline text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold tracking-tight text-[#FDE5D4] whitespace-nowrap">
                {/* Word 1: ONE */}
                <span className="name-word inline-flex items-baseline">
                  <span className="char initial inline-block overflow-hidden leading-tight">
                    <span className="inline-block text-[#D6CC99]">O</span>
                  </span>
                  <span className="rest inline-flex items-baseline overflow-hidden whitespace-nowrap">
                    <span className="char inline-block overflow-hidden leading-tight"><span className="inline-block">N</span></span>
                    <span className="char inline-block overflow-hidden leading-tight"><span className="inline-block">E</span></span>
                  </span>
                </span>

                <span className="name-space inline-block w-[0.35em] overflow-hidden whitespace-pre">&nbsp;</span>

                {/* Word 2: ROOT */}
                <span className="name-word inline-flex items-baseline">
                  <span className="char initial inline-block overflow-hidden leading-tight">
                    <span className="inline-block text-[#D6CC99]">R</span>
                  </span>
                  <span className="rest inline-flex items-baseline overflow-hidden whitespace-nowrap">
                    <span className="char inline-block overflow-hidden leading-tight"><span className="inline-block">O</span></span>
                    <span className="char inline-block overflow-hidden leading-tight"><span className="inline-block">O</span></span>
                    <span className="char inline-block overflow-hidden leading-tight"><span className="inline-block">T</span></span>
                  </span>
                </span>
              </h1>
            </div>

            {/* Scroll prompt */}
            <div className="scroll-prompt absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
              <p className="font-mono text-xs uppercase tracking-widest text-[#D6CC99] flex items-center gap-2">
                <span>Scroll to Enter Sanctuary</span>
                <span className="animate-bounce">↓</span>
              </p>
            </div>
          </div>

          {/* 2. Split Overlay Screen (Bottom Split Half) */}
          <div className="split-overlay absolute inset-0 z-20 bg-[#001524] text-[#FDE5D4] pointer-events-none will-change-[clip-path,transform]">
            <div className="intro-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full flex justify-center items-center pointer-events-none px-4">
              <h1 className="inline-flex justify-center items-baseline text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold tracking-tight text-[#FDE5D4] whitespace-nowrap">
                <span className="name-word inline-flex items-baseline">
                  <span className="char initial inline-block overflow-hidden leading-tight">
                    <span className="inline-block text-[#D6CC99]">O</span>
                  </span>
                  <span className="rest inline-flex items-baseline overflow-hidden whitespace-nowrap">
                    <span className="char inline-block overflow-hidden leading-tight"><span className="inline-block">N</span></span>
                    <span className="char inline-block overflow-hidden leading-tight"><span className="inline-block">E</span></span>
                  </span>
                </span>

                <span className="name-space inline-block w-[0.35em] overflow-hidden whitespace-pre">&nbsp;</span>

                <span className="name-word inline-flex items-baseline">
                  <span className="char initial inline-block overflow-hidden leading-tight">
                    <span className="inline-block text-[#D6CC99]">R</span>
                  </span>
                  <span className="rest inline-flex items-baseline overflow-hidden whitespace-nowrap">
                    <span className="char inline-block overflow-hidden leading-tight"><span className="inline-block">O</span></span>
                    <span className="char inline-block overflow-hidden leading-tight"><span className="inline-block">O</span></span>
                    <span className="char inline-block overflow-hidden leading-tight"><span className="inline-block">T</span></span>
                  </span>
                </span>
              </h1>
            </div>
          </div>

          {/* 3. Tags Overlay */}
          <div className="tags-overlay absolute inset-0 z-40 pointer-events-none text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#D6CC99]">
            <div className="tag absolute top-[12%] left-[8%] overflow-hidden">
              <p className="flex gap-1.5">
                <span className="word inline-block">Living</span>
                <span className="word inline-block">Botanical</span>
                <span className="word inline-block text-[#FDE5D4]">Sanctuary</span>
              </p>
            </div>
            <div className="tag absolute bottom-[12%] left-[8%] overflow-hidden">
              <p className="flex gap-1.5">
                <span className="word inline-block">100%</span>
                <span className="word inline-block">Organically</span>
                <span className="word inline-block text-[#FDE5D4]">Raised</span>
              </p>
            </div>
            <div className="tag absolute bottom-[12%] right-[8%] overflow-hidden">
              <p className="flex gap-1.5">
                <span className="word inline-block">Rooted</span>
                <span className="word inline-block text-[#FDE5D4]">Since 2014</span>
              </p>
            </div>
          </div>

          {/* 4. Revealed Hero Container */}
          <div className="hero-container-reveal absolute inset-0 z-10 flex flex-col justify-between w-full h-full bg-[#001524] text-[#FDE5D4] will-change-[clip-path]">
            
            {/* Background Botanical Image with dark tint */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={heroImg}
                alt="One Root Sanctuary"
                className="w-full h-full object-cover brightness-[0.55] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#001524]/60 via-transparent to-[#001524]/90"></div>
            </div>

            {/* Top Bar inside Reveal */}
            <div className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-6 border-b border-[#D6CC99]/20 backdrop-blur-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#445D48] flex items-center justify-center text-[#FDE5D4] font-bold">
                  <Sprout className="w-4 h-4 text-[#D6CC99]" />
                </div>
                <span className="text-sm sm:text-base font-serif font-bold tracking-tight text-[#FDE5D4]">
                  One<span className="text-[#D6CC99] font-sans font-light">Root</span>
                </span>
              </div>
              <span className="text-[11px] font-mono tracking-widest text-[#D6CC99] uppercase">
                Botanical Sanctuary
              </span>
            </div>

            {/* Center Expanded Hero Card */}
            <div className="hero-reveal-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[92%] sm:w-[80%] md:w-[68%] lg:w-[54%] max-w-2xl bg-[#FDE5D4] text-[#001524] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-[#D6CC99] will-change-[clip-path]">
              
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#445D48]/15 border border-[#445D48]/30 mb-3 text-[#445D48] text-[10.5px] font-bold tracking-wider uppercase">
                  <Sparkles className="w-3 h-3 text-[#445D48]" />
                  100% Organically Grown Botanicals
                </div>

                <h2 className="card-title-text text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#001524] tracking-tight leading-tight">
                  ONE ROOT
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-[#001524]/80 max-w-md mx-auto leading-relaxed">
                  Bring living nature into your sanctuary. Handcrafted organic plants, succulents, rare indoor botanicals, and expert care.
                </p>

                {/* CTAs */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={scrollToPlants}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] font-semibold text-xs transition-all shadow-md cursor-pointer group"
                  >
                    <span>Explore Plants</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={scrollToCare}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#445D48] hover:bg-[#001524] text-[#FDE5D4] font-semibold text-xs border border-[#D6CC99] transition-all cursor-pointer group"
                  >
                    <Leaf className="w-3.5 h-3.5 text-[#D6CC99]" />
                    <span>Care Guides</span>
                  </button>
                </div>

                {/* Proof metrics */}
                <div className="mt-6 pt-4 border-t border-[#D6CC99]/40 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-base sm:text-lg font-serif font-bold text-[#001524]">1,200+</p>
                    <p className="text-[10px] text-[#445D48] font-medium">Living Species</p>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-serif font-bold text-[#001524]">99.4%</p>
                    <p className="text-[10px] text-[#445D48] font-medium">Survival Rate</p>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-serif font-bold text-[#445D48]">100%</p>
                    <p className="text-[10px] text-[#445D48] font-medium">Plastic-Free</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Bar inside Reveal */}
            <div className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5 border-t border-[#D6CC99]/20 text-[11px] font-medium text-[#D6CC99] backdrop-blur-xs">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D6CC99]" />
                30-Day Plant Guarantee
              </span>
              <span>Scroll down to browse catalog ↓</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
