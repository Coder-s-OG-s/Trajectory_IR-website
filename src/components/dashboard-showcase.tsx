'use client';

import React, { useState } from 'react';

type TabId = 
  | 'overview' 
  | 'dbos-context' 
  | 'jcs-sealer' 
  | 'observation-log' 
  | 'tir-exporter' 
  | 'durable-state' 
  | 'seals-audit' 
  | 'block-and-gate';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

interface DashboardShowcaseProps {
  xp?: number;
  addXp?: (amount: number) => void;
}

export function DashboardShowcase({ xp: propXp, addXp: propAddXp }: DashboardShowcaseProps) {
  // Internal state if props are not supplied
  const [internalXp, setInternalXp] = useState(750);
  const xp = propXp !== undefined ? propXp : internalXp;
  const addXp = (amount: number) => {
    if (propAddXp) propAddXp(amount);
    else setInternalXp((prev) => prev + amount);
  };

  // Live Decisions Sealed momentum counter
  const [decisionsSealed, setDecisionsSealed] = useState(492810);
  const [hoveredCards, setHoveredCards] = useState<Record<string, boolean>>({});

  const handleCardHover = (cardId: string) => {
    if (!hoveredCards[cardId]) {
      setHoveredCards((prev) => ({ ...prev, [cardId]: true }));
      addXp(25); // Award +25 XP on initial card hover
    }
  };

  // Tab & Chat State
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // Matiks Workout Modes State inside Endpoint Cards
  const [activeWorkout, setActiveWorkout] = useState<'none' | 'pure-sprint' | 'dom-puzzle' | 'cache-duel' | 'gate-intercept'>('none');
  const [workoutResult, setWorkoutResult] = useState<string | null>(null);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const promptText = query.trim() || `Tell me about ${activeTab.replace('-', ' ')} in Trajectory IR`;
    
    const updatedHistory: ChatMessage[] = [...chatHistory, { role: 'user', text: promptText }];
    setChatHistory(updatedHistory);
    setQuery('');
    setIsThinking(true);
    addXp(50); // Award XP for asking questions

    setTimeout(() => {
      let answer = '';
      const lower = promptText.toLowerCase();

      if (lower.includes('dbos') || activeTab === 'dbos-context') {
        answer = 'Trajectory IR wraps agent step functions inside an embedded DBOS workflow transaction engine. When a crash occurs mid-execution, DBOS recovers state from local SQLite/PostgreSQL CAS storage without re-running completed side-effects.';
      } else if (lower.includes('seal') || lower.includes('jcs') || activeTab === 'jcs-sealer') {
        answer = 'RFC 8785 JSON Canonicalization Scheme (JCS) normalizes payload whitespace, key ordering, and number formatting into a deterministic byte stream before SHA256 hashing. This guarantees tamper-proof decision seals.';
      } else if (lower.includes('gate') || lower.includes('block') || activeTab === 'block-and-gate') {
        answer = 'When an agent attempts a NON_IDEMPOTENT_WRITE operation (e.g. cloud deployment or database drop) and crashes, Trajectory IR holds execution in a BLOCKED state until a human operator explicitly approves or rejects the step.';
      } else if (lower.includes('export') || lower.includes('tir') || activeTab === 'tir-exporter') {
        answer = 'Every trajectory can be exported as a portable .tir ZIP package archive containing manifest.json, metadata.jsonl, SHA256 seals, and binary CAS artifacts for offline compliance audit and replay.';
      } else {
        answer = `Trajectory IR is the durable semantic layer for autonomous AI agents. Across ${activeTab.replace('-', ' ')}, every tool decision is canonicalized, cryptographically sealed, and checkpointed for crash-safe execution.`;
      }

      setChatHistory([...updatedHistory, { role: 'assistant', text: answer }]);
      setIsThinking(false);
    }, 400);
  };

  const completeWorkout = (mode: string, xpEarned: number, feedback: string) => {
    addXp(xpEarned);
    setDecisionsSealed((prev) => prev + 1000); // +1,000 Decisions Sealed per successful challenge
    setWorkoutResult(feedback);
  };

  // Determine Rank Name
  const rankTitle = xp >= 1000 ? 'SYSTEM GRANDMASTER' : xp >= 500 ? 'DURABLE ARCHITECT' : 'WORKFLOW BUILDER';
  const progressPercent = Math.min(100, Math.round((xp / 1200) * 100));

  return (
    <div className="mt-12 text-left w-full antialiased text-zinc-100 font-sans">
      
      {/* =========================================================================================
          LIVE MOMENTUM ARENA HUD (Floating Addictive Stats Header)
      ========================================================================================= */}
      <div className="w-full bg-[#111113]/90 border border-white/10 rounded-2xl py-5 px-6 mb-10 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Animated Decisions Sealed Counter */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] text-2xl font-black shadow-[0_0_20px_rgba(204,255,0,0.2)] flex-shrink-0">
              🛡️
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-1.5">
                <span>{decisionsSealed.toLocaleString()}</span>
                <span className="text-neon-lime">+</span>
              </div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 font-sans">
                Decisions Sealed &amp; Crash-Protected Today
              </div>
            </div>
          </div>

          {/* Gamified Rank & XP Badge */}
          <div className="flex items-center gap-3 bg-[#161618] px-5 py-3 rounded-2xl border border-white/10 w-full md:w-auto justify-between md:justify-start">
            <span className="text-2xl animate-pulse">⚡</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 font-bold uppercase">Rank:</span>
                <span className="text-xs font-mono font-black text-[#00f0ff] uppercase px-2 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                  {rankTitle}
                </span>
              </div>
              <div className="w-40 sm:w-48 bg-zinc-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#ccff00] to-[#00f0ff] h-full transition-all duration-500 shadow-[0_0_12px_rgba(204,255,0,0.7)]" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <span className="font-mono text-xs sm:text-sm font-black text-white ml-2 whitespace-nowrap">{xp} XP</span>
          </div>

        </div>
      </div>

      {/* Separated Floating Layout: Left Independent Sidebar + Right Floating Dashboard Card */}
      <div className="flex flex-col lg:flex-row items-start gap-8 w-full">
        
        {/* 1. Left Independent Sidebar (Matiks Dark Tone) */}
        <div className="w-full lg:w-64 flex-shrink-0 p-3 text-xs font-semibold text-zinc-400 bg-[#111113]/80 border border-white/10 rounded-3xl shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-5 px-3 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] shadow-[0_0_10px_#ccff00]" />
              <span className="font-black text-sm tracking-tight text-white uppercase">Execution Mode</span>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <div className="space-y-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-center gap-3 font-extrabold text-xs uppercase tracking-wider ${
                activeTab === 'overview'
                  ? 'bg-[#ccff00] text-black shadow-[0_0_25px_rgba(204,255,0,0.4)]'
                  : 'hover:bg-[#1a1a1e] text-zinc-300 hover:text-white'
              }`}
            >
              <span className="text-base">📊</span> Overview &amp; Arena
            </button>

            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest text-[#00f0ff] uppercase px-3 mb-2.5">
                // AGENT RUNTIME
              </div>
              <div className="space-y-1">
                {[
                  { id: 'dbos-context' as TabId, label: '⚡ DBOS Context' },
                  { id: 'jcs-sealer' as TabId, label: '🔒 JCS Sealer' },
                  { id: 'observation-log' as TabId, label: '📜 Observation Log' },
                  { id: 'tir-exporter' as TabId, label: '📦 .tir Exporter' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2.5 text-xs font-bold ${
                      activeTab === item.id
                        ? 'bg-[#1e1e24] text-[#ccff00] border border-[#ccff00]/40 shadow-sm'
                        : 'hover:bg-[#18181d] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase px-3 mb-2.5">
                // MANAGEMENT
              </div>
              <div className="space-y-1">
                {[
                  { id: 'durable-state' as TabId, label: '🗄️ Durable State' },
                  { id: 'seals-audit' as TabId, label: '🛡️ Seals Audit' },
                  { id: 'block-and-gate' as TabId, label: '🚧 Block-and-Gate' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2.5 text-xs font-bold ${
                      activeTab === item.id
                        ? 'bg-[#1e1e24] text-emerald-400 border border-emerald-500/40 shadow-sm'
                        : 'hover:bg-[#18181d] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Right Floating Main Dashboard Card */}
        <div className="flex-1 w-full bg-[#0e0e12]/95 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between min-h-[580px] backdrop-blur-lg">
          
          {/* TAB 1: OVERVIEW & MATIKS ARENA GAME MODES */}
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8 text-left">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-[1.08] mb-3">
                  Web Data &amp; Execution Infrastructure for AI Applications
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 font-medium">
                  Four distinct endpoints engineered for bulletproof AI workflows. Hover over any mode to earn XP and click to test your durability score.
                </p>
              </div>

              {/* 4 Endpoint Cards as Matiks-style game modes (2x2 Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                
                {/* 1. Pure Operations */}
                <div 
                  onMouseEnter={() => handleCardHover('pure')}
                  onClick={() => { setActiveWorkout('pure-sprint'); setWorkoutResult(null); }}
                  className="card-matiks-interactive rounded-2xl p-6 sm:p-7 flex flex-col justify-between group cursor-pointer relative overflow-hidden min-h-[180px]"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#ccff00]/10 rounded-full blur-2xl group-hover:bg-[#ccff00]/25 transition-all pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded text-[10px] font-mono font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 tracking-wider">
                        MODE 01 // PURE
                      </span>
                      <span className="text-xs font-mono text-zinc-500 group-hover:text-white font-extrabold transition-colors">
                        +25 XP HOVER
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#ccff00] transition-colors">
                      Pure Operations
                    </h3>
                    <p className="mt-2 text-zinc-400 text-xs sm:text-sm font-semibold leading-relaxed">
                      PURE: zero side effects
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3.5">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase font-bold">Guaranteed Purity</span>
                    <span className="px-3.5 py-1.5 rounded-lg bg-white/10 group-hover:bg-[#ccff00] text-zinc-200 group-hover:text-black font-black text-xs uppercase tracking-wider transition-all shadow-md">
                      Explore Pure API ⚡
                    </span>
                  </div>
                </div>

                {/* 2. Extraction API */}
                <div 
                  onMouseEnter={() => handleCardHover('extract')}
                  onClick={() => { setActiveWorkout('dom-puzzle'); setWorkoutResult(null); }}
                  className="card-matiks-interactive rounded-2xl p-6 sm:p-7 flex flex-col justify-between group cursor-pointer relative overflow-hidden min-h-[180px]"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#00f0ff]/10 rounded-full blur-2xl group-hover:bg-[#00f0ff]/25 transition-all pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded text-[10px] font-mono font-black bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 tracking-wider">
                        MODE 02 // READ_ONLY
                      </span>
                      <span className="text-xs font-mono text-zinc-500 group-hover:text-white font-extrabold transition-colors">
                        +25 XP HOVER
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#00f0ff] transition-colors">
                      Extraction API
                    </h3>
                    <p className="mt-2 text-zinc-400 text-xs sm:text-sm font-semibold leading-relaxed">
                      READ_ONLY: webpage contents
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3.5">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase font-bold">Zero Infra Drift</span>
                    <span className="px-3.5 py-1.5 rounded-lg bg-white/10 group-hover:bg-[#00f0ff] text-zinc-200 group-hover:text-black font-black text-xs uppercase tracking-wider transition-all shadow-md">
                      Explore Extract API 🧩
                    </span>
                  </div>
                </div>

                {/* 3. Answers API */}
                <div 
                  onMouseEnter={() => handleCardHover('answers')}
                  onClick={() => { setActiveWorkout('cache-duel'); setWorkoutResult(null); }}
                  className="card-matiks-interactive rounded-2xl p-6 sm:p-7 flex flex-col justify-between group cursor-pointer relative overflow-hidden min-h-[180px]"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/25 transition-all pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded text-[10px] font-mono font-black bg-yellow-500/15 text-yellow-400 border border-yellow-500/40 tracking-wider">
                        MODE 03 // IDEMPOTENT
                      </span>
                      <span className="text-xs font-mono text-zinc-500 group-hover:text-white font-extrabold transition-colors">
                        +25 XP HOVER
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                      Answers API
                    </h3>
                    <p className="mt-2 text-zinc-400 text-xs sm:text-sm font-semibold leading-relaxed">
                      IDEMPOTENT: fast answers
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3.5">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase font-bold">Deduplicated Cache</span>
                    <span className="px-3.5 py-1.5 rounded-lg bg-white/10 group-hover:bg-yellow-400 text-zinc-200 group-hover:text-black font-black text-xs uppercase tracking-wider transition-all shadow-md">
                      Explore Answers API ⏱️
                    </span>
                  </div>
                </div>

                {/* 4. Agent API */}
                <div 
                  onMouseEnter={() => handleCardHover('agent')}
                  onClick={() => { setActiveWorkout('gate-intercept'); setWorkoutResult(null); }}
                  className="card-matiks-interactive rounded-2xl p-6 sm:p-7 flex flex-col justify-between group cursor-pointer relative overflow-hidden min-h-[180px] border-rose-500/20"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/25 transition-all pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded text-[10px] font-mono font-black bg-rose-500/15 text-rose-400 border border-rose-500/40 tracking-wider animate-pulse">
                        MODE 04 // NON_IDEMPOTENT
                      </span>
                      <span className="text-xs font-mono text-zinc-500 group-hover:text-white font-extrabold transition-colors">
                        +25 XP HOVER
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-rose-400 transition-colors">
                      Agent API
                    </h3>
                    <p className="mt-2 text-zinc-400 text-xs sm:text-sm font-semibold leading-relaxed">
                      NON_IDEMPOTENT: Research
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3.5">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase font-bold">Durable CAS Checkpoints</span>
                    <span className="px-3.5 py-1.5 rounded-lg bg-white/10 group-hover:bg-rose-500 text-zinc-200 group-hover:text-white font-black text-xs uppercase tracking-wider transition-all shadow-md">
                      Explore Agent API 🚧
                    </span>
                  </div>
                </div>

              </div>

              {/* ACTIVE WORKOUT INTERACTIVE PANEL DRAWER (Matiks High-Energy Style) */}
              {activeWorkout !== 'none' && (
                <div className="mb-10 p-6 sm:p-7 rounded-3xl border-2 border-[#ccff00]/60 bg-[#16161a] text-white shadow-[0_0_50px_rgba(204,255,0,0.25)] font-sans relative animate-matiks-entrance">
                  <button 
                    onClick={() => setActiveWorkout('none')}
                    className="absolute top-4 right-5 text-zinc-400 hover:text-white font-mono text-xs font-black px-3 py-1 rounded bg-black/40 border border-white/10"
                  >
                    ✕ CLOSE WORKOUT
                  </button>

                  {/* Workout 1: Speed Sprint */}
                  {activeWorkout === 'pure-sprint' && (
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs font-mono bg-emerald-500 text-black px-2.5 py-1 rounded font-black uppercase">MODE 01: SPEED SPRINT</span>
                        <span className="text-xs font-bold text-zinc-300">Classify execution purity in 3 seconds to earn +100 XP</span>
                      </div>
                      <div className="font-mono text-xs sm:text-sm bg-black p-4 rounded-xl border border-zinc-800 text-[#00f0ff] mb-5 shadow-inner">
                        <code>def calculate_hash(data: dict): return hashlib.sha256(jcs_canonicalize(data)).hexdigest()</code>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <button 
                          onClick={() => completeWorkout('pure-sprint', 100, '⚡ PERFECT STREAK: Function is 100% PURE with zero side-effects (+100 XP & +1,000 Sealed Decisions)')}
                          className="btn-matiks-lime px-5 py-3 rounded-xl text-xs sm:text-sm font-black tracking-wider transition-all"
                        >
                          PURE (Zero Side Effects) ✓
                        </button>
                        <button 
                          onClick={() => setWorkoutResult('❌ INCORRECT: SHA256 hashing on immutable inputs is strictly PURE without side-effects!')}
                          className="px-5 py-3 bg-rose-600/80 hover:bg-rose-600 text-white font-black rounded-xl text-xs sm:text-sm transition-all shadow-md"
                        >
                          IMPURE (Has Side Effects)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Workout 2: DOM Puzzle Match */}
                  {activeWorkout === 'dom-puzzle' && (
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs font-mono bg-[#00f0ff] text-black px-2.5 py-1 rounded font-black uppercase">MODE 02: DOM PUZZLE MATCH</span>
                        <span className="text-xs font-bold text-zinc-300">Select target node for zero token waste to earn +100 XP</span>
                      </div>
                      <div className="font-mono text-xs sm:text-sm bg-black p-4 rounded-xl border border-zinc-800 text-rose-300 mb-5 shadow-inner overflow-x-auto">
                        <code>&lt;main class=&quot;article-body&quot;&gt;&lt;p&gt;Target Web Content&lt;/p&gt;&lt;/main&gt;</code>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <button 
                          onClick={() => completeWorkout('dom-puzzle', 100, '🎯 100% PRECISION: Clean READ_ONLY extraction node matched (+100 XP & +1,000 Sealed Decisions)')}
                          className="btn-matiks-lime px-5 py-3 rounded-xl text-xs sm:text-sm font-black tracking-wider transition-all"
                        >
                          Target: main.article-body ✓
                        </button>
                        <button 
                          onClick={() => setWorkoutResult('❌ HIGH TOKEN WASTE: Selecting entire body causes 90% unneeded token noise.')}
                          className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-black rounded-xl text-xs sm:text-sm transition-all"
                        >
                          Target: body
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Workout 3: Cache Hit Challenge */}
                  {activeWorkout === 'cache-duel' && (
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs font-mono bg-yellow-400 text-black px-2.5 py-1 rounded font-black uppercase">MODE 03: CACHE HIT DUEL</span>
                        <span className="text-xs font-bold text-zinc-300">Idempotency Stream incoming: GET /api/v1/query?id=492</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        <button 
                          onClick={() => completeWorkout('cache-duel', 100, '⏱️ 1.2s LATENCY SAVED: Cached answer returned with zero duplicate queries (+100 XP & +1,000 Sealed Decisions)')}
                          className="btn-matiks-lime px-5 py-3 rounded-xl text-xs sm:text-sm font-black tracking-wider transition-all"
                        >
                          RETURN CACHED IDEMPOTENT ANSWER ⚡
                        </button>
                        <button 
                          onClick={() => setWorkoutResult('❌ UNNECESSARY LATENCY: Idempotent queries should always read from JCS cache.')}
                          className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-black rounded-xl text-xs sm:text-sm transition-all"
                        >
                          RE-RUN LIVE SEARCH
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Workout 4: Gate Intercept Workout */}
                  {activeWorkout === 'gate-intercept' && (
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs font-mono bg-rose-500 text-white px-2.5 py-1 rounded font-black uppercase">MODE 04: GATE INTERCEPT</span>
                        <span className="text-xs font-bold text-zinc-300">Agent attempted non-idempotent: deploy_cluster(&quot;production&quot;)</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        <button 
                          onClick={() => completeWorkout('gate-intercept', 100, '🛡️ DURABILITY SHIELD UNLOCKED: Execution safely held in BLOCKED_NEEDS_GATE state (+100 XP & +1,000 Sealed Decisions)')}
                          className="btn-matiks-lime px-5 py-3 rounded-xl text-xs sm:text-sm font-black tracking-wider transition-all"
                        >
                          INTERCEPT &amp; HOLD IN GATE 🛡️
                        </button>
                        <button 
                          onClick={() => setWorkoutResult('❌ CRITICAL RISK: Non-idempotent production write executed without human approval!')}
                          className="px-5 py-3 bg-rose-600/80 hover:bg-rose-600 text-white font-black rounded-xl text-xs sm:text-sm transition-all shadow-md"
                        >
                          AUTO-ALLOW WRITE
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Feedback Result Banner */}
                  {workoutResult && (
                    <div className="mt-5 p-4 rounded-2xl bg-black border border-[#ccff00]/60 text-xs sm:text-sm font-mono font-extrabold text-[#ccff00] shadow-lg animate-pulse flex items-center gap-2">
                      <span>✨</span>
                      <span>{workoutResult}</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* OTHER TABS (Maintained with sleek dark styling) */}
          {activeTab === 'dbos-context' && (
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">RUNTIME</span>
                <h3 className="text-2xl font-bold text-white uppercase">DBOS Transactional Context</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-6 font-medium leading-relaxed">
                Wraps workflow execution steps inside an embedded DBOS transaction engine for automatic crash recovery without side-effect duplicates.
              </p>
              <pre className="p-5 rounded-2xl border border-white/10 bg-black text-[#00f0ff] font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed mb-6 shadow-inner">
                <code>{`from trajectory_ir.runtime import Trajectory
