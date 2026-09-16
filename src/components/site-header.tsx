'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    label: 'Docs',
    href: '/docs',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Welcome', href: '/docs', description: 'What Trajectory IR is' },
      { label: 'How it fits', href: '/docs/how-it-fits', description: 'What it is and is not' },
      { label: 'Architecture', href: '/docs/architecture', description: 'Host → IR → durable backend' },
    ],
  },
  {
    label: 'Quickstart',
    href: '/docs/quickstart',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Go (primary)', href: '/docs/quickstart', description: 'Clone, test, minimal client' },
      { label: 'Python (reference)', href: '/docs/quickstart-python', description: 'Parity port from git' },
      { label: 'SDK Reference', href: '/docs/api', description: 'Go + Python client surfaces' },
    ],
  },
  {
    label: 'Demos',
    href: '/docs/demos',
  },
];

function DropdownMenu({ items, isOpen, onClose }: { items: DropdownItem[]; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div
      className="header-dropdown"
      role="menu"
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: '220px',
        paddingTop: '8px',
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
          padding: '6px 0',
          animation: 'header-dropdown-enter 0.15s ease-out',
        }}
      >
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            role="menuitem"
            onClick={onClose}
            className="header-dropdown-item hover:bg-white/5"
            style={{
              display: 'block',
              padding: '10px 16px',
              fontSize: '14px',
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'background-color 0.12s ease',
            }}
          >
            <span style={{ fontWeight: 500 }}>{item.label}</span>
            {item.description && (
              <span style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    // 150ms buffer prevents accidental closure when moving mouse into the dropdown gap
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
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
      style={{ position: 'relative' }}
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
        className="hover:text-white"
        aria-expanded={item.hasDropdown ? isOpen : undefined}
        aria-haspopup={item.hasDropdown ? 'menu' : undefined}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#d1d5db',
          textDecoration: 'none',
          padding: '8px 0',
          transition: 'color 0.15s ease',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.01em',
        }}
      >
        {item.label}
        {item.hasDropdown && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
            style={{
              marginLeft: '2px',
              transition: 'transform 0.15s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Link>

      {item.hasDropdown && item.dropdownItems && (
        <DropdownMenu
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

  return (
    <header 
      className="site-header" 
      style={{ 
        position: isDocs ? 'sticky' : 'fixed', 
        top: 0, 
        zIndex: 50, 
        width: '100%', 
        transition: 'all 0.3s',
        background: isDocs ? 'rgba(6, 11, 25, 0.85)' : 'transparent',
        backdropFilter: isDocs ? 'blur(16px)' : 'none',
        borderBottom: isDocs ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '80px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo (Left) */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            textDecoration: 'none',
            flex: '1 1 0%',
          }}
        >
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Trajectory IR" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-semibold text-lg tracking-wide text-white">
              Trajectory <span className="text-blue-500">IR</span>
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Absolute Centered) */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-gray-300 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center justify-end gap-4 flex-[1_1_0%]">
          <Link
            href="/docs/quickstart"
            className="glass-pill px-5 py-2.5 rounded-full text-sm font-medium text-white hover:bg-white/20 transition-all flex items-center justify-center"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
