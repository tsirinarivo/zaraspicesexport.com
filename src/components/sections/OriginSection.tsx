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

const regions = [
  { name: 'Région SAVA', sub: 'Sambava · Antalaha · Vohémar · Andapa', x: 72, y: 26, color: '#a3ff12' },
  { name: 'Mananara', sub: 'Analanjirofo', x: 66, y: 50, color: '#00e5ff' },
];

export default function OriginSection() {
  const { lang } = useLanguage();

  const steps = [
    { step: '01', label: { fr: 'Récolte locale', en: 'Local harvest' }, desc: { fr: 'Région SAVA & Mananara · Familles partenaires', en: 'SAVA Region & Mananara · Partner families' } },
    { step: '02', label: { fr: 'Préparation traditionnelle', en: 'Traditional preparation' }, desc: { fr: 'Selon les savoir-faire locaux · Zéro additif', en: 'Following local know-how · Zero additives' } },
    { step: '03', label: { fr: 'Contrôle qualité ZSE', en: 'ZSE Quality control' }, desc: { fr: 'Analyses labo · Taux vanilline · Hygrométrie', en: 'Lab analysis · Vanillin rate · Hygrometry' } },
    { step: '04', label: { fr: 'Mise sous vide & traçabilité', en: 'Vacuum seal & traceability' }, desc: { fr: 'Numéro de lot unique · REX certifié', en: 'Unique lot number · REX certified' } },
    { step: '05', label: { fr: 'Expédition mondiale', en: 'Global shipment' }, desc: { fr: 'Europe · USA · Asie · Accompagnement douanier', en: 'Europe · USA · Asia · Customs support' } },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0a1628, #0d1f3c, #0a1628)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: map visual */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              <div className="relative w-full h-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-colors duration-300">
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.015]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                  }}
                />

                {/* Madagascar shape */}
                <svg viewBox="0 0 200 280" className="absolute inset-0 w-full h-full opacity-25" fill="none">
                  <path
                    d="M100 10 C120 15 140 30 145 60 C150 90 148 110 142 130 C136 150 130 165 125 185 C120 205 118 225 110 245 C102 265 90 270 80 255 C70 240 68 215 72 190 C76 165 72 145 68 120 C64 95 62 75 70 50 C78 25 80 5 100 10Z"
                    fill="rgba(0,229,255,0.12)"
                    stroke="rgba(0,229,255,0.4)"
                    strokeWidth="1"
                  />
                  {/* Inner detail line */}
                  <path
                    d="M90 30 C105 35 118 55 118 80 C118 105 112 125 106 145 C100 165 95 185 92 205 C89 220 84 235 78 245"
                    stroke="rgba(0,229,255,0.15)"
                    strokeWidth="0.8"
                    fill="none"
                  />
                </svg>

                {/* Region markers */}
                {regions.map((region, i) => (
                  <motion.div
                    key={region.name}
                    className="absolute"
                    style={{ left: `${region.x}%`, top: `${region.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.2, type: 'spring' }}
                    viewport={{ once: true }}
                  >
                    {/* Pulse rings */}
                    <motion.div
                      className="absolute rounded-full border"
                      style={{ inset: '-8px', borderColor: `${region.color}30` }}
                      animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7 }}
                    />
                    <motion.div
                      className="absolute rounded-full border"
                      style={{ inset: '-16px', borderColor: `${region.color}15` }}
                      animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7 + 0.5 }}
                    />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: region.color }} />
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap">
                      <p className="text-[10px] font-mono tracking-wider font-bold" style={{ color: region.color }}>{region.name}</p>
                      <p className="text-[var(--text-tertiary)] text-[9px]">{region.sub}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Frame decoration */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-cyan-500/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-cyan-500/30" />

                {/* Labels */}
                <div className="absolute bottom-8 left-6">
                  <p className="text-[var(--text-tertiary)] text-[9px] font-mono tracking-[0.4em] uppercase">Madagascar</p>
                  <p className="text-[var(--text-tertiary)]/40 text-[8px] tracking-wider">Indian Ocean · 587 000 km²</p>
                </div>

                {/* Coordinate lines */}
                <div className="absolute top-[26%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a3ff12]/10 to-transparent" />
                <div className="absolute top-[50%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
              </div>

              {/* Trace CTA below map */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-4"
              >
                <Link
                  href="/trace/ZSE-TK-2024-001"
                  className="flex items-center gap-3 bg-[rgba(163,255,18,0.05)] border border-[#a3ff12]/15 hover:border-[#a3ff12]/30 rounded-xl px-4 py-3 transition-colors duration-300 group"
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#a3ff12] flex-shrink-0"
                    animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="flex-1">
                    <p className="text-[10px] font-mono text-[#a3ff12] uppercase tracking-widest">
                      {lang === 'fr' ? 'Traçabilité en direct' : 'Live traceability'}
                    </p>
                    <p className="text-[var(--text-tertiary)] text-[9px] font-mono">Lot ZSE-TK-2024-001 · SAVA</p>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a3ff12" strokeWidth="2" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
              {lang === 'fr' ? 'Traçabilité' : 'Traceability'}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight text-[var(--text-primary)] mb-6">
              {lang === 'fr' ? (
                <>
                  Origine{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Contrôlée
                  </span>
                </>
              ) : (
                <>
                  Controlled{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Origin
                  </span>
                </>
              )}
            </motion.h2>

            <motion.p variants={fadeUp} className="text-[var(--text-secondary)] leading-relaxed mb-8">
              {lang === 'fr'
                ? "Chaque lot de vanille est traçable de la parcelle productrice jusqu'à votre réception. Nous travaillons directement avec les familles de la région SAVA depuis 2017, sans intermédiaire — garantissant fraîcheur, authenticité et prix équitables."
                : 'Every vanilla batch is traceable from the producer\'s plot to your reception. We work directly with SAVA region families since 2017, with no intermediaries — guaranteeing freshness, authenticity and fair prices.'}
            </motion.p>

            {/* Timeline */}
            <motion.div className="space-y-0" variants={staggerContainer}>
              {steps.map((item, i) => (
                <motion.div key={item.step} variants={fadeUp} className="flex items-stretch gap-5 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-xl border border-cyan-500/20 group-hover:border-cyan-500/40 bg-cyan-500/5 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <span className="font-mono text-[10px] text-cyan-500/50 group-hover:text-cyan-500 transition-colors">{item.step}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-white/5 my-1" />
                    )}
                  </div>
                  <div className={`flex-1 py-2 ${i < steps.length - 1 ? 'pb-4' : ''}`}>
                    <p className="text-[var(--text-secondary)] text-sm font-semibold group-hover:text-white transition-colors duration-300 mb-0.5">{item.label[lang]}</p>
                    <p className="text-[var(--text-tertiary)] text-xs">{item.desc[lang]}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
