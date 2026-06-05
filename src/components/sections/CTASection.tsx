'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useSiteContent } from '@/lib/site-data';

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
  const { contact } = useSiteContent();
  const phones = [contact.phone1, contact.phone2].filter(Boolean);

  const ctaLinks = [
    {
      href: '/contact',
      label: { fr: 'Demander un Devis', en: 'Request a Quote' },
      primary: true,
      icon: true,
    },
    {
      href: '/shop',
      label: { fr: 'Commander en ligne', en: 'Order online' },
      primary: false,
      icon: false,
    },
    {
      href: '/compare',
      label: { fr: 'Comparer les produits', en: 'Compare products' },
      primary: false,
      icon: false,
    },
  ];

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

      {/* Animated corner decorations */}
      <div className="absolute inset-8 md:inset-16 border border-cyan-500/5 pointer-events-none rounded-3xl" />
      <div className="absolute top-8 md:top-16 left-8 md:left-16 w-12 h-12 border-t border-l border-cyan-500/15 rounded-tl-xl" />
      <div className="absolute bottom-8 md:bottom-16 right-8 md:right-16 w-12 h-12 border-b border-r border-cyan-500/15 rounded-br-xl" />
      <div className="absolute top-8 md:top-16 right-8 md:right-16 w-8 h-8 border-t border-r border-cyan-500/8 rounded-tr-lg" />
      <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16 w-8 h-8 border-b border-l border-cyan-500/8 rounded-bl-lg" />

      {/* Floating accent dots */}
      {[
        { top: '20%', left: '10%', color: '#a3ff12' },
        { top: '70%', right: '8%', color: '#00e5ff' },
        { top: '40%', right: '15%', color: '#a3ff12' },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{ ...dot, background: dot.color }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 1.2 }}
        />
      ))}

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

          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] max-w-lg mx-auto mb-4 leading-relaxed">
            {lang === 'fr'
              ? "Commandez directement en ligne, demandez un devis personnalisé ou comparez nos produits avant de décider. Nos prix s'ajustent selon la quantité."
              : 'Order directly online, request a personalised quote, or compare our products before deciding. Our prices adjust based on quantity.'}
          </motion.p>

          {/* B2B note */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-10 text-xs font-mono text-[var(--text-tertiary)] bg-white/[0.03] border border-white/8 rounded-lg px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a3ff12]" />
            {lang === 'fr' ? 'Tarifs B2B disponibles dès 5 kg — pro, wholesale, devis sur mesure' : 'B2B rates available from 5 kg — pro, wholesale, custom quotes'}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {ctaLinks.map((cta, i) => (
              <Link
                key={i}
                href={cta.href}
                className={`group flex items-center gap-3 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-sm ${
                  cta.primary
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-[#0a1628]'
                    : 'border border-cyan-500/30 hover:border-cyan-500/60 text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                {cta.label[lang]}
                {cta.icon && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
            ))}
          </motion.div>

          {/* Contact details */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 text-[var(--text-tertiary)] text-xs font-mono">
            <a href={`mailto:${contact.email}`} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <span>✉</span> {contact.email}
            </a>
            <span className="w-1 h-1 rounded-full bg-cyan-500/20" />
            {phones.map((p, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-cyan-500/20" />}
                <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-cyan-400 transition-colors">{p}</a>
              </span>
            ))}
            <span className="w-1 h-1 rounded-full bg-cyan-500/20" />
            <a
              href={`https://wa.me/${(phones[0] ?? '').replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366] hover:text-[#4be37f] transition-colors"
            >
              <span>📱</span> WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
