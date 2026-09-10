import React, { useLayoutEffect, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_LAYERS = 64;
const DEFAULT_REPEAT = 2;

function distributePixels(sourceCanvas, count, repeat = 2) {
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  const ctx = sourceCanvas.getContext("2d", {
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

export default function DisintegrateScroll({
  children,
  distance = 80,
  pinDistance = 1500,
  capturePadding,
  layers = DEFAULT_LAYERS,
  repeat = DEFAULT_REPEAT,
  holdBefore = 0.16,
  holdAfter = 0.12,
  stagger = 0.02,
  direction = "right",
}) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const sourceRef = useRef(null);
  const staticHostRef = useRef(null);
  const fragmentsHostRef = useRef(null);
  const ctxRef = useRef(null);

  /* =========================================================
      DETECT CHILD TYPE
  ========================================================= */
  const childType =
    typeof children?.type === "string" ? children.type.toLowerCase() : "";

  const inlineElements = [
    "a",
    "button",
    "span",
    "strong",
    "em",
    "small",
    "label",
  ];

  const isInline = inlineElements.includes(childType);
  const isImage = childType === "img";
  const isText = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "a",
    "button",
    "span",
    "strong",
    "em",
  ].includes(childType);

  const resolvedPadding =
    capturePadding !== undefined
      ? capturePadding
      : isImage
      ? 0
      : isText
      ? 40
      : 20;

  /* =========================================================
      DIRECTION HELPERS
  ========================================================= */
  const getX = useCallback(
    (i) => {
      const spread = (i % 11) * 3.3;
      if (direction === "left") {
        return -distance - spread;
      }
      if (direction === "up" || direction === "down") {
        return Math.sin(i * 1.52) * 28;
      }
      return distance + spread;
    },
    [direction, distance]
  );

  const getY = useCallback(
    (i) => {
      if (direction === "up") {
        return -distance - (i % 11) * 3.3;
      }
      if (direction === "down") {
        return distance + (i % 11) * 3.3;
      }
      return Math.cos(i * 1.52) * 28;
    },
    [direction, distance]
  );

  /* =========================================================
      BUILD MASTER CANVAS & SCROLLTRIGGER
  ========================================================= */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const source = sourceRef.current;
    const staticHost = staticHostRef.current;
    const fragmentsHost = fragmentsHostRef.current;

    if (!section || !source || !staticHost || !fragmentsHost) {
      return undefined;
    }

    let cancelled = false;

    const build = async () => {
      try {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }

        // Wait for next animation frames to allow layout to settle
        await new Promise((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
          });
        });

        if (cancelled) return;

        // If source contains an img, wait for it to load
        const img = source.querySelector("img");
        if (img && !img.complete) {
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }

        if (cancelled) return;

        const rect = source.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        /* OFFSCREEN CAPTURE WRAPPER */
        const captureWrapper = document.createElement("div");
        Object.assign(captureWrapper.style, {
          position: "fixed",
          left: "-99999px",
          top: "0",
          width: `${rect.width + resolvedPadding * 2}px`,
          height: `${rect.height + resolvedPadding * 2}px`,
          padding: `${resolvedPadding}px`,
          boxSizing: "border-box",
          background: "transparent",
          pointerEvents: "none",
          overflow: "visible",
          fontFamily: getComputedStyle(source).fontFamily,
          fontSize: getComputedStyle(source).fontSize,
          fontWeight: getComputedStyle(source).fontWeight,
          lineHeight: getComputedStyle(source).lineHeight,
          letterSpacing: getComputedStyle(source).letterSpacing,
          color: getComputedStyle(source).color,
          textAlign: getComputedStyle(source).textAlign,
        });

        const clone = source.cloneNode(true);
        Object.assign(clone.style, {
          opacity: "1",
          visibility: "visible",
          margin: "0",
          transform: "none",
          position: "static",
          width: `${rect.width}px`,
          height: `${rect.height}px`,
        });

        captureWrapper.appendChild(clone);
        document.body.appendChild(captureWrapper);

        const masterCanvas = await html2canvas(captureWrapper, {
          backgroundColor: null,
          scale: 1,
          useCORS: true,
          logging: false,
        });

        captureWrapper.remove();

        if (cancelled) return;

        // Clean previous canvases & GSAP context if any
        if (ctxRef.current) {
          ctxRef.current.revert();
          ctxRef.current = null;
        }

        staticHost.replaceChildren();
        fragmentsHost.replaceChildren();

        /* STATIC MASTER CANVAS */
        const staticCanvas = document.createElement("canvas");
        staticCanvas.width = masterCanvas.width;
        staticCanvas.height = masterCanvas.height;
        Object.assign(staticCanvas.style, {
          position: "absolute",
          inset: "0",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        });

        staticCanvas.getContext("2d").drawImage(masterCanvas, 0, 0);
        staticHost.appendChild(staticCanvas);

        /* DUST FROM MASTER */
        const dataLayers = distributePixels(masterCanvas, layers, repeat);
        dataLayers.forEach((data, index) => {
          const fragment = document.createElement("canvas");
          fragment.width = masterCanvas.width;
          fragment.height = masterCanvas.height;
          fragment.dataset.dustFragment = "true";
          fragment.dataset.fragmentIndex = String(index);
          Object.assign(fragment.style, {
            position: "absolute",
            inset: "0",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });

          fragment.getContext("2d").putImageData(data, 0, 0);
          fragmentsHost.appendChild(fragment);
        });

        const fragments = fragmentsHost.querySelectorAll("[data-dust-fragment]");

        // Hide original DOM source and show master canvas
        gsap.set(source, { autoAlpha: 0 });
        gsap.set(staticHost, { autoAlpha: 1 });
        gsap.set(fragments, { autoAlpha: 0, x: 0, y: 0, rotation: 0, scale: 1 });

        /* SETUP SCROLLTRIGGER TIMELINE */
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${pinDistance}`,
              scrub: true,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // 1. Hold before disintegrating
          tl.to({}, { duration: holdBefore });

          // 2. Switch from static to dust fragments
          tl.set(fragments, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
          });
          tl.set(staticHost, { autoAlpha: 0 }, "<");

          // 3. Disintegrate dust fragments
          tl.to(fragments, {
            autoAlpha: 0,
            x: (i) => getX(i),
            y: (i) => getY(i),
            rotation: (i) => ((i % 15) - 7) * 1.6,
            scale: 1,
            duration: 1,
            stagger: {
              each: stagger,
              from: "start",
            },
            ease: "none",
          });

          // 4. Hold after disintegrating
          tl.to({}, { duration: holdAfter });
        }, section);

        ctxRef.current = ctx;

        // Refresh all ScrollTriggers once new pinned dimensions are established
        ScrollTrigger.refresh();
      } catch (error) {
        console.error("DisintegrateScroll error:", error);
      }
    };

    build();

    return () => {
      cancelled = true;
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
      staticHost.replaceChildren();
      fragmentsHost.replaceChildren();
      gsap.set(source, {
        clearProps: "opacity,visibility",
      });
    };
  }, [
    resolvedPadding,
    layers,
    repeat,
    pinDistance,
    holdBefore,
    holdAfter,
    stagger,
    getX,
    getY,
  ]);

  const stageDisplay = isInline ? "inline-grid" : "grid";

  return (
    <div
      ref={sectionRef}
      className="disintegrate-scroll-wrapper relative w-full overflow-visible flex items-center justify-center pointer-events-none"
    >
      <span
        ref={stageRef}
        style={{
          position: "relative",
          display: stageDisplay,
          gridTemplateAreas: '"effect"',
          overflow: "visible",
          verticalAlign: isInline ? "middle" : undefined,
          pointerEvents: "auto",
        }}
      >
        {/* SOURCE */}
        <span
          ref={sourceRef}
          style={{
            gridArea: "effect",
            display: isInline ? "inline-flex" : "block",
            overflow: "visible",
          }}
        >
          {children}
        </span>

        {/* STATIC MASTER */}
        <span
          ref={staticHostRef}
          aria-hidden="true"
          style={{
            gridArea: "effect",
            position: "relative",
            margin: `${-resolvedPadding}px`,
            width: `calc(100% + ${resolvedPadding * 2}px)`,
            height: `calc(100% + ${resolvedPadding * 2}px)`,
            pointerEvents: "none",
            overflow: "visible",
            zIndex: 10,
          }}
        />

        {/* DUST MASTER */}
        <span
          ref={fragmentsHostRef}
          aria-hidden="true"
          style={{
            gridArea: "effect",
            position: "relative",
            margin: `${-resolvedPadding}px`,
            width: `calc(100% + ${resolvedPadding * 2}px)`,
            height: `calc(100% + ${resolvedPadding * 2}px)`,
            pointerEvents: "none",
            overflow: "visible",
            zIndex: 20,
          }}
        />
      </span>
    </div>
  );
}
