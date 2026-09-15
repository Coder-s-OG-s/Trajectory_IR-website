'use client';

import React, { useState, useEffect, useRef } from 'react';

export type ColorThemeId =
  | 'adaptive'
  | 'cyber-cyan'
  | 'electric-rose'
  | 'emerald-matrix'
  | 'cosmic-purple'
  | 'solar-amber'
  | 'moonlight-silver'
  | 'custom';

export interface FXControls {
  trackHeightVh: number;  // 200 - 800 vh
  maxRadius: number;      // 80 - 450 px
  alpha: number;          // 0.2 - 1.0
  decaySpeed: number;     // 0.003 - 0.025
  spawnDensity: number;   // 1 - 8
  curlForce: number;      // 0.02 - 0.25
  holdBufferPct: number;  // 5 - 30 %
  pixelBrightness: number; // 0.15 - 1.5
  colorTheme: ColorThemeId;
  customColorHex: string;
}

export const COLOR_THEMES: Record<
  ColorThemeId,
  { name: string; primaryHex: string; secondaryHex: string; tag: string }
> = {
  adaptive: {
    name: 'Dual Adaptive',
    primaryHex: '#f43f5e',
    secondaryHex: '#38bdf8',
    tag: 'Rose (Crisis) + Cyan (Code)',
  },
  'cyber-cyan': {
    name: 'Cyber Cyan',
    primaryHex: '#00f0ff',
    secondaryHex: '#38bdf8',
    tag: 'Sci-Fi Azure & Electric Cyan',
  },
  'electric-rose': {
    name: 'Neon Rose',
    primaryHex: '#f43f5e',
    secondaryHex: '#fb7185',
    tag: 'Vivid Crimson & Coral',
  },
  'emerald-matrix': {
    name: 'Matrix Mint',
    primaryHex: '#10b981',
    secondaryHex: '#34d399',
    tag: 'Cyberpunk Terminal Emerald',
  },
  'cosmic-purple': {
    name: 'Cosmic Violet',
    primaryHex: '#8b5cf6',
    secondaryHex: '#c084fc',
    tag: 'Deep Neural AI Violet',
  },
  'solar-amber': {
    name: 'Solar Amber',
    primaryHex: '#f59e0b',
    secondaryHex: '#fb923c',
    tag: 'Warm Gold & Radiant Flame',
  },
  'moonlight-silver': {
    name: 'Moonlight',
    primaryHex: '#ffffff',
    secondaryHex: '#cbd5e1',
    tag: 'Swiss Architectural Silver',
  },
  custom: {
    name: 'Custom Palette',
    primaryHex: '#38bdf8',
    secondaryHex: '#ffffff',
    tag: 'Choose Any Custom Color',
  },
};

const DEFAULT_CONTROLS: FXControls = {
  trackHeightVh: 800,
  maxRadius: 350,
  alpha: 0.25,
  decaySpeed: 0.02,
  spawnDensity: 3,
  curlForce: 0.18,
  holdBufferPct: 5,
  pixelBrightness: 0.7,
  colorTheme: 'cosmic-purple',
  customColorHex: '#38bdf8',
};

