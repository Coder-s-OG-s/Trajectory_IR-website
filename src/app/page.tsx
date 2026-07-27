import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden" style={{ backgroundColor: '#0d0d0d' }}>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 62, 0, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 62, 0, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(255, 62, 0, 0.08) 0%, transparent 70%)',
      }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 md:px-16">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <img src="/logo.png" alt="Trajectory IR" className="w-8 h-8 rounded" />
          <span className="text-base font-bold tracking-wide uppercase" style={{ color: '#e0e0e0' }}>
            Trajectory <span style={{ color: '#ff3e00' }}>IR</span>
          </span>
        </Link>
        <div className="flex items-center gap-8 text-sm" style={{ color: '#777' }}>
          <Link href="/docs" className="no-underline transition-colors hover:text-white" style={{ color: 'inherit' }}>Documentation</Link>
          <Link href="/docs/api" className="no-underline transition-colors hover:text-white" style={{ color: 'inherit' }}>API</Link>
          <Link href="https://github.com/Coder-s-OG-s/Trajectory-IR" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium no-underline transition-all" style={{ color: '#e0e0e0', border: '1px solid #333' }} target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 pb-24">
        
        {/* Logo */}
        <div className="relative mb-10">
          <div className="absolute inset-0 rounded-3xl blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #ff3e00, transparent)' }} />
          <img 
            src="/logo.png" 
            alt="Trajectory IR" 
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl"
            style={{ 
              animation: 'float 6s ease-in-out infinite',
              boxShadow: '0 0 60px rgba(255, 62, 0, 0.15)',
            }}
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-wider uppercase" style={{ backgroundColor: 'rgba(255, 62, 0, 0.08)', color: '#ff3e00', border: '1px solid rgba(255, 62, 0, 0.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#ff3e00', animation: 'pulse 2s ease-in-out infinite' }} />
          v0.1.x &bull; Phase 1A
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.95] mb-6" style={{ color: '#fafafa' }}>
          Trajectory<br />
          <span style={{ 
            background: 'linear-gradient(135deg, #ff3e00, #ffb347)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>IR</span>
        </h1>

        <p className="max-w-lg text-base md:text-lg leading-relaxed mb-10" style={{ color: '#888' }}>
          The durable semantic layer that wraps every AI agent decision 
          in a crash-safe, cryptographically sealed execution log.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link 
            href="/docs/quickstart"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white no-underline transition-all duration-300"
            style={{ 
              background: 'linear-gradient(135deg, #ff3e00, #e63600)',
              boxShadow: '0 4px 30px rgba(255, 62, 0, 0.3)',
            }}
          >
            Get Started
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
          <Link
            href="https://github.com/Coder-s-OG-s/Trajectory-IR"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold no-underline transition-all duration-300"
            style={{ color: '#ccc', border: '1px solid #333', backgroundColor: 'rgba(255,255,255,0.03)' }}
            target="_blank"
          >
            View on GitHub
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px max-w-5xl w-full rounded-2xl overflow-hidden" style={{ backgroundColor: '#222' }}>
          {[
            { 
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff3e00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              ),
              title: 'Crash Safe Execution', 
              desc: 'Every tool call is sealed with RFC 8785 JCS hashing before execution. If it crashes, it resumes — never re-executes.' 
            },
            { 
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff3e00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              ),
              title: 'Effect Classification', 
              desc: 'PURE, READ_ONLY, IDEMPOTENT_WRITE, NON_IDEMPOTENT_WRITE — strict safety boundaries for every tool.' 
            },
            { 
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff3e00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              ),
              title: 'Portable .tir Packages', 
              desc: 'Export full trajectories as portable, inspectable packages for auditing, replay, and compliance.' 
            },
          ].map((f, i) => (
            <div key={i} className="p-8 transition-all duration-300 group" style={{ backgroundColor: '#141414' }}>
              <div className="mb-4 p-3 rounded-xl inline-flex transition-all duration-300" style={{ backgroundColor: 'rgba(255, 62, 0, 0.06)', border: '1px solid rgba(255, 62, 0, 0.1)' }}>
                {f.icon}
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: '#e0e0e0' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#777' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-12 mt-16">
          {[
            { value: '4', label: 'Effect Classes' },
            { value: '3', label: 'Deploy Profiles' },
            { value: 'RFC 8785', label: 'JCS Standard' },
            { value: '100%', label: 'Crash Recovery' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-black" style={{ color: '#ff3e00' }}>{s.value}</div>
              <div className="text-xs mt-1 uppercase tracking-widest font-medium" style={{ color: '#666' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t px-8 py-14 md:px-16" style={{ borderColor: '#1a1a1a', backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-10 text-sm">
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs" style={{ color: '#555' }}>Resources</h4>
            <ul className="space-y-2.5 list-none p-0">
              <li><Link href="/docs" className="no-underline transition-colors hover:text-white" style={{ color: '#777' }}>Documentation</Link></li>
              <li><Link href="/docs/quickstart" className="no-underline transition-colors hover:text-white" style={{ color: '#777' }}>Quickstart</Link></li>
              <li><Link href="/docs/changelog" className="no-underline transition-colors hover:text-white" style={{ color: '#777' }}>Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs" style={{ color: '#555' }}>Architecture</h4>
            <ul className="space-y-2.5 list-none p-0">
              <li><Link href="/docs/infrastructure" className="no-underline transition-colors hover:text-white" style={{ color: '#777' }}>Infrastructure</Link></li>
              <li><Link href="/docs/lifecycle" className="no-underline transition-colors hover:text-white" style={{ color: '#777' }}>Lifecycle</Link></li>
              <li><Link href="/docs/security" className="no-underline transition-colors hover:text-white" style={{ color: '#777' }}>Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs" style={{ color: '#555' }}>Community</h4>
            <ul className="space-y-2.5 list-none p-0">
              <li><Link href="https://github.com/Coder-s-OG-s/Trajectory-IR" className="no-underline transition-colors hover:text-white" style={{ color: '#777' }} target="_blank">GitHub</Link></li>
              <li><Link href="https://github.com/Coder-s-OG-s/Trajectory-IR/blob/main/CONTRIBUTING.md" className="no-underline transition-colors hover:text-white" style={{ color: '#777' }} target="_blank">Contributing</Link></li>
              <li><Link href="https://github.com/Coder-s-OG-s/Trajectory-IR/blob/main/CODE_OF_CONDUCT.md" className="no-underline transition-colors hover:text-white" style={{ color: '#777' }} target="_blank">Code of Conduct</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs" style={{ color: '#555' }}>Legal</h4>
            <ul className="space-y-2.5 list-none p-0">
              <li><span style={{ color: '#777' }}>Apache 2.0 License</span></li>
              <li><Link href="/docs/security" className="no-underline transition-colors hover:text-white" style={{ color: '#777' }}>Security Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: '#1a1a1a', color: '#444' }}>
          <span>&copy; {new Date().getFullYear()} Trajectory IR. Built with Next.js &amp; Fumadocs.</span>
          <span>Made with 🧡 by the Coder&apos;s OG&apos;s team</span>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
