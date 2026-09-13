'use client';

import React from 'react';

interface Step {
  num: string;
  name: string;
  effect: string;
  desc: string;
  hash: string;
}

const steps: Step[] = [
  {
    num: '01',
    name: 'DECISION',
    effect: 'Plan Sealed',
    desc: 'The model outputs a proposed action. Trajectory IR seals the plan with an immutable cryptographic SHA-256 hash before running any side effect.',
    hash: 'sha256:8f7e9c29...e1',
  },
  {
    num: '02',
    name: 'TOOL_CALL',
    effect: 'Effect Guarded',
    desc: 'The tool executes under its declared effect class (ReadOnly, IdempotentWrite, NonIdempotentWrite, Destructive). If dangerous, gating is prepared.',
    hash: 'sha256:d41d8cd9...3a',
  },
  {
    num: '03',
    name: 'OBSERVATION',
    effect: 'Result Committed',
    desc: 'Tool stdout, returned data, or structured errors are captured and committed as an append-only child node linked to the sealed decision.',
    hash: 'sha256:a1b2c3d4...5f',
  },
  {
    num: '04',
    name: 'EXPORT (.tir)',
    effect: 'Packaged & Portable',
    desc: 'The entire trajectory DAG is zipped into a portable .tir package with manifests and artifact hashes, ready for audit, replay, or agent handoff.',
    hash: 'sha256:f0e1d2c3...9b',
  },
];

export function TrajectoryLifecycle() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-8 sm:px-12 py-20 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs sm:text-sm font-medium text-sky-200 mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-sky-300" />
          <span>Execution Pipeline</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
          style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          Lifecycle of an Agent Step
        </h2>
        <p className="mt-4 text-base sm:text-lg text-sky-100/75 leading-relaxed font-normal">
          How Trajectory IR transforms volatile AI reasoning loops into verifiable, deterministic state transitions.
        </p>
      </div>

      {/* Horizontal / Grid Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className="liquid-glass-card p-6 sm:p-7 rounded-2xl border border-white/15 hover:border-sky-300/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-white/10 text-sky-200 border border-white/10">
                  STEP {step.num}
                </span>
                <span className="text-[11px] font-semibold text-sky-300/80 px-2 py-0.5 rounded bg-sky-400/10 border border-sky-400/20">
                  {step.effect}
                </span>
              </div>

              <h3
                className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-sky-200 transition-colors"
                style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif" }}
              >
                {step.name}
              </h3>

              <p className="text-xs sm:text-sm text-sky-100/70 leading-relaxed font-normal mb-4">
                {step.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-sky-200/50 font-mono">
              <span>Node ID:</span>
              <span className="text-sky-300/80">{step.hash}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
