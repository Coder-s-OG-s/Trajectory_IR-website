'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardShowcase } from '@/components/dashboard-showcase';
import { SiteHeader } from '@/components/site-header';
import { CursorGlow } from '@/components/cursor-glow';
import { DustParticles } from '@/components/dust-particles';

export default function Home() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const openDemoModal = () => {
    setIsAnimatingOut(false);
    setShowDemoModal(true);
  };

  const closeDemoModal = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setShowDemoModal(false);
      setIsAnimatingOut(false);
    }, 240);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showDemoModal) {
        closeDemoModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDemoModal]);

  return (
    <div className="hero-gradient-bg text-white font-sans antialiased min-h-screen w-screen overflow-x-hidden relative select-none flex flex-col justify-between">
      
      {/* Background Ambient Layers (Fixed) */}
      <CursorGlow />
      <DustParticles />

      {/* Aesthetic Compact Ethereal Infinity Symbol Background Element */}
      <div 
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-[460px] sm:w-[560px] lg:w-[660px] h-[320px] opacity-50 transition-opacity duration-1000"
        aria-hidden="true"
      >
        <svg viewBox="0 0 800 400" className="w-full h-full">
          <defs>
            {/* Ethereal Silk Plasma Gradient */}
            <linearGradient id="aestheticSilkPlasma" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#7dd3fc" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#ffb070" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.85" />
            </linearGradient>

            {/* Soft Ambient Fire Caustic Accent */}
            <linearGradient id="aestheticAmberCaustic" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff7700" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ffaa44" stopOpacity="0.7" />
            </linearGradient>

            {/* Ultra-Soft Ethereal Blur Filters */}
            <filter id="etherealSoftGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="20" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="etherealAmbientHalo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="36" />
            </filter>
          </defs>

          {/* Deep Soft Halo Ambient Light */}
          <path
            d="M 400,200 C 250,60 100,60 100,200 C 100,340 250,340 400,200 C 550,60 700,60 700,200 C 700,340 550,340 400,200 Z"
            fill="none"
            stroke="url(#aestheticAmberCaustic)"
            strokeWidth="36"
            filter="url(#etherealAmbientHalo)"
            className="opacity-40"
          />

          {/* Secondary Soft Silk Ribbon Layer */}
          <path
            d="M 400,200 C 250,60 100,60 100,200 C 100,340 250,340 400,200 C 550,60 700,60 700,200 C 700,340 550,340 400,200 Z"
            fill="none"
            stroke="url(#aestheticAmberCaustic)"
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#etherealSoftGlow)"
            className="opacity-75"
          />

          {/* Primary Ethereal Luminous Silk Stream */}
          <path
            d="M 400,200 C 250,60 100,60 100,200 C 100,340 250,340 400,200 C 550,60 700,60 700,200 C 700,340 550,340 400,200 Z"
            fill="none"
            stroke="url(#aestheticSilkPlasma)"
            strokeWidth="18"
            strokeLinecap="round"
            filter="url(#etherealSoftGlow)"
            className="opacity-80"
          />

          {/* Core Fine Luminous Thread */}
          <path
            d="M 400,200 C 250,60 100,60 100,200 C 100,340 250,340 400,200 C 550,60 700,60 700,200 C 700,340 550,340 400,200 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            className="opacity-90"
          />

          {/* Subtle Delicate Star Embers */}
          <circle cx="210" cy="115" r="2" fill="#ffffff" className="opacity-80" />
          <circle cx="590" cy="285" r="2.5" fill="#ffb070" filter="url(#etherealSoftGlow)" />
          <circle cx="390" cy="190" r="1.5" fill="#ffffff" />
          <circle cx="410" cy="210" r="2" fill="#7dd3fc" />
        </svg>
      </div>

      {/* Hero Section Container (100vh Single Screen View) */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        {/* Floating Nav Header */}
        <SiteHeader />

        {/* Hero Section Container */}
        <div className="min-h-[calc(100vh-140px)] flex flex-col justify-between">
          <main className="w-full max-w-[1280px] mx-auto px-8 sm:px-12 flex-1 flex items-center my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full my-auto">
              
              {/* Left Column: Headline matching Image 2 reference */}
              <div className="lg:col-span-7 flex flex-col text-left space-y-0">
                <a
                  href="https://github.com/Coder-s-OG-s/Trajectory-IR"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-sky-200/90 hover:text-white transition-colors no-underline mb-4 w-fit"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-300" aria-hidden="true"></span>
                  Open Source · Apache-2.0 · View on GitHub
                </a>
                <h1
                  className="leading-[1.06] text-4xl sm:text-5xl md:text-6xl lg:text-[4rem]"
                  style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.035em' }}
                >
                  <span className="text-white font-semibold block">An open IR</span>
                  <span className="text-white font-semibold block">for agent</span>
                  <span className="text-sky-200/85 font-medium block">execution</span>
                  <span className="text-sky-200/85 font-medium block">trajectories.</span>
                </h1>
              </div>

              {/* Right Column: Text & Liquid Glass CTAs Pushed to Right Side */}
              <div className="lg:col-span-5 flex flex-col items-start lg:items-end text-left lg:text-right space-y-6 pl-0 lg:pl-6">
                <p
                  className="text-base sm:text-lg text-sky-100/90 leading-relaxed max-w-md font-normal"
                  style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.015em' }}
                >
                  A portable intermediate representation for agent execution trajectories, built on top of existing durable execution engines rather than replacing them. Phase 1B is underway, with Go as the primary SDK.
                </p>

                <div className="flex flex-col items-start lg:items-end gap-3.5 pt-1 w-full max-w-xs">
                  <Link
                    href="/docs/quickstart"
                    className="liquid-glass-pill-solid w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-semibold text-[#06162d] no-underline shadow-lg flex items-center justify-center gap-2 group"
                    style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.015em' }}
                  >
                    <span>Start Building</span>
                    <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>

                  <Link
                    href="/docs"
                    className="liquid-glass-pill w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-medium text-white no-underline flex items-center justify-center"
                    style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.015em' }}
                  >
                    View Documentation
                  </Link>
                </div>
              </div>
            </div>
          </main>

          {/* Bottom Floating Liquid Glass Capsule Bar */}
          <div className="pb-8 flex items-center justify-center pointer-events-none">
            <button
              onClick={openDemoModal}
              className="liquid-glass-dock px-7 py-3 flex items-center gap-4 text-white text-sm font-medium no-underline shadow-2xl group pointer-events-auto cursor-pointer"
              style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: '-0.015em' }}
            >
              <span className="text-xl font-bold text-sky-200 group-hover:rotate-45 transition-transform duration-300">
                ✻
              </span>
              <span className="opacity-95 tracking-wide font-normal">
                Get started with demo
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-white group-hover:text-[#081d3a] transition-all">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 11V3M7 3L3 7M7 3L11 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* FROSTED LIQUID GLASS CURTAIN SHEET FOOTER (Matching user reference image 1:1) */}
        <footer className="liquid-glass-footer-curtain w-full mt-12 pt-16 pb-12 px-8 sm:px-16 text-white border-t border-white/20">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
            
            {/* Column 1: Brand Logo & Tagline */}
            <div className="md:col-span-5 flex flex-col space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-bold text-sky-200">✻</span>
                <span className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', sans-serif" }}>
                  trajectory<span className="text-sky-300 font-normal">_ir</span>
                </span>
              </div>
              <p className="text-sky-100/70 text-sm max-w-sm leading-relaxed font-normal">
                Trajectory IR creates crash-safe, durable execution infrastructure for AI agents. Never lose state. Never duplicate side-effects.
              </p>
            </div>

            {/* Column 2: How It Works */}
            <div className="md:col-span-2 flex flex-col space-y-3.5">
              <h4 className="text-sm font-semibold text-white/90 tracking-wide uppercase">How It Works</h4>
              <ul className="space-y-2.5 text-sm text-sky-100/70">
                <li><Link href="/docs" className="hover:text-white transition-colors no-underline">Core IR Spec</Link></li>
                <li><Link href="/docs/infrastructure" className="hover:text-white transition-colors no-underline">State Replay</Link></li>
                <li><Link href="/docs/changelog" className="hover:text-white transition-colors no-underline">Crash-Safe Recovery</Link></li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="md:col-span-2 flex flex-col space-y-3.5">
              <h4 className="text-sm font-semibold text-white/90 tracking-wide uppercase">Company</h4>
              <ul className="space-y-2.5 text-sm text-sky-100/70">
                <li><Link href="/docs" className="hover:text-white transition-colors no-underline">Terms</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors no-underline">Privacy</Link></li>
              </ul>
            </div>

            {/* Column 4: Socials */}
            <div className="md:col-span-3 flex flex-col space-y-3.5">
              <h4 className="text-sm font-semibold text-white/90 tracking-wide uppercase">Socials</h4>
              <ul className="space-y-2.5 text-sm text-sky-100/70">
                <li><a href="https://github.com/Coder-s-OG-s" target="_blank" rel="noreferrer" className="hover:text-white transition-colors no-underline">GitHub</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="max-w-[1280px] mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-sky-100/50 gap-2">
            <span>Trajectory IR — Apache-2.0 licensed</span>
            <div className="flex items-center gap-6">
              <a href="https://github.com/Coder-s-OG-s/Trajectory-IR/issues" target="_blank" rel="noreferrer" className="hover:text-white transition-colors no-underline">
                Report an issue
              </a>
              <a href="https://github.com/Coder-s-OG-s/Trajectory-IR/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer" className="hover:text-white transition-colors no-underline">
                Contributing guide
              </a>
              <a href="https://github.com/Coder-s-OG-s/Trajectory-IR" target="_blank" rel="noreferrer" className="hover:text-white transition-colors no-underline">
                View source on GitHub →
              </a>
              <a href="https://www.bestpractices.dev/projects/14075" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity inline-flex items-center">
                <img src="https://www.bestpractices.dev/projects/14075/badge" alt="OpenSSF Best Practices" className="h-5" />
              </a>
            </div>
          </div>

          {/* Monumental Liquid Glass Display Typography */}
          <div 
            className="w-full overflow-hidden flex items-center justify-center pointer-events-none relative pt-4 pb-0 mt-4 h-[100px] sm:h-[150px] md:h-[200px] lg:h-[240px]"
            aria-hidden="true"
          >
            <h2 
              className="text-[7.5vw] sm:text-[9.2vw] md:text-[10.6vw] lg:text-[11.8vw] font-black uppercase tracking-tighter leading-none select-none text-center whitespace-nowrap opacity-50 w-full"
              style={{
                fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(186, 230, 253, 0.45) 50%, rgba(56, 189, 248, 0.05) 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transform: 'translateY(15%)',
                maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 98%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 98%)',
                filter: 'drop-shadow(0 -4px 20px rgba(186, 230, 253, 0.25))',
              }}
            >
              TRAJECTORY_IR
            </h2>
          </div>
        </footer>
      </div>

      {/* Liquid Glass Interactive Demo Modal */}
      {showDemoModal && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md ${
            isAnimatingOut ? 'animate-modal-backdrop-exit' : 'animate-modal-backdrop-enter'
          }`}
          onClick={closeDemoModal}
        >
          <div 
            className={`relative w-full max-w-5xl max-h-[85vh] overflow-y-auto custom-scrollbar liquid-glass-card p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl ${
              isAnimatingOut ? 'animate-modal-card-exit' : 'animate-modal-card-enter'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xl text-sky-200">✻</span>
                <span className="text-lg font-semibold text-white">Trajectory IR — Interactive Execution Demo</span>
              </div>
              <button
                onClick={closeDemoModal}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg"
              >
                ✕
              </button>
            </div>
            <DashboardShowcase />
          </div>
        </div>
      )}
    </div>
  );
}


