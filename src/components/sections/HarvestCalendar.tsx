'use client';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const MONTHS_FR = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface Phase {
  label: { fr: string; en: string };
  color: string;
  months: number[];
  icon: string;
}

const PHASES: Phase[] = [
  {
    label: { fr: 'Floraison', en: 'Flowering' },
    color: '#a3ff12',
    months: [4, 5, 6, 7],
    icon: '🌸',
  },
  {
    label: { fr: 'Récolte', en: 'Harvest' },
    color: '#00e5ff',
    months: [10, 11],
    icon: '✂️',
  },
  {
    label: { fr: 'Séchage & Affinage', en: 'Drying & Curing' },
    color: '#ff6b35',
    months: [11, 0, 1, 2],
    icon: '☀️',
  },
  {
    label: { fr: 'Export disponible', en: 'Export available' },
    color: '#a3ff12',
    months: [2, 3, 4, 5, 6, 7, 8],
    icon: '📦',
  },
];

const currentMonth = new Date().getMonth();

export default function HarvestCalendar() {
  const { lang } = useLanguage();
  const months = lang === 'fr' ? MONTHS_FR : MONTHS_EN;

  return (
    <section className="relative overflow-hidden py-24 bg-[var(--bg-secondary)]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(163,255,18,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-14"
        >
          <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-[#a3ff12] block mb-3">
            {lang === 'fr' ? 'Calendrier saisonnier' : 'Seasonal calendar'}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
            <span className="text-[var(--text-primary)]">{lang === 'fr' ? 'Quand commander' : 'When to order'}</span>
            <span className="text-[var(--text-primary)]/20"> — </span>
            <span className="bg-gradient-to-r from-[#a3ff12] to-cyan-400 bg-clip-text text-transparent">
              {lang === 'fr' ? 'Cycle annuel' : 'Annual cycle'}
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-sm max-w-lg mt-4 leading-relaxed">
            {lang === 'fr'
              ? 'La vanille de Madagascar suit un cycle naturel précis. Anticipez vos approvisionnements pour garantir la disponibilité.'
              : 'Madagascar vanilla follows a precise natural cycle. Plan your supply to guarantee availability.'}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Calendar grid */}
          <div className="lg:col-span-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 overflow-hidden"
            >
              {/* Month headers */}
              <div className="grid grid-cols-12 gap-1 mb-3">
                {months.map((m, i) => (
                  <div key={i} className="text-center">
                    <span
                      className={`text-[9px] font-mono uppercase tracking-widest block ${i === currentMonth ? 'text-cyan-400' : 'text-[var(--text-tertiary)]'}`}
                    >
                      {m}
                    </span>
                    {i === currentMonth && (
                      <motion.div
                        className="w-1 h-1 rounded-full bg-cyan-400 mx-auto mt-1"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Phase rows */}
              <div className="space-y-3">
                {PHASES.map((phase, pi) => (
                  <motion.div key={pi} variants={fadeUp}>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-sm">{phase.icon}</span>
                      <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest">
                        {phase.label[lang]}
                      </span>
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                      {Array.from({ length: 12 }, (_, mi) => {
                        const active = phase.months.includes(mi);
                        return (
                          <div key={mi} className="h-6 rounded relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                            {active && (
                              <motion.div
                                className="absolute inset-0 rounded origin-left"
                                style={{ background: `${phase.color}30`, borderLeft: `2px solid ${phase.color}60` }}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 + pi * 0.08 + mi * 0.03, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                              />
                            )}
                            {mi === currentMonth && (
                              <div
                                className="absolute inset-y-0 right-0 w-0.5"
                                style={{ background: 'rgba(0,229,255,0.3)' }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Current month indicator */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono text-[var(--text-tertiary)]">
                  {lang === 'fr' ? `Mois actuel : ${MONTHS_FR[currentMonth]}` : `Current month: ${MONTHS_EN[currentMonth]}`}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Legend + info */}
          <div className="space-y-4">
            {PHASES.map((phase, i) => (
              <motion.div
                key={i}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 hover:border-opacity-40 transition-colors duration-300"
                style={{ '--tw-border-opacity': 0.08 } as React.CSSProperties}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: phase.color }} />
                  <span className="text-sm font-display font-semibold text-[var(--text-primary)]">
                    {phase.icon} {phase.label[lang]}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] font-mono">
                  {phase.months.map((m) => months[m]).join(', ')}
                </p>
              </motion.div>
            ))}

            <motion.div
              className="bg-[rgba(163,255,18,0.05)] border border-[#a3ff12]/15 rounded-xl p-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs text-[#a3ff12] font-mono uppercase tracking-widest mb-2">
                {lang === 'fr' ? 'Conseil' : 'Pro tip'}
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {lang === 'fr'
                  ? 'Passez vos commandes entre avril et août pour bénéficier de la nouvelle récolte et des meilleurs prix de saison.'
                  : 'Place orders between April and August to benefit from the new harvest and best seasonal prices.'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
