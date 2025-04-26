"use client";
import DMBoxLayout from '@/components/DMBoxLayout';
import { useEffect, useRef, useState } from 'react';

export default function DMBoxLayoutStandalone() {
  const layoutWidth = 3105;
  const layoutHeight = 1734;
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight;
      const scaleWidth = availableWidth / layoutWidth;
      const scaleHeight = availableHeight / layoutHeight;
      setScale(Math.min(scaleWidth, scaleHeight, 1)); // Never upscale above 1
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh', overflow: 'auto', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: layoutWidth, height: layoutHeight, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <DMBoxLayout />
      </div>
    </div>
  );
}
