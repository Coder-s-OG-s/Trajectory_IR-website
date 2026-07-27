import Link from 'next/link';
import { DashboardShowcase } from '@/components/dashboard-showcase';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans overflow-hidden antialiased flex flex-col justify-between bg-matiks-grid">
      
      {/* Ambient Radial Neon Glows (Zero Lag Performance) */}
      <div className="absolute top-12 left-1/4 w-[450px] h-[450px] bg-[#ccff00]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#00f0ff]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Dark Pill Navigation Header (Fixed/Sticky on Scroll) */}
      <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4 bg-transparent border-0 outline-none shadow-none w-full">
        <div className="w-full bg-[#111113]/95 border border-white/10 shadow-2xl backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between gap-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 no-underline flex-shrink-0 group">
            <img src="/logo.png" alt="Trajectory IR" className="w-7 h-7 rounded-lg object-cover shadow-[0_0_12px_rgba(204,255,0,0.3)] group-hover:scale-105 transition-transform" />
            <span className="font-black text-sm tracking-tight text-white uppercase font-sans">
              Trajectory <span className="text-neon-lime">IR</span>
            </span>
          </Link>

          {/* Center Nav Links (Properly Spaced, Zero Overlap) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold text-zinc-400 flex-shrink-0 uppercase tracking-wide">
            <Link href="/docs" className="hover:text-[#ccff00] no-underline transition-colors whitespace-nowrap">Documentation</Link>
            <Link href="/docs/infrastructure" className="hover:text-[#ccff00] no-underline transition-colors whitespace-nowrap">Architecture</Link>
            <Link href="/docs/api" className="hover:text-[#ccff00] no-underline transition-colors whitespace-nowrap">API Reference</Link>
            <Link href="/docs/changelog" className="hover:text-[#ccff00] no-underline transition-colors whitespace-nowrap">Changelog</Link>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link 
              href="/docs/quickstart"
              className="px-5 py-2.5 rounded-full text-xs font-black text-black bg-[#ccff00] hover:bg-[#d6ff33] transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)] no-underline whitespace-nowrap uppercase tracking-wider"
            >
              Get started ⚡
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section Split Layout */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 sm:pt-16 pb-12 text-left animate-matiks-entrance w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left / Main Content: Punchy Copy & Glowing CTAs (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161618] border border-[#ccff00]/40 text-xs font-mono font-bold tracking-widest uppercase text-[#ccff00] shadow-[0_0_18px_rgba(204,255,0,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
              <span>Durable Semantic Layer for AI Agents</span>
            </div>

            {/* Main Headline (Matiks Intensity) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-black tracking-[-0.04em] leading-[0.93] uppercase text-white">
              Build AI systems grounded in <span className="animate-text-shine text-neon-lime">durable</span>, crash-safe execution.
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-xl font-medium text-zinc-400 max-w-2xl leading-relaxed">
              Wrap, seal, and recover every agent decision with <span className="text-white font-bold">RFC 8785 JCS hashing</span> and <span className="text-white font-bold">DBOS durable workflows</span>. Never lose state. Never duplicate side-effects.
            </p>

            {/* Glowing Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
              <Link
                href="/docs/quickstart"
                className="btn-matiks-lime px-8 py-4 rounded-xl text-base sm:text-lg font-black tracking-wider flex items-center justify-center gap-2 no-underline text-center"
              >
                <span>Get Started →</span>
              </Link>
              <Link
                href="/docs"
                className="px-8 py-4 rounded-xl text-base sm:text-lg font-bold tracking-wider uppercase bg-[#161618] hover:bg-[#1f1f22] text-white border border-white/15 hover:border-[#00f0ff]/60 hover:text-[#00f0ff] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] flex items-center justify-center no-underline text-center"
              >
                View API docs
              </Link>
            </div>

          </div>

          {/* Right / Hero Visual: Interactive Device/Terminal Mockup (Cols 8-12) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#1c1c21] to-[#101014] p-1 border border-[#ccff00]/50 shadow-[0_0_60px_-10px_rgba(204,255,0,0.25)] group overflow-hidden">
              
              {/* Glowing header bar */}
              <div className="bg-[#0a0a0c] px-4 py-3 rounded-t-xl flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-zinc-400 font-bold truncate">durable_agent_execution.ts</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-[#ccff00]/20 text-[#ccff00] uppercase border border-[#ccff00]/40 flex-shrink-0">
                  ⚡ JCS SEALED
                </span>
              </div>

              {/* Mockup Terminal Content / Decision Sealing Animation */}
              <div className="p-6 bg-[#0c0c0e] font-mono text-xs sm:text-sm space-y-4 text-zinc-300">
                <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-800 pb-3 text-xs">
                  <span>TASK: High-Value Agent Routing</span>
                  <span className="text-[#00f0ff] font-extrabold">STATE: PROTECTED</span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-zinc-500">// 1. Intersect tool command via semantic layer</p>
                  <p className="text-white font-bold">&gt; Trajectory.seal(agentDecision, <span className="text-[#00f0ff]">&apos;RFC 8785&apos;</span>);</p>
                </div>

                <div className="p-4 rounded-xl bg-[#141418] border border-white/10 space-y-2.5 shadow-inner">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">HASH: <code className="text-[#ccff00] font-extrabold">8f7e...c29a</code></span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">✓ DURABLE CHECKPOINT</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#00f0ff] to-[#ccff00] h-full w-full animate-pulse shadow-[0_0_12px_rgba(204,255,0,0.6)]" />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between font-extrabold text-sm sm:text-base">
                  <span className="text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
                    Side-Effects Duplicated:
                  </span>
                  <span className="text-neon-lime font-black">0 (ZERO)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Floating Interactive Arena & Dashboard Showcase */}
        <DashboardShowcase />

      </main>

      {/* Footer (Ultra-Slim Full-Width Edge-to-Edge Layout with Zero Bottom Margin) */}
      <footer className="relative z-20 border-t border-white/10 bg-[#0a0a0c] w-full px-6 md:px-10 pt-3 pb-1">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-zinc-400 font-semibold">
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-sm uppercase">Trajectory <span className="text-[#ccff00]">IR</span></span>
            <span className="text-zinc-500">&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 font-bold text-zinc-300 uppercase tracking-wide">
            <Link href="/docs" className="hover:text-[#ccff00] no-underline transition-colors">Documentation</Link>
            <Link href="/docs/infrastructure" className="hover:text-[#ccff00] no-underline transition-colors">Architecture</Link>
            <Link href="/docs/api" className="hover:text-[#ccff00] no-underline transition-colors">API Reference</Link>
            <a href="https://github.com/Coder-s-OG-s/Trajectory-IR" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] no-underline transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
