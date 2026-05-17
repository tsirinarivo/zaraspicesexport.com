'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function CTASection() {
  const { lang } = useLanguage();

  return (
    <section className="relative overflow-hidden py-32">
      {/* Background gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%), linear-gradient(to bottom, #0a1628, #0d1f3c, #0a1628)',
        }}
      />

      {/* Border frame */}
      <div className="absolute inset-8 md:inset-16 border border-cyan-500/5 pointer-events-none rounded-3xl" />
      <div className="absolute top-8 md:top-16 left-8 md:left-16 w-12 h-12 border-t border-l border-cyan-500/15 rounded-tl-xl" />
      <div className="absolute bottom-8 md:bottom-16 right-8 md:right-16 w-12 h-12 border-b border-r border-cyan-500/15 rounded-br-xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-6">
            {lang === 'fr' ? 'Travailler Ensemble' : 'Work Together'}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-6"
          >
            <span className="text-[var(--text-primary)]">
              {lang === 'fr' ? 'Prêt à ' : 'Ready to '}
            </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {lang === 'fr' ? 'Commander' : 'Order'}
            </span>
            <span className="text-[var(--text-primary)]"> ?</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] max-w-lg mx-auto mb-12 leading-relaxed">
            {lang === 'fr'
              ? "Nos prix s'ajustent selon la quantité commandée. Contactez-nous pour obtenir un devis personnalisé adapté à vos besoins."
              : 'Our prices adjust based on order quantity. Contact us for a personalized quote tailored to your needs.'}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href="/contact"
              className="group flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-8 py-4 rounded-xl transition-colors duration-300 text-sm"
            >
              {lang === 'fr' ? 'Demander un Devis' : 'Request a Quote'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/products"
              className="flex items-center gap-3 border border-cyan-500/30 hover:border-cyan-500/60 text-[var(--text-secondary)] hover:text-white px-8 py-4 rounded-xl transition-all duration-300 text-sm"
            >
              {lang === 'fr' ? 'Explorer les Produits' : 'Explore Products'}
            </Link>
          </motion.div>

          {/* Contact details */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 text-[var(--text-tertiary)] text-xs font-mono">
            <a href="mailto:zaraspicesexport@gmail.com" className="hover:text-cyan-400 transition-colors">
              zaraspicesexport@gmail.com
            </a>
            <span className="w-1 h-1 rounded-full bg-cyan-500/20" />
            <a href="tel:+261375930617" className="hover:text-cyan-400 transition-colors">
              +261 37 59 306 17
            </a>
            <span className="w-1 h-1 rounded-full bg-cyan-500/20" />
            <a href="tel:+261347286235" className="hover:text-cyan-400 transition-colors">
              +261 34 72 862 35
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
