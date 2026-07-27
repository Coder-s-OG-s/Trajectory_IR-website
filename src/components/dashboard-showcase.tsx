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

export function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <div className="mt-16 text-left max-w-5xl mx-auto rounded-2xl border border-zinc-200/90 bg-white shadow-xl overflow-hidden transition-all duration-300 antialiased">
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
        
        {/* Mockup Left Sidebar - WORKABLE BUTTONS */}
        <div className="md:col-span-3 border-r border-zinc-200/90 p-5 bg-[#f8f9fa]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="w-5 h-5 rounded" />
              <span className="font-extrabold text-xs tracking-tight text-zinc-950">Trajectory IR</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-zinc-200/80 border border-zinc-300/60 flex items-center justify-center text-[10px]">⚙️</div>
          </div>

          {/* Sidebar Menu Items (Workable Interactive Buttons) */}
          <div className="space-y-4 text-xs font-semibold text-zinc-700">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 font-bold ${
                activeTab === 'overview'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'hover:bg-zinc-200/70 text-zinc-800'
              }`}
            >
              <span>📊</span> Overview
            </button>

            <div>
              <div className="text-[10px] font-extrabold tracking-wider text-zinc-500 uppercase px-2 mb-2 font-mono">Agent Runtime</div>
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
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                      activeTab === item.id
                        ? 'bg-zinc-950 text-white font-bold shadow-sm'
                        : 'hover:bg-zinc-200/70 text-zinc-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-extrabold tracking-wider text-zinc-500 uppercase px-2 mb-2 font-mono">Management</div>
              <div className="space-y-1">
                {[
                  { id: 'durable-state' as TabId, label: '🗄️ Durable State' },
                  { id: 'seals-audit' as TabId, label: '🛡️ Seals Audit' },
                  { id: 'block-and-gate' as TabId, label: '🚧 Block-and-Gate' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                      activeTab === item.id
                        ? 'bg-zinc-950 text-white font-bold shadow-sm'
                        : 'hover:bg-zinc-200/70 text-zinc-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mockup Main Dashboard Area - DYNAMIC SCREEN DATA */}
        <div className="md:col-span-9 p-6 flex flex-col justify-between bg-white">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-xl font-bold text-zinc-950 tracking-tight mb-1">
                Durable Execution Infrastructure for AI Applications
              </h3>
              <p className="text-xs text-zinc-600 mb-6 font-medium">
                Strict effect classification and cryptographic seals for zero duplicate side-effects.
              </p>

              <div className="text-[10px] font-extrabold tracking-wider text-zinc-500 uppercase font-mono mb-3">Effect Classification Planes</div>

              {/* 4 Pastel Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/80 flex flex-col justify-between">
                  <div>
                    <div className="font-extrabold text-xs text-emerald-950">Pure Operations</div>
                    <div className="text-[10px] text-emerald-800 font-medium mt-1">PURE — zero side-effects</div>
                  </div>
                  <button onClick={() => setActiveTab('dbos-context')} className="mt-4 text-[10px] font-bold text-emerald-800 px-2.5 py-1 rounded bg-white border border-emerald-300 self-start shadow-sm hover:bg-emerald-100 transition-colors">
                    Explore Pure API
                  </button>
                </div>

                <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/80 flex flex-col justify-between">
                  <div>
                    <div className="font-extrabold text-xs text-sky-950">Read Operations</div>
                    <div className="text-[10px] text-sky-800 font-medium mt-1">READ_ONLY — DB queries</div>
                  </div>
                  <button onClick={() => setActiveTab('observation-log')} className="mt-4 text-[10px] font-bold text-sky-800 px-2.5 py-1 rounded bg-white border border-sky-300 self-start shadow-sm hover:bg-sky-100 transition-colors">
                    Explore Read API
                  </button>
                </div>

                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/80 flex flex-col justify-between">
                  <div>
                    <div className="font-extrabold text-xs text-amber-950">Idempotent Writes</div>
                    <div className="text-[10px] text-amber-800 font-medium mt-1">IDEMPOTENT — key retries</div>
                  </div>
                  <button onClick={() => setActiveTab('jcs-sealer')} className="mt-4 text-[10px] font-bold text-amber-800 px-2.5 py-1 rounded bg-white border border-amber-300 self-start shadow-sm hover:bg-amber-100 transition-colors">
                    Explore Write API
                  </button>
                </div>

                <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/80 flex flex-col justify-between">
                  <div>
                    <div className="font-extrabold text-xs text-rose-950">Non-Idempotent</div>
                    <div className="text-[10px] text-rose-800 font-medium mt-1">NON_IDEMPOTENT — Gate</div>
                  </div>
                  <button onClick={() => setActiveTab('block-and-gate')} className="mt-4 text-[10px] font-bold text-rose-800 px-2.5 py-1 rounded bg-white border border-rose-300 self-start shadow-sm hover:bg-rose-100 transition-colors">
                    Explore Gate API
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DBOS CONTEXT */}
          {activeTab === 'dbos-context' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-900 font-bold">RUNTIME</span>
                <h3 className="text-xl font-bold text-zinc-950">DBOS Transactional Context</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 font-medium">
                Wraps workflow execution steps inside an embedded DBOS transaction engine for automatic crash recovery.
              </p>
              <pre className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed mb-4 shadow-inner">
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

          {/* TAB 3: JCS SEALER */}
          {activeTab === 'jcs-sealer' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-100 text-purple-900 font-bold">CRYPTOGRAPHY</span>
                <h3 className="text-xl font-bold text-zinc-950">RFC 8785 JCS Payload Sealer</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 font-medium">
                Canonicalizes JSON payloads into deterministic byte streams before SHA256 hashing to guarantee seal integrity.
              </p>
              <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/80 font-mono text-xs space-y-2 mb-4">
                <div className="text-zinc-600 font-semibold">// Raw Input Payload:</div>
                <div className="text-purple-950 font-bold">{`{"tool": "deploy", "params": {"cluster": "us-east-1"}}`}</div>
                <div className="text-zinc-600 font-semibold mt-2">// Generated Cryptographic Decision Seal:</div>
                <div className="text-emerald-800 break-all font-bold">sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
              </div>
            </div>
          )}

          {/* TAB 4: OBSERVATION LOG */}
          {activeTab === 'observation-log' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-100 text-sky-900 font-bold">CHAIN LOG</span>
                <h3 className="text-xl font-bold text-zinc-950">Cryptographic Node Chain</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 font-medium">
                Appends immutable execution outcomes as SHA256 linked node chains in standard JSONL format.
              </p>
              <div className="border border-zinc-200 rounded-xl overflow-hidden text-xs font-mono mb-4 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-zinc-100 text-zinc-800 text-[10px] uppercase font-bold">
                    <tr>
                      <th className="p-2.5">Seq</th>
                      <th className="p-2.5">Kind</th>
                      <th className="p-2.5">SHA256 Hash</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-700">
                    <tr>
                      <td className="p-2.5 font-extrabold text-zinc-950">001</td>
                      <td className="p-2.5 text-purple-700 font-bold">KIND_CALL</td>
                      <td className="p-2.5 text-zinc-600">sha256: a1b2c3d4...</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-extrabold text-zinc-950">002</td>
                      <td className="p-2.5 text-amber-700 font-bold">KIND_SEAL</td>
                      <td className="p-2.5 text-zinc-600">sha256: e8f9g0h1...</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-extrabold text-zinc-950">003</td>
                      <td className="p-2.5 text-emerald-700 font-bold">KIND_OBSERVATION</td>
                      <td className="p-2.5 text-zinc-600">sha256: 789xyz12...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: TIR EXPORTER */}
          {activeTab === 'tir-exporter' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 text-amber-900 font-bold">PACKAGE EXPORT</span>
                <h3 className="text-xl font-bold text-zinc-950">Portable .tir Package Archive</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 font-medium">
                Export full trajectories as portable, inspectable ZIP archives for audit compliance and offline replay.
              </p>
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 font-mono text-xs space-y-1.5 mb-4 shadow-inner">
                <div className="text-amber-400 font-bold">📁 trajectory-prod-001.tir</div>
                <div className="pl-4 text-zinc-300">├── 📄 manifest.json</div>
                <div className="pl-4 text-zinc-300">├── 📄 metadata.jsonl</div>
                <div className="pl-4 text-zinc-300">├── 📁 seals/ (SHA256 signatures)</div>
                <div className="pl-4 text-zinc-300">└── 📁 artifacts/ (Binary CAS store)</div>
              </div>
            </div>
          )}

          {/* TAB 6: DURABLE STATE */}
          {activeTab === 'durable-state' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-100 text-indigo-900 font-bold">STORAGE</span>
                <h3 className="text-xl font-bold text-zinc-950">SQLite &amp; PostgreSQL CAS State</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 font-medium">
                Sharded Content-Addressable Storage (CAS) preventing bucket listing degradation.
              </p>
              <div className="p-3.5 rounded-xl border border-zinc-200 bg-[#f8f9fa] text-xs font-mono mb-4 shadow-sm">
                <div className="text-zinc-500 font-medium mb-1">// Sharded CAS Object Path:</div>
                <div className="text-indigo-700 font-bold">s3://trajir/cas/e3/b0c44298fc1c149afbf4...</div>
              </div>
            </div>
          )}

          {/* TAB 7: SEALS AUDIT */}
          {activeTab === 'seals-audit' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-900 font-bold">CONFORMANCE</span>
                <h3 className="text-xl font-bold text-zinc-950">Automated Seals Integrity Audit</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 font-medium">
                Runs cryptographic verification across all decision seals and observation nodes.
              </p>
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-mono space-y-2 mb-4">
                <div className="text-emerald-800 font-extrabold">✓ Test R01 (Safe Resume): PASSED</div>
                <div className="text-emerald-800 font-extrabold">✓ Test R02 (Block-and-Gate): PASSED</div>
                <div className="text-zinc-700 font-medium">Total Nodes Verified: 42 | Mismatches: 0</div>
              </div>
            </div>
          )}

          {/* TAB 8: BLOCK AND GATE */}
          {activeTab === 'block-and-gate' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-100 text-rose-900 font-bold">SAFETY PROTOCOL</span>
                <h3 className="text-xl font-bold text-zinc-950">Block-and-Gate Human Intercept</h3>
              </div>
              <p className="text-xs text-zinc-600 mb-4 font-medium">
                Interrupted NON_IDEMPOTENT_WRITE operations enter BLOCKED state to prevent catastrophic duplicates.
              </p>
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-xs font-mono space-y-3 mb-4">
                <div className="text-rose-900 font-extrabold">🛑 Execution Gate: Interrupted Tool Operation</div>
                <div className="text-zinc-700 font-medium">Tool: deploy_server(&quot;prod-cluster&quot;) | Status: BLOCKED_NEEDS_GATE</div>
                <div className="flex items-center gap-2 pt-2">
                  <button className="px-3.5 py-1.5 rounded bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors shadow-sm">
                    Approve Retry
                  </button>
                  <button className="px-3.5 py-1.5 rounded border border-zinc-300 bg-white text-zinc-800 font-semibold hover:bg-zinc-100 transition-colors shadow-sm">
                    Reject &amp; Abort
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Context Bar */}
          <div className="p-3.5 rounded-xl border border-zinc-200 bg-[#f8f9fa] flex flex-wrap items-center justify-between gap-3 text-xs mb-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#ff3e00] font-extrabold">🔒 Active Context</span>
              <span className="font-mono text-[11px] text-orange-800 bg-orange-100 px-2 py-0.5 rounded border border-orange-300 font-bold">
                view = &quot;{activeTab}&quot;
              </span>
            </div>
            <div className="flex items-center gap-4 text-zinc-600 text-[11px]">
              <span className="text-emerald-700 font-bold">● Phase 1A Active</span>
              <Link href="/docs" className="no-underline text-zinc-950 font-bold hover:underline">Docs ↗</Link>
              <Link href="/docs/api" className="no-underline text-zinc-950 font-bold hover:underline">SDK Reference ↗</Link>
            </div>
          </div>

          {/* Bottom Dynamic Prompt Box */}
          <div className="relative p-3.5 rounded-2xl border border-zinc-200/90 bg-white shadow-md flex items-center justify-between gap-3">
            <input 
              type="text" 
              placeholder={`Ask about ${activeTab.replace('-', ' ')} or Trajectory IR durable architecture...`}
              className="w-full bg-transparent border-none outline-none text-xs text-zinc-900 font-medium placeholder-zinc-400"
              readOnly
            />
            <div className="flex items-center gap-2">
              <button className="w-6 h-6 rounded-lg bg-zinc-950 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ↑
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
