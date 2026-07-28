import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import React from 'react';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-mono), monospace', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
        <img
          src="/logo.png"
          alt="Trajectory IR Logo"
          style={{ width: '1.4rem', height: '1.4rem', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
          className="transition-transform duration-300 hover:scale-110"
        />
        <span style={{ color: 'var(--color-fd-foreground)' }}>Trajectory <span style={{ color: '#ff3e00' }}>IR</span></span>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono), monospace',
          color: '#a1a1aa',
          backgroundColor: '#18181b',
          border: '1px solid #27272a',
          borderRadius: '6px',
          padding: '0.15rem 0.5rem',
          cursor: 'pointer',
          marginLeft: '0.2rem',
        }}>
          <span>0.1.x</span>
          <span style={{ fontSize: '0.6rem', color: '#71717a' }}>∨</span>
        </div>
      </div>
    ),
    transparentMode: 'top',
  },
  links: [
    {
      text: 'Docs',
      url: '/docs',
      active: 'nested-url',
    },
    {
      text: 'Tutorials',
      url: '#',
      active: 'none',
    },
    {
      text: 'SDK & Engine Reference',
      url: '/docs/api',
      active: 'nested-url',
    },
    {
      text: 'Changelog',
      url: '/docs/changelog',
      active: 'none',
    },
  ],
  githubUrl: 'https://github.com/Coder-s-OG-s/Trajectory-IR',
};