# Pluggable durable backend (e.g. DBOS or Restate)
Trajectory.launch()

@Trajectory.workflow()
def run_durable_agent():
    traj = Trajectory.start(tenant_id="prod-tenant-01")
    # Automatically checkpointed crash-safe state
    print(f"Active Workflow ID: {traj.trajectory_id}")`}</code>
              </pre>
            </div>
          )}

          {activeTab === 'jcs-sealer' && (
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-purple-500/20 text-purple-400 border border-purple-500/40 font-bold">CRYPTOGRAPHY</span>
                <h3 className="text-2xl font-bold text-white uppercase">RFC 8785 JCS Payload Sealer</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-6 font-medium leading-relaxed">
                Canonicalizes JSON payloads into deterministic byte streams before SHA256 hashing to guarantee cryptographic seal integrity.
              </p>
              <div className="p-6 rounded-2xl border border-purple-500/30 bg-black/60 font-mono text-xs sm:text-sm space-y-3 mb-6 shadow-lg">
                <div className="text-zinc-500 font-bold">// Raw Input Payload:</div>
                <div className="text-[#ccff00] font-black">{`{"tool": "deploy", "params": {"cluster": "us-east-1"}}`}</div>
                <div className="text-zinc-500 font-bold mt-2">// Generated Cryptographic Decision Seal:</div>
                <div className="text-[#00f0ff] break-all font-bold">sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
              </div>
            </div>
          )}

          {activeTab === 'observation-log' && (
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-sky-500/20 text-sky-400 border border-sky-500/40 font-bold">CHAIN LOG</span>
                <h3 className="text-2xl font-bold text-white uppercase">Cryptographic Node Chain</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-6 font-medium leading-relaxed">
                Appends immutable execution outcomes as SHA256 linked node chains in standard JSONL format.
              </p>
              <div className="border border-white/10 rounded-2xl overflow-hidden text-xs font-mono mb-6 shadow-lg bg-black">
                <table className="w-full text-left">
                  <thead className="bg-[#18181e] text-zinc-300 text-[10px] uppercase font-black border-b border-white/10">
                    <tr>
                      <th className="p-3.5">Seq</th>
                      <th className="p-3.5">Kind</th>
                      <th className="p-3.5">SHA256 Hash</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-zinc-300">
                    <tr>
                      <td className="p-3.5 font-extrabold text-white">001</td>
                      <td className="p-3.5 text-purple-400 font-bold">KIND_CALL</td>
                      <td className="p-3.5 text-[#00f0ff]">sha256: a1b2c3d4...</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-extrabold text-white">002</td>
                      <td className="p-3.5 text-yellow-400 font-bold">KIND_SEAL</td>
                      <td className="p-3.5 text-[#ccff00]">sha256: e8f9g0h1...</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-extrabold text-white">003</td>
                      <td className="p-3.5 text-emerald-400 font-bold">KIND_OBSERVATION</td>
                      <td className="p-3.5 text-[#00f0ff]">sha256: 789xyz12...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tir-exporter' && (
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold">PACKAGE EXPORT</span>
                <h3 className="text-2xl font-bold text-white uppercase">Portable .tir Package Archive</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-6 font-medium leading-relaxed">
                Export full trajectories as portable, inspectable ZIP archives for audit compliance and offline replay.
              </p>
              <div className="p-6 rounded-2xl border border-white/10 bg-black text-zinc-200 font-mono text-xs sm:text-sm space-y-2 mb-6 shadow-inner">
                <div className="text-[#ccff00] font-bold text-sm sm:text-base">📁 trajectory-prod-001.tir</div>
                <div className="pl-5 text-zinc-400">├── 📄 manifest.json</div>
                <div className="pl-5 text-zinc-400">├── 📄 metadata.jsonl</div>
                <div className="pl-5 text-[#00f0ff]">├── 📁 seals/ (SHA256 signatures)</div>
                <div className="pl-5 text-emerald-400">└── 📁 artifacts/ (Binary CAS store)</div>
              </div>
            </div>
          )}

          {activeTab === 'durable-state' && (
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 font-bold">STORAGE</span>
                <h3 className="text-2xl font-bold text-white uppercase">SQLite &amp; PostgreSQL CAS State</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-6 font-medium leading-relaxed">
                Sharded Content-Addressable Storage (CAS) preventing bucket listing degradation on large deployments.
              </p>
              <div className="p-5 rounded-2xl border border-white/10 bg-black text-xs font-mono mb-6 shadow-inner">
                <div className="text-zinc-500 font-medium mb-1.5">// Sharded CAS Object Path:</div>
                <div className="text-[#00f0ff] font-bold text-sm break-all">s3://trajir/cas/e3/b0c44298fc1c149afbf4c8996fb9242...</div>
              </div>
            </div>
          )}

          {activeTab === 'seals-audit' && (
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">CONFORMANCE</span>
                <h3 className="text-2xl font-bold text-white uppercase">Automated Seals Integrity Audit</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-6 font-medium leading-relaxed">
                Runs cryptographic verification across all decision seals and observation nodes in real-time.
              </p>
              <div className="p-6 rounded-2xl border border-emerald-500/30 bg-black/60 text-xs sm:text-sm font-mono space-y-2.5 mb-6 shadow-lg">
                <div className="text-emerald-400 font-black">✓ Test R01 (Safe Resume): PASSED</div>
                <div className="text-emerald-400 font-black">✓ Test R02 (Block-and-Gate): PASSED</div>
                <div className="text-zinc-400 font-bold pt-1.5 border-t border-white/10">Total Nodes Verified: 42 | Mismatches: 0</div>
              </div>
            </div>
          )}

          {activeTab === 'block-and-gate' && (
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-rose-500/20 text-rose-400 border border-rose-500/40 font-bold">SAFETY PROTOCOL</span>
                <h3 className="text-2xl font-bold text-white uppercase">Block-and-Gate Human Intercept</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-6 font-medium leading-relaxed">
                Interrupted NON_IDEMPOTENT_WRITE operations enter BLOCKED state to prevent catastrophic duplicates.
              </p>
              <div className="p-6 rounded-2xl border border-rose-500/30 bg-black/60 text-xs sm:text-sm font-mono space-y-3 mb-6 shadow-lg">
                <div className="text-rose-400 font-black text-base">🛑 Execution Gate: Interrupted Tool Operation</div>
                <div className="text-zinc-300 font-semibold">Tool: deploy_server(&quot;prod-cluster&quot;) | Status: BLOCKED_NEEDS_GATE</div>
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button 
                    onClick={() => { completeWorkout('gate-intercept', 100, '✓ GATE APPROVED: Safe execution allowed (+100 XP)'); }}
                    className="btn-matiks-lime px-5 py-2.5 rounded-xl font-black text-xs shadow-md transition-all uppercase"
                  >
                    Approve Retry ✓
                  </button>
                  <button 
                    onClick={() => { setWorkoutResult('🛑 EXECUTION ABORTED: Operation rejected and state protected.'); }}
                    className="px-5 py-2.5 rounded-xl border border-white/20 bg-[#16161a] text-white font-bold hover:bg-[#1f1f25] transition-all text-xs uppercase"
                  >
                    Reject &amp; Abort
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interactive AI Chat Answers Container (Matiks High-Contrast Glow) */}
          {chatHistory.length > 0 && (
            <div className="mb-6 space-y-3.5 max-h-60 overflow-y-auto p-5 rounded-2xl bg-[#141418] border border-white/10 shadow-inner">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-3 text-xs sm:text-sm ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg bg-[#ccff00] text-black flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 shadow-[0_0_12px_rgba(204,255,0,0.5)]">
                      ⚡
                    </div>
                  )}
                  <div className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#ccff00] text-black rounded-tr-none font-black text-xs tracking-wide shadow-md'
                      : 'bg-[#1b1b22] border border-white/10 text-zinc-200 shadow-sm rounded-tl-none font-medium text-xs sm:text-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] animate-pulse">
                  <span>⚡ Generating durable semantic response...</span>
                </div>
              )}
            </div>
          )}

          {/* Interactive Editable Prompt Box */}
          <form onSubmit={handleSend} className="relative p-3.5 sm:p-4 rounded-2xl border border-white/15 focus-within:border-[#ccff00] bg-[#14141a] shadow-[0_0_30px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4 transition-all">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Ask anything about ${activeTab.replace('-', ' ')} or Trajectory IR architecture...`}
              className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-white font-semibold placeholder-zinc-500"
            />
            <div className="flex items-center gap-2 flex-shrink-0">
              <button 
                type="submit" 
                className="btn-matiks-lime w-9 h-9 rounded-xl flex items-center justify-center text-base font-black transition-all"
                title="Send Prompt (+50 XP)"
              >
                ↑
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
