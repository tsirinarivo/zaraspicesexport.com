'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// SVG paths botaniques
const SHAPES = {
  leaf: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 1-8 1s-1 6 3.5 8C15 13 15 7 17 8z"/>
    </svg>
  ),
  pod: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="12" cy="12" rx="3" ry="9" />
      <path d="M12 3 Q14 6 12 21" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5"/>
    </svg>
  ),
  seed: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="12" cy="14" rx="4" ry="6" />
      <path d="M12 8 Q15 4 12 2 Q9 4 12 8" />
    </svg>
  ),
  flower: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="2.5"/>
      {[0,60,120,180,240,300].map((deg, i) => (
        <ellipse
          key={i}
          cx={12 + 4.5 * Math.cos((deg * Math.PI) / 180)}
          cy={12 + 4.5 * Math.sin((deg * Math.PI) / 180)}
          rx="2"
          ry="3"
          transform={`rotate(${deg} ${12 + 4.5 * Math.cos((deg * Math.PI) / 180)} ${12 + 4.5 * Math.sin((deg * Math.PI) / 180)})`}
        />
      ))}
    </svg>
  ),
  stem: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 22 Q10 16 12 10 Q14 4 12 2"/>
      <path d="M12 14 Q16 12 18 8"/>
      <path d="M12 18 Q8 16 6 12"/>
    </svg>
  ),
};

type ShapeKey = keyof typeof SHAPES;
const SHAPE_KEYS = Object.keys(SHAPES) as ShapeKey[];

interface Particle {
  id: number;
  x: number;
  shape: ShapeKey;
  size: number;
  duration: number;
  delay: number;
  color: string;
  startY: number;
  drift: number;
  rotation: number;
}

const COLORS = [
  'rgba(163,255,18,0.25)',
  'rgba(163,255,18,0.15)',
  'rgba(0,229,255,0.15)',
  'rgba(163,255,18,0.20)',
  'rgba(0,229,255,0.10)',
];

export default function FloatingBotanicals({
  count = 18,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        shape: SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)],
        size: 12 + Math.random() * 16,
        duration: 12 + Math.random() * 16,
        delay: Math.random() * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        startY: 80 + Math.random() * 30,
        drift: (Math.random() - 0.5) * 120,
        rotation: Math.random() * 360,
      }))
    );
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            bottom: `-${p.size}px`,
            width: p.size,
            height: p.size,
            color: p.color,
          }}
          animate={{
            y: [0, -(window?.innerHeight ?? 800) * 1.2],
            x: [0, p.drift],
            rotate: [p.rotation, p.rotation + (Math.random() > 0.5 ? 180 : -180)],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.1, 0.85, 1],
          }}
        >
          {SHAPES[p.shape]}
        </motion.div>
      ))}
    </div>
  );
}
