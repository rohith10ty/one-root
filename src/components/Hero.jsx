import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import heroImg from '../assets/hero-sanctuary.jpg';
import bonsaiImg from '../assets/bonsai-hero.jpg';


const DEFAULT_LAYERS = 64;
const DEFAULT_REPEAT = 2;

function distributePixels(sourceCanvas, count = DEFAULT_LAYERS, repeat = DEFAULT_REPEAT) {
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  const ctx = sourceCanvas.getContext('2d', {
    willReadFrequently: true,
  });

  const source = ctx.getImageData(0, 0, width, height);

  const layers = Array.from({ length: count }, () =>
    ctx.createImageData(width, height)
  );

  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      const index = (x + y * width) * 4;

      if (source.data[index + 3] === 0) {
        continue;
      }

      for (let r = 0; r < repeat; r += 1) {
        let layerIndex = Math.floor(
          (count * (Math.random() + (2 * x) / width)) / 3
        );

        layerIndex = Math.max(0, Math.min(count - 1, layerIndex));

        const target = layers[layerIndex].data;

        target[index] = source.data[index];
        target[index + 1] = source.data[index + 1];
        target[index + 2] = source.data[index + 2];
        target[index + 3] = source.data[index + 3];
      }
    }
  }

  return layers;
}


export default function Hero() {
  const containerRef = useRef(null);
  const staticImgRef = useRef(null);
  const dustHostRef = useRef(null);
  const [dustReady, setDustReady] = useState(false);

  const scrollToPlants = () => {
    const el = document.getElementById('plants-catalog');
    if (window.lenis && el) {
      window.lenis.scrollTo(el);
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCare = () => {
    const el = document.getElementById('care-tips');
    if (window.lenis && el) {
      window.lenis.scrollTo(el);
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 1. Build the 64-layer sand particle canvases for the bonsai image
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = bonsaiImg;

    img.onload = () => {
      if (cancelled) return;
      const dustHost = dustHostRef.current;
      if (!dustHost) return;

      const width = 340;
      const height = 450;

      const masterCanvas = document.createElement('canvas');
      masterCanvas.width = width;
      masterCanvas.height = height;
      const ctx = masterCanvas.getContext('2d', { willReadFrequently: true });

      // Calculate object-cover crop
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const boxRatio = width / height;
      let dw, dh, dx, dy;
      if (imgRatio > boxRatio) {
        dh = height;
        dw = height * imgRatio;
        dx = (width - dw) / 2;
        dy = 0;
      } else {
        dw = width;
        dh = width / imgRatio;
        dx = 0;
        dy = (height - dh) / 2;
      }

      ctx.drawImage(img, dx, dy, dw, dh);

      dustHost.replaceChildren();

      const layers = distributePixels(masterCanvas, DEFAULT_LAYERS, DEFAULT_REPEAT);

      layers.forEach((layerData, idx) => {
        const frag = document.createElement('canvas');
        frag.width = width;
        frag.height = height;
        frag.className = 'bonsai-dust-fragment absolute inset-0 w-full h-full pointer-events-none rounded-3xl';
        frag.dataset.fragmentIndex = String(idx);
        frag.style.transformOrigin = 'center center';
        frag.style.willChange = 'transform, opacity';
        frag.getContext('2d').putImageData(layerData, 0, 0);
        dustHost.appendChild(frag);
      });

      setDustReady(true);
    };

    return () => {
      cancelled = true;
    };
  }, []);

  // 2. Master ScrollTrigger Animation Timeline
  useEffect(() => {
    if (!dustReady) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const fragments = Array.from(document.querySelectorAll('.bonsai-dust-fragment'));
      const bonsaiImgEl = staticImgRef.current;
      const contentCard = document.querySelector('.hero-content-card');
      const bonsaiWrapper = document.querySelector('.bonsai-card-wrapper');

      const getLeftStart = () => -(window.innerWidth * 0.7 + 450);
      const getRightExit = () => window.innerWidth * 0.7 + 450;

      // Initial States
      gsap.set(['.preloader .char-letter-o', '.split-overlay .char-letter-o'], {
        y: '0%',
        opacity: 1,
      });

      gsap.set(['.preloader .char-number-1', '.split-overlay .char-number-1'], {
        y: '-105%',
        opacity: 0,
      });

      gsap.set(['.preloader .name-word .rest .char span', '.split-overlay .name-word .rest .char span'], {
        y: '0%',
      });

      gsap.set(['.preloader .name-word .rest', '.split-overlay .name-word .rest'], {
        width: 'auto',
        opacity: 1,
      });

      gsap.set(['.preloader .name-space', '.split-overlay .name-space'], {
        width: '0.35em',
        opacity: 1,
      });

      gsap.set('.scroll-prompt', {
        opacity: 0.85,
      });

      gsap.set('.preloader-tags', {
        opacity: 1,
      });

      gsap.set('.hero-container-reveal', {
        clipPath: 'polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)',
      });

      gsap.set('.preloader', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: '0%',
      });

      gsap.set('.split-overlay', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: '0%',
      });

      gsap.set('.site-navbar', {
        y: '-100%',
        opacity: 0,
        pointerEvents: 'none',
      });

      // Showcase elements initial states
      gsap.set(contentCard, {
        x: getLeftStart(),
        opacity: 1,
      });

      gsap.set(bonsaiWrapper, {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        opacity: 1,
        clipPath: 'none',
      });

      gsap.set(bonsaiImgEl, {
        autoAlpha: 0,
      });

      gsap.set('.bonsai-dust-host', {
        autoAlpha: 1,
        visibility: 'visible',
      });

      gsap.set(fragments, {
        autoAlpha: 0,
        x: (i) => -65 - (i % 11) * 3.5,
        y: (i) => Math.sin(i * 1.72) * 28,
        rotation: (i) => ((i % 15) - 7) * 1.4,
        scale: (i) => 0.96 + (i % 5) * 0.01,
      });

      // Master Timeline across scroll distance for grand, deliberate, silky smooth pacing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: '.hero-pinned-wrapper',
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: 'power1.inOut' },
      });

      // 1. Initial calm state: scroll prompt and initial screen tags fade out on scroll
      tl.to(
        ['.scroll-prompt', '.preloader-tags'],
        {
          opacity: 0,
          duration: 0.8,
        },
        0.5
      );

      // 2. "O" transforms into "1" and other letters dissolve down
      tl.to(
        ['.preloader .char-letter-o', '.split-overlay .char-letter-o'],
        {
          y: '105%',
          opacity: 0,
          duration: 1.8,
        },
        1.5
      ).to(
        ['.preloader .char-number-1', '.split-overlay .char-number-1'],
        {
          y: '0%',
          opacity: 1,
          duration: 1.8,
        },
        1.5
      ).to(
        [
          '.preloader .name-word .rest .char span',
          '.split-overlay .name-word .rest .char span',
        ],
        {
          y: '105%',
          opacity: 0,
          duration: 1.6,
          stagger: 0.05,
        },
        1.5
      );

      // 3. Pause & hold on "1" and "R"
      tl.to(
        {},
        {
          duration: 1.6,
        },
        3.5
      );

      // 4. "1" and "R" glide smoothly together into "1R" monogram
      tl.to(
        [
          '.preloader .name-word:first-child .rest',
          '.split-overlay .name-word:first-child .rest',
        ],
        {
          width: 0,
          opacity: 0,
          duration: 2.2,
          ease: 'power1.inOut',
        },
        5.2
      )
      .to(
        ['.preloader .name-space', '.split-overlay .name-space'],
        {
          width: 0,
          opacity: 0,
          duration: 2.2,
          ease: 'power1.inOut',
        },
        5.2
      )
      .to(
        [
          '.preloader .name-word:last-child .rest',
          '.split-overlay .name-word:last-child .rest',
        ],
        {
          width: 0,
          opacity: 0,
          duration: 2.2,
          ease: 'power1.inOut',
        },
        5.2
      );

      // 5. Hold merged monogram
      tl.to(
        {},
        {
          duration: 1.2,
        },
        7.5
      );

      // 6. Split curtain clip paths
      tl.to(
        '.preloader',
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)',
          duration: 0.05,
        },
        8.8
      ).to(
        '.split-overlay',
        {
          clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)',
          duration: 0.05,
        },
        8.8
      );

      // 7. Split Curtain slides open
      tl.to(
        '.preloader',
        {
          y: '-100%',
          duration: 2.0,
        },
        9.0
      )
        .to(
          '.split-overlay',
          {
            y: '100%',
            duration: 2.0,
          },
          9.0
        )
        .to(
          '.hero-container-reveal',
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 2.0,
          },
          9.0
        );

      // 8. Sticky Navbar smoothly reveals
      tl.to(
        document.querySelector('.site-navbar') || '.site-navbar',
        {
          y: '0%',
          opacity: 1,
          pointerEvents: 'auto',
          duration: 1.2,
        },
        9.5
      );

      // 9. REVEAL: Right side content card enters from the LEFT, while the Bonsai image materializes from dust!
      tl.to(
        contentCard,
        {
          x: 0,
          opacity: 1,
          duration: 3.0,
          ease: 'power1.out',
        },
        10.5
      );

      tl.to(
        bonsaiWrapper,
        {
          borderColor: '#D6CC99',
          backgroundColor: '#001524',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
          duration: 2.6,
        },
        10.5
      );

      tl.to(
        fragments,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 2.8,
          stagger: {
            each: 0.005,
            from: 'end',
          },
          ease: 'none',
        },
        10.5
      );

      // Seamless swap: Static solid image takes over once materialization completes
      tl.set(bonsaiImgEl, { autoAlpha: 1 }, 13.5);
      tl.set(fragments, { autoAlpha: 0 }, 13.5);

      // 10. HOLD FOR 2 FULL SCROLLS! Both cards stay completely still, crisp, stable and readable
      tl.to(
        {},
        {
          duration: 4.2,
        },
        13.5
      );

      // 11. EXIT: Card moves to the right & Image disintegrates into sand again!
      tl.set(
        fragments,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
        },
        17.8
      );
      tl.set(bonsaiImgEl, { autoAlpha: 0 }, 17.8);

      // Fine sand particles blow away smoothly to the right
      tl.to(
        fragments,
        {
          autoAlpha: 0,
          x: (i) => 170 + (i % 15) * 8,
          y: (i) => Math.cos(i * 1.52) * 32 - 10,
          rotation: (i) => ((i % 15) - 7) * 2.5,
          scale: (i) => 0.92 - (i % 4) * 0.015,
          duration: 2.8,
          stagger: {
            each: 0.005,
            from: 'start',
          },
          ease: 'none',
        },
        17.8
      );

      // Beside card moves smoothly to the right
      tl.to(
        contentCard,
        {
          x: getRightExit(),
          opacity: 0,
          duration: 2.8,
          ease: 'power1.in',
        },
        17.8
      );

      // Wrapper fades gracefully
      tl.to(
        bonsaiWrapper,
        {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          opacity: 0,
          duration: 2.0,
        },
        17.8
      );

      // Buffer at the end of the scroll track
      tl.to({}, { duration: 1.0 }, 20.8);
    }, containerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [dustReady]);


  return (
    <section id="hero" ref={containerRef} className="relative w-full">
      {/* Scroll Container for Pinned Hero Animation - Extended to 720vh for majestic slow pacing and 2-scroll hold */}
      <div className="hero-scroll-container relative w-full h-[720vh]">
        <div className="hero-pinned-wrapper sticky top-0 w-full h-screen overflow-hidden bg-[#001524]">
          
          {/* 1. Preloader Screen (Top Split Half) */}
          <div className="preloader absolute inset-0 z-30 bg-[#001524] text-[#FDE5D4] pointer-events-none will-change-[clip-path,transform]">
            
            {/* Top and Bottom Botanical labels for initial screen ONLY */}
            <div className="preloader-tags absolute inset-0 z-20 pointer-events-none text-[11px] sm:text-xs font-medium tracking-widest uppercase text-[#D6CC99]">
              {/* Top Left */}
              <div className="absolute top-[8%] sm:top-[10%] left-[5%] sm:left-[7%]">
                <p className="flex gap-1.5 font-sans">
                  <span className="text-[#D6CC99]">Living</span>
                  <span className="text-[#D6CC99]">Botanical</span>
                  <span className="text-[#FDE5D4]">Sanctuary</span>
                </p>
              </div>

              {/* Top Right */}
              <div className="absolute top-[8%] sm:top-[10%] right-[5%] sm:right-[7%] text-right">
                <p className="flex gap-1.5 font-sans justify-end">
                  <span className="text-[#D6CC99]">Curated</span>
                  <span className="text-[#D6CC99]">Flora</span>
                  <span className="text-[#FDE5D4]">Collection</span>
                </p>
              </div>

              {/* Bottom Left */}
              <div className="absolute bottom-[8%] sm:bottom-[10%] left-[5%] sm:left-[7%]">
                <p className="flex gap-1.5 font-sans">
                  <span className="text-[#D6CC99]">100%</span>
                  <span className="text-[#D6CC99]">Organically</span>
                  <span className="text-[#FDE5D4]">Raised</span>
                </p>
              </div>

              {/* Bottom Right */}
              <div className="absolute bottom-[8%] sm:bottom-[10%] right-[5%] sm:right-[7%] text-right">
                <p className="flex gap-1.5 font-sans justify-end">
                  <span className="text-[#D6CC99]">Rooted</span>
                  <span className="text-[#FDE5D4]">Since 2014</span>
                </p>
              </div>
            </div>

            <div className="intro-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full flex justify-center items-center pointer-events-none px-4">
              <h1 className="inline-flex justify-center items-baseline text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-[#FDE5D4] whitespace-nowrap">
                {/* Word 1: ONE (with O transitioning to 1) */}
                <span className="name-word inline-flex items-baseline">
                  <span className="char initial inline-block overflow-visible leading-normal px-1.5 py-1 relative">
                    <span className="char-letter-o inline-block text-[#D6CC99]">O</span>
                    <span className="char-number-1 absolute inset-0 text-[#D6CC99] font-sans font-bold flex items-center justify-center">1</span>
                  </span>
                  <span className="rest inline-flex items-baseline overflow-hidden whitespace-nowrap">
                    <span className="char inline-block overflow-hidden leading-normal px-0.5"><span className="inline-block">N</span></span>
                    <span className="char inline-block overflow-hidden leading-normal px-0.5"><span className="inline-block">E</span></span>
                  </span>
                </span>

                <span className="name-space inline-block w-[0.35em] overflow-hidden whitespace-pre">&nbsp;</span>

                {/* Word 2: ROOT */}
                <span className="name-word inline-flex items-baseline">
                  <span className="char initial inline-block overflow-visible leading-normal px-1.5 py-1">
                    <span className="inline-block text-[#D6CC99]">R</span>
                  </span>
                  <span className="rest inline-flex items-baseline overflow-hidden whitespace-nowrap">
                    <span className="char inline-block overflow-hidden leading-normal px-0.5"><span className="inline-block">O</span></span>
                    <span className="char inline-block overflow-hidden leading-normal px-0.5"><span className="inline-block">O</span></span>
                    <span className="char inline-block overflow-hidden leading-normal px-0.5"><span className="inline-block">T</span></span>
                  </span>
                </span>
              </h1>
            </div>

            {/* Scroll prompt */}
            <div className="scroll-prompt absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
              <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-widest text-[#D6CC99] flex items-center gap-2">
                <span>Scroll to Enter Sanctuary</span>
                <span className="animate-bounce">↓</span>
              </p>
            </div>
          </div>

          {/* 2. Split Overlay Screen (Bottom Split Half) */}
          <div className="split-overlay absolute inset-0 z-20 bg-[#001524] text-[#FDE5D4] pointer-events-none will-change-[clip-path,transform]">
            <div className="intro-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full flex justify-center items-center pointer-events-none px-4">
              <h1 className="inline-flex justify-center items-baseline text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-[#FDE5D4] whitespace-nowrap">
                <span className="name-word inline-flex items-baseline">
                  <span className="char initial inline-block overflow-visible leading-normal px-1.5 py-1 relative">
                    <span className="char-letter-o inline-block text-[#D6CC99]">O</span>
                    <span className="char-number-1 absolute inset-0 text-[#D6CC99] font-sans font-bold flex items-center justify-center">1</span>
                  </span>
                  <span className="rest inline-flex items-baseline overflow-hidden whitespace-nowrap">
                    <span className="char inline-block overflow-hidden leading-normal px-0.5"><span className="inline-block">N</span></span>
                    <span className="char inline-block overflow-hidden leading-normal px-0.5"><span className="inline-block">E</span></span>
                  </span>
                </span>

                <span className="name-space inline-block w-[0.35em] overflow-hidden whitespace-pre">&nbsp;</span>

                <span className="name-word inline-flex items-baseline">
                  <span className="char initial inline-block overflow-visible leading-normal px-1.5 py-1">
                    <span className="inline-block text-[#D6CC99]">R</span>
                  </span>
                  <span className="rest inline-flex items-baseline overflow-hidden whitespace-nowrap">
                    <span className="char inline-block overflow-hidden leading-normal px-0.5"><span className="inline-block">O</span></span>
                    <span className="char inline-block overflow-hidden leading-normal px-0.5"><span className="inline-block">O</span></span>
                    <span className="char inline-block overflow-hidden leading-normal px-0.5"><span className="inline-block">T</span></span>
                  </span>
                </span>
              </h1>
            </div>
          </div>

          {/* 3. Revealed Hero Sanctuary Screen */}
          <div className="hero-container-reveal absolute inset-0 z-10 flex flex-col justify-between w-full h-full bg-[#001524] text-[#FDE5D4] will-change-[clip-path]">
            
            {/* Background Botanical Image with dark tint & nature aesthetic */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={heroImg}
                alt="One Root Botanical Sanctuary Greenhouse"
                className="w-full h-full object-cover brightness-[0.62] contrast-[1.08] saturate-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#001524]/60 via-transparent to-[#001524]/85"></div>
            </div>

            {/* Spacer to balance vertical layout */}
            <div className="relative z-20 h-16 w-full"></div>

            {/* Center Showcase: Bonsai Image Card + Beside Content Card (Exact Same Responsive Dimensions) */}
            <div className="hero-showcase-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-6 lg:gap-8 pointer-events-auto max-h-[85vh] pt-14 sm:pt-16 md:pt-10">
              
              {/* Left: Bonsai Image Card */}
              <div className="bonsai-card-wrapper relative flex-shrink-0 w-[270px] sm:w-[290px] md:w-[310px] lg:w-[330px] h-[360px] sm:h-[385px] md:h-[405px] lg:h-[420px] rounded-3xl overflow-visible shadow-2xl border-2 border-[#D6CC99] bg-[#001524] will-change-transform">
                <img
                  ref={staticImgRef}
                  src={bonsaiImg}
                  alt="One Root Heritage Bonsai"
                  className="bonsai-main-img w-full h-full object-cover rounded-3xl"
                  crossOrigin="anonymous"
                />
                {/* Particle Dust Host Container right over the bonsai image */}
                <div 
                  ref={dustHostRef}
                  className="bonsai-dust-host absolute inset-0 w-full h-full pointer-events-none rounded-3xl overflow-visible"
                  aria-hidden="true"
                ></div>
              </div>

              {/* Right: Beside Content Card - Exact same size as the Bonsai Card */}
              <div className="hero-content-card flex-shrink-0 w-[270px] sm:w-[290px] md:w-[310px] lg:w-[330px] h-[360px] sm:h-[385px] md:h-[405px] lg:h-[420px] flex flex-col justify-between bg-[#FDE5D4] text-[#001524] rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl border-2 border-[#D6CC99] will-change-transform">
                <div className="text-left font-sans">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#445D48]/15 border border-[#445D48]/30 mb-2 text-[#445D48] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                    <Sparkles className="w-3 h-3 text-[#445D48]" />
                    100% Organically Grown
                  </div>

                  <h2 className="card-title-text text-xl sm:text-2xl lg:text-3xl font-bold text-[#001524] tracking-tight leading-tight">
                    ONE ROOT
                  </h2>

                  <p className="mt-2 text-xs sm:text-[13px] text-[#001524]/80 leading-relaxed font-normal">
                    Bring living nature into your sanctuary. Handcrafted organic plants, succulents, rare indoor botanicals, and expert care.
                  </p>

                  {/* CTAs */}
                  <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
                    <button
                      onClick={scrollToPlants}
                      className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#001524] text-[#FDE5D4] text-xs font-semibold shadow hover:bg-[#445D48] transition-colors group cursor-pointer"
                    >
                      Explore Plants
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#D6CC99]" />
                    </button>
                    <button
                      onClick={scrollToCare}
                      className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-[#445D48] text-[#FDE5D4] text-xs font-medium hover:bg-[#445D48]/85 transition-colors cursor-pointer"
                    >
                      <Leaf className="w-3.5 h-3.5 text-[#D6CC99]" />
                      Care Guides
                    </button>
                  </div>
                </div>

                {/* Metrics / Proof Footer */}
                <div className="pt-2.5 sm:pt-3 border-t border-[#001524]/15">
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div>
                      <div className="text-sm sm:text-base md:text-lg font-bold text-[#001524] leading-none">1,200+</div>
                      <div className="text-[9px] sm:text-[10px] text-[#001524]/70 uppercase tracking-wider mt-1">Species</div>
                    </div>
                    <div className="border-x border-[#001524]/10">
                      <div className="text-sm sm:text-base md:text-lg font-bold text-[#001524] leading-none">99.4%</div>
                      <div className="text-[9px] sm:text-[10px] text-[#001524]/70 uppercase tracking-wider mt-1">Survival</div>
                    </div>
                    <div>
                      <div className="text-sm sm:text-base md:text-lg font-bold text-[#445D48] leading-none">100%</div>
                      <div className="text-[9px] sm:text-[10px] text-[#001524]/70 uppercase tracking-wider mt-1">Organic</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Subtle bottom safe margin */}
            <div className="relative z-20 h-6 w-full"></div>

          </div>

        </div>
      </div>
    </section>
  );
}
