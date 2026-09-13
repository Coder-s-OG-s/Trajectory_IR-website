'use client';

import React, { useState } from 'react';

interface Layer {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  role: string;
  description: string;
  examples: string[];
  isHighlighted?: boolean;
}

const layers: Layer[] = [
  {
    id: 'frameworks',
    name: 'Agent Frameworks & Orchestrators',
    badge: 'Application Layer',
    badgeColor: 'bg-white/10 text-white/80 border-white/20',
    role: 'Prompting, LLM Routing, Graph Loops',
    description:
      'High-level frameworks define how models interact with users, route tasks, and reason through graph loops. They produce decisions but typically lack cross-runtime portability.',
    examples: ['LangGraph', 'CrewAI', 'Google ADK', 'OpenAI Agents SDK', 'Custom LLM Loops'],
  },
  {
    id: 'trajectory-ir',
    name: 'Trajectory IR (.tir)',
    badge: 'Normative Semantic Layer',
    badgeColor: 'bg-sky-400/20 text-sky-200 border-sky-400/40',
    role: 'Sealed Decisions, 6-Tier Effect Safety, .tir Portability',
    description:
      'The missing standard for agent execution. Seals decisions with cryptographic hashes before execution, classifies tool effects, enforces human gates on failure, and packages runs into portable .tir archives.',
    examples: ['Sealed Plans', 'Effect Safety Matrix', 'SHA-256 DAG Nodes', 'Runtime-Independent .tir'],
    isHighlighted: true,
  },
  {
    id: 'durable-backends',
    name: 'Durable Execution Engines',
    badge: 'Infrastructure Layer',
    badgeColor: 'bg-white/10 text-white/80 border-white/20',
    role: 'Crash Detection, Worker Leases, Replay Machinery',
    description:
      'Hardened cloud infrastructure that guarantees at-most-once execution, deterministic replay, and worker lease heartbeats. Trajectory IR sits on top of these instead of reinventing them.',
    examples: ['Temporal (Go Production)', 'DBOS (Python Reference)', 'Restate (Optional Adapter)'],
  },
];

export function StackDiagram() {
  const [activeLayer, setActiveLayer] = useState<string>('trajectory-ir');

  return (
    <section className="w-full max-w-[1280px] mx-auto px-8 sm:px-12 py-20 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs sm:text-sm font-medium text-sky-200 mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-sky-300" />
          <span>System Topology</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
          style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          Where Trajectory IR sits in your stack
        </h2>
        <p className="mt-4 text-base sm:text-lg text-sky-100/75 leading-relaxed font-normal">
          Trajectory IR is neither an agent orchestrator nor a workflow engine. It is the semantic and portability contract that connects the two.
        </p>
      </div>

      {/* Layer Stack Presentation */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {layers.map((layer, index) => {
          const isSelected = activeLayer === layer.id;
          return (
            <div
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`liquid-glass-card p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 ${
                layer.isHighlighted
                  ? 'border-sky-400/50 bg-sky-950/20 shadow-[0_0_30px_rgba(56,189,248,0.12)]'
                  : 'border-white/15 hover:border-white/30'
              } ${isSelected ? 'ring-2 ring-sky-400/40' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-xs font-bold text-sky-200">
                    0{index + 1}
                  </span>
                  <h3
                    className="text-lg sm:text-xl font-semibold text-white tracking-tight"
                    style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif" }}
                  >
                    {layer.name}
                  </h3>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border w-fit ${layer.badgeColor}`}>
                  {layer.badge}
                </span>
              </div>

              <div className="text-xs sm:text-sm font-medium text-sky-300/90 mb-2">
                {layer.role}
              </div>

              <p className="text-sm text-sky-100/70 leading-relaxed font-normal mb-4">
                {layer.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/10">
                <span className="text-xs text-sky-200/50 font-medium">Artifacts & Engines:</span>
                {layer.examples.map((ex) => (
                  <span
                    key={ex}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-sky-100/90 font-mono"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration rule quote matching §3.1 */}
      <div className="mt-10 max-w-4xl mx-auto p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-sky-400/15 border border-sky-400/30 flex items-center justify-center shrink-0 mt-0.5 text-sky-300">
          💡
        </div>
        <p className="text-xs sm:text-sm text-sky-100/75 leading-relaxed font-normal">
          <strong className="text-white font-semibold">The Architectural Boundary:</strong> Durable execution engines solve durability <em>inside</em> one runtime. Trajectory IR solves portability <em>across</em> runtimes and external audits.
        </p>
      </div>
    </section>
  );
}
