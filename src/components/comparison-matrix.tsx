'use client';

import React from 'react';

interface Row {
  capability: string;
  description: string;
  logs: boolean | 'partial';
  checkpoints: boolean | 'partial';
  trajectoryIR: boolean;
}

const rows: Row[] = [
  {
    capability: 'Cryptographic Node Hashing',
    description: 'Every decision, tool call, and observation has a stable SHA-256 hash linked into an immutable Merkle chain.',
    logs: false,
    checkpoints: false,
    trajectoryIR: true,
  },
  {
    capability: 'Sealed Decisions Before Execution',
    description: 'The LLM plan is sealed prior to execution, preventing plan re-inference drift or model divergence on restart.',
    logs: false,
    checkpoints: false,
    trajectoryIR: true,
  },
  {
    capability: '6-Tier Effect Safety Classification',
    description: 'Classifies tools into ReadOnly, IdempotentWrite, NonIdempotentWrite, Destructive, AgentSpawn, and Sensitive.',
    logs: false,
    checkpoints: 'partial',
    trajectoryIR: true,
  },
  {
    capability: 'Automated Human-in-the-Loop Gating',
    description: 'Crashes during non-idempotent operations transition into BLOCKED_NEEDS_GATE rather than blindly re-firing.',
    logs: false,
    checkpoints: 'partial',
    trajectoryIR: true,
  },
  {
    capability: 'Universal Runtime Portability (.tir)',
    description: 'Finished or in-flight trajectories export to a runtime-agnostic package verifiable by external auditors or other agents.',
    logs: false,
    checkpoints: false,
    trajectoryIR: true,
  },
  {
    capability: 'Pluggable Durable Infrastructure',
    description: 'Runs on hardened durable execution backends (Temporal for Go, DBOS for Python) without framework lock-in.',
    logs: false,
    checkpoints: 'partial',
    trajectoryIR: true,
  },
];

export function ComparisonMatrix() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-8 sm:px-12 py-20 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs sm:text-sm font-medium text-sky-200 mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>Evaluation Matrix</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
          style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          Why Trajectory IR?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-sky-100/75 leading-relaxed font-normal">
          Comparing unstructured logs, framework-specific checkpoints, and the normative Trajectory IR semantic contract.
        </p>
      </div>

      {/* Comparison Table in Liquid Glass Card */}
      <div className="liquid-glass-card rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/15 bg-white/[0.04]">
                <th className="p-5 sm:p-6 text-sm font-semibold text-white/90">Capability</th>
                <th className="p-5 sm:p-6 text-sm font-medium text-sky-100/60 text-center w-36 sm:w-44">
                  Unstructured Logs
                </th>
                <th className="p-5 sm:p-6 text-sm font-medium text-sky-100/60 text-center w-36 sm:w-44">
                  Framework Checkpoints
                </th>
                <th className="p-5 sm:p-6 text-sm font-semibold text-sky-300 text-center w-36 sm:w-48 bg-sky-500/10 border-l border-r border-sky-400/20">
                  Trajectory IR (.tir)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {rows.map((row) => (
                <tr key={row.capability} className="hover:bg-white/[0.03] transition-colors">
                  <td className="p-5 sm:p-6">
                    <div className="font-semibold text-white mb-1">{row.capability}</div>
                    <div className="text-xs text-sky-100/65 max-w-lg leading-relaxed">{row.description}</div>
                  </td>
                  <td className="p-5 sm:p-6 text-center">
                    {row.logs ? (
                      <span className="text-emerald-400 font-bold">✓</span>
                    ) : (
                      <span className="text-white/25">✕</span>
                    )}
                  </td>
                  <td className="p-5 sm:p-6 text-center">
                    {row.checkpoints === true && <span className="text-emerald-400 font-bold">✓</span>}
                    {row.checkpoints === 'partial' && (
                      <span className="text-amber-300/80 text-xs px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                        Partial
                      </span>
                    )}
                    {row.checkpoints === false && <span className="text-white/25">✕</span>}
                  </td>
                  <td className="p-5 sm:p-6 text-center bg-sky-500/[0.06] border-l border-r border-sky-400/20">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/40 font-bold text-sm">
                      ✓
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
