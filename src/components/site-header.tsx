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

const CLI_PLUGINS = [
  { id: 'claude', label: 'Claude Code', cmd: '/plugin marketplace add Coder-s-OG-s/Trajectory-IR' },
  { id: 'codex', label: 'Codex', cmd: 'trajir install codex' },
  { id: 'gemini', label: 'Gemini CLI', cmd: 'trajir install gemini' },
  { id: 'cursor', label: 'Cursor', cmd: 'trajir install cursor' },
  { id: 'copilot', label: 'Copilot CLI', cmd: 'trajir install copilot' },
];

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

function NavLink({
  item,
  isOpen,
  onOpen,
  onScheduleClose,
  onCloseImmediate,
  onToggle,
}: {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
  onScheduleClose: () => void;
  onCloseImmediate: () => void;
  onToggle: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!item.hasDropdown) return;
    onOpen();
  };

  const handleMouseLeave = () => {
    if (!item.hasDropdown) return;
    onScheduleClose();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onCloseImmediate();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseImmediate();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCloseImmediate]);

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
            onToggle();
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
          onClose={onCloseImmediate}
        />
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isDocs = pathname?.startsWith('/docs');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openNavLabel, setOpenNavLabel] = useState<string | null>(null);
  const navCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedCli, setSelectedCli] = useState(CLI_PLUGINS[0].id);
  const [cliMenuOpen, setCliMenuOpen] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoverReveal, setHoverReveal] = useState(false);
  const cliDropdownRef = useRef<HTMLDivElement>(null);
  const activeCli = CLI_PLUGINS.find((c) => c.id === selectedCli) ?? CLI_PLUGINS[0];

  useEffect(() => {
    if (isDocs) return;
    const onScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
      if (!scrolled) setHoverReveal(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isDocs]);

  useEffect(() => {
    if (!cliMenuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (cliDropdownRef.current && !cliDropdownRef.current.contains(e.target as Node)) {
        setCliMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCliMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [cliMenuOpen]);

  const clearNavTimeout = () => {
    if (navCloseTimeoutRef.current) {
      clearTimeout(navCloseTimeoutRef.current);
      navCloseTimeoutRef.current = null;
    }
  };

  const handleOpenNav = (label: string) => {
    clearNavTimeout();
    setOpenNavLabel(label);
  };

  const handleScheduleCloseNav = () => {
    clearNavTimeout();
    navCloseTimeoutRef.current = setTimeout(() => {
      setOpenNavLabel(null);
    }, 150);
  };

  const handleCloseNavImmediate = React.useCallback(() => {
    clearNavTimeout();
    setOpenNavLabel(null);
  }, []);

  const handleCopyCli = () => {
    navigator.clipboard.writeText(activeCli.cmd);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 1500);
  };

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

  const showFloatingHeader = !isDocs && isScrolled;
  const isFloatingVisible = hoverReveal || openNavLabel !== null || cliMenuOpen || mobileMenuOpen;

  return (
    <div className="w-full h-[72px] sm:h-[76px] relative z-50">
      {/* Top-edge hover trigger when scrolled down */}
      {showFloatingHeader && (
        <div
          onMouseEnter={() => setHoverReveal(true)}
          className="fixed top-0 left-0 right-0 h-5 z-50"
          aria-hidden="true"
        />
      )}

      <header
        onMouseEnter={() => {
          if (showFloatingHeader) setHoverReveal(true);
        }}
        onMouseLeave={() => {
          if (showFloatingHeader && !openNavLabel && !cliMenuOpen) {
            setHoverReveal(false);
          }
        }}
        className={`liquid-glass-header z-50 w-full h-[72px] sm:h-[76px] flex items-center transition-transform duration-300 ease-out ${
          showFloatingHeader
            ? isFloatingVisible
              ? 'translate-y-0'
              : '-translate-y-full pointer-events-none'
            : 'translate-y-0'
        }`}
        style={{
          position: isDocs ? 'sticky' : showFloatingHeader ? 'fixed' : 'relative',
          top: isDocs || showFloatingHeader ? 0 : undefined,
          left: showFloatingHeader ? 0 : undefined,
          right: showFloatingHeader ? 0 : undefined,
          background: isDocs
            ? 'rgba(6, 11, 25, 0.85)'
            : showFloatingHeader
              ? 'rgba(4, 16, 34, 0.82)'
              : 'transparent',
          backdropFilter: isDocs || showFloatingHeader ? 'blur(16px)' : undefined,
          WebkitBackdropFilter: isDocs || showFloatingHeader ? 'blur(16px)' : undefined,
          borderBottom:
            isDocs || showFloatingHeader ? '1px solid rgba(255, 255, 255, 0.08)' : undefined,
        }}
      >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full flex items-center justify-between relative">
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

        {/* Center Nav Links (Desktop) - True centered */}
        <nav className="hidden md:flex items-center gap-2.5 md:absolute md:left-1/2 md:-translate-x-1/2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              isOpen={openNavLabel === item.label}
              onOpen={() => handleOpenNav(item.label)}
              onScheduleClose={handleScheduleCloseNav}
              onCloseImmediate={handleCloseNavImmediate}
              onToggle={() => {
                clearNavTimeout();
                setOpenNavLabel((prev) => (prev === item.label ? null : item.label));
              }}
            />
          ))}
        </nav>

        {/* Right Action CTAs & Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Website-Standard Liquid Glass CLI Selector Pill (between Architecture & Get Started) */}
          <div
            ref={cliDropdownRef}
            className="hidden xl:flex items-center gap-2 rounded-full border border-white/35 bg-white/[0.04] hover:bg-white/[0.07] transition-all backdrop-blur-md pl-3 pr-1.5 py-1 shadow-md w-[290px] relative"
            style={{
              fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
              letterSpacing: '-0.015em',
            }}
          >
            <button
              type="button"
              onClick={() => setCliMenuOpen((prev) => !prev)}
              aria-expanded={cliMenuOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/95 hover:text-white shrink-0 cursor-pointer py-0.5"
            >
              <span>{activeCli.label}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-200 opacity-75 ${cliMenuOpen ? 'rotate-180 text-sky-300' : 'rotate-0'}`}
              >
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <span className="h-3.5 w-px bg-white/25 shrink-0" aria-hidden="true" />

            <code className="flex-1 min-w-0 text-[11px] font-mono text-sky-200/90 truncate">
              {activeCli.cmd}
            </code>

            <button
              type="button"
              onClick={handleCopyCli}
              aria-label="Copy install command"
              className="text-[11px] font-medium text-white/90 hover:text-white border border-white/25 hover:bg-white/10 rounded-full px-2.5 py-0.5 transition-all shrink-0 cursor-pointer"
            >
              {copiedCli ? 'Copied' : 'Copy'}
            </button>

            {cliMenuOpen && (
              <div className="absolute top-full left-0 pt-2 z-50 min-w-[230px]" role="menu">
                <div
                  className="liquid-glass-dropdown p-2"
                  style={{
                    animation: 'header-dropdown-enter 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.4)',
                  }}
                >
                  {CLI_PLUGINS.map((cli) => {
                    const isCurrent = cli.id === selectedCli;
                    return (
                      <button
                        key={cli.id}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setSelectedCli(cli.id);
                          setCliMenuOpen(false);
                        }}
                        className={`liquid-glass-dropdown-item w-full text-left px-3.5 py-2 rounded-xl text-xs cursor-pointer flex items-center justify-between gap-2 ${
                          isCurrent ? 'bg-white/15 text-white' : 'text-white/90'
                        }`}
                      >
                        <span className="font-semibold">{cli.label}</span>
                        <span className="text-[10px] font-mono text-sky-200/65 truncate max-w-[110px]">
                          {cli.cmd}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

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
    </div>
  );
}


