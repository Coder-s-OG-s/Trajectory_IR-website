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
    label: 'Resources',
    href: '/docs',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Blogs', href: '/docs/changelog', description: 'Engineering insights & updates' },
      { label: 'Case study', href: '/docs', description: 'Production AI reliability cases' },
      { label: 'About us', href: '/docs', description: 'Our mission & open source journey' },
      { label: 'Careers', href: 'https://github.com/Coder-s-OG-s/Trajectory-IR', description: 'Build the future of AI IR' },
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

function LiquidDropdownMenu({ items, isOpen, onClose }: { items: DropdownItem[]; isOpen: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="liquid-glass-dropdown"
      style={{
        position: 'absolute',
        top: 'calc(100% + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: '240px',
        padding: '8px',
        zIndex: 100,
        animation: 'header-dropdown-enter 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onClose}
          className="liquid-glass-dropdown-item"
          style={{
            display: 'block',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontWeight: 600, display: 'block' }}>{item.label}</span>
          {item.description && (
            <span style={{ display: 'block', fontSize: '12px', opacity: 0.65, marginTop: '2px' }}>
              {item.description}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => item.hasDropdown && setIsOpen(true)}
      onMouseLeave={() => item.hasDropdown && setIsOpen(false)}
    >
      <Link
        href={item.href}
        onClick={(e) => {
          if (item.hasDropdown) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.88)',
          textDecoration: 'none',
          padding: '8px 14px',
          borderRadius: '9999px',
          transition: 'all 0.15s ease',
          whiteSpace: 'nowrap',
        }}
        className="hover:text-white hover:bg-white/10"
      >
        {item.label}
        {item.hasDropdown && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            style={{
              transition: 'transform 0.2s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              opacity: 0.7,
            }}
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
          <div
            style={{
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: 'bold',
            }}
          >
            ✻
          </div>
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


