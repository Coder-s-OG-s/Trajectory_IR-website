import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import React from 'react';

/**
 * Shared layout configurations
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
        <img 
          src="/logo.png" 
          alt="Trajectory IR Logo" 
          style={{ width: '1.5rem', height: '1.5rem', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
          className="transition-transform duration-300 hover:scale-110"
        />
        <span>
          <span style={{ color: 'var(--color-fd-foreground)' }}>Trajectory </span>
          <span style={{ color: '#ff3e00' }}>IR</span>
        </span>
        <span style={{ 
          fontSize: '0.55rem', 
          padding: '0.15rem 0.4rem', 
          borderRadius: '9999px', 
          backgroundColor: 'rgba(255, 62, 0, 0.12)', 
          color: '#ff3e00', 
          border: '1px solid rgba(255, 62, 0, 0.3)',
          fontWeight: 600,
          letterSpacing: '0.06em',
          lineHeight: 1,
        }}>
          v0.1.x
        </span>
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
      text: 'Tutorial',
      url: '#',
      active: 'none',
    },
    {
      text: 'Packages',
      url: '#',
      active: 'none',
    },
    {
      text: 'Playground',
      url: '#',
      active: 'none',
    },
    {
      text: 'Blog',
      url: '#',
      active: 'none',
    },
  ],
  githubUrl: 'https://github.com/Coder-s-OG-s/Trajectory-IR',
};
