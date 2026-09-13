'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Architecture3DModel } from './architecture-3d-model';

export function ProblemSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const pinTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (pinTrackRef.current) {
            const rect = pinTrackRef.current.getBoundingClientRect();
            const totalScroll = rect.height - window.innerHeight;
            if (totalScroll > 0) {
              const current = -rect.top;
              const progress = Math.min(Math.max(current / totalScroll, 0), 1);
              setScrollProgress(progress);
              setIsLocked(rect.top <= 10 && rect.bottom >= window.innerHeight - 10);
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

  // Four-Phase In-Stage Choreography (over h-[900vh]):
  // Phase 1: "meets" journeys across the corridor to meet "Solution]" (scrollProgress 0.0 -> 0.14)
  const meetsProgress = Math.min(scrollProgress / 0.14, 1.0);

  // Problem touch ratio (1.0 at start, decays to 0.0 as meets departs by meetsProgress = 0.20)
  const problemTouchRatio = Math.max(0, Math.min(1, (0.20 - meetsProgress) / 0.20));

  // Solution touch ratio (0.0 until meetsProgress = 0.78, rises to 1.0 as meets docks with Solution])
  const solutionTouchRatio = Math.max(0, Math.min(1, (meetsProgress - 0.78) / 0.22));

  // Interpolated RGB for [The Problem (white #ffffff -> crisis red #f43f5e while touched by meets)
  const prR = Math.round(255 - problemTouchRatio * (255 - 244));
  const prG = Math.round(255 - problemTouchRatio * (255 - 63));
  const prB = Math.round(255 - problemTouchRatio * (255 - 94));
  const problemColor = `rgb(${prR}, ${prG}, ${prB})`;
  const problemShadow = problemTouchRatio > 0.05
    ? `0 0 ${Math.round(22 * problemTouchRatio)}px rgba(244, 63, 94, ${0.45 * problemTouchRatio})`
    : 'none';

  // Interpolated RGB for Solution] (white #ffffff -> radiant mint seafoam #a4f4d0 matching user screenshot exactly)
  const solR = Math.round(255 - solutionTouchRatio * (255 - 164));
  const solG = Math.round(255 - solutionTouchRatio * (255 - 244));
  const solB = Math.round(255 - solutionTouchRatio * (255 - 208));
  const solutionColor = `rgb(${solR}, ${solG}, ${solB})`;
  const solutionShadow = solutionTouchRatio > 0.05
    ? `0 0 ${Math.round(24 * solutionTouchRatio)}px rgba(164, 244, 208, ${0.45 * solutionTouchRatio})`
    : 'none';

  // Phase 2: Scroll Zoom Reveal (Starts strictly AFTER the meeting of meets with Solution], from 0.14 to 0.26)
  const rawZoom = Math.max(0, Math.min(1, (scrollProgress - 0.14) / 0.12));
  // Smooth cubic ease curve for cinematic Framer-style scroll zoom reveal
  const easeZoom = rawZoom * rawZoom * (3 - 2 * rawZoom);

  // Phase 3: 3D Exploded Layer Architecture Schematic (Expands layers & opens 3D stack from 0.22 to 0.32)
  const rawExplosion = Math.max(0, Math.min(1, (scrollProgress - 0.22) / 0.10));
  const expansionProgress = rawExplosion * rawExplosion * (3 - 2 * rawExplosion);

  // Phase 3.5: Smooth Right Shift Transition (0.30 to 0.40)
  // Glides 3D model smoothly to the right side to reveal left-hand deep-dive storytelling
  const rawShift = Math.max(0, Math.min(1, (scrollProgress - 0.30) / 0.10));
  const shiftProgress = rawShift * rawShift * (3 - 2 * rawShift);

  // Phase 4: In-Stage Layer-by-Layer Walkthrough (0.40 to 0.96)
  // Walks through Layer 5 down to Layer 1 entirely INSIDE this pinned stage
  let activeScrollLayer: number | null = null;
  let layerScrubProgress = 0;

  if (scrollProgress >= 0.40 && scrollProgress < 0.51) {
    activeScrollLayer = 5;
    layerScrubProgress = Math.max(0, Math.min(1, (scrollProgress - 0.40) / 0.11));
  } else if (scrollProgress >= 0.51 && scrollProgress < 0.62) {
    activeScrollLayer = 4;
    layerScrubProgress = Math.max(0, Math.min(1, (scrollProgress - 0.51) / 0.11));
  } else if (scrollProgress >= 0.62 && scrollProgress < 0.73) {
    activeScrollLayer = 3;
    layerScrubProgress = Math.max(0, Math.min(1, (scrollProgress - 0.62) / 0.11));
  } else if (scrollProgress >= 0.73 && scrollProgress < 0.84) {
    activeScrollLayer = 2;
    layerScrubProgress = Math.max(0, Math.min(1, (scrollProgress - 0.73) / 0.11));
  } else if (scrollProgress >= 0.84 && scrollProgress <= 0.96) {
    activeScrollLayer = 1;
    layerScrubProgress = Math.max(0, Math.min(1, (scrollProgress - 0.84) / 0.12));
  }

  return (
    <div className="w-full relative z-10">
      {/* 1. Scroll-Pinned / Locked Stage for 3D ScrollTrigger & In-Stage Walkthrough (Height: 900vh) */}
      <div 
        ref={pinTrackRef} 
        id="problem-3d-stage"
        className="relative w-full h-[900vh]"
      >
        {/* Sticky Lock Viewport: Minimalist Glassmorphism Stage with Fullscreen Zoom Reveal */}
        <div className="sticky top-0 h-screen w-full overflow-hidden select-none flex items-center justify-center">
          
          {/* 3 Massive Trajectory_IR Background Marquee Ribbons (1: L->R, 2: R->L, 3: L->R) */}
          <div 
            className="absolute inset-0 w-full h-full flex flex-col justify-between pointer-events-none select-none z-0 overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-6 sm:pb-8"
            style={{
              opacity: Math.max(0.15, 1 - easeZoom * 0.8),
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
            aria-hidden="true"
          >
            {/* Ribbon 1: Left to Right (Top Area) */}
            <div className="w-full overflow-hidden flex items-center opacity-60">
              <div className="animate-marquee-right flex items-center gap-5 sm:gap-6 shrink-0">
                {[0, 1].map((idx) => (
                  <div key={idx} className="flex items-center gap-5 sm:gap-6 shrink-0">
                    {[0, 1, 2, 3, 4].map((subIdx) => (
                      <span 
                        key={subIdx}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[10.5rem] 2xl:text-[11.5rem] font-black uppercase tracking-tighter leading-none whitespace-nowrap"
                        style={{
                          fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
                          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(186, 230, 253, 0.08) 60%, rgba(56, 189, 248, 0.02) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        Trajectory_IR
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Ribbon 2: Right to Left (Middle Area - passes directly behind center card) */}
            <div className="w-full overflow-hidden flex items-center opacity-80">
              <div className="animate-marquee-left flex items-center gap-5 sm:gap-6 shrink-0">
                {[0, 1].map((idx) => (
                  <div key={idx} className="flex items-center gap-5 sm:gap-6 shrink-0">
                    {[0, 1, 2, 3, 4].map((subIdx) => (
                      <span 
                        key={subIdx}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[10.5rem] 2xl:text-[11.5rem] font-black uppercase tracking-tighter leading-none whitespace-nowrap"
                        style={{
                          fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
                          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.26) 0%, rgba(186, 230, 253, 0.10) 60%, rgba(56, 189, 248, 0.025) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        Trajectory_IR
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Ribbon 3: Left to Right (Bottom Area) */}
            <div className="w-full overflow-hidden flex items-center opacity-60">
              <div className="animate-marquee-right flex items-center gap-5 sm:gap-6 shrink-0">
                {[0, 1].map((idx) => (
                  <div key={idx} className="flex items-center gap-5 sm:gap-6 shrink-0">
                    {[0, 1, 2, 3, 4].map((subIdx) => (
                      <span 
                        key={subIdx}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[10.5rem] 2xl:text-[11.5rem] font-black uppercase tracking-tighter leading-none whitespace-nowrap"
                        style={{
                          fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
                          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(186, 230, 253, 0.07) 60%, rgba(56, 189, 248, 0.02) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        Trajectory_IR
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Row: [The Problem meets Solution] with dynamic interactive touch illumination */}
          <div 
            className="absolute top-10 sm:top-14 left-0 right-0 w-full max-w-[1360px] mx-auto px-8 sm:px-14 flex items-center justify-between text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] select-none z-20 pointer-events-none transition-all duration-300"
            style={{
              fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif",
              fontWeight: 300,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              opacity: Math.max(0, 1 - easeZoom * 2.2),
              transform: `translateY(-${easeZoom * 60}px)`,
            }}
          >
            {/* [The Problem : High-Energy Liquid Plasma Effect while 'meets' is touching */}
            <div className="shrink-0 relative select-none">
              {/* Base Typography (transitions from crisis red to clean white) */}
              <span 
                className="transition-colors duration-300 inline-block"
                style={{
                  color: problemColor,
                  textShadow: problemShadow,
                }}
              >
                [The Problem
              </span>

              {/* Ionized Liquid Plasma Layer */}
              <span
                className="absolute inset-0 pointer-events-none select-none plasma-text-flow will-change-transform inline-block"
                style={{
                  opacity: problemTouchRatio,
                  transition: 'opacity 0.25s ease-out',
                }}
                aria-hidden="true"
              >
                [The Problem
              </span>
            </div>

            {/* Travel Corridor for "meets" (Driven from left to right via scroll trigger, always pure clean white) */}
            <div className="flex-1 relative h-full flex items-center mx-2 sm:mx-4 overflow-hidden py-2 min-w-0">
              <span
                className="italic font-light whitespace-nowrap will-change-transform select-none inline-block text-white"
                style={{
                  fontFamily: 'inherit',
                  fontWeight: 300,
                  position: 'relative',
                  left: `${meetsProgress * 100}%`,
                  transform: `translateX(-${meetsProgress * 100}%)`,
                  color: '#ffffff',
                }}
              >
                meets
              </span>
            </div>

            {/* Solution] : Illuminates in mint #a4f4d0 when 'meets' reaches and touches it */}
            <div 
              className="shrink-0 transition-colors duration-200"
              style={{
                color: solutionColor,
                textShadow: solutionShadow,
              }}
            >
              Solution]
            </div>
          </div>

          {/* Center Card with Scroll Zoom Reveal (Expands from initial card -> 100vw x 100vh full-screen) */}
          <div className={`absolute inset-0 flex items-center justify-center z-10 ${easeZoom > 0.85 ? 'pointer-events-auto' : 'pointer-events-none'} p-0 m-0`}>
            {/* The Dark Glassmorphic Expanding Box housing the 3D Architecture Model */}
            <div 
              className={`relative bg-[#091526]/95 border border-white/15 backdrop-blur-2xl shadow-2xl flex items-center justify-center overflow-hidden will-change-transform ${easeZoom > 0.85 ? 'pointer-events-auto' : 'pointer-events-none'}`}
              style={{
                width: `calc(min(540px, 86vw) * ${1 - easeZoom} + 100vw * ${easeZoom})`,
                height: `calc(min(280px, 36vh) * ${1 - easeZoom} + 100vh * ${easeZoom})`,
                borderRadius: `${Math.round(24 * (1 - easeZoom))}px`,
                borderWidth: `${Math.max(0, 1 - easeZoom)}px`,
              }}
            >
              {/* Subtle ambient glass reflections fading as it becomes fullscreen */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent pointer-events-none" 
                style={{ opacity: 1 - easeZoom * 0.6 }}
              />
              <div 
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" 
                style={{ opacity: 1 - easeZoom }}
              />

              {/* Dotted Crosshair Reticle (+) fading out as zoom begins */}
              <svg 
                width="72" 
                height="72" 
                viewBox="0 0 72 72" 
                fill="none" 
                className="select-none transition-opacity duration-200 pointer-events-none"
                style={{ opacity: Math.max(0, 1 - easeZoom * 3) }}
              >
                {/* Horizontal row of dots */}
                {[-28, -21, -14, -7, 0, 7, 14, 21, 28].map((offset) => (
                  <circle
                    key={`h-${offset}`}
                    cx={36 + offset}
                    cy={36}
                    r={offset === 0 ? 2 : 1.5}
                    fill="#ffffff"
                    fillOpacity={offset === 0 ? 1 : 0.85}
                  />
                ))}
                {/* Vertical column of dots */}
                {[-28, -21, -14, -7, 7, 14, 21, 28].map((offset) => (
                  <circle
                    key={`v-${offset}`}
                    cx={36}
                    cy={36 + offset}
                    r={1.5}
                    fill="#ffffff"
                    fillOpacity={0.85}
                  />
                ))}
              </svg>

              {/* Interactive 3D Exploded Layer Architecture Schematic (Three.js WebGL) */}
              {easeZoom > 0.08 && (
                <div 
                  className={`absolute inset-0 w-full h-full ${easeZoom > 0.85 ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  style={{
                    opacity: Math.min(1, Math.max(0, (easeZoom - 0.1) / 0.5)),
                  }}
                >
                  <Architecture3DModel 
                    expansionProgress={expansionProgress}
                    isVisible={easeZoom > 0.15}
                    activeScrollLayer={activeScrollLayer}
                    layerScrubProgress={layerScrubProgress}
                    shiftProgress={shiftProgress}
                  />
                </div>
              )}
            </div>

            {/* Bottom-Right Accent Dot (matching reference image, fading as zoom begins) */}
            <div 
              className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-lg shadow-white/40 pointer-events-none transition-opacity duration-200" 
              style={{
                left: `calc(50% + (min(540px, 86vw) * ${1 - easeZoom} + 100vw * ${easeZoom}) / 2 - 14px)`,
                top: `calc(50% + (min(280px, 36vh) * ${1 - easeZoom} + 100vh * ${easeZoom}) / 2 - 14px)`,
                opacity: Math.max(0, 1 - easeZoom * 3.5),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Backward compatibility export
export const FeaturePillars = ProblemSection;