export function ProblemStatement() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const prevCursorPos = useRef<{ x: number; y: number } | null>(null);
  const pixelMousePos = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const [controls, setControls] = useState<FXControls>(DEFAULT_CONTROLS);
  const controlsRef = useRef<FXControls>(DEFAULT_CONTROLS);
  controlsRef.current = controls;

  const [progress, setProgress] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // The core problem statement narrative
  const headline = "Autonomous agents fail unpredictably in production.";
  const paragraph =
    "When an autonomous process crashes mid-flight, state vanishes into thin air. Traditional runtimes blindly retry non-idempotent tool calls, triggering double-spends and corrupted infrastructure. Re-prompting generative models causes silent plan drift, while execution traces remain trapped in proprietary black-box checkpoints.";
  const conclusion =
    "Without deterministic execution semantics, agentic autonomy remains an uninsurable liability.";

  // Scroll tracking
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (trackRef.current) {
            const rect = trackRef.current.getBoundingClientRect();
            const totalScroll = rect.height - window.innerHeight;
            if (totalScroll > 0) {
              const current = -rect.top;
              const p = Math.min(Math.max(current / totalScroll, 0), 1);
              setProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Universal keyboard shortcut (Shift + H) to toggle tuner panel across Mac/Win/Linux
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.shiftKey && (e.key === 'H' || e.key === 'h')) {
        e.preventDefault();
        setPanelOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setPanelOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Interactive Pixel Matrix Grid (Pixels illuminate / burn bright on mouse hover like real glowing pixels)
  useEffect(() => {
    const canvas = pixelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const spacing = 13;
    const pixelSize = 4.5;
    let animId: number;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let numPixels = 0;

    let pox = new Float32Array(0);
    let poy = new Float32Array(0);
    let pheat = new Float32Array(0);
    let isLogoPixel = new Uint8Array(0);
    let logoWeight = new Float32Array(0);

    const initGrid = () => {
      if (!viewportRef.current || !canvas) return;
      width = canvas.width = viewportRef.current.clientWidth;
      height = canvas.height = viewportRef.current.clientHeight;

      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      numPixels = cols * rows;

      pox = new Float32Array(numPixels);
      poy = new Float32Array(numPixels);
      pheat = new Float32Array(numPixels);
      isLogoPixel = new Uint8Array(numPixels);
      logoWeight = new Float32Array(numPixels);

      // Trajectory IR Logo dimensions: enlarged & vertically adjusted upwards to fit the stripes comfortably
      const logoSize = Math.min(width * 0.94, height * 1.12, 940);
      const logoLeft = (width - logoSize) / 2;
      // Visual center of the 4 stripes is around ny = 100.5 (in 150px space).
      // Placing visual stripe center at 45% of viewport height aligns the logo beautifully without clipping.
      const logoTop = height * 0.45 - logoSize * (100.5 / 150);

      let idx = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * spacing;
          const oy = r * spacing;
          pox[idx] = ox;
          poy[idx] = oy;
          pheat[idx] = 0;

          // Compute exact logo stripe membership in 150x150 canonical space
          const nx = ((ox - logoLeft) / logoSize) * 150;
          const ny = ((oy - logoTop) / logoSize) * 150;

          if (ny >= 56 && ny <= 145 && nx >= 0 && nx <= 150) {
            const e0 = -1.14 * ny + 111.8;
            const e1 = -0.60 * ny + 93.5;
            const e2 = -0.50 * ny + 91.8;
            const e3 = -0.14 * ny + 81.0;
            const e4 =  0.14 * ny + 68.0;
            const e5 =  0.50 * ny + 56.8;
            const e6 =  0.60 * ny + 55.5;
            const e7 =  1.14 * ny + 37.2;

            const s1 = (nx >= Math.max(0, e0) && nx <= e1);
            const s2 = (nx >= e2 && nx <= e3);
            const s3 = (nx >= e4 && nx <= e5);
            const s4 = (nx >= e6 && nx <= Math.min(150, e7));

            if (s1 || s2 || s3 || s4) {
              isLogoPixel[idx] = 1;
              const topFade = Math.min(1, Math.max(0.4, (ny - 56) / 14));
              logoWeight[idx] = topFade;
            }
          }

          idx++;
        }
      }

      // Also sample the brand image alpha channel for 100% pixel fidelity
      const brandImg = new Image();
      brandImg.src = '/brand-logo.png';
      brandImg.onload = () => {
        try {
          const offCanvas = document.createElement('canvas');
          offCanvas.width = 150;
          offCanvas.height = 150;
          const offCtx = offCanvas.getContext('2d');
          if (offCtx) {
            offCtx.drawImage(brandImg, 0, 0, 150, 150);
            const imgData = offCtx.getImageData(0, 0, 150, 150).data;
            for (let i = 0; i < numPixels; i++) {
              const ox = pox[i];
              const oy = poy[i];
              const nx = Math.round(((ox - logoLeft) / logoSize) * 150);
              const ny = Math.round(((oy - logoTop) / logoSize) * 150);
              if (nx >= 0 && nx < 150 && ny >= 0 && ny < 150) {
                const a = imgData[(ny * 150 + nx) * 4 + 3];
                if (a > 50) {
                  isLogoPixel[i] = 1;
                  logoWeight[i] = Math.max(0.4, a / 255);
                } else {
                  isLogoPixel[i] = 0;
                  logoWeight[i] = 0;
                }
              }
            }
          }
        } catch {
          // Fallback to mathematical stripes already calculated above
        }
      };
    };

    initGrid();
    window.addEventListener('resize', initGrid);

    // Mouse tracking over sticky viewport
    const handleMouseMove = (e: MouseEvent) => {
      if (viewportRef.current) {
        const rect = viewportRef.current.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          pixelMousePos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true,
          };
        } else {
          pixelMousePos.current.active = false;
        }
      }
    };

    const handleMouseLeave = () => {
      pixelMousePos.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = pixelMousePos.current.x;
      const my = pixelMousePos.current.y;
      const isMouseActive = pixelMousePos.current.active;

      // Extract current theme glow colors for burning pixel illumination
      const cfg = controlsRef.current;
      const palette = COLOR_THEMES[cfg?.colorTheme || 'cosmic-purple'] || COLOR_THEMES['cosmic-purple'];
      const cleanHex = (palette.primaryHex || '#38bdf8').replace('#', '');
      const glowR = parseInt(cleanHex.substring(0, 2), 16) || 56;
      const glowG = parseInt(cleanHex.substring(2, 4), 16) || 189;
      const glowB = parseInt(cleanHex.substring(4, 6), 16) || 248;

      const pBrightness = cfg?.pixelBrightness ?? 0.7;
      const bScale = pBrightness / 0.7; // 1.0 at default 0.7

      if (isMouseActive && cols > 0 && rows > 0) {
        // 1. Mouse Cursor Ignition: Ignite closest pixel under cursor
        const c0 = Math.round(mx / spacing);
        const r0 = Math.round(my / spacing);

        const candidates: { idx: number; dist: number }[] = [];
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const c = c0 + dc;
            const r = r0 + dr;
            if (c >= 0 && c < cols && r >= 0 && r < rows) {
              const idx = r * cols + c;
              const dx = pox[idx] - mx;
              const dy = poy[idx] - my;
              const dist = Math.hypot(dx, dy);
              if (dist <= 14) {
                candidates.push({ idx, dist });
              }
            }
          }
        }

        candidates.sort((a, b) => a.dist - b.dist);
        if (candidates.length > 0 && candidates[0].dist <= 14) {
          const idx = candidates[0].idx;
          const heat = Math.max(0.6, 1 - candidates[0].dist / 14) * bScale;
          if (heat > pheat[idx]) pheat[idx] = heat;
        }

        // 2. Trajectory IR Logo Pixel Burn: Hovering near/over logo ignites its 4-stripe pixels
        const logoHoverRadius = 170;
        const minC = Math.max(0, Math.floor((mx - logoHoverRadius) / spacing));
        const maxC = Math.min(cols - 1, Math.ceil((mx + logoHoverRadius) / spacing));
        const minR = Math.max(0, Math.floor((my - logoHoverRadius) / spacing));
        const maxR = Math.min(rows - 1, Math.ceil((my + logoHoverRadius) / spacing));

        for (let r = minR; r <= maxR; r++) {
          const rowOffset = r * cols;
          for (let c = minC; c <= maxC; c++) {
            const idx = rowOffset + c;
            if (isLogoPixel[idx] === 1) {
              const dx = pox[idx] - mx;
              const dy = poy[idx] - my;
              const distSq = dx * dx + dy * dy;
              if (distSq < logoHoverRadius * logoHoverRadius) {
                const dist = Math.sqrt(distSq);
                const norm = 1 - dist / logoHoverRadius;
                // Modulated dynamically by pixel brightness slider
                const targetHeat = Math.pow(norm, 1.3) * logoWeight[idx] * (0.65 * bScale);
                if (targetHeat > pheat[idx]) {
                  pheat[idx] = targetHeat;
                }
              }
            }
          }
        }
      }

      ctx.beginPath();
      const hotIndices: number[] = [];

      for (let i = 0; i < numPixels; i++) {
        pheat[i] *= 0.88; // smooth, elegant cool-down

        if (pheat[i] > 0.02) {
          hotIndices.push(i);
        } else {
          ctx.rect(pox[i], poy[i], pixelSize, pixelSize);
        }
      }

      // 1. Draw resting pixels (calm subtle Swiss grid)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.065)';
      ctx.fill();

      // 2. Draw burning / illuminated pixels (subtle incandescent glow modulated by brightness slider)
      if (hotIndices.length > 0) {
        // Soft luminous halo
        for (let j = 0; j < hotIndices.length; j++) {
          const idx = hotIndices[j];
          const heat = pheat[idx];
          if (heat > 0.16) {
            const ox = pox[idx];
            const oy = poy[idx];
            const haloSize = pixelSize + heat * 3.5;
            const offset = (haloSize - pixelSize) / 2;
            const haloAlpha = Math.min(0.65, heat * 0.16 * bScale);
            ctx.fillStyle = `rgba(${glowR}, ${glowG}, ${glowB}, ${haloAlpha})`;
            ctx.fillRect(ox - offset, oy - offset, haloSize, haloSize);
          }
        }

        // Core lit pixel with dynamic, subtle brightness
        for (let j = 0; j < hotIndices.length; j++) {
          const idx = hotIndices[j];
          const heat = pheat[idx];
          const ox = pox[idx];
          const oy = poy[idx];

          const alpha = Math.min(1.0, (0.12 + heat * 0.62) * bScale);
          if (heat > 0.42) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          } else {
            const cr = Math.round(210 + heat * 45);
            const cg = Math.round(225 + heat * 30);
            ctx.fillStyle = `rgba(${cr}, ${cg}, 255, ${alpha})`;
          }
          ctx.fillRect(ox, oy, pixelSize, pixelSize);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', initGrid);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Fluid effect attached to the typewriter cursor
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      decay: number;
      color: { r: number; g: number; b: number };
      curlAngle: number;
      curlSpeed: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 260;
    let animId: number;

    const resize = () => {
      if (viewportRef.current && canvas) {
        canvas.width = viewportRef.current.clientWidth;
        canvas.height = viewportRef.current.clientHeight;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Render loop
    const render = () => {
      const cfg = controlsRef.current;

      // Check cursor position and spawn wide-radius fluid plumes when cursor advances forward
      if (cursorRef.current && viewportRef.current) {
        const cRect = cursorRef.current.getBoundingClientRect();
        const vRect = viewportRef.current.getBoundingClientRect();

        const curX = cRect.left - vRect.left + cRect.width / 2;
        const curY = cRect.top - vRect.top + cRect.height / 2;

        if (prevCursorPos.current) {
          const dx = curX - prevCursorPos.current.x;
          const dy = curY - prevCursorPos.current.y;
          const dist = Math.hypot(dx, dy);

          // If cursor moved forward (due to typing/scrolling)
          if (dist > 0.8) {
            // Determine active stage color based on selected theme
            let baseColor: { r: number; g: number; b: number };

            if (cfg.colorTheme === 'adaptive') {
              const isRose = progress < 0.24 || progress >= 0.64;
              baseColor = isRose
                ? (Math.random() > 0.35 ? { r: 244, g: 63, b: 94 } : { r: 251, g: 113, b: 133 })
                : (Math.random() > 0.35 ? { r: 0, g: 210, b: 255 } : { r: 56, g: 189, b: 248 });
            } else if (cfg.colorTheme === 'cyber-cyan') {
              baseColor = Math.random() > 0.4 ? { r: 0, g: 240, b: 255 } : { r: 56, g: 189, b: 248 };
            } else if (cfg.colorTheme === 'electric-rose') {
              baseColor = Math.random() > 0.4 ? { r: 244, g: 63, b: 94 } : { r: 251, g: 113, b: 133 };
            } else if (cfg.colorTheme === 'emerald-matrix') {
              baseColor = Math.random() > 0.4 ? { r: 16, g: 185, b: 129 } : { r: 52, g: 211, b: 153 };
            } else if (cfg.colorTheme === 'cosmic-purple') {
              baseColor = Math.random() > 0.4 ? { r: 139, g: 92, b: 246 } : { r: 192, g: 132, b: 252 };
            } else if (cfg.colorTheme === 'solar-amber') {
              baseColor = Math.random() > 0.4 ? { r: 245, g: 158, b: 11 } : { r: 251, g: 146, b: 60 };
            } else if (cfg.colorTheme === 'moonlight-silver') {
              baseColor = Math.random() > 0.4 ? { r: 255, g: 255, b: 255 } : { r: 203, g: 213, b: 225 };
            } else {
              // Custom hex color
              const cleanHex = cfg.customColorHex.replace('#', '');
              const r = parseInt(cleanHex.substring(0, 2), 16) || 56;
              const g = parseInt(cleanHex.substring(2, 4), 16) || 189;
              const b = parseInt(cleanHex.substring(4, 6), 16) || 248;
              baseColor = { r, g, b };
            }

            // Spawn count governed by user slider
            const spawnCount = Math.min(Math.max(Math.floor(dist * 0.35) + 1, 1), cfg.spawnDensity);

            for (let i = 0; i < spawnCount; i++) {
              if (particles.length >= maxParticles) {
                particles.shift();
              }

              const angle = Math.random() * Math.PI * 2;
              const force = (Math.random() * 3.5 + 1.0) * (cfg.curlForce * 8);

              particles.push({
                x: curX + (Math.random() - 0.5) * 16,
                y: curY + (Math.random() - 0.5) * 16,
                vx: dx * 0.2 + Math.cos(angle) * force,
                vy: dy * 0.2 + Math.sin(angle) * force,
                radius: Math.random() * 25 + 35,
                maxRadius: cfg.maxRadius * (0.8 + Math.random() * 0.4),
                alpha: cfg.alpha,
                decay: cfg.decaySpeed * (0.8 + Math.random() * 0.4),
                color: baseColor,
                curlAngle: Math.random() * Math.PI * 2,
                curlSpeed: (Math.random() - 0.5) * cfg.curlForce,
              });
            }
          }
        }

        prevCursorPos.current = { x: curX, y: curY };
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Hydrodynamic curl vortex
        p.curlAngle += p.curlSpeed;
        p.vx += Math.cos(p.curlAngle) * (cfg.curlForce * 1.5);
        p.vy += Math.sin(p.curlAngle) * (cfg.curlForce * 1.5);

        p.vx *= 0.95;
        p.vy *= 0.95;

        p.x += p.vx;
        p.y += p.vy;

        // Volumetric expansion
        p.radius += (p.maxRadius - p.radius) * 0.038;
        p.alpha -= p.decay;

        if (p.alpha <= 0.005) {
          particles.splice(i, 1);
          continue;
        }

        // Broad atmospheric radial gradient with soft multi-stop falloff
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.85})`);
        grad.addColorStop(0.2, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.5})`);
        grad.addColorStop(0.55, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.18})`);
        grad.addColorStop(0.85, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.04})`);
        grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Compute character counts for progressive typewriter effect based on dynamic hold buffer
  const headlineLength = headline.length;
  const paragraphLength = paragraph.length;
  const conclusionLength = conclusion.length;

  const holdFrac = controls.holdBufferPct / 100;
  const activeFrac = 1 - holdFrac;
  const stage1End = activeFrac * 0.28;
  const stage2End = activeFrac * 0.74;
  const stage3End = activeFrac;

  const headlineProgress = Math.min(Math.max(progress / stage1End, 0), 1);
  const paragraphProgress = Math.min(Math.max((progress - stage1End) / (stage2End - stage1End), 0), 1);
  const conclusionProgress = Math.min(Math.max((progress - stage2End) / (stage3End - stage2End), 0), 1);

  const visibleHeadlineCount = Math.floor(headlineProgress * headlineLength);
  const visibleParagraphCount = Math.floor(paragraphProgress * paragraphLength);
  const visibleConclusionCount = Math.floor(conclusionProgress * conclusionLength);

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(controls, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (preset: Partial<FXControls>) => {
    setControls((prev) => ({ ...prev, ...preset }));
  };

  const activeTheme = COLOR_THEMES[controls.colorTheme] || COLOR_THEMES['cosmic-purple'];
  const primaryColor = activeTheme.primaryHex || '#38bdf8';
  const secondaryColor = activeTheme.secondaryHex || '#818cf8';

  return (
    <div className="w-full relative z-10">
      {/* Scroll Track with dynamically adjustable height from slider */}
      <div 
        ref={trackRef} 
        className="relative w-full"
        style={{ height: `${controls.trackHeightVh}vh` }}
      >
        {/* Sticky Lock Viewport */}
        <div 
          ref={viewportRef}
          className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden select-none"
        >
          {/* Fluid Canvas Overlay Attached To Moving Typewriter Cursor */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-20 w-full h-full"
            style={{ mixBlendMode: 'screen' }}
            aria-hidden="true"
          />
          
          {/* Interactive Pixel Matrix Grid (Pixels illuminate / burn bright on mouse hover) */}
          <canvas
            ref={pixelCanvasRef}
            className="absolute inset-0 pointer-events-none select-none z-0 w-full h-full"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          {/* Content Wrapper */}
          <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-12 md:px-16 flex flex-col justify-between items-center py-12 sm:py-16 h-full">
          
          {/* Header Eyebrow Tag */}
          <div className="w-full flex items-center justify-between mb-8 sm:mb-12 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span 
                className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/50 font-mono"
              >
                [01 // THE PRODUCTION CRISIS]
              </span>
            </div>
            <div className="text-xs sm:text-sm font-mono text-white/40">
              SCRUB: {Math.round(progress * 100)}%
            </div>
          </div>

          {/* Typewriter Text Stage */}
          <div className="w-full space-y-6 sm:space-y-8 text-left">
            
            {/* 1. Main Headline */}
            <div
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.15]"
              style={{
                fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 300,
                letterSpacing: '-0.03em',
              }}
            >
              <span>{headline.slice(0, visibleHeadlineCount)}</span>
              {headlineProgress < 1 && (
                <span 
                  ref={cursorRef}
                  className="inline-block w-0 h-[0.9em] opacity-0 pointer-events-none select-none" 
                />
              )}
              <span className="text-white/10 select-none">
                {headline.slice(visibleHeadlineCount)}
              </span>
            </div>

            {/* 2. Problem Detail Narrative */}
            <div
              className="text-base sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-4xl"
              style={{
                fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 300,
              }}
            >
              <span>{paragraph.slice(0, visibleParagraphCount)}</span>
              {headlineProgress >= 1 && paragraphProgress < 1 && (
                <span 
                  ref={cursorRef}
                  className="inline-block w-0 h-[0.9em] opacity-0 pointer-events-none select-none" 
                />
              )}
              <span className="text-white/10 select-none">
                {paragraph.slice(visibleParagraphCount)}
              </span>
            </div>

            {/* 3. Hard-hitting Conclusion */}
            <div
              className="text-sm sm:text-lg md:text-xl text-rose-300/90 font-mono tracking-wide pt-2"
            >
              <span>{conclusion.slice(0, visibleConclusionCount)}</span>
              {paragraphProgress >= 1 && conclusionProgress < 1 && (
                <span 
                  ref={cursorRef}
                  className="inline-block w-0 h-[0.9em] opacity-0 pointer-events-none select-none" 
                />
              )}
              <span className="text-white/10 select-none">
                {conclusion.slice(visibleConclusionCount)}
              </span>
            </div>

          </div>

          {/* Subtle Bottom Scroll Cue */}
          <div className="w-full flex items-center justify-between mt-12 sm:mt-16 pt-4 border-t border-white/5 text-white/30 text-xs font-mono">
            <span>SCROLL TO ADVANCE NARRATIVE</span>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">NEXT: THE TRANSITION</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 2v10M2 7l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* FLOATING LIVE FX & SCROLL TUNING PANEL */}
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {panelOpen ? (
        <div className="w-[340px] sm:w-[390px] max-h-[85vh] overflow-y-auto rounded-2xl bg-[#091526]/95 border border-white/20 backdrop-blur-2xl shadow-2xl p-5 text-white select-none transition-all scrollbar-thin">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
                ✦ FX & Color Live Tuner
              </span>
            </div>
            <button
              onClick={() => setPanelOpen(false)}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white/80 transition-colors cursor-pointer"
              title="Close Panel"
            >
              ✕
            </button>
          </div>

          {/* Controls List */}
          <div className="space-y-4 text-xs">
            
            {/* COLOR PALETTE SELECTOR */}
            <div className="space-y-2 p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="flex justify-between items-center font-mono">
                <span className="text-white/80 font-bold">🎨 Smoke Color Palette:</span>
                <span className="text-sky-300 text-[11px]">{COLOR_THEMES[controls.colorTheme].name}</span>
              </div>
              
              {/* Color Swatch Buttons */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {(Object.keys(COLOR_THEMES) as ColorThemeId[]).map((themeKey) => {
                  const t = COLOR_THEMES[themeKey];
                  const isSelected = controls.colorTheme === themeKey;
                  return (
                    <button
                      key={themeKey}
                      onClick={() => setControls({ ...controls, colorTheme: themeKey })}
                      className={`px-2 py-1.5 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/15 border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'
                      }`}
                    >
                      <div className="flex items-center -space-x-1 shrink-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40 inline-block shadow-sm"
                          style={{ backgroundColor: t.primaryHex }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40 inline-block shadow-sm"
                          style={{ backgroundColor: t.secondaryHex }}
                        />
                      </div>
                      <span className="text-[11px] truncate font-medium text-white/90">{t.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Color Input if 'custom' is active */}
              {controls.colorTheme === 'custom' && (
                <div className="flex items-center gap-3 pt-2 mt-1 border-t border-white/10">
                  <span className="text-[11px] text-white/70">Pick Hex:</span>
                  <input
                    type="color"
                    value={controls.customColorHex}
                    onChange={(e) => setControls({ ...controls, customColorHex: e.target.value })}
                    className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <span className="font-mono text-xs text-sky-300">{controls.customColorHex}</span>
                </div>
              )}
            </div>

            {/* 1. Scroll Runway (Speed) */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-white/70">Scroll Runway (Speed):</span>
                <span className="text-sky-300 font-semibold">{controls.trackHeightVh ?? 800}vh</span>
              </div>
              <input
                type="range"
                min="200"
                max="800"
                step="20"
                value={controls.trackHeightVh ?? 800}
                onChange={(e) => setControls({ ...controls, trackHeightVh: Number(e.target.value) })}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40">
                <span>Fast (200vh)</span>
                <span>Ultra-Slow (800vh)</span>
              </div>
            </div>

            {/* 2. Smoke Radius */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-white/70">Smoke Radius:</span>
                <span className="text-cyan-300 font-semibold">{controls.maxRadius ?? 350}px</span>
              </div>
              <input
                type="range"
                min="80"
                max="450"
                step="10"
                value={controls.maxRadius ?? 350}
                onChange={(e) => setControls({ ...controls, maxRadius: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40">
                <span>Tight (80px)</span>
                <span>Expansive (450px)</span>
              </div>
            </div>

            {/* 3. Glow Opacity */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-white/70">Smoke Opacity (Alpha):</span>
                <span className="text-rose-300 font-semibold">{Math.round((controls.alpha ?? 0.25) * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={controls.alpha ?? 0.25}
                onChange={(e) => setControls({ ...controls, alpha: Number(e.target.value) })}
                className="w-full accent-rose-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40">
                <span>Soft (20%)</span>
                <span>Vivid (100%)</span>
              </div>
            </div>

            {/* 4. Dissolve Rate (Hang Time) */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-white/70">Dissolve Speed:</span>
                <span className="text-amber-300 font-semibold">{(controls.decaySpeed ?? 0.02).toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.003"
                max="0.020"
                step="0.001"
                value={controls.decaySpeed ?? 0.02}
                onChange={(e) => setControls({ ...controls, decaySpeed: Number(e.target.value) })}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40">
                <span>Lingering (Slow)</span>
                <span>Snappy (Fast)</span>
              </div>
            </div>

            {/* 5. Particle Density */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-white/70">Particle Density:</span>
                <span className="text-purple-300 font-semibold">{controls.spawnDensity ?? 3} plumes</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={controls.spawnDensity ?? 3}
                onChange={(e) => setControls({ ...controls, spawnDensity: Number(e.target.value) })}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            {/* 6. Swirl Turbulence */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-white/70">Swirl Turbulence:</span>
                <span className="text-teal-300 font-semibold">{(controls.curlForce ?? 0.18).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.02"
                max="0.25"
                step="0.01"
                value={controls.curlForce ?? 0.18}
                onChange={(e) => setControls({ ...controls, curlForce: Number(e.target.value) })}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>

            {/* 7. Reading Hold Buffer */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-white/70">Hold Runway Buffer:</span>
                <span className="text-sky-300 font-semibold">{controls.holdBufferPct ?? 5}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={controls.holdBufferPct ?? 5}
                onChange={(e) => setControls({ ...controls, holdBufferPct: Number(e.target.value) })}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            {/* 8. Logo Pixel Matrix Brightness */}
            <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="flex justify-between font-mono">
                <span className="text-white/90 font-bold flex items-center gap-1.5">
                  <span>✨</span> Pixel Logo Brightness:
                </span>
                <span className="text-emerald-300 font-semibold">{Math.round((controls.pixelBrightness ?? 0.7) * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.15"
                max="1.5"
                step="0.05"
                value={controls.pixelBrightness ?? 0.7}
                onChange={(e) => setControls({ ...controls, pixelBrightness: Number(e.target.value) })}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>Ultra-Subtle (15%)</span>
                <span>Default (70%)</span>
                <span>Vivid (150%)</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[11px] text-white/50 font-mono block mb-2">QUICK PRESETS:</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => applyPreset({ trackHeightVh: 650, maxRadius: 320, alpha: 0.85, decaySpeed: 0.005, spawnDensity: 5, curlForce: 0.14, holdBufferPct: 18, pixelBrightness: 0.85, colorTheme: 'cyber-cyan' })}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-[10px] text-sky-200 transition-colors text-left cursor-pointer"
                >
                  ✦ Cyber Cyan Slow
                </button>
                <button
                  onClick={() => applyPreset(DEFAULT_CONTROLS)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-[10px] text-white/80 transition-colors text-left cursor-pointer"
                >
                  ✦ Default (Cosmic Purple)
                </button>
                <button
                  onClick={() => applyPreset({ trackHeightVh: 520, maxRadius: 380, alpha: 0.9, decaySpeed: 0.004, spawnDensity: 6, curlForce: 0.16, holdBufferPct: 15, pixelBrightness: 0.75, colorTheme: 'cosmic-purple' })}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-[10px] text-purple-200 transition-colors text-left cursor-pointer"
                >
                  ✦ Cosmic Violet
                </button>
                <button
                  onClick={() => applyPreset({ trackHeightVh: 500, maxRadius: 350, alpha: 0.85, decaySpeed: 0.005, spawnDensity: 5, curlForce: 0.12, holdBufferPct: 14, pixelBrightness: 0.8, colorTheme: 'emerald-matrix' })}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-[10px] text-emerald-200 transition-colors text-left cursor-pointer"
                >
                  ✦ Matrix Emerald
                </button>
              </div>
            </div>

            {/* Copy Config Button */}
            <div className="pt-2">
              <button
                onClick={handleCopyConfig}
                className="w-full py-2 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <span className="text-emerald-400">✓</span> Copied Settings JSON!
                  </>
                ) : (
                  <>
                    <span>📋</span> Copy Best Settings JSON
                  </>
                )}
              </button>
            </div>

            {/* Shortcut helper hint */}
            <div className="text-center pt-2 text-[10px] text-white/40 font-mono">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300">Shift + H</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300">Esc</kbd> to close
            </div>

          </div>
        </div>
      ) : null}
    </div>
    </div>
  );
}
