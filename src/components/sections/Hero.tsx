'use client';
import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/store/language';
import FloatingBotanicals from '@/components/ui/FloatingBotanicals';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

export default function Hero() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 30% 50%, rgba(0,229,255,0.08) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)',
        }}
      />

      {/* Botanical particles */}
      <FloatingBotanicals count={12} />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Vertical accent lines */}
      <div aria-hidden className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
      <div aria-hidden className="absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={mounted ? 'visible' : 'hidden'}
          className="max-w-4xl"
        >
          {/* Label */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-cyan-500/60" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Madagascar · {lang === 'fr' ? 'Depuis 2017' : 'Since 2017'}
            </span>
            <div className="w-8 h-px bg-cyan-500/60" />
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-4"
          >
            <span className="text-[var(--text-primary)]">{lang === 'fr' ? 'Épices ' : 'Spices '}</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {lang === 'fr' ? 'Malagasy' : 'Malagasy'}
            </span>
          </motion.h1>

          <motion.h1
            variants={fadeUp}
            className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] text-[var(--text-primary)]/20 mb-8"
          >
            {lang === 'fr' ? 'D\'Excellence' : 'Of Excellence'}
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-base md:text-lg max-w-md leading-relaxed mb-12">
            {lang === 'fr'
              ? 'De la source au monde — Vanille, cacao, girofle et épices rares de Madagascar, sélectionnés avec exigence.'
              : 'From the source to the world — Vanilla, cocoa, cloves and rare spices from Madagascar, selected with rigour.'}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-16">
            <Link
              href="/products"
              className="group flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300 text-sm"
            >
              {lang === 'fr' ? 'Découvrir' : 'Discover'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-3 border border-cyan-500/30 hover:border-cyan-500/60 text-[var(--text-secondary)] hover:text-white px-7 py-3.5 rounded-xl transition-all duration-300 text-sm"
            >
              {lang === 'fr' ? 'Nous Contacter' : 'Contact Us'}
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-8">
            {[
              { num: '2017', label: lang === 'fr' ? 'Fondée' : 'Founded' },
              { num: '5+', label: lang === 'fr' ? 'Produits' : 'Products' },
              { num: '100%', label: lang === 'fr' ? 'Traçable' : 'Traceable' },
            ].map((stat) => (
              <div key={stat.num}>
                <p className="font-display font-black text-2xl text-cyan-400 leading-none">{stat.num}</p>
                <p className="text-[var(--text-tertiary)] text-xs font-mono uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-cyan-500/40 to-transparent"
        />
      </div>
    </section>
  );
}
