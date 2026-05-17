'use client';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/store/language';
import { values } from '@/lib/data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const milestones = [
  { year: '2017', fr: 'Début des activités · Région SAVA', en: 'Operations begin · SAVA Region' },
  { year: '2019', fr: 'Certification REX Union Européenne', en: 'EU REX Certification' },
  { year: '2022', fr: 'Expansion vers les marchés USA & Asie', en: 'Expansion to USA & Asian markets' },
  { year: '2025', fr: 'Constitution légale & scaling export', en: 'Legal incorporation & export scaling' },
];

export default function AboutSection() {
  const { lang } = useLanguage();

  const stats = [
    { num: '8+', label: { fr: 'Ans d\'expérience', en: 'Years of experience' } },
    { num: '12+', label: { fr: 'Familles partenaires', en: 'Partner families' } },
    { num: '30+', label: { fr: 'Pays livrés', en: 'Countries served' } },
    { num: '100%', label: { fr: 'Traçable', en: 'Traceable' } },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0a1628, #0d1f3c, #0a1628)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.num}
              variants={fadeUp}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 text-center hover:border-cyan-500/20 transition-colors duration-300"
            >
              <p className="font-display font-black text-3xl text-cyan-400 leading-none mb-1">{stat.num}</p>
              <p className="text-[var(--text-tertiary)] text-xs font-mono uppercase tracking-widest">{stat.label[lang]}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
              {lang === 'fr' ? 'À Propos' : 'About'}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight text-[var(--text-primary)] mb-6">
              {lang === 'fr' ? (
                <>
                  De la{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Source
                  </span>{' '}
                  au Monde
                </>
              ) : (
                <>
                  From the{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Source
                  </span>{' '}
                  to the World
                </>
              )}
            </motion.h2>

            <motion.p variants={fadeUp} className="text-[var(--text-secondary)] leading-relaxed mb-4">
              {lang === 'fr'
                ? "ZARA SPICES EXPORT est une entreprise spécialisée dans la valorisation et l'exportation de produits locaux d'origine malagasy. Fondée en 2017 par des passionnés de la vanille malgache, la société est légalement constituée en 2025 et active sur les marchés européens, américains et asiatiques."
                : 'ZARA SPICES EXPORT specializes in the promotion and export of locally sourced Malagasy products. Founded in 2017 by passionate advocates of Malagasy vanilla, the company was legally incorporated in 2025 and is active on European, American, and Asian markets.'}
            </motion.p>

            <motion.p variants={fadeUp} className="text-[var(--text-secondary)] leading-relaxed mb-6">
              {lang === 'fr'
                ? 'Nous travaillons en direct avec plus de 12 familles productrices dans la région SAVA — le berceau mondial de la vanille — garantissant des prix équitables, une traçabilité complète et une qualité constante lot après lot.'
                : 'We work directly with over 12 producer families in the SAVA region — the world\'s cradle of vanilla — guaranteeing fair prices, full traceability, and consistent quality batch after batch.'}
            </motion.p>

            <motion.div variants={fadeUp} className="border-l-2 border-cyan-500/30 pl-6 mb-8">
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">
                {lang === 'fr'
                  ? '"L\'origine de nos produits est rigoureusement suivie, depuis les zones de production du nord de Madagascar, en particulier la région SAVA et Mananara."'
                  : '"The origin of our products is carefully monitored, from the production areas of northern Madagascar, particularly the SAVA region and Mananara."'}
              </p>
            </motion.div>

            {/* Milestones */}
            <motion.div variants={fadeUp} className="mb-8">
              <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-4">
                {lang === 'fr' ? 'Jalons' : 'Milestones'}
              </p>
              <div className="space-y-2">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <span className="font-mono text-xs text-cyan-400/50 group-hover:text-cyan-400 transition-colors w-10 flex-shrink-0">{m.year}</span>
                    <div className="flex-1 flex items-center gap-3 border-b border-white/5 group-hover:border-cyan-500/10 transition-colors py-2">
                      <div className="w-1 h-1 rounded-full bg-cyan-500/30 flex-shrink-0" />
                      <p className="text-[var(--text-tertiary)] text-xs group-hover:text-[var(--text-secondary)] transition-colors">{m[lang]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div variants={fadeUp} className="mb-6">
              <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-4">
                {lang === 'fr' ? 'Certifications' : 'Certifications'}
              </p>
              <div className="flex flex-wrap gap-2">
                {['REX', lang === 'fr' ? 'Agrément Export' : 'Export License', lang === 'fr' ? 'Consommabilité' : 'Consumability', lang === 'fr' ? 'Analyses Labo' : 'Lab Analyses'].map((cert) => (
                  <span
                    key={cert}
                    className="text-xs font-mono tracking-wider border border-cyan-500/20 text-cyan-400/70 px-3 py-1.5 rounded-lg"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-cyan-400/70 hover:text-cyan-400 transition-colors duration-300 font-mono group"
              >
                {lang === 'fr' ? 'En savoir plus →' : 'Learn more →'}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: values grid */}
          <motion.div
            className="space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {values.map((value) => (
              <motion.div
                key={value.id}
                variants={fadeUp}
                className="group flex items-start gap-5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 hover:border-cyan-500/20 transition-colors duration-300"
              >
                <span className="text-cyan-400/40 group-hover:text-cyan-400 text-xl transition-colors duration-300 mt-0.5 flex-shrink-0 font-mono">
                  {value.icon}
                </span>
                <div>
                  <h4 className="text-[var(--text-primary)] group-hover:text-cyan-400 text-sm font-semibold mb-1.5 transition-colors duration-300">
                    {value.title[lang]}
                  </h4>
                  <p className="text-[var(--text-tertiary)] text-sm leading-relaxed">{value.description[lang]}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
