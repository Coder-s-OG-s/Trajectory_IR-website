'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardShowcase } from '@/components/dashboard-showcase';

export function LiveDemoSection() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-8 sm:px-12 py-20 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs sm:text-sm font-medium text-sky-200 mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Execution Engine</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
          style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          Try the Go SDK in action
        </h2>
        <p className="mt-4 text-base sm:text-lg text-sky-100/75 leading-relaxed font-normal">
          Explore how Trajectory IR seals decisions, verifies effect safety, and seamlessly handles process crashes using Temporal under the hood.
        </p>
      </div>

      {/* Embedded Interactive Showcase in a Glass Card */}
      <div className="liquid-glass-card p-4 sm:p-8 rounded-3xl border border-white/20 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500" />
            </span>
            <span className="text-sm font-semibold text-white">Live Trajectory Execution Simulator</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/docs/quickstart"
              className="text-xs font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors no-underline border border-white/15 flex items-center gap-1.5"
            >
              <span>Go SDK Quickstart</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        <DashboardShowcase />
      </div>
    </section>
  );
}
