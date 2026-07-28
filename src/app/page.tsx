import Link from 'next/link';
import { DashboardShowcase } from '@/components/dashboard-showcase';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CursorGlow } from '@/components/cursor-glow';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans antialiased flex flex-col">
      <CursorGlow />
      <SiteHeader />

      <main className="relative z-10 w-full mx-auto px-4 pt-20 pb-16 text-center flex-1 flex flex-col items-center overflow-x-hidden">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center space-y-8 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-600 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#f26625]" />
            <span>Durable Semantic Layer for AI Agents</span>
          </div>

          <h1 
            className="font-extrabold tracking-tight leading-[1.05] text-zinc-900 drop-shadow-sm whitespace-nowrap px-4"
            style={{ 
              fontFamily: 'var(--font-heading), system-ui, sans-serif',
              fontSize: 'clamp(1rem, 2.7vw, 4rem)'
            }}
          >
            Build AI systems grounded in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f26625] to-[#f7931e]">durable, crash-safe execution.</span>
          </h1>

          <p className="text-lg md:text-xl font-medium text-zinc-500 max-w-2xl leading-relaxed mt-6">
            Wrap, seal, and recover every agent decision. Never lose state. Never duplicate side-effects. The ultimate durability engine for production AI.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
            <Link
              href="/docs/quickstart"
              className="px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-[#f26625] hover:bg-[#e55a1b] transition-all shadow-sm flex items-center justify-center no-underline"
            >
              Get Started
            </Link>
            <Link
              href="/docs"
              className="px-8 py-3.5 rounded-xl text-base font-semibold text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-200 transition-all flex items-center justify-center no-underline"
            >
              View Documentation
            </Link>
          </div>
        </div>

        {/* Dashboard Showcase (Interactive Element) */}
        <div className="w-full mt-24">
          <DashboardShowcase />
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
