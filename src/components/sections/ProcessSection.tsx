'use client';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

function PollinationSVG() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
      <motion.circle cx="32" cy="32" r="10" stroke="#a3ff12" strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }} viewport={{ once: true }} />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const x = 32 + 18 * Math.cos((deg * Math.PI) / 180);
        const y = 32 + 18 * Math.sin((deg * Math.PI) / 180);
        return (
          <motion.ellipse key={i} cx={x} cy={y} rx="4" ry="7"
            transform={`rotate(${deg} ${x} ${y})`}
            stroke="#a3ff12" strokeWidth="1" fill="rgba(163,255,18,0.1)"
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }} viewport={{ once: true }} />
        );
      })}
      <motion.circle cx="32" cy="32" r="4" fill="rgba(163,255,18,0.4)"
        animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
    </svg>
  );
}

function HarvestSVG() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
      <motion.path d="M20 48 Q24 30 32 20 Q40 30 44 48"
        stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }} viewport={{ once: true }} />
      <motion.ellipse cx="32" cy="34" rx="8" ry="18" stroke="#00e5ff" strokeWidth="1"
        fill="rgba(0,229,255,0.08)"
        initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 1 }}
        style={{ transformOrigin: '32px 52px' }}
        transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }} />
      <motion.path d="M38 18 L44 12 M44 12 L44 20 M44 12 L52 12"
        stroke="#a3ff12" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }} viewport={{ once: true }} />
    </svg>
  );
}

function EchaudageSVG() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
      <motion.rect x="16" y="36" width="32" height="16" rx="4"
        stroke="#ff6b35" strokeWidth="1.5" fill="rgba(255,107,53,0.06)"
        initial={{ opacity: 0, scaleY: 0 }} whileInView={{ opacity: 1, scaleY: 1 }}
        style={{ transformOrigin: '32px 52px' }}
        transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} />
      {[22, 32, 42].map((x, i) => (
        <motion.path key={i} d={`M${x} 36 Q${x - 3} 28 ${x} 20 Q${x + 3} 14 ${x} 8`}
          stroke="#ff6b35" strokeWidth="1" strokeLinecap="round" opacity="0.6"
          initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.6 + i * 0.15 }} viewport={{ once: true }} />
      ))}
    </svg>
  );
}

function SechageSVG() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
      <motion.circle cx="32" cy="20" r="10"
        stroke="#a3ff12" strokeWidth="1.5" fill="rgba(163,255,18,0.06)"
        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: '32px 20px' }}
        transition={{ duration: 0.6, type: 'spring', delay: 0.1 }} viewport={{ once: true }} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const x1 = 32 + 14 * Math.cos((deg * Math.PI) / 180);
        const y1 = 20 + 14 * Math.sin((deg * Math.PI) / 180);
        const x2 = 32 + 20 * Math.cos((deg * Math.PI) / 180);
        const y2 = 20 + 20 * Math.sin((deg * Math.PI) / 180);
        return (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#a3ff12" strokeWidth="1" opacity="0.5"
            initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }} viewport={{ once: true }} />
        );
      })}
      {[0, 1, 2].map((i) => (
        <motion.ellipse key={i} cx={20 + i * 12} cy={44} rx="4" ry="10"
          stroke="#a3ff12" strokeWidth="1" fill="rgba(163,255,18,0.08)"
          initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 1 }}
          style={{ transformOrigin: `${20 + i * 12}px 54px` }}
          transition={{ duration: 0.7, delay: 0.9 + i * 0.1 }} viewport={{ once: true }} />
      ))}
    </svg>
  );
}

function PackagingSVG() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
      <motion.rect x="14" y="22" width="36" height="30" rx="3"
        stroke="#00e5ff" strokeWidth="1.5" fill="rgba(0,229,255,0.05)"
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} />
      <motion.path d="M14 34 L50 34" stroke="#00e5ff" strokeWidth="1" opacity="0.4"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }} viewport={{ once: true }} />
      <motion.path d="M32 22 L32 14 L40 14 L40 22"
        stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }} viewport={{ once: true }} />
      <motion.circle cx="32" cy="42" r="4"
        stroke="#a3ff12" strokeWidth="1" fill="rgba(163,255,18,0.1)"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        style={{ transformOrigin: '32px 42px' }}
        transition={{ duration: 0.4, delay: 1.1, type: 'spring' }} viewport={{ once: true }} />
      <motion.path d="M29 42 L31 44 L35 40" stroke="#a3ff12" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 1.4 }} viewport={{ once: true }} />
    </svg>
  );
}

