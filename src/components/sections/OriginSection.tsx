'use client';
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
  { name: 'Région SAVA', sub: 'Sambava · Antalaha · Vohémar · Andapa', x: 72, y: 28 },
  { name: 'Mananara', sub: 'Analanjirofo', x: 68, y: 52 },
];

export default function OriginSection() {
  const { lang } = useLanguage();

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
                <svg viewBox="0 0 200 280" className="w-full h-full opacity-30" fill="none">
                  <path
                    d="M100 10 C120 15 140 30 145 60 C150 90 148 110 142 130 C136 150 130 165 125 185 C120 205 118 225 110 245 C102 265 90 270 80 255 C70 240 68 215 72 190 C76 165 72 145 68 120 C64 95 62 75 70 50 C78 25 80 5 100 10Z"
                    fill="rgba(0,229,255,0.1)"
                    stroke="rgba(0,229,255,0.3)"
                    strokeWidth="1"
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
                    {/* Pulse */}
                    <motion.div
                      className="absolute -inset-3 rounded-full border border-cyan-500/30"
                      animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap">
                      <p className="text-cyan-400 text-[10px] font-mono tracking-wider">{region.name}</p>
                      <p className="text-[var(--text-tertiary)] text-[9px]">{region.sub}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Frame decoration */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-cyan-500/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-cyan-500/30" />

                {/* Label */}
                <div className="absolute bottom-8 left-8">
                  <p className="text-[var(--text-tertiary)] text-[9px] font-mono tracking-[0.4em] uppercase">Madagascar</p>
                  <p className="text-[var(--text-tertiary)]/50 text-[8px] tracking-wider">Indian Ocean</p>
                </div>
              </div>
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
                ? "L'origine de nos produits est rigoureusement suivie, depuis les zones de production du nord de Madagascar, en particulier la région SAVA et Mananara (Analanjirofo). Chaque lot est traçable de la récolte à l'expédition."
                : 'The origin of our products is carefully monitored, from the production areas of northern Madagascar, particularly the SAVA region and Mananara (Analanjirofo). Every batch is traceable from harvest to shipment.'}
            </motion.p>

            {/* Timeline */}
            <motion.div className="space-y-3" variants={staggerContainer}>
              {[
                { step: '01', label: lang === 'fr' ? 'Récolte locale' : 'Local harvest', desc: lang === 'fr' ? 'Région SAVA & Mananara' : 'SAVA Region & Mananara' },
                { step: '02', label: lang === 'fr' ? 'Préparation traditionnelle' : 'Traditional preparation', desc: lang === 'fr' ? 'Selon les savoir-faire locaux' : 'Following local know-how' },
                { step: '03', label: lang === 'fr' ? 'Contrôle qualité' : 'Quality control', desc: lang === 'fr' ? 'Analyses & certifications' : 'Analysis & certifications' },
                { step: '04', label: lang === 'fr' ? 'Expédition mondiale' : 'Global shipment', desc: lang === 'fr' ? 'Conditionnement sous vide' : 'Vacuum packed' },
              ].map((item) => (
                <motion.div key={item.step} variants={fadeUp} className="flex items-center gap-5 group">
                  <span className="font-mono text-cyan-500/30 group-hover:text-cyan-500/60 text-sm w-8 flex-shrink-0 transition-colors duration-300">
                    {item.step}
                  </span>
                  <div className="flex-1 flex items-center gap-4 py-3 border-b border-white/5 group-hover:border-cyan-500/15 transition-colors duration-300">
                    <div>
                      <p className="text-[var(--text-secondary)] text-sm font-medium group-hover:text-white transition-colors duration-300">{item.label}</p>
                      <p className="text-[var(--text-tertiary)] text-xs">{item.desc}</p>
                    </div>
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
