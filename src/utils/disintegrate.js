/**
 * High-Performance Botanical Particle Disintegration Engine
 * Dissolves elements into wind-blown botanical spores & leaf fragments
 */

export function disintegrateElement(element, options = {}) {
  if (!element) return Promise.resolve();

  const {
    particleCount = 120,
    duration = 1000,
    colors = ['#10b981', '#34d399', '#059669', '#84cc16', '#eab308', '#a7f3d0', '#047857', '#d97706'],
    direction = 'right', // 'right', 'left', 'burst'
    onComplete = null,
  } = options;

  const rect = element.getBoundingClientRect();
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;

  // Create temporary overlay canvas
  const canvas = document.createElement('canvas');
  const dpr = window.devicePixelRatio || 1;
  const padding = 60; // Extra room for particles drifting outward

  canvas.width = (rect.width + padding * 2) * dpr;
  canvas.height = (rect.height + padding * 2) * dpr;
  canvas.style.position = 'absolute';
  canvas.style.left = `${rect.left + scrollX - padding}px`;
  canvas.style.top = `${rect.top + scrollY - padding}px`;
  canvas.style.width = `${rect.width + padding * 2}px`;
  canvas.style.height = `${rect.height + padding * 2}px`;
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';

  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  // Apply disintegrate fade to the source element
  element.classList.add('disintegrating');

  // Spawn botanical particles inside the source element's relative box
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    // Relative start inside the padded area
    const startX = padding + Math.random() * rect.width;
    const startY = padding + Math.random() * rect.height;

    // Directional bias
    let vx = (Math.random() - 0.5) * 4;
    let vy = -Math.random() * 3.5 - 0.5; // slight upward draft

    if (direction === 'right') {
      vx = Math.random() * 5 + 1;
    } else if (direction === 'left') {
      vx = -Math.random() * 5 - 1;
    }

    particles.push({
      x: startX,
      y: startY,
      vx,
      vy,
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.2,
      life: 1,
      decay: Math.random() * 0.02 + 0.015,
      isLeaf: Math.random() > 0.4, // Shape variation (circle spore vs leaf sliver)
    });
  }

  let animationFrameId;
  const startTime = performance.now();

  return new Promise((resolve) => {
    function render(currentTime) {
      const elapsed = currentTime - startTime;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      let aliveCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.alpha <= 0) continue;

        aliveCount++;

        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // Gentle gravity
        p.vx += (Math.random() - 0.48) * 0.2; // Organic wind turbulence
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          p.alpha = 0;
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.isLeaf) {
          // Draw miniature leaf petal shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.6, p.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Spore / pollen grain
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (aliveCount > 0 && elapsed < duration * 1.5) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        if (onComplete) onComplete();
        resolve();
      }
    }

    animationFrameId = requestAnimationFrame(render);
  });
}
