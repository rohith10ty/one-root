/**
 * Realistic Botanical Falling Leaf System
 * Draws actual anatomical leaves (stems, veins, blades, 3D flip)
 * with aerodynamic wind, sway, and tumble physics.
 */

// Draw an anatomical tropical/ficus leaf with stem and veins
function drawFicusLeaf(ctx, size, isBackside) {
  const length = size * 2.2;
  const width = size * 1.0;

  // Stem
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-width * 0.1, length * 0.25, -width * 0.05, length * 0.35);
  ctx.lineWidth = Math.max(1, size * 0.08);
  ctx.strokeStyle = isBackside ? '#86efac' : '#22543d';
  ctx.stroke();

  // Leaf blade
  ctx.beginPath();
  ctx.moveTo(0, length * 0.3);
  // Left curve to tip
  ctx.bezierCurveTo(-width * 0.8, length * 0.1, -width * 0.7, -length * 0.6, 0, -length * 0.9);
  // Right curve back to base
  ctx.bezierCurveTo(width * 0.7, -length * 0.6, width * 0.8, length * 0.1, 0, length * 0.3);
  ctx.closePath();
  ctx.fill();

  // Midrib vein
  ctx.beginPath();
  ctx.moveTo(0, length * 0.3);
  ctx.quadraticCurveTo(width * 0.05, -length * 0.3, 0, -length * 0.88);
  ctx.lineWidth = Math.max(0.75, size * 0.06);
  ctx.strokeStyle = isBackside ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.22)';
  ctx.stroke();

  // Lateral veins (left & right)
  const veinCount = 4;
  ctx.lineWidth = Math.max(0.5, size * 0.035);
  ctx.strokeStyle = isBackside ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.15)';
  for (let i = 1; i <= veinCount; i++) {
    const t = i / (veinCount + 1);
    const vy = length * 0.25 - t * (length * 1.05);
    const span = width * (1 - t * 0.6) * 0.65;

    // Left vein
    ctx.beginPath();
    ctx.moveTo(0, vy);
    ctx.quadraticCurveTo(-span * 0.5, vy - length * 0.08, -span, vy - length * 0.04);
    ctx.stroke();

    // Right vein
    ctx.beginPath();
    ctx.moveTo(0, vy);
    ctx.quadraticCurveTo(span * 0.5, vy - length * 0.08, span, vy - length * 0.04);
    ctx.stroke();
  }
}

// Draw an anatomical Monstera split leaf
function drawMonsteraLeaf(ctx, size, isBackside) {
  const length = size * 2.3;
  const width = size * 1.3;

  // Stem
  ctx.beginPath();
  ctx.moveTo(0, length * 0.45);
  ctx.lineTo(0, length * 0.2);
  ctx.lineWidth = Math.max(1, size * 0.09);
  ctx.strokeStyle = isBackside ? '#a7f3d0' : '#14532d';
  ctx.stroke();

  // Split-leaf blade with lobes
  ctx.beginPath();
  ctx.moveTo(0, length * 0.2);
  // Left side with splits
  ctx.bezierCurveTo(-width * 0.7, length * 0.1, -width * 0.9, -length * 0.1, -width * 0.6, -length * 0.3);
  ctx.lineTo(-width * 0.3, -length * 0.25); // indent
  ctx.bezierCurveTo(-width * 0.8, -length * 0.35, -width * 0.7, -length * 0.55, -width * 0.4, -length * 0.65);
  ctx.lineTo(-width * 0.15, -length * 0.55); // indent
  ctx.bezierCurveTo(-width * 0.3, -length * 0.75, -width * 0.1, -length * 0.85, 0, -length * 0.95); // tip
  // Right side with splits
  ctx.bezierCurveTo(width * 0.1, -length * 0.85, width * 0.3, -length * 0.75, width * 0.15, -length * 0.55);
  ctx.lineTo(width * 0.4, -length * 0.65);
  ctx.bezierCurveTo(width * 0.7, -length * 0.55, width * 0.8, -length * 0.35, width * 0.3, -length * 0.25);
  ctx.lineTo(width * 0.6, -length * 0.3);
  ctx.bezierCurveTo(width * 0.9, -length * 0.1, width * 0.7, length * 0.1, 0, length * 0.2);
  ctx.closePath();
  ctx.fill();

  // Midrib
  ctx.beginPath();
  ctx.moveTo(0, length * 0.2);
  ctx.lineTo(0, -length * 0.9);
  ctx.lineWidth = Math.max(0.8, size * 0.06);
  ctx.strokeStyle = isBackside ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)';
  ctx.stroke();
}

// Draw a Ginkgo fan leaf
function drawGinkgoLeaf(ctx, size, isBackside) {
  const r = size * 1.5;

  // Thin curved stem
  ctx.beginPath();
  ctx.moveTo(0, r * 0.8);
  ctx.quadraticCurveTo(-r * 0.15, r * 0.4, 0, 0);
  ctx.lineWidth = Math.max(1, size * 0.07);
  ctx.strokeStyle = isBackside ? '#a3e635' : '#4d7c0f';
  ctx.stroke();

  // Fan shape with center notch
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-r * 0.9, -r * 0.7);
  ctx.bezierCurveTo(-r * 0.8, -r * 1.1, -r * 0.2, -r * 1.2, -r * 0.05, -r * 0.85); // notch dip
  ctx.lineTo(0, -r * 0.8);
  ctx.lineTo(r * 0.05, -r * 0.85);
  ctx.bezierCurveTo(r * 0.2, -r * 1.2, r * 0.8, -r * 1.1, r * 0.9, -r * 0.7);
  ctx.closePath();
  ctx.fill();

  // Radiating delicate veins
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = isBackside ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.15)';
  for (let a = -0.7; a <= 0.7; a += 0.25) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.sin(a) * r * 0.9, -Math.cos(a) * r * 0.9);
    ctx.stroke();
  }
}

