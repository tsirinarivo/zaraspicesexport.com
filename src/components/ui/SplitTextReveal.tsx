'use client';
import { useRef, useEffect, ElementType } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Props {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  type?: 'words' | 'chars';
  start?: string;
  onLoad?: boolean;
  color?: string;
}

export default function SplitTextReveal({
  text,
  className = '',
  as: Tag = 'span',
  delay = 0,
  stagger = 0.05,
  type = 'words',
  start = 'top 85%',
  onLoad = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const units = type === 'chars' ? [...text] : text.split(' ');

    el.innerHTML = units
      .map(
        (u) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;line-height:1.1;"><span class="gsap-inner" style="display:inline-block;">${
            u === ' ' ? '&nbsp;' : u
          }</span></span>`
      )
      .join(type === 'words' ? '&nbsp;' : '');

    const inners = el.querySelectorAll<HTMLElement>('.gsap-inner');

    const fromVars = { yPercent: 105, opacity: 0 };
    const toVars = {
      yPercent: 0,
      opacity: 1,
      stagger,
      duration: 0.7,
      ease: 'power3.out',
      delay,
    };

    if (onLoad) {
      gsap.from(inners, { ...fromVars, ...toVars });
    } else {
      gsap.from(inners, {
        ...fromVars,
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [text, delay, stagger, type, start, onLoad]);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as React.Ref<HTMLSpanElement>}
      className={className}
      suppressHydrationWarning
    >
      {text}
    </Component>
  );
}
