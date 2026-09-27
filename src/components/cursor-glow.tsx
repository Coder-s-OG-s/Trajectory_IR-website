'use client';

import React, { useEffect, useRef, useState } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only enable cursor glow on devices with fine pointer (mouse/trackpad), never on touch/mobile
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsFinePointer(hasFinePointer);
    if (!hasFinePointer) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
          }
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden hidden md:block" aria-hidden="true">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 pointer-events-none"
        style={{
          width: '700px',
          height: '700px',
          marginLeft: '-350px',
          marginTop: '-350px',
          borderRadius: '50%',
          filter: 'blur(90px)',
          opacity: 0.55,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.20) 0%, rgba(14, 165, 233, 0.04) 45%, rgba(2, 132, 199, 0) 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}

