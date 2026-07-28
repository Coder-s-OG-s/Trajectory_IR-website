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

const leftNavItems: NavItem[] = [
  {
    label: 'About',
    href: '/docs',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Overview', href: '/docs', description: 'Learn about Trajectory IR' },
      { label: 'Architecture', href: '/docs/infrastructure', description: 'System design & internals' },
      { label: 'Contributing', href: 'https://github.com/Coder-s-OG-s/Trajectory-IR/blob/main/CONTRIBUTING.md', description: 'Join the project' },
    ],
  },
  {
    label: 'Companies',
    href: '/docs/api',
    hasDropdown: true,
    dropdownItems: [
      { label: 'API Reference', href: '/docs/api', description: 'Full SDK documentation' },
      { label: 'Engine Reference', href: '/docs/api', description: 'Core engine APIs' },
      { label: 'Quick Start', href: '/docs/quickstart', description: 'Get up and running' },
    ],
  },
  {
    label: 'Library',
    href: '/docs',
  },
];

const rightNavItems: NavItem[] = [
  {
    label: 'Partners',
    href: '/docs/infrastructure',
  },
  {
    label: 'Resources',
    href: '/docs',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Documentation', href: '/docs', description: 'Full docs & guides' },
      { label: 'Tutorials', href: '/docs', description: 'Step-by-step walkthroughs' },
      { label: 'Changelog', href: '/docs/changelog', description: 'Latest updates' },
      { label: 'Community', href: 'https://github.com/Coder-s-OG-s/Trajectory-IR', description: 'GitHub discussions' },
    ],
  },
  {
    label: 'Blog',
    href: '/docs/changelog',
  },
];

function DropdownMenu({ items, isOpen, onClose }: { items: DropdownItem[]; isOpen: boolean; onClose: () => void }) {
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
      className="header-dropdown"
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: '220px',
        backgroundColor: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        padding: '6px 0',
        zIndex: 100,
        animation: 'header-dropdown-enter 0.15s ease-out',
      }}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onClose}
          className="header-dropdown-item"
          style={{
            display: 'block',
            padding: '10px 16px',
            fontSize: '14px',
            color: '#1a1a1a',
            textDecoration: 'none',
            transition: 'background-color 0.12s ease',
          }}
        >
          <span style={{ fontWeight: 500 }}>{item.label}</span>
          {item.description && (
            <span style={{ display: 'block', fontSize: '12px', color: '#888', marginTop: '2px' }}>
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
        className="header-nav-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#1a1a1a',
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
  return (
    <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 50, width: '100%' }}>
      <div
        style={{
          width: '100%',
          height: '3px',
          background: 'linear-gradient(90deg, #f4c6a5, #f0b88a, #ebb07a, #f4c6a5)',
        }}
      />

      <div
        style={{
          width: '100%',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e8e8e8',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            height: '56px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="header-center-group"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
          >
            {leftNavItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}

            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 8px',
                flexShrink: 0,
                textDecoration: 'none',
              }}
            >
              <img
                src="/logo.png"
                alt="Trajectory IR"
                className="header-logo"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  objectFit: 'cover',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              />
            </Link>

            {rightNavItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>

          <div
            className="header-actions"
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <a
              href="https://github.com/Coder-s-OG-s/Trajectory-IR"
              target="_blank"
              rel="noopener noreferrer"
              className="header-nav-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: '#1a1a1a',
                transition: 'color 0.15s ease',
              }}
              aria-label="GitHub Repository"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <Link
              href="/docs/quickstart"
              className="header-apply-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 20px',
                backgroundColor: '#f26625',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '24px',
                textDecoration: 'none',
                border: '1px solid #f26625',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.01em',
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <MobileNav />
    </header>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="header-mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          {isOpen ? (
            <path d="M5 5L15 15M15 5L5 15" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <>
              <path d="M3 5H17" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 10H17" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 15H17" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          className="header-mobile-menu"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#ffffff',
            zIndex: 55,
            padding: '72px 24px 24px',
            overflowY: 'auto',
            animation: 'header-dropdown-enter 0.2s ease-out',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[...leftNavItems, ...rightNavItems].map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '14px 0',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#1a1a1a',
                    textDecoration: 'none',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  {item.label}
                </Link>
                {item.hasDropdown && item.dropdownItems && (
                  <div style={{ paddingLeft: '16px', paddingBottom: '8px' }}>
                    {item.dropdownItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        style={{
                          display: 'block',
                          padding: '8px 0',
                          fontSize: '14px',
                          color: '#666',
                          textDecoration: 'none',
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://github.com/Coder-s-OG-s/Trajectory-IR"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 0',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#1a1a1a',
                  textDecoration: 'none',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </a>
              <Link
                href="/docs/quickstart"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 24px',
                  backgroundColor: '#f26625',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: '24px',
                  textDecoration: 'none',
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
