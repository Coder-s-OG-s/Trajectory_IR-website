'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

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
      { label: 'Crash-Safe State', href: '/docs/infrastructure', description: 'Automatic side-effect recovery' },
      { label: 'Replay Engine', href: '/docs/api', description: 'Deterministic step playback' },
    ],
  },
  {
    label: 'Architecture',
    href: '/docs/infrastructure',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Architecture', href: '/docs/infrastructure', description: 'Deep dive into system internals' },
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
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[260px] pointer-events-auto">
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
        aria-haspopup={item.hasDropdown ? 'true' : undefined}
      >
        <span>{item.label}</span>
        {item.hasDropdown && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
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
  return (
    <header
      className="liquid-glass-header"
      style={{
        position: 'relative',
        top: 0,
        zIndex: 50,
        width: '100%',
        height: '76px',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Brand Logo with Starburst */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <img
            src="/brand-logo.png"
            alt="Trajectory IR Logo"
            className="w-6 h-6 object-contain rounded-md shadow-sm"
          />
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.025em',
              fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            trajectory<span style={{ opacity: 0.6, fontWeight: 400 }}>_ir</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav
          className="hidden md:flex"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>

        {/* Right Action CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >

          <Link
            href="/docs/quickstart"
            className="border border-white/35 rounded-full px-5 py-2 text-sm font-medium text-white hover:bg-white/10 transition-all backdrop-blur-md no-underline shadow-md"
            style={{
              fontFamily: "var(--font-heading), 'Plus Jakarta Sans', system-ui, sans-serif",
              letterSpacing: '-0.015em',
            }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}


