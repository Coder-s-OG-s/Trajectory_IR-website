'use client';

import React, { useState, useEffect, useCallback } from 'react';

export function UnderConstructionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageName, setPageName] = useState('');

  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href="#"]') as HTMLAnchorElement | null;
      if (anchor && anchor.getAttribute('href') === '#') {
        e.preventDefault();
        e.stopPropagation();
        setPageName(anchor.textContent?.trim() || 'This page');
        setIsOpen(true);
      }
    }
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
      };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-fd-card, #222)',
          border: '1px solid var(--color-fd-border, #444)',
          borderRadius: '16px',
          padding: '2.5rem 3rem',
          maxWidth: '440px',
          width: '90%',
          textAlign: 'center',
          animation: 'scaleIn 0.25s ease-out',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Construction Icon */}
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>

        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-fd-foreground, #fff)',
            marginBottom: '0.5rem',
          }}
        >
          Under Construction
        </h2>

        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--color-fd-muted-foreground, #aaa)',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}
        >
          <strong style={{ color: '#ff3e00' }}>{pageName}</strong> is currently
          being built and will be available soon. Stay tuned!
        </p>

        <button
          onClick={handleClose}
          style={{
            backgroundColor: '#ff3e00',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.6rem 2rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
            (e.target as HTMLButtonElement).style.boxShadow =
              '0 4px 20px rgba(255, 62, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'scale(1)';
            (e.target as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          Got it
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
