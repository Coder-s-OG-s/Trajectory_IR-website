'use client';

import React, { useEffect, useRef } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        // Use translate3d for hardware acceleration
        glowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 pointer-events-none"
        style={{
          width: '800px',
          height: '800px',
          marginLeft: '-400px',
          marginTop: '-400px',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.6,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.05) 45%, rgba(2, 132, 199, 0) 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
