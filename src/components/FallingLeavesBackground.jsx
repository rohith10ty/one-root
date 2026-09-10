import React, { useEffect, useRef } from 'react';
import { createFallingLeaf, renderLeaf } from '../utils/realLeafRenderer';

export default function FallingLeavesBackground({ leafCount = 28, className = '' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, strength: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = 0;
    let height = 0;
    let leaves = [];

    const handleResize = () => {
      const parent = canvas.parentElement || document.body;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.offsetWidth;
      height = parent.offsetHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
      ctx.scale(dpr, dpr);

      // Re-populate if empty or size drastically changed
      if (leaves.length === 0) {
        leaves = Array.from({ length: leafCount }, () =>
          createFallingLeaf(width, height, true)
        );
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Track mouse for interactive breeze effect
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.strength = 1.0;
    };

    const handleMouseLeave = () => {
      mouseRef.current.strength = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let startTime = performance.now();

    const animate = (currentTime) => {
      const time = (currentTime - startTime) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Decay mouse breeze
      mouseRef.current.strength *= 0.95;

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        renderLeaf(ctx, leaf, time, mouseRef.current);

        // Respawn when falling off the bottom
        if (leaf.y > height + 60) {
          leaves[i] = createFallingLeaf(width, height, false);
        }
        // Respawn if blown off screen sides
        if (leaf.x > width + 80) leaf.x = -60;
        if (leaf.x < -80) leaf.x = width + 60;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [leafCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
}
