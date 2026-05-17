'use client';
import { motion, type Variants } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const container = (delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: delay },
  },
});

const child = (duration: number): Variants => ({
  hidden: { y: '110%', opacity: 0, rotateX: -20 },
  visible: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: { duration, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
});

export default function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.8,
  once = true,
  tag: Tag = 'span',
}: Props) {
  const words = text.split(' ');

  return (
    <Tag className={className} style={{ overflow: 'hidden' }}>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.25em]"
        variants={container(delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              variants={child(duration)}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
