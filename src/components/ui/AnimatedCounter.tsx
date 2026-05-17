'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  target,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
}: Props) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const end = start + duration * 1000;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / (end - start), 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
}
