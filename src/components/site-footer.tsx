'use client';

import React from 'react';
import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: 'Docs',
    links: [
      { label: 'Quickstart', href: '/docs/quickstart' },
      { label: 'Concepts', href: '/docs/concepts' },
      { label: 'Demos', href: '/docs/demos' },
      { label: 'Architecture', href: '/docs/architecture' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'GitHub', href: 'https://github.com/Coder-s-OG-s/Trajectory-IR', external: true },
      { label: 'OpenSSF Best Practices', href: 'https://www.bestpractices.dev/projects/14075', external: true },
      { label: 'License (Apache-2.0)', href: 'https://github.com/Coder-s-OG-s/Trajectory-IR/blob/main/LICENSE', external: true },
      { label: 'Adopters', href: '/docs/adopters' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Contributing', href: '/docs/contributing' },
      { label: 'Security policy', href: '/docs/security' },
      { label: 'Changelog', href: '/docs/changelog' },
      { label: 'Code of Conduct', href: 'https://github.com/Coder-s-OG-s/Trajectory-IR/blob/main/CODE_OF_CONDUCT.md', external: true },
      { label: 'Privacy Policy', href: '/docs/privacy' },
      { label: 'Terms of Use', href: '/docs/terms' },
    ],
  },
];

function SocialIcons() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
      <a href="https://github.com/Coder-s-OG-s" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Coder-s-OG-s on GitHub">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a href="https://www.bestpractices.dev/projects/14075" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="OpenSSF Best Practices">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a href="https://github.com/Coder-s-OG-s/Trajectory-IR/discussions" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="GitHub Discussions">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      </a>
      <a href="https://github.com/Coder-s-OG-s/Trajectory-IR" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Trajectory IR on GitHub">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </a>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 w-full pt-20">
      <div className="max-w-[1200px] mx-auto px-8 pt-16 pb-10 border-t border-[rgba(255,255,255,0.2)]">
        
        {/* Main Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-16">
          
          {/* Column 1: Logo and Tagline */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="Trajectory IR"
                className="w-10 h-10 rounded-md object-contain mix-blend-multiply"
              />
              <span className="text-[15px] font-medium text-[#0A1128] tracking-tight whitespace-nowrap">
                Portable IR for agent <span className="text-blue-700 font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">trajectories.</span>
              </span>
            </div>
          </div>

          {/* Columns 2, 3, 4: Links */}
          <div className="flex-grow w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-10 lg:ml-auto">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[14px] font-bold text-[#0A1128] mb-5 tracking-wide">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-gray-700 hover:text-blue-700 transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[13px] text-gray-700 hover:text-blue-700 transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar: Copyright + Socials */}
        <div className="border-t border-[rgba(255,255,255,0.2)] pt-6 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[13px] text-gray-700">
            © {new Date().getFullYear()} Trajectory IR
          </span>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
}
