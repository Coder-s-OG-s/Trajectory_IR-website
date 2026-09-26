'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useState, type ReactNode } from 'react';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: !isTouchDevice,
        syncTouch: false, // Never intercept touch events with software lerp on mobile
        touchMultiplier: 1.0,
        wheelMultiplier: 1.0,
      }}
    >
      {children}
    </ReactLenis>
  );
}

