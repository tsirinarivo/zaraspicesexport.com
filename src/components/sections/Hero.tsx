'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/store/language';
import MagneticButton from '@/components/ui/MagneticButton';

const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 5,
}));

export default function Hero() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div ref={containerRef} className="relative h-screen min-h-[700px] overflow-hidden bg-obsidian flex items-center">
      {/* Animated particles */}
      {mounted && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.15 + Math.random() * 0.2,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-radial-gold" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Diagonal decorative line */}
      <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />

      {/* Main content */}
      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-6">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-px bg-gold/60" />
            <span className="text-gold/80 text-[10px] tracking-[0.5em] uppercase font-light">
              Madagascar · {lang === 'fr' ? 'Depuis 2017' : 'Since 2017'}
            </span>
            <div className="w-8 h-px bg-gold/60" />
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-cream text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight"
            >
              {lang === 'fr' ? 'Épices' : 'Spices'}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight text-gold"
            >
              {lang === 'fr' ? 'Malagasy' : 'Malagasy'}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-cream/20 text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight"
            >
              {lang === 'fr' ? 'D\'Excellence' : 'Of Excellence'}
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-cream/50 text-sm md:text-base max-w-md leading-relaxed mb-12 tracking-wide"
          >
            {lang === 'fr'
              ? 'De la source au monde — Vanille, cacao, girofle et épices rares de Madagascar, sélectionnés avec exigence.'
              : 'From the source to the world — Vanilla, cocoa, cloves and rare spices from Madagascar, selected with rigour.'}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-6"
          >
            <MagneticButton>
              <Link
                href="/products"
                className="group flex items-center gap-4 bg-gold text-obsidian px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-cream transition-colors duration-300"
              >
                {lang === 'fr' ? 'Découvrir' : 'Discover'}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/contact"
                className="flex items-center gap-4 text-cream/60 hover:text-gold text-xs tracking-[0.3em] uppercase transition-colors duration-300 group"
              >
                <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
                {lang === 'fr' ? 'Nous Contacter' : 'Contact Us'}
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 right-6 md:right-12 flex items-end gap-12"
      >
        {[
          { num: '2017', label: lang === 'fr' ? 'Fondée' : 'Founded' },
          { num: '5+', label: lang === 'fr' ? 'Produits' : 'Products' },
          { num: '100%', label: lang === 'fr' ? 'Traçable' : 'Traceable' },
        ].map((stat) => (
          <div key={stat.num} className="text-right">
            <p className="font-serif text-gold text-2xl leading-none">{stat.num}</p>
            <p className="text-cream/30 text-[10px] tracking-[0.2em] uppercase mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-6 md:left-12 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent"
        />
        <span className="text-cream/20 text-[9px] tracking-[0.4em] uppercase -rotate-90 origin-center translate-y-8">
          Scroll
        </span>
      </motion.div>
    </div>
  );
}
