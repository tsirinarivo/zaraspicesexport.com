'use client';
import { motion, Variants } from 'framer-motion';
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

export default function AboutSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0a1628, #0d1f3c, #0a1628)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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

            <motion.p variants={fadeUp} className="text-[var(--text-secondary)] leading-relaxed mb-6">
              {lang === 'fr'
                ? "ZARA SPICES EXPORT est une entreprise spécialisée dans la valorisation et l'exportation de produits locaux d'origine malagasy. Active depuis 2017, la société est légalement constituée en 2025."
                : 'ZARA SPICES EXPORT is a company specialized in the promotion and export of locally sourced Malagasy products. Active since 2017, the company was legally incorporated in 2025.'}
            </motion.p>

            <motion.div variants={fadeUp} className="border-l-2 border-cyan-500/30 pl-6 mb-10">
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">
                {lang === 'fr'
                  ? '"L\'origine de nos produits est rigoureusement suivie, depuis les zones de production du nord de Madagascar, en particulier la région SAVA et Mananara."'
                  : '"The origin of our products is carefully monitored, from the production areas of northern Madagascar, particularly the SAVA region and Mananara."'}
              </p>
            </motion.div>

            {/* Certifications */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-4">
                {lang === 'fr' ? 'Certifications' : 'Certifications'}
              </p>
              <div className="flex flex-wrap gap-2">
                {['REX', lang === 'fr' ? 'Agrément Export' : 'Export License', lang === 'fr' ? 'Consommabilité' : 'Consumability'].map((cert) => (
                  <span
                    key={cert}
                    className="text-xs font-mono tracking-wider border border-cyan-500/20 text-cyan-400/70 px-3 py-1.5 rounded-lg"
                  >
                    {cert}
                  </span>
                ))}
              </div>
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
