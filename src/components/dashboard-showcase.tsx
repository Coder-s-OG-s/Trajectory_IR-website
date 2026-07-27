'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
  xp: number;
  addXp: (amount: number) => void;
}

export function DashboardShowcase({ xp, addXp }: DashboardShowcaseProps) {
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
    setWorkoutResult(feedback);
  };

  return (
    <div className="mt-16 text-left max-w-[1200px] mx-auto w-full antialiased">
      {/* Separated Floating Layout: Left Independent Sidebar + Right Floating Dashboard Card */}
      <div className="flex flex-col md:flex-row items-start gap-8 w-full">
        
        {/* 1. Left Independent Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 p-2 text-xs font-semibold text-zinc-700">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Logo" className="w-6 h-6 rounded-md object-cover shadow-sm" />
              <span className="font-extrabold text-sm tracking-tight text-zinc-950">Trajectory IR</span>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <div className="space-y-5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2.5 font-bold ${
                activeTab === 'overview'
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'hover:bg-zinc-200/70 text-zinc-800'
              }`}
            >
              <span className="text-sm">📊</span> Overview
            </button>

            <div>
              <div className="text-[10px] font-extrabold tracking-wider text-zinc-400 uppercase px-3 mb-2 font-mono">Agent Runtime</div>
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
                    className={`w-full text-left px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                      activeTab === item.id
                        ? 'bg-zinc-950 text-white font-bold shadow-md'
                        : 'hover:bg-zinc-200/70 text-zinc-700 font-semibold'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-extrabold tracking-wider text-zinc-400 uppercase px-3 mb-2 font-mono">Management</div>
              <div className="space-y-1">
                {[
                  { id: 'durable-state' as TabId, label: '🗄️ Durable State' },
                  { id: 'seals-audit' as TabId, label: '🛡️ Seals Audit' },
                  { id: 'block-and-gate' as TabId, label: '🚧 Block-and-Gate' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                      activeTab === item.id
                        ? 'bg-zinc-950 text-white font-bold shadow-md'
                        : 'hover:bg-zinc-200/70 text-zinc-700 font-semibold'
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
        <div className="flex-1 w-full bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between min-h-[540px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-zinc-950 tracking-tight">
                  Web Data &amp; Execution Infrastructure for AI Applications
                </h3>
              </div>

              <div className="text-[10px] font-extrabold tracking-wider text-zinc-400 uppercase font-mono mb-4">
                Our Endpoints &amp; Interactive Systems Workouts
              </div>

              {/* 4 Wide Pastel Cards Grid (Matiks Workout Modes) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                
                {/* 1. Pure Operations */}
                <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/50 flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow-md transition-all">
                  <div>
                    <div className="font-extrabold text-sm text-purple-950">Pure Operations</div>
                    <div className="text-xs text-purple-800/80 font-medium mt-1">PURE: zero side effects</div>
                  </div>
                  <button 
                    onClick={() => { setActiveWorkout('pure-sprint'); setWorkoutResult(null); }} 
                    className="mt-4 text-xs font-bold text-white bg-purple-900 px-3 py-2 rounded-xl self-start shadow-sm hover:bg-purple-950 transition-all flex items-center gap-1.5"
                  >
                    ⚡ Speed Sprint
                  </button>
                </div>

                {/* 2. Extraction API */}
                <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/50 flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow-md transition-all">
                  <div>
                    <div className="font-extrabold text-sm text-rose-950">Extraction API</div>
                    <div className="text-xs text-rose-800/80 font-medium mt-1">READ_ONLY: webpage contents</div>
                  </div>
                  <button 
                    onClick={() => { setActiveWorkout('dom-puzzle'); setWorkoutResult(null); }} 
                    className="mt-4 text-xs font-bold text-white bg-rose-900 px-3 py-2 rounded-xl self-start shadow-sm hover:bg-rose-950 transition-all flex items-center gap-1.5"
                  >
                    🧩 DOM Puzzle
                  </button>
                </div>

                {/* 3. Answers API */}
                <div className="p-4 rounded-2xl border border-sky-200 bg-sky-50/50 flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow-md transition-all">
                  <div>
                    <div className="font-extrabold text-sm text-sky-950">Answers API</div>
                    <div className="text-xs text-sky-800/80 font-medium mt-1">IDEMPOTENT: fast answers</div>
                  </div>
                  <button 
                    onClick={() => { setActiveWorkout('cache-duel'); setWorkoutResult(null); }} 
                    className="mt-4 text-xs font-bold text-white bg-sky-900 px-3 py-2 rounded-xl self-start shadow-sm hover:bg-sky-950 transition-all flex items-center gap-1.5"
                  >
                    ⏱️ Cache Hit Challenge
                  </button>
                </div>

                {/* 4. Agent API */}
                <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow-md transition-all">
                  <div>
                    <div className="font-extrabold text-sm text-amber-950">Agent API</div>
                    <div className="text-xs text-amber-800/80 font-medium mt-1">NON_IDEMPOTENT: Research</div>
                  </div>
                  <button 
                    onClick={() => { setActiveWorkout('gate-intercept'); setWorkoutResult(null); }} 
                    className="mt-4 text-xs font-bold text-white bg-amber-900 px-3 py-2 rounded-xl self-start shadow-sm hover:bg-amber-950 transition-all flex items-center gap-1.5"
                  >
                    🚧 Gate Workout
                  </button>
                </div>
              </div>

              {/* ACTIVE WORKOUT INTERACTIVE PANEL DRAWER */}
              {activeWorkout !== 'none' && (
                <div className="mb-8 p-5 rounded-2xl border-2 border-zinc-950 bg-zinc-900 text-white shadow-2xl font-sans relative">
                  <button 
                    onClick={() => setActiveWorkout('none')}
                    className="absolute top-3 right-3 text-zinc-400 hover:text-white font-mono text-xs font-bold"
                  >
                    ✕ CLOSE
                  </button>

                  {/* Workout 1: Speed Sprint (Pure vs Impure) */}
                  {activeWorkout === 'pure-sprint' && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono bg-purple-500 text-white px-2 py-0.5 rounded font-bold">MODE 1: SPEED SPRINT</span>
                        <span className="text-xs text-zinc-400">Classify execution purity in 3 seconds</span>
                      </div>
                      <div className="font-mono text-xs bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-purple-300 mb-4">
                        <code>def calculate_hash(data: dict): return hashlib.sha256(jcs_canonicalize(data)).hexdigest()</code>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => completeWorkout('pure-sprint', 100, '⚡ PERFECT: 3x Combo Streak! Function is 100% PURE with zero side-effects (+100 XP)')}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl text-xs shadow-md transition-all"
                        >
                          PURE (Zero Side Effects)
                        </button>
                        <button 
                          onClick={() => setWorkoutResult('❌ INCORRECT: SHA256 hashing on immutable inputs is strictly PURE!')}
                          className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                        >
                          IMPURE (Has Side Effects)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Workout 2: DOM Puzzle Match */}
                  {activeWorkout === 'dom-puzzle' && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono bg-rose-500 text-white px-2 py-0.5 rounded font-bold">MODE 2: DOM PUZZLE MATCH</span>
                        <span className="text-xs text-zinc-400">Select target node for zero token waste</span>
                      </div>
                      <div className="font-mono text-xs bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-rose-300 mb-4">
                        <code>&lt;main class=&quot;article-body&quot;&gt;&lt;p&gt;Target Web Content&lt;/p&gt;&lt;/main&gt;</code>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => completeWorkout('dom-puzzle', 100, '🎯 100% PRECISION: Clean READ_ONLY extraction node matched (+100 XP)')}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl text-xs shadow-md transition-all"
                        >
                          Target: main.article-body
                        </button>
                        <button 
                          onClick={() => setWorkoutResult('❌ HIGH TOKEN WASTE: Selecting entire body causes 90% unneeded token noise.')}
                          className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-xl text-xs transition-all"
                        >
                          Target: body
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Workout 3: Cache Hit Challenge */}
                  {activeWorkout === 'cache-duel' && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono bg-sky-500 text-black px-2 py-0.5 rounded font-bold">MODE 3: CACHE HIT DUEL</span>
                        <span className="text-xs text-zinc-400">Idempotency Stream incoming: GET /api/v1/query?id=492</span>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <button 
                          onClick={() => completeWorkout('cache-duel', 100, '⏱️ 1.2s LATENCY SAVED: Cached answer returned with zero duplicate queries (+100 XP)')}
                          className="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-black font-bold rounded-xl text-xs shadow-md transition-all"
                        >
                          RETURN CACHED IDEMPOTENT ANSWER
                        </button>
                        <button 
                          onClick={() => setWorkoutResult('❌ UNNECESSARY LATENCY: Idempotent queries should read from JCS cache.')}
                          className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-xl text-xs transition-all"
                        >
                          RE-RUN LIVE SEARCH
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Workout 4: Gate Intercept Workout */}
                  {activeWorkout === 'gate-intercept' && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono bg-amber-500 text-black px-2 py-0.5 rounded font-bold">MODE 4: GATE INTERCEPT</span>
                        <span className="text-xs text-zinc-400">Agent attempted: deploy_cluster(&quot;production&quot;)</span>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <button 
                          onClick={() => completeWorkout('gate-intercept', 100, '🛡️ DURABILITY SHIELD UNLOCKED: Execution safely held in BLOCKED_NEEDS_GATE state (+100 XP)')}
                          className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-xl text-xs shadow-md transition-all"
                        >
                          INTERCEPT &amp; HOLD IN GATE
                        </button>
                        <button 
                          onClick={() => setWorkoutResult('❌ RISK WARNING: Non-idempotent write executed without human approval!')}
                          className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs transition-all"
                        >
                          AUTO-ALLOW WRITE
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Feedback Result Banner */}
                  {workoutResult && (
                    <div className="mt-4 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-emerald-400 animate-pulse">
                      {workoutResult}
                    </div>
                  )}
                </div>
              )}

              {/* Get Started Separated Pill Cards Section */}
              <div className="text-[10px] font-extrabold tracking-wider text-zinc-400 uppercase font-mono mb-3">Get Started &amp; Live Ticker</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="p-3.5 rounded-2xl border border-zinc-200/80 bg-white shadow-sm flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-blue-500 font-bold text-base">🔑</span>
                    <div>
                      <div className="font-bold text-zinc-950 text-xs">API Key</div>
                      <div className="text-[10px] text-zinc-500">Get started in 5 min</div>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                    sk_live_49f2h...
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl border border-zinc-200/80 bg-white shadow-sm flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-500 font-bold text-base">📊</span>
                    <div>
                      <div className="font-bold text-zinc-950 text-xs">Usage</div>
                      <div className="text-[10px] text-zinc-500">Past 30 Days</div>
                    </div>
                  </div>
                  <div className="flex items-end gap-1 h-5">
                    <div className="w-1.5 h-2 bg-emerald-300 rounded-sm" />
                    <div className="w-1.5 h-3 bg-emerald-400 rounded-sm" />
                    <div className="w-1.5 h-5 bg-emerald-500 rounded-sm" />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/60 shadow-sm flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950">
                    <span>🏆 Arena XP:</span>
                    <span className="font-mono text-amber-800 text-sm font-extrabold">{xp} XP</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                    {xp >= 300 ? 'Durable Architect' : xp >= 150 ? 'Workflow Builder' : 'Novice'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* OTHER TABS */}
          {activeTab === 'dbos-context' && (
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-emerald-100 text-emerald-950 font-bold">RUNTIME</span>
                <h3 className="text-2xl font-bold text-zinc-950">DBOS Transactional Context</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-6 font-medium">
                Wraps workflow execution steps inside an embedded DBOS transaction engine for automatic crash recovery.
              </p>
              <pre className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed mb-6 shadow-inner">
                <code>{`from trajectory_ir.runtime import Trajectory
from dbos import DBOS

DBOS.launch()

@DBOS.workflow()
def run_durable_agent():
    traj = Trajectory.start(tenant_id="prod-tenant-01")
    # Automatically checkpointed state
    print(f"Active Workflow ID: {traj.trajectory_id}")`}</code>
              </pre>
            </div>
          )}

          {activeTab === 'jcs-sealer' && (
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-purple-100 text-purple-950 font-bold">CRYPTOGRAPHY</span>
                <h3 className="text-2xl font-bold text-zinc-950">RFC 8785 JCS Payload Sealer</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-6 font-medium">
                Canonicalizes JSON payloads into deterministic byte streams before SHA256 hashing to guarantee seal integrity.
              </p>
              <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/80 font-mono text-xs space-y-3 mb-6">
                <div className="text-zinc-600 font-semibold">// Raw Input Payload:</div>
                <div className="text-purple-950 font-bold text-sm">{`{"tool": "deploy", "params": {"cluster": "us-east-1"}}`}</div>
                <div className="text-zinc-600 font-semibold mt-2">// Generated Cryptographic Decision Seal:</div>
                <div className="text-emerald-800 break-all font-bold text-sm">sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
              </div>
            </div>
          )}

          {activeTab === 'observation-log' && (
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-sky-100 text-sky-950 font-bold">CHAIN LOG</span>
                <h3 className="text-2xl font-bold text-zinc-950">Cryptographic Node Chain</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-6 font-medium">
                Appends immutable execution outcomes as SHA256 linked node chains in standard JSONL format.
              </p>
              <div className="border border-zinc-200 rounded-2xl overflow-hidden text-xs font-mono mb-6 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-zinc-100 text-zinc-800 text-[10px] uppercase font-bold">
                    <tr>
                      <th className="p-3">Seq</th>
                      <th className="p-3">Kind</th>
                      <th className="p-3">SHA256 Hash</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-700">
                    <tr>
                      <td className="p-3 font-extrabold text-zinc-950">001</td>
                      <td className="p-3 text-purple-700 font-bold">KIND_CALL</td>
                      <td className="p-3 text-zinc-600">sha256: a1b2c3d4...</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-zinc-950">002</td>
                      <td className="p-3 text-amber-700 font-bold">KIND_SEAL</td>
                      <td className="p-3 text-zinc-600">sha256: e8f9g0h1...</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-zinc-950">003</td>
                      <td className="p-3 text-emerald-700 font-bold">KIND_OBSERVATION</td>
                      <td className="p-3 text-zinc-600">sha256: 789xyz12...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tir-exporter' && (
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-amber-100 text-amber-950 font-bold">PACKAGE EXPORT</span>
                <h3 className="text-2xl font-bold text-zinc-950">Portable .tir Package Archive</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-6 font-medium">
                Export full trajectories as portable, inspectable ZIP archives for audit compliance and offline replay.
              </p>
              <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-200 font-mono text-xs space-y-2 mb-6 shadow-inner">
                <div className="text-amber-400 font-bold text-sm">📁 trajectory-prod-001.tir</div>
                <div className="pl-4 text-zinc-300">├── 📄 manifest.json</div>
                <div className="pl-4 text-zinc-300">├── 📄 metadata.jsonl</div>
                <div className="pl-4 text-zinc-300">├── 📁 seals/ (SHA256 signatures)</div>
                <div className="pl-4 text-zinc-300">└── 📁 artifacts/ (Binary CAS store)</div>
              </div>
            </div>
          )}

          {activeTab === 'durable-state' && (
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-indigo-100 text-indigo-950 font-bold">STORAGE</span>
                <h3 className="text-2xl font-bold text-zinc-950">SQLite &amp; PostgreSQL CAS State</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-6 font-medium">
                Sharded Content-Addressable Storage (CAS) preventing bucket listing degradation.
              </p>
              <div className="p-4 rounded-2xl border border-zinc-200 bg-[#f8f9fa] text-xs font-mono mb-6 shadow-sm">
                <div className="text-zinc-500 font-medium mb-1">// Sharded CAS Object Path:</div>
                <div className="text-indigo-700 font-bold text-sm">s3://trajir/cas/e3/b0c44298fc1c149afbf4...</div>
              </div>
            </div>
          )}

          {activeTab === 'seals-audit' && (
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-emerald-100 text-emerald-950 font-bold">CONFORMANCE</span>
                <h3 className="text-2xl font-bold text-zinc-950">Automated Seals Integrity Audit</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-6 font-medium">
                Runs cryptographic verification across all decision seals and observation nodes.
              </p>
              <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50 text-xs font-mono space-y-2 mb-6">
                <div className="text-emerald-800 font-extrabold text-sm">✓ Test R01 (Safe Resume): PASSED</div>
                <div className="text-emerald-800 font-extrabold text-sm">✓ Test R02 (Block-and-Gate): PASSED</div>
                <div className="text-zinc-700 font-medium pt-1">Total Nodes Verified: 42 | Mismatches: 0</div>
              </div>
            </div>
          )}

          {activeTab === 'block-and-gate' && (
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-rose-100 text-rose-950 font-bold">SAFETY PROTOCOL</span>
                <h3 className="text-2xl font-bold text-zinc-950">Block-and-Gate Human Intercept</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-6 font-medium">
                Interrupted NON_IDEMPOTENT_WRITE operations enter BLOCKED state to prevent catastrophic duplicates.
              </p>
              <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50 text-xs font-mono space-y-3 mb-6">
                <div className="text-rose-900 font-extrabold text-sm">🛑 Execution Gate: Interrupted Tool Operation</div>
                <div className="text-zinc-700 font-medium">Tool: deploy_server(&quot;prod-cluster&quot;) | Status: BLOCKED_NEEDS_GATE</div>
                <div className="flex items-center gap-3 pt-2">
                  <button className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors shadow-sm">
                    Approve Retry
                  </button>
                  <button className="px-4 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-800 font-semibold hover:bg-zinc-100 transition-colors shadow-sm">
                    Reject &amp; Abort
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interactive AI Chat Answers Container */}
          {chatHistory.length > 0 && (
            <div className="mb-4 space-y-3 max-h-48 overflow-y-auto p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-inner">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-2.5 text-xs ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-5 h-5 rounded-full bg-zinc-950 text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      ✨
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-zinc-950 text-white rounded-tr-none font-medium'
                      : 'bg-white border border-zinc-200 text-zinc-900 shadow-sm rounded-tl-none font-normal'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex items-center gap-2 text-xs text-zinc-500 italic">
                  <span className="animate-spin">✨</span> Thinking...
                </div>
              )}
            </div>
          )}

          {/* Interactive Editable Prompt Box */}
          <form onSubmit={handleSend} className="relative p-4 rounded-2xl border border-zinc-200/90 bg-white shadow-lg flex items-center justify-between gap-4">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Ask anything about ${activeTab.replace('-', ' ')} or Trajectory IR durable architecture...`}
              className="w-full bg-transparent border-none outline-none text-xs text-zinc-900 font-medium placeholder-zinc-400"
            />
            <div className="flex items-center gap-2">
              <button type="submit" className="w-7 h-7 rounded-xl bg-zinc-950 text-white flex items-center justify-center text-xs font-bold shadow-sm hover:bg-black transition-colors">
                ↑
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
