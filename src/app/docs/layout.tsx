import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ '--fd-nav-height': '80px' } as React.CSSProperties}>
      <SiteHeader />
      <DocsLayout
        tree={source.pageTree}
        nav={{ enabled: false }}
        sidebar={{ tabs: false }}
        {...baseOptions}
      >
        {children}
      </DocsLayout>
      <SiteFooter />
    </div>
  );
}
