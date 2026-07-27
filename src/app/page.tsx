import Link from 'next/link';
import { DashboardShowcase } from '@/components/dashboard-showcase';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] text-zinc-950 font-sans overflow-hidden antialiased pb-20">
      
      {/* Soft Pastel Background Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none opacity-80">
        <div className="absolute top-8 left-1/4 w-[550px] h-[450px] rounded-full blur-[130px]" style={{ background: 'radial-gradient(circle, #ffeedd 0%, #fae8ff 50%, transparent 70%)' }} />
        <div className="absolute top-16 right-1/4 w-[500px] h-[400px] rounded-full blur-[110px]" style={{ background: 'radial-gradient(circle, #e0e7ff 0%, #fee2e2 50%, transparent 70%)' }} />
      </div>

      {/* Floating Rounded Pill Navigation Header (Crisp Light Contrast) */}
      <header className="relative z-20 max-w-5xl mx-auto pt-6 px-4 bg-transparent border-0 outline-none shadow-none">
        <div className="w-full bg-white/95 border border-zinc-200/90 shadow-sm backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <img src="/logo.png" alt="Trajectory IR" className="w-7 h-7 rounded-lg object-cover shadow-sm" />
            <span className="font-extrabold text-sm tracking-tight text-zinc-950">
              Trajectory <span style={{ color: '#ff3e00' }}>IR</span>
            </span>
          </Link>

          {/* Center Nav Links (No Pricing Section) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-zinc-700">
            <Link href="/" className="text-zinc-950 font-bold no-underline transition-colors">Home</Link>
            <Link href="/docs" className="hover:text-zinc-950 no-underline transition-colors">Documentation</Link>
            <Link href="/docs/infrastructure" className="hover:text-zinc-950 no-underline transition-colors">Architecture</Link>
            <Link href="/docs/api" className="hover:text-zinc-950 no-underline transition-colors">API Reference</Link>
            <Link href="/docs/changelog" className="hover:text-zinc-950 no-underline transition-colors">Changelog</Link>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-4">
            <Link 
              href="/docs/quickstart"
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-zinc-950 hover:bg-black transition-all shadow-sm no-underline"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero & Main Content Section (Wide Free Room Layout) */}
      <main className="relative z-10 max-w-[1240px] mx-auto px-6 pt-12 pb-24 text-center">
        
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
          <Link
            href="/docs/quickstart"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-white bg-zinc-950 hover:bg-black transition-all shadow-md no-underline"
          >
            Get Started →
          </Link>
          <Link
            href="/docs"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-bold text-zinc-800 bg-white border border-zinc-200/90 hover:bg-zinc-100 transition-all shadow-sm no-underline"
          >
            View API docs
          </Link>
        </div>

        {/* Separated Floating Dashboard Showcase Component */}
        <DashboardShowcase />

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-200 bg-white px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-5 h-5 rounded" />
            <span className="font-bold text-zinc-950">Trajectory IR</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 font-medium">
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