export default function ProcessSection() {
  const { lang } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: <PollinationSVG />,
      color: '#a3ff12',
      title: { fr: 'Pollinisation manuelle', en: 'Hand pollination' },
      desc: {
        fr: 'Chaque fleur de vanille dure 24 heures. Nos paysans la pollinisent manuellement à la main, un geste précis transmis de génération en génération.',
        en: 'Each vanilla flower lasts just 24 hours. Our farmers hand-pollinate each one, a precise gesture passed down through generations.',
      },
      detail: { fr: 'Juin — Août', en: 'June — August' },
    },
    {
      num: '02',
      icon: <HarvestSVG />,
      color: '#00e5ff',
      title: { fr: 'Récolte sélective', en: 'Selective harvest' },
      desc: {
        fr: 'Les gousses sont récoltées à pleine maturité, 9 mois après la fleur. Seules les gousses conformes aux standards ZSE sont sélectionnées.',
        en: 'Pods are harvested at full maturity, 9 months after flowering. Only pods meeting ZSE standards are selected.',
      },
      detail: { fr: 'Novembre — Décembre', en: 'November — December' },
    },
    {
      num: '03',
      icon: <EchaudageSVG />,
      color: '#ff6b35',
      title: { fr: 'Échaudage', en: 'Scalding' },
      desc: {
        fr: 'Les gousses sont plongées 3 minutes dans de l\'eau à 65°C pour stopper leur végétation et déclencher la fermentation enzymatique.',
        en: 'Pods are immersed for 3 minutes in 65°C water to halt vegetation and trigger enzymatic fermentation.',
      },
      detail: { fr: 'À la récolte', en: 'At harvest' },
    },
    {
      num: '04',
      icon: <SechageSVG />,
      color: '#a3ff12',
      title: { fr: 'Séchage & Affinage', en: 'Drying & Curing' },
      desc: {
        fr: '2 à 3 mois d\'affinage alternant exposition solaire et repos nocturne en caisses. Le taux d\'humidité est contrôlé quotidiennement.',
        en: '2 to 3 months of curing alternating sun exposure and overnight rest in crates. Moisture is checked daily.',
      },
      detail: { fr: 'Janvier — Mars', en: 'January — March' },
    },
    {
      num: '05',
      icon: <PackagingSVG />,
      color: '#00e5ff',
      title: { fr: 'Conditionnement & Export', en: 'Packaging & Export' },
      desc: {
        fr: 'Tri final, pesée, mise sous vide avec numéro de lot tracé. Expédition vers l\'Europe, les USA et l\'Asie avec tous les certificats requis.',
        en: 'Final sorting, weighing, vacuum-sealing with traced lot number. Shipment to Europe, USA and Asia with all required certificates.',
      },
      detail: { fr: 'Avril — Mai', en: 'April — May' },
    },
  ];

  return (
    <section className="relative overflow-hidden py-32 bg-[var(--bg)]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
            {lang === 'fr' ? 'De la fleur à la gousse' : 'From flower to pod'}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] tracking-tight">
            <span className="text-[var(--text-primary)]">{lang === 'fr' ? 'Le processus ' : 'The '}</span>
            <span className="bg-gradient-to-r from-[#a3ff12] to-cyan-400 bg-clip-text text-transparent">
              {lang === 'fr' ? 'Zara' : 'Zara process'}
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-sm max-w-lg mx-auto mt-4 leading-relaxed">
            {lang === 'fr'
              ? '9 mois de patience, de savoir-faire et de rigueur pour chaque gousse de vanille que vous recevez.'
              : '9 months of patience, expertise and rigour for every vanilla pod you receive.'}
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px hidden lg:block">
            <motion.div
              className="w-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
              style={{ height: '100%' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </div>

          <div className="space-y-16 lg:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={stagger}
              >
                {/* SVG side */}
                <motion.div
                  variants={fadeUp}
                  className={`flex justify-center ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  <div className="relative">
                    <div
                      className="w-40 h-40 rounded-3xl border flex items-center justify-center p-8"
                      style={{
                        background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${step.color}08, transparent)`,
                        borderColor: `${step.color}20`,
                      }}
                    >
                      {step.icon}
                    </div>
                    {/* Step number */}
                    <div
                      className="absolute -top-4 -right-4 w-10 h-10 rounded-xl border flex items-center justify-center"
                      style={{ background: 'var(--bg)', borderColor: `${step.color}40` }}
                    >
                      <span className="font-mono text-xs font-bold" style={{ color: step.color }}>{step.num}</span>
                    </div>
                    {/* Timeline dot (center) */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center"
                      style={{ [i % 2 === 0 ? 'right' : 'left']: '-3.5rem' }}
                    >
                      <div
                        className="w-3 h-3 rounded-full border-2 border-[var(--bg)]"
                        style={{ background: step.color }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Text side */}
                <motion.div
                  variants={fadeUp}
                  className={i % 2 === 1 ? 'lg:order-1' : ''}
                >
                  <span className="text-xs font-mono uppercase tracking-widest mb-3 block" style={{ color: step.color }}>
                    {step.detail[lang]}
                  </span>
                  <h3 className="font-display font-bold text-[var(--text-primary)] text-2xl mb-3">
                    {step.title[lang]}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                    {step.desc[lang]}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
