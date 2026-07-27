import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { DualTierHeader } from '@/components/dual-tier-header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <DualTierHeader />
      <DocsLayout 
        tree={source.pageTree} 
        nav={{ enabled: false }}
        sidebar={{
          tabs: false,
        }}
        {...baseOptions}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
