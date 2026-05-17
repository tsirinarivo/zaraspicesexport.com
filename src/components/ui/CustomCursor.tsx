'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const isHoveringRef = useRef(false);
  const scaleRef = useRef(1);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const dotSpringX = useSpring(dotX, { damping: 40, stiffness: 500 });
  const dotSpringY = useSpring(dotY, { damping: 40, stiffness: 500 });

  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;
    if (isTouchDevice()) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const handleEnter = () => {
      isHoveringRef.current = true;
    };

    const handleLeave = () => {
      isHoveringRef.current = false;
    };

    window.addEventListener('mousemove', move);

    const interactables = document.querySelectorAll('a, button, [data-cursor]');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-gold/60 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[9999]"
        style={{ x: dotSpringX, y: dotSpringY }}
      />
    </>
  );
}
