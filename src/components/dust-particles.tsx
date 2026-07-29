'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

export function DustParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles: Particle[] = React.useMemo(() => {
    if (!mounted) return [];

    const colors = [
      'rgba(255, 255, 255, 0.95)',
      'rgba(125, 211, 252, 0.85)', // Sky cyan glow
      'rgba(255, 176, 112, 0.9)',  // Warm amber glow
      'rgba(216, 180, 254, 0.8)',  // Ethereal purple glow
    ];

    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.8 + 1,
      opacity: Math.random() * 0.65 + 0.2,
      duration: Math.random() * 14 + 10,
      delay: Math.random() * 6,
      color: colors[i % colors.length],
    }));
  }, [mounted]);

  if (!mounted) {
    return <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true" />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-dust-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3.5}px ${p.color}`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