// Draw an elongated lanceolate / willow leaf
function drawWillowLeaf(ctx, size, isBackside) {
  const length = size * 2.8;
  const width = size * 0.65;

  // Stem
  ctx.beginPath();
  ctx.moveTo(0, length * 0.4);
  ctx.lineTo(0, length * 0.25);
  ctx.lineWidth = Math.max(0.8, size * 0.07);
  ctx.strokeStyle = isBackside ? '#6ee7b7' : '#047857';
  ctx.stroke();

  // Sinuous blade
  ctx.beginPath();
  ctx.moveTo(0, length * 0.25);
  ctx.bezierCurveTo(-width * 0.8, 0, -width * 0.9, -length * 0.4, 0, -length * 0.95);
  ctx.bezierCurveTo(width * 0.9, -length * 0.4, width * 0.8, 0, 0, length * 0.25);
  ctx.closePath();
  ctx.fill();

  // Center vein
  ctx.beginPath();
  ctx.moveTo(0, length * 0.25);
  ctx.lineTo(0, -length * 0.9);
  ctx.lineWidth = Math.max(0.6, size * 0.05);
  ctx.strokeStyle = isBackside ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)';
  ctx.stroke();
}

export const LEAF_PALETTES = [
  { front: '#15803d', back: '#86efac', stem: '#14532d' }, // Fresh Emerald
  { front: '#047857', back: '#6ee7b7', stem: '#064e3b' }, // Deep Mint/Jade
  { front: '#4d7c0f', back: '#bef264', stem: '#365314' }, // Olive Spring
  { front: '#166534', back: '#a7f3d0', stem: '#14532d' }, // Forest Green
  { front: '#b45309', back: '#fde68a', stem: '#78350f' }, // Warm Amber Gold
  { front: '#22543d', back: '#9ae6b4', stem: '#1a365d' }, // Sage Botanical
];

export function createFallingLeaf(width, height, isInitial = false) {
  const typeIndex = Math.floor(Math.random() * 4);
  const palette = LEAF_PALETTES[Math.floor(Math.random() * LEAF_PALETTES.length)];
  const size = Math.random() * 10 + 10; // realistic visible size (10px - 20px base radius, 30-50px length)

  return {
    type: typeIndex,
    x: Math.random() * (width + 100) - 50,
    y: isInitial ? Math.random() * (height + 100) - 50 : -40 - Math.random() * 80,
    size,
    palette,
    // Physics
    speedY: Math.random() * 0.7 + 0.65, // gentle falling speed
    speedX: Math.random() * 0.4 - 0.2,  // ambient drift
    swaySpeed: Math.random() * 0.02 + 0.015, // oscillation frequency
    swayAmplitude: Math.random() * 1.8 + 1.2, // horizontal sway
    swayOffset: Math.random() * Math.PI * 2,
    // 3D rotation and flipping
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.015,
    flipAngle: Math.random() * Math.PI * 2,
    flipSpeed: Math.random() * 0.025 + 0.015, // 3D tumbling speed
    opacity: Math.random() * 0.35 + 0.65, // crisp clear visibility (65% to 100%)
  };
}

export function renderLeaf(ctx, leaf, time, mouseWind = { x: 0, y: 0 }) {
  // Compute aerodynamic sway
  const sway = Math.sin(time * leaf.swaySpeed + leaf.swayOffset);
  const driftX = sway * leaf.swayAmplitude;

  // 3D flip calculation
  leaf.flipAngle += leaf.flipSpeed;
  const scaleX = Math.cos(leaf.flipAngle);
  const isBackside = scaleX < 0;

  // Move
  leaf.y += leaf.speedY;
  leaf.x += leaf.speedX + driftX;

  // Add mouse interaction breeze
  if (mouseWind.strength > 0) {
    const dx = leaf.x - mouseWind.x;
    const dy = leaf.y - mouseWind.y;
    const distSq = dx * dx + dy * dy;
    if (distSq < 25000 && distSq > 1) {
      const dist = Math.sqrt(distSq);
      const force = (1 - dist / 158) * mouseWind.strength;
      leaf.x += (dx / dist) * force * 3;
      leaf.y += (dy / dist) * force * 1.5;
      leaf.rotation += 0.03;
    }
  }

  leaf.rotation += leaf.rotationSpeed + sway * 0.005;

  ctx.save();
  ctx.translate(leaf.x, leaf.y);
  ctx.rotate(leaf.rotation + sway * 0.25);
  ctx.scale(scaleX, 1); // 3D tumbling effect!
  ctx.globalAlpha = leaf.opacity;

  // Fill color (front or paler back underside)
  ctx.fillStyle = isBackside ? leaf.palette.back : leaf.palette.front;

  // Draw according to leaf anatomy
  if (leaf.type === 0) {
    drawMonsteraLeaf(ctx, leaf.size, isBackside);
  } else if (leaf.type === 1) {
    drawFicusLeaf(ctx, leaf.size, isBackside);
  } else if (leaf.type === 2) {
    drawGinkgoLeaf(ctx, leaf.size, isBackside);
  } else {
    drawWillowLeaf(ctx, leaf.size, isBackside);
  }

  ctx.restore();
}
