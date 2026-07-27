'use client';

import React, { useEffect, useRef, useState } from 'react';

export function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function renderChart() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            darkMode: true,
            background: '#0c0c0e',
            primaryColor: '#18181b',
            primaryTextColor: '#ededed',
            primaryBorderColor: '#ff3e00',
            lineColor: '#ff3e00',
            secondaryColor: '#18181b',
            tertiaryColor: '#121215',
            fontFamily: 'var(--font-mono), monospace',
          },
          securityLevel: 'loose',
        });

        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(id, chart.trim());
        
        if (isMounted) {
          setSvg(svg);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Mermaid render error:', err);
          setError(err?.message || 'Failed to render diagram');
        }
      }
    }

    renderChart();
    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="p-4 rounded-xl border border-red-500/30 bg-red-950/10 text-red-400 text-xs font-mono overflow-auto">
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center p-8 rounded-xl border border-zinc-800 bg-[#0c0c0e] text-zinc-500 text-xs font-mono">
        <span className="animate-pulse">Rendering diagram...</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 p-6 rounded-xl border border-zinc-800 bg-[#0c0c0e] overflow-x-auto flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
