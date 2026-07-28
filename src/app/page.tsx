import Link from 'next/link';
import { DashboardShowcase } from '@/components/dashboard-showcase';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans antialiased flex flex-col bg-[linear-gradient(180deg,#060B19_0%,#0A1128_30%,#111D4A_50%,#93C5FD_80%,#BFDBFE_100%)] text-white overflow-x-hidden">
      <SiteHeader />


      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-40 lg:pt-48 pb-32 flex flex-col justify-center">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 w-full">
          
          {/* Left Side: Headline */}
          <div className="w-full lg:w-[30%] flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.1] drop-shadow-lg">
              Build AI systems grounded in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DBEAFE] to-[#93C5FD]">crash-safe execution.</span>
            </h1>
          </div>

          {/* Center: Huge Premium Logo */}
          <div className="w-full lg:w-[40%] flex justify-center relative order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="absolute inset-0 bg-[#93C5FD] blur-[100px] opacity-20 rounded-full transform scale-110"></div>
            <img 
              src="/logo_transparent.png" 
              alt="Trajectory IR Premium Logo" 
              className="w-56 h-56 lg:w-80 lg:h-80 object-contain relative z-10 drop-shadow-[0_0_50px_rgba(147,197,253,0.3)]"
            />
          </div>

          {/* Right Side: Supporting text & CTAs */}
          <div className="w-full lg:w-[30%] flex flex-col items-center lg:items-end text-center lg:text-right order-3 lg:order-3 pt-4 lg:pt-0">
            <p className="text-lg text-gray-300 leading-relaxed drop-shadow-md mb-8">
              Wrap, seal, and recover every agent decision. Never lose state. Never duplicate side-effects. The ultimate durability engine for production AI.
            </p>

            <div className="flex flex-col items-center lg:items-end gap-4 w-full">
              <Link
                href="/docs/quickstart"
                className="bg-[rgba(255,255,255,0.85)] backdrop-blur-xl border border-white/40 text-[#060B19] hover:bg-white w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(191,219,254,0.25)] hover:shadow-[0_4px_32px_rgba(191,219,254,0.4)] hover:-translate-y-[1px]"
              >
                Start Building
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              <Link
                href="/docs"
                className="glass-pill w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium transition-all flex items-center justify-center hover:bg-white/10"
              >
                View Documentation
              </Link>
            </div>
          </div>
          
        </div>

      </main>

      {/* Floating Bottom Bar Container */}
      <div className="absolute bottom-8 left-0 w-full px-8 flex items-center justify-center z-50 pointer-events-none">
        
        {/* Left Side: GitHub */}
        <div className="absolute left-8 lg:left-12">
          <Link 
            href="https://github.com" 
            target="_blank"
            className="glass-pill pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center text-[#0A1128] hover:text-[#060B19] transition-all hover:-translate-y-1 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.814 1.102.814 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
        </div>

        {/* Center: Demo Pill */}
        <Link 
          href="/demo" 
          className="glass-pill pointer-events-auto px-8 py-3.5 rounded-full flex items-center gap-3 text-sm font-semibold text-[#0A1128] transition-all group hover:-translate-y-1"
        >
          Get started with demo
          <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </Link>

        {/* Right Side: Discord */}
        <div className="absolute right-8 lg:right-12">
          <Link 
            href="https://discord.com" 
            target="_blank"
            className="glass-pill pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center text-[#0A1128] hover:text-[#060B19] transition-all hover:-translate-y-1 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
            </svg>
          </Link>
        </div>
      </div>

    </div>
  );
}
