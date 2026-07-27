'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export function DualTierHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <header className="w-full border-b transition-colors duration-200" style={{
      backgroundColor: 'var(--color-fd-background, #09090b)',
      borderColor: 'var(--color-fd-border, #222)',
    }}>
      {/* Tier 1: Top Bar - Full Width */}
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-2.5 w-full gap-4 flex-wrap md:flex-nowrap">
        {/* Left: Brand + Version */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <img src="/logo.png" alt="Trajectory IR" className="w-7 h-7 rounded object-cover" />
            <span className="font-bold text-sm tracking-tight" style={{ color: 'var(--color-fd-foreground, #fff)' }}>
              Trajectory <span style={{ color: '#ff3e00' }}>IR</span>
            </span>
          </Link>

          {/* Version Selector Badge */}
          <div className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-md cursor-pointer border transition-colors" style={{
            backgroundColor: 'var(--color-fd-card, #121215)',
            borderColor: 'var(--color-fd-border, #333)',
            color: 'var(--color-fd-muted-foreground, #888)',
          }}>
            <span>0.1.x</span>
            <span className="text-[10px]">∨</span>
          </div>
        </div>

        {/* Center: Search + Ask Assistant */}
        <div className="flex items-center gap-2 flex-1 max-w-md mx-2">
          <button
            onClick={() => {
              // Trigger Fumadocs search hotkey (Ctrl+K)
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: true }));
            }}
            className="flex items-center justify-between flex-1 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all text-left"
            style={{
              backgroundColor: 'var(--color-fd-card, #121215)',
              borderColor: 'var(--color-fd-border, #333)',
              color: 'var(--color-fd-muted-foreground, #888)',
            }}
          >
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span>Search...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] border" style={{ borderColor: 'var(--color-fd-border, #333)', backgroundColor: 'var(--color-fd-background, #09090b)' }}>Ctrl K</kbd>
          </button>

          <button
            onClick={() => {
              // Trigger search with Ask Assistant
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: true }));
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all hover:border-[#ff3e00]"
            style={{
              backgroundColor: 'var(--color-fd-card, #121215)',
              borderColor: 'var(--color-fd-border, #333)',
              color: '#ff3e00',
            }}
          >
            <span>✨</span>
            <span>Ask Assistant</span>
          </button>
        </div>

        {/* Right: Discord, GitHub Stars, Install Button, Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono no-underline transition-colors hover:text-[#ff3e00]"
            style={{ color: 'var(--color-fd-muted-foreground, #888)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            Discord
          </a>

          {/* GitHub Star Badge */}
          <a
            href="https://github.com/Coder-s-OG-s/Trajectory-IR"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono no-underline transition-colors hover:text-[#ff3e00]"
            style={{ color: 'var(--color-fd-muted-foreground, #888)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>GitHub</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded border" style={{ borderColor: 'var(--color-fd-border, #333)' }}>00</span>
          </a>

          {/* Install Button */}
          <Link
            href="/docs/quickstart"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-mono font-semibold no-underline transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--color-fd-foreground, #fff)',
              color: 'var(--color-fd-background, #000)',
            }}
          >
            <span>Install</span>
            <span>&gt;</span>
          </Link>

          {/* Theme Toggle Switch */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-1.5 rounded-lg border transition-colors hover:border-[#ff3e00]"
            style={{
              backgroundColor: 'var(--color-fd-card, #121215)',
              borderColor: 'var(--color-fd-border, #333)',
              color: 'var(--color-fd-foreground, #fff)',
            }}
            title="Toggle Light / Dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Tier 2: Sub-Navbar - Full Width */}
      <div className="border-t px-4 sm:px-6 md:px-8 w-full flex items-center gap-8 overflow-x-auto text-xs font-mono tracking-tight" style={{
        borderColor: 'var(--color-fd-border, #222)',
      }}>
        {[
          { label: 'Docs', href: '/docs' },
          { label: 'Tutorials', href: '#' },
          { label: 'SDK & Engine Reference', href: '/docs/api' },
          { label: 'Changelog', href: '/docs/changelog' },
        ].map((item) => {
          const isActive = pathname === item.href || (item.href === '/docs' && pathname.startsWith('/docs') && !pathname.startsWith('/docs/api') && !pathname.startsWith('/docs/changelog'));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`py-2.5 no-underline transition-all border-b-2 font-medium whitespace-nowrap ${
                isActive ? 'border-[#ff3e00] text-[#ff3e00]' : 'border-transparent hover:text-[#ff3e00]'
              }`}
              style={{
                color: isActive ? '#ff3e00' : 'var(--color-fd-muted-foreground, #888)',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
