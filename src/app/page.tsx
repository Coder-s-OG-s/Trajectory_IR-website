'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardShowcase } from '@/components/dashboard-showcase';

export default function Home() {
  const [xp, setXp] = useState(0);
  const [streak] = useState(3);
  const [heroDuelState, setHeroDuelState] = useState<'none' | 'correct' | 'wrong'>('none');
  const [heroTimer, setHeroTimer] = useState(15);

  const addXp = (amount: number) => {
    setXp((prev) => prev + amount);
  };

  useEffect(() => {
    if (heroDuelState !== 'none') return;
    const interval = setInterval(() => {
      setHeroTimer((prev) => (prev > 1 ? prev - 1 : 15));
    }, 1000);
    return () => clearInterval(interval);
  }, [heroDuelState]);

  const rankTitle = xp >= 300 ? 'Durable Systems Architect' : xp >= 150 ? 'Workflow Builder' : 'Novice Architect';

  return (
    <div className="relative min-h-screen bg-[#fafafa] text-zinc-950 font-sans overflow-hidden antialiased flex flex-col justify-between">
      
      {/* Soft Pastel Background Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none opacity-80">
        <div className="absolute top-8 left-1/4 w-[550px] h-[450px] rounded-full blur-[130px]" style={{ background: 'radial-gradient(circle, #ffeedd 0%, #fae8ff 50%, transparent 70%)' }} />
        <div className="absolute top-16 right-1/4 w-[500px] h-[400px] rounded-full blur-[110px]" style={{ background: 'radial-gradient(circle, #e0e7ff 0%, #fee2e2 50%, transparent 70%)' }} />
      </div>

      {/* Floating Rounded Pill Navigation Header */}
      <header className="relative z-20 max-w-6xl mx-auto pt-6 px-4 bg-transparent border-0 outline-none shadow-none">
        <div className="w-full bg-white/95 border border-zinc-200/90 shadow-sm backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between gap-6">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 no-underline flex-shrink-0">
            <img src="/logo.png" alt="Trajectory IR" className="w-7 h-7 rounded-lg object-cover shadow-sm" />
            <span className="font-extrabold text-sm tracking-tight text-zinc-950">
              Trajectory <span style={{ color: '#ff3e00' }}>IR</span>
            </span>
          </Link>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold text-zinc-700 flex-shrink-0">
            <Link href="/docs" className="hover:text-zinc-950 no-underline transition-colors whitespace-nowrap">Documentation</Link>
            <Link href="/docs/infrastructure" className="hover:text-zinc-950 no-underline transition-colors whitespace-nowrap">Architecture</Link>
            <Link href="/docs/api" className="hover:text-zinc-950 no-underline transition-colors whitespace-nowrap">API Reference</Link>
            <Link href="/docs/changelog" className="hover:text-zinc-950 no-underline transition-colors whitespace-nowrap">Changelog</Link>
          </nav>

          {/* Right Floating Arena HUD Pill & CTA */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 shadow-sm">
              <span>⚡ {xp} XP</span>
              <span className="text-amber-400">|</span>
              <span>🔥 {streak} Days</span>
              <span className="text-amber-400">|</span>
              <span className="text-amber-800 font-mono text-[11px]">{rankTitle}</span>
            </div>

            <Link 
              href="/docs/quickstart"
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-zinc-950 hover:bg-black transition-all shadow-sm no-underline whitespace-nowrap"
            >
              {heroDuelState === 'correct' ? 'CLAIM RANK: GET STARTED →' : 'Get started'}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero & Main Content Section */}
      <main className="relative z-10 max-w-[1240px] mx-auto px-6 pt-10 pb-4 text-center">
        
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-zinc-900 bg-white border border-zinc-200/90 shadow-sm backdrop-blur-sm mb-8">
          <span className="text-[#ff3e00]">✦</span>
          <span>Durable Semantic Layer for AI Agents</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.05] max-w-4xl mx-auto">
          Build AI systems grounded in durable, crash-safe execution
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto mt-6 text-base md:text-lg text-zinc-700 leading-relaxed font-medium">
          Wrap, seal, and recover every agent decision with RFC 8785 JCS hashing 
          and DBOS durable workflows. Never lose state. Never duplicate side-effects.
        </p>

        {/* MATIKS HERO SYSTEM DUEL WIDGET */}
        <div className="my-8 max-w-3xl mx-auto p-5 sm:p-6 rounded-3xl border-2 border-zinc-900 bg-zinc-950 text-white shadow-2xl text-left font-sans">
          <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                ⚡ LIVE SYSTEM BREAKDOWN DUEL
              </span>
            </div>
            <div className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              COUNTDOWN: <span className="text-amber-400 font-bold">00:{heroTimer < 10 ? `0${heroTimer}` : heroTimer}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-zinc-200 leading-relaxed mb-5">
            Your LLM agent crashed mid-step during a $5,000 wire transfer. How do you recover state without double-charging?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setHeroDuelState('wrong')}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all ${
                heroDuelState === 'wrong'
                  ? 'border-rose-500 bg-rose-950/80 text-rose-200'
                  : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <div className="font-mono text-amber-400 mb-1">Option A</div>
              <div>Re-run workflow function from start</div>
            </button>

            <button
              onClick={() => {
                if (heroDuelState !== 'correct') {
                  setHeroDuelState('correct');
                  addXp(150);
                }
              }}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all ${
                heroDuelState === 'correct'
                  ? 'border-emerald-500 bg-emerald-950/80 text-emerald-200 shadow-md'
                  : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <div className="font-mono text-emerald-400 mb-1">Option B (Recommended)</div>
              <div>DBOS CAS Checkpoint + JCS Decision Seal</div>
            </button>
          </div>

          {/* TACTICAL FEEDBACK ALERT */}
          {heroDuelState === 'wrong' && (
            <div className="p-3.5 rounded-2xl border border-rose-500/80 bg-rose-950 text-xs font-bold text-rose-200 flex items-center gap-2">
              <span>🛑</span>
              <span>CRITICAL FAIL: Naive retry repeated the wire transfer. $5,000 double-spent.</span>
            </div>
          )}

          {heroDuelState === 'correct' && (
            <div className="p-3.5 rounded-2xl border border-emerald-500/80 bg-emerald-950 text-xs font-bold text-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>PERFECT RECOVERY: Zero side-effects repeated. State restored in 12ms (SHA256: e3b0c442...).</span>
              </div>
              <span className="font-mono bg-emerald-500 text-black px-2 py-0.5 rounded text-[11px] font-extrabold">
                +150 XP
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link
            href="/docs/quickstart"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-white bg-zinc-950 hover:bg-black transition-all shadow-md no-underline"
          >
            {heroDuelState === 'correct' ? 'CLAIM ARENA RANK: GET STARTED →' : 'Get Started →'}
          </Link>
          <Link
            href="/docs"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-bold text-zinc-800 bg-white border border-zinc-200/90 hover:bg-zinc-100 transition-all shadow-sm no-underline"
          >
            View API docs
          </Link>
        </div>

        {/* Separated Floating Dashboard Showcase Component with Matiks Arena Workouts */}
        <DashboardShowcase xp={xp} addXp={addXp} />

      </main>

      {/* Footer (Full Width Edge-to-Edge & Enlarged Text) */}
      <footer className="relative z-10 border-t border-zinc-200/80 bg-white w-full px-6 md:px-10 pt-2.5 pb-1">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-zinc-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-zinc-950 text-sm">Trajectory IR</span>
            <span className="text-zinc-500">&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <Link href="/docs" className="hover:text-zinc-950 no-underline transition-colors">Documentation</Link>
            <Link href="/docs/infrastructure" className="hover:text-zinc-950 no-underline transition-colors">Architecture</Link>
            <Link href="/docs/api" className="hover:text-zinc-950 no-underline transition-colors">API Reference</Link>
            <a href="https://github.com/Coder-s-OG-s/Trajectory-IR" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 no-underline transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
