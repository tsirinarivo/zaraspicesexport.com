'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { SensoryProfile } from '@/lib/data';
import { useLanguage } from '@/store/language';

const AXES_FR = ['Vanilline', 'Floral', 'Douceur', 'Richesse', 'Souplesse', 'Pureté'];
const AXES_EN = ['Vanillin', 'Floral', 'Sweetness', 'Richness', 'Suppleness', 'Purity'];

const SIZE = 200;
const CENTER = SIZE / 2;
const RADIUS = 80;
const LEVELS = 4;

function getPoint(angle: number, value: number): [number, number] {
  const rad = (angle - 90) * (Math.PI / 180);
  return [CENTER + value * Math.cos(rad), CENTER + value * Math.sin(rad)];
}

function profileToPoints(profile: SensoryProfile, scale: number): string {
  const values = [
    profile.vanillin,
    profile.floral,
    profile.sweetness,
    profile.richness,
    profile.suppleness,
    profile.purity,
  ];
  return values
    .map((v, i) => {
      const angle = i * 60;
      const [x, y] = getPoint(angle, (v / 100) * RADIUS * scale);
      return `${x},${y}`;
    })
    .join(' ');
}

interface Props {
  profile: SensoryProfile;
  color?: string;
  size?: number;
}

export default function RadarChart({ profile, color = '#00e5ff' }: Props) {
  const { lang } = useLanguage();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const axes = lang === 'fr' ? AXES_FR : AXES_EN;

  return (
    <svg ref={ref} viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
      {/* Grid rings */}
      {Array.from({ length: LEVELS }, (_, i) => {
        const r = RADIUS * ((i + 1) / LEVELS);
        const pts = Array.from({ length: 6 }, (_, j) => {
          const [x, y] = getPoint(j * 60, r);
          return `${x},${y}`;
        }).join(' ');
        return (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {Array.from({ length: 6 }, (_, i) => {
        const [x, y] = getPoint(i * 60, RADIUS);
        return (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon — animated */}
      <motion.polygon
        points={profileToPoints(profile, inView ? 1 : 0)}
        fill={`${color}18`}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        animate={{ points: profileToPoints(profile, inView ? 1 : 0) }}
        initial={{ points: profileToPoints(profile, 0) }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Vertex dots */}
      {[profile.vanillin, profile.floral, profile.sweetness, profile.richness, profile.suppleness, profile.purity].map((v, i) => {
        const [x, y] = getPoint(i * 60, (v / 100) * RADIUS);
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, delay: 1.2 + i * 0.06 }}
          />
        );
      })}

      {/* Axis labels */}
      {axes.map((label, i) => {
        const angle = i * 60;
        const [x, y] = getPoint(angle, RADIUS + 18);
        const anchor = x < CENTER - 4 ? 'end' : x > CENTER + 4 ? 'start' : 'middle';
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="text-[8px]"
            style={{ fontSize: '8px', fill: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-jetbrains)' }}
          >
            {label}
          </text>
        );
      })}

      {/* Center dot */}
      <circle cx={CENTER} cy={CENTER} r="2" fill="rgba(255,255,255,0.15)" />
    </svg>
  );
}
