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
          background: 'radial-gradient(circle, rgba(242, 102, 37, 0.8) 0%, rgba(217, 92, 32, 0) 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
