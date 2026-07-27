import React from 'react';
import { source } from '@/lib/source';
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { Mermaid } from '@/components/mermaid';

// Custom Pre component to intercept Mermaid code blocks and render visual diagrams
function CustomPre(props: any) {
  const { children, ...rest } = props;
  
  if (React.isValidElement(children)) {
    const codeProps = children.props as any;
    const className = codeProps?.className || '';
    const lang = codeProps?.['data-language'] || '';
    
    if (className.includes('language-mermaid') || lang === 'mermaid') {
      const rawChart = typeof codeProps.children === 'string'
        ? codeProps.children
        : String(codeProps.children || '');
      return <Mermaid chart={rawChart} />;
    }
  }

  const DefaultPre = defaultMdxComponents.pre || 'pre';
  return <DefaultPre {...props} />;
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  // Build breadcrumb items
  const slugParts = params.slug || [];
  const breadcrumbs = slugParts.map((part, i) => {
    const href = '/docs/' + slugParts.slice(0, i + 1).join('/');
    const label = part
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { href, label };
  });

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {/* Breadcrumb Navigation */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs font-medium mb-4 flex-wrap" style={{ color: 'var(--color-fd-muted-foreground, #888)' }}>
          <a href="/docs" className="no-underline transition-colors" style={{ color: 'inherit' }}>
            Docs
          </a>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              <span style={{ color: 'var(--color-fd-border, #444)' }}>›</span>
              {i === breadcrumbs.length - 1 ? (
                <span style={{ color: '#ff3e00', fontWeight: 600 }}>{crumb.label}</span>
              ) : (
                <a href={crumb.href} className="no-underline transition-colors" style={{ color: 'inherit' }}>
                  {crumb.label}
                </a>
              )}
            </span>
          ))}
        </nav>
      )}

      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents, pre: CustomPre }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const title = `${page.data.title} — Trajectory IR`;
  const description = page.data.description || 'Trajectory IR Documentation';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Trajectory IR Documentation',
      type: 'article',
      images: [
        {
          url: '/logo.png',
          width: 512,
          height: 512,
          alt: 'Trajectory IR',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: ['/logo.png'],
    },
  };
}
