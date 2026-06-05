'use client';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { values, certifications } from '@/lib/data';
import { useSiteContent } from '@/lib/site-data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const liveContact = useSiteContent().contact;
  const contact = {
    email: liveContact.email,
    phones: [liveContact.phone1, liveContact.phone2].filter(Boolean),
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 30% 50%, rgba(0,229,255,0.06) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-16 mb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
              {lang === 'fr' ? 'Notre Histoire' : 'Our Story'}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display font-black text-[clamp(3rem,8vw,7rem)] tracking-tight leading-[0.9] mb-10"
            >
              <span className="text-[var(--text-primary)]">
                {lang === 'fr' ? 'À Propos de ' : 'About '}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {lang === 'fr' ? 'Nous' : 'Us'}
              </span>
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-lg leading-relaxed">
                {lang === 'fr'
                  ? "ZARA SPICES EXPORT est une entreprise spécialisée dans la valorisation et l'exportation de produits locaux d'origine malagasy. Active depuis 2017, la société est légalement constituée en 2025."
                  : 'ZARA SPICES EXPORT is a company specialized in the promotion and export of locally sourced Malagasy products. Active since 2017, the company was legally incorporated in 2025.'}
              </motion.p>
              <motion.p variants={fadeUp} className="text-[var(--text-tertiary)] leading-relaxed">
                {lang === 'fr'
                  ? "Spécialisés dans la vanille malagasy, nous proposons également d'autres produits locaux : cacao, girofle, cannelle et poivres rares. Chaque produit est sélectionné avec exigence, dans une démarche de qualité, de traçabilité et de respect des traditions locales."
                  : 'Specializing in Malagasy vanilla, we also offer other local products: cocoa, cloves, cinnamon, and rare peppers. Each product is rigorously selected, with a commitment to quality, traceability, and respect for local traditions.'}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
              {lang === 'fr' ? 'Nos Valeurs' : 'Our Values'}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,5vw,4rem)] tracking-tight text-[var(--text-primary)]">
              {lang === 'fr' ? 'Ce Qui Nous ' : 'What '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {lang === 'fr' ? 'Guide' : 'Guides Us'}
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {values.map((value) => (
              <motion.div
                key={value.id}
                variants={fadeUp}
                className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 hover:border-cyan-500/20 transition-all duration-300"
              >
                <span className="text-cyan-400/30 group-hover:text-cyan-400 text-2xl mb-5 block transition-colors duration-300 font-mono">
                  {value.icon}
                </span>
                <h3 className="font-display font-bold text-[var(--text-primary)] group-hover:text-cyan-400 text-lg mb-2.5 transition-colors duration-300">
                  {value.title[lang]}
                </h3>
                <p className="text-[var(--text-tertiary)] text-sm leading-relaxed">{value.description[lang]}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-t border-white/5 py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
                {lang === 'fr' ? 'Conformité' : 'Compliance'}
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight text-[var(--text-primary)] mb-6">
                {lang === 'fr' ? 'Certifications & ' : 'Certifications & '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {lang === 'fr' ? 'Agréments' : 'Approvals'}
                </span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {lang === 'fr'
                  ? "Nos produits sont conformes aux exigences de qualité des marchés locaux et internationaux, avec toutes les certifications nécessaires à l'exportation."
                  : 'Our products comply with the quality requirements of local and international markets, with all certifications required for export.'}
              </motion.p>
            </motion.div>

            <motion.div
              className="space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-5 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-cyan-500/20 transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg border border-cyan-500/20 group-hover:border-cyan-500/40 rotate-45 transition-colors duration-300 flex-shrink-0" />
                  <span className="text-[var(--text-secondary)] text-sm group-hover:text-white transition-colors duration-300">
                    {cert}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact quick */}
      <section className="border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-6">
              {lang === 'fr' ? 'Nous Joindre' : 'Get in Touch'}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6">
              <a
                href={`mailto:${contact.email}`}
                className="font-display font-bold text-[var(--text-secondary)] hover:text-cyan-400 text-xl transition-colors duration-300"
              >
                {contact.email}
              </a>
              {contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-[var(--text-tertiary)] hover:text-cyan-400 text-sm font-mono transition-colors duration-300"
                >
                  {phone}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
