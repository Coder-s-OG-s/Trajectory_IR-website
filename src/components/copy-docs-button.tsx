'use client';

import React, { useState } from 'react';

export function CopyDocsButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ charCount: number; totalPages: number } | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/docs-llm');
      const data = await res.json();

      if (data.fullText) {
        await navigator.clipboard.writeText(data.fullText);
        setStats({
          charCount: data.charCount || data.fullText.length,
          totalPages: data.totalPages || 13,
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
      }
    } catch (err) {
      console.error('Failed to copy docs context:', err);
    } finally {
      setLoading(false);
    }
  };

  const formattedKb = stats ? Math.round(stats.charCount / 1024) : 32;

  return (
    <div className={`relative inline-flex items-center ${className || ''}`}>
      <button
        onClick={handleCopy}
        disabled={loading}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight text-white/90 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 backdrop-blur-md shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
        title="Copy complete documentation text to feed as context into any AI agent (ChatGPT, Claude, Gemini, etc.)"
        style={{
          background: copied
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.15) 100%)'
            : undefined,
          borderColor: copied ? 'rgba(16, 185, 129, 0.45)' : undefined,
        }}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-3.5 w-3.5 text-white/70" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Preparing context...</span>
          </>
        ) : copied ? (
          <>
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-300 font-bold">Copied {formattedKb}KB Docs Context!</span>
          </>
        ) : (
          <>
            <span className="text-amber-400 group-hover:rotate-12 transition-transform duration-200">✨</span>
            <svg className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy All Docs for AI</span>
          </>
        )}
      </button>

      {/* Tooltip on hover */}
      {showTooltip && !copied && !loading && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-neutral-950/95 text-white/90 text-[11px] rounded-md border border-white/10 shadow-xl whitespace-nowrap z-50 pointer-events-none backdrop-blur-md animate-in fade-in slide-in-from-bottom-1 duration-150">
          Copies all 13 documentation pages in Markdown format for AI prompt context
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-950/95" />
        </div>
      )}
    </div>
  );
}
