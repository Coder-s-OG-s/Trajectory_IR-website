'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { lockScroll, unlockScroll } from '@/lib/scroll-lock';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Features',
    href: '/docs',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Semantic Layer', href: '/docs', description: 'Durable execution for AI agents' },
      { label: 'Crash-Safe State', href: '/docs/architecture', description: 'Automatic side-effect recovery' },
      { label: 'Replay Engine', href: '/docs/api', description: 'Deterministic step playback' },
    ],
  },
  {
    label: 'Architecture',
    href: '/docs/architecture',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Architecture', href: '/docs/architecture', description: 'Deep dive into system internals' },
      { label: 'GitHub Repo', href: 'https://github.com/Coder-s-OG-s/Trajectory-IR', description: 'Contribute & view source' },
      { label: 'Community', href: 'https://github.com/Coder-s-OG-s/Trajectory-IR/issues', description: 'Join discussions & issues' },
    ],
  },
];

function LiquidDropdownMenu({ 
  items, 
  isOpen, 
  onClose 
}: { 
  items: DropdownItem[]; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[260px] pointer-events-auto" role="menu">
      <div 
        className="liquid-glass-dropdown p-2"
        style={{
          animation: 'header-dropdown-enter 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.4)',
        }}
      >
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            role="menuitem"
            onClick={onClose}
            className="liquid-glass-dropdown-item block px-3.5 py-2.5 rounded-xl text-sm no-underline group"
          >
            <span className="font-semibold block text-white/95 group-hover:text-white transition-colors">
              {item.label}
            </span>
            {item.description && (
              <span className="block text-xs text-sky-100/60 group-hover:text-sky-100/90 mt-0.5 transition-colors">
                {item.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (!item.hasDropdown) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!item.hasDropdown) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // 150ms buffer prevents accidental closure when moving mouse
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        onClick={(e) => {
          if (item.hasDropdown) {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        className={`inline-flex items-center gap-1.5 text-sm font-medium no-underline px-3.5 py-2 rounded-full transition-all whitespace-nowrap ${
          isOpen ? 'text-white bg-white/15 shadow-sm' : 'text-white/90 hover:text-white hover:bg-white/10'
        }`}
        aria-expanded={isOpen}
        aria-haspopup={item.hasDropdown ? 'menu' : undefined}
      >
        <span>{item.label}</span>
        {item.hasDropdown && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
            className={`transition-transform duration-200 opacity-75 ${isOpen ? 'rotate-180 text-sky-300' : 'rotate-0'}`}
          >
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Link>

      {item.hasDropdown && item.dropdownItems && (
        <LiquidDropdownMenu
          items={item.dropdownItems}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isDocs = pathname?.startsWith('/docs');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, [mobileMenuOpen]);

  return (
    <header 
      className="liquid-glass-header z-50 w-full h-[72px] sm:h-[76px] flex items-center"
      style={{
        position: 'sticky',
        top: 0,
        background: isDocs ? 'rgba(6, 11, 25, 0.85)' : 'transparent',
        backdropFilter: isDocs ? 'blur(16px)' : undefined,
        WebkitBackdropFilter: isDocs ? 'blur(16px)' : undefined,
        borderBottom: isDocs ? '1px solid rgba(255, 255, 255, 0.05)' : undefined,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full flex items-center justify-between">
        {/* Left Brand Logo with Starburst */}
        <Link
          href="/"
          className="flex items-center gap-2.5 no-underline shrink-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img
            src="/brand-logo.png"
            alt="Trajectory IR Logo"
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-md shadow-sm"
          />
          <span
            className="text-lg sm:text-xl font-bold text-white tracking-tight"
            style={{
              fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            trajectory<span className="opacity-60 font-normal">_ir</span>
          </span>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-2.5">
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>

        {/* Right Action CTAs & Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/docs/quickstart"
            className="border border-white/35 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-white/10 transition-all backdrop-blur-md no-underline shadow-md whitespace-nowrap"
            style={{
              fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
              letterSpacing: '-0.015em',
            }}
          >
            Get Started
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 flex flex-col items-center justify-center gap-1.5 text-white transition-all cursor-pointer shadow-md"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`w-4 h-0.5 bg-white rounded-full transition-transform duration-200 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-white rounded-full transition-opacity duration-200 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-white rounded-full transition-transform duration-200 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <>
          {/* Full-screen Dark Frosted Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-40 bg-[#040d1a]/85 backdrop-blur-xl animate-modal-backdrop-enter"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Navigation Menu Panel with Premium Liquid Glassmorphism */}
          <div className="md:hidden absolute top-full left-0 right-0 p-4 z-50 animate-modal-card-enter">
            <div 
              className="relative p-5 rounded-3xl overflow-hidden space-y-4"
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.03) 45%, rgba(14, 34, 62, 0.65) 100%), rgba(6, 18, 36, 0.72)',
                backdropFilter: 'blur(36px) saturate(220%) contrast(105%)',
                WebkitBackdropFilter: 'blur(36px) saturate(220%) contrast(105%)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.85), inset 0 -1.5px 1px 0 rgba(255, 255, 255, 0.15), inset 0 0 24px 0 rgba(255, 255, 255, 0.08), 0 28px 64px -12px rgba(0, 8, 24, 0.65), 0 0 40px 0 rgba(56, 189, 248, 0.16)',
              }}
            >
              {/* Refraction Surface Highlight Sheen */}
              <div 
                className="absolute inset-x-0 top-0 h-[40%] pointer-events-none rounded-t-3xl"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 100%)',
                }}
                aria-hidden="true"
              />

              {navItems.map((group) => (
                <div key={group.label} className="relative z-10 space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-sky-300 font-semibold px-2">
                    {group.label}
                  </div>
                  <div className="space-y-1">
                    {group.dropdownItems?.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3.5 py-2.5 rounded-xl text-sm text-white/90 hover:text-white hover:bg-white/12 active:bg-white/20 transition-all no-underline border border-transparent hover:border-white/15"
                      >
                        <div className="font-medium text-white">{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-sky-100/60 mt-0.5 font-normal">
                            {item.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="relative z-10 pt-2 border-t border-white/15 flex flex-col gap-2.5">
                <Link
                  href="/docs/quickstart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-sky-400 text-slate-950 font-semibold text-sm no-underline shadow-lg hover:bg-sky-300 active:scale-[0.99] transition-all"
                  style={{
                    boxShadow: '0 4px 18px rgba(56, 189, 248, 0.35)',
                  }}
                >
                  Quickstart Guide →
                </Link>
                <Link
                  href="/docs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-white/10 hover:bg-white/18 active:bg-white/22 text-white font-medium text-sm no-underline transition-all border border-white/25 backdrop-blur-md"
                >
                  Documentation Index
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}


