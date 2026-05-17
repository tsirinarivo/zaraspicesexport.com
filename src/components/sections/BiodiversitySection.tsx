'use client';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/store/language';
import FloatingBotanicals from '@/components/ui/FloatingBotanicals';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// SVG inline vanilla pod animée
function VanillaPodSVG() {
  return (
    <svg viewBox="0 0 60 200" className="w-full h-full" fill="none">
      {/* Tige */}
      <motion.path
        d="M30 190 Q28 160 30 130 Q32 100 29 70 Q27 40 30 15"
        stroke="rgba(163,255,18,0.6)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
        viewport={{ once: true }}
      />
      {/* Gousse */}
      <motion.ellipse
        cx="30" cy="105" rx="6" ry="35"
        fill="rgba(163,255,18,0.12)"
        stroke="rgba(163,255,18,0.5)"
        strokeWidth="1.5"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        viewport={{ once: true }}
        style={{ transformOrigin: '30px 140px' }}
      />
      {/* Feuilles */}
      {[60, 100, 140].map((y, i) => (
        <motion.path
          key={i}
          d={`M30 ${y} Q${i % 2 === 0 ? 48 : 12} ${y - 12} ${i % 2 === 0 ? 44 : 16} ${y - 24}`}
          stroke="rgba(163,255,18,0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 + i * 0.2 }}
          viewport={{ once: true }}
        />
      ))}
      {/* Fleur */}
      <motion.circle
        cx="30" cy="15" r="4"
        fill="rgba(0,229,255,0.3)"
        stroke="rgba(0,229,255,0.6)"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2, type: 'spring' }}
        viewport={{ once: true }}
      />
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <motion.ellipse
          key={i}
          cx={30 + 8 * Math.cos((deg * Math.PI) / 180)}
          cy={15 + 8 * Math.sin((deg * Math.PI) / 180)}
          rx="2.5" ry="4"
          fill="rgba(0,229,255,0.15)"
          stroke="rgba(0,229,255,0.4)"
          strokeWidth="0.8"
          transform={`rotate(${deg} ${30 + 8 * Math.cos((deg * Math.PI) / 180)} ${15 + 8 * Math.sin((deg * Math.PI) / 180)})`}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.4 + i * 0.08 }}
          viewport={{ once: true }}
        />
      ))}
    </svg>
  );
}

// Carte stat avec barre de progression animée
function StatBar({ value, max, label, color }: { value: number; max: number; label: string; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest">{label}</span>
        <span className="text-xs font-mono" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}

export default function BiodiversitySection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  const stats = [
    {
      num: 80,
      suffix: '%',
      label: lang === 'fr' ? "de la vanille mondiale" : "of world's vanilla",
      color: '#a3ff12',
    },
    {
      num: 5,
      suffix: '%',
      label: lang === 'fr' ? "de la biodiversité mondiale" : "of global biodiversity",
      color: '#00e5ff',
    },
    {
      num: 90,
      suffix: '%',
      label: lang === 'fr' ? "d'espèces endémiques" : "endemic species",
      color: '#a3ff12',
    },
  ];

  const species = [
    { label: lang === 'fr' ? 'Vanilles endémiques' : 'Endemic vanillas', value: 35, color: '#a3ff12' },
    { label: lang === 'fr' ? 'Espèces de palmiers' : 'Palm species', value: 60, color: '#00e5ff' },
    { label: lang === 'fr' ? 'Lémuriens endémiques' : 'Endemic lemurs', value: 95, color: '#a3ff12' },
    { label: lang === 'fr' ? 'Plantes médicinales' : 'Medicinal plants', value: 75, color: '#00e5ff' },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32">
      {/* Background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(163,255,18,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 50%, rgba(0,229,255,0.04) 0%, transparent 50%), linear-gradient(to bottom, #0a1628, #0d1f3c, #0a1628)',
          height: '110%',
          width: '100%',
        }} />
      </motion.div>

      {/* Particules botaniques flottantes */}
      <FloatingBotanicals count={20} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — illustration + stats */}
          <div>
            {/* Label */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-12"
            >
              <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-[#a3ff12] block mb-3">
                Madagascar · {lang === 'fr' ? 'Biodiversité' : 'Biodiversity'}
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] tracking-tight leading-[1.05]">
                <span className="text-[var(--text-primary)]">
                  {lang === 'fr' ? 'Une île ' : 'An island '}
                </span>
                <span className="bg-gradient-to-r from-[#a3ff12] to-cyan-400 bg-clip-text text-transparent">
                  {lang === 'fr' ? 'hors du commun' : 'like no other'}
                </span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-sm leading-relaxed mt-4 max-w-md">
                {lang === 'fr'
                  ? 'Madagascar abrite 5% de la biodiversité mondiale sur 0.4% des terres émergées. La région SAVA, notre zone d\'approvisionnement, concentre les espèces les plus rares de la planète.'
                  : 'Madagascar hosts 5% of the world\'s biodiversity on 0.4% of land. The SAVA region, our sourcing area, concentrates some of the rarest species on the planet.'}
              </motion.p>
            </motion.div>

            {/* Barres de progression */}
            <motion.div
              className="space-y-4 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {species.map((s) => (
                <motion.div key={s.label} variants={fadeUp}>
                  <StatBar value={s.value} max={100} label={s.label} color={s.color} />
                </motion.div>
              ))}
            </motion.div>

            {/* Orchidée SVG animée */}
            <motion.div
              className="flex items-end gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-12 h-40">
                <VanillaPodSVG />
              </div>
              <div className="w-8 h-28 opacity-60" style={{ transform: 'scaleX(-1)' }}>
                <VanillaPodSVG />
              </div>
              <div className="w-10 h-36 opacity-40">
                <VanillaPodSVG />
              </div>
              <p className="text-[var(--text-tertiary)] text-xs font-mono pb-4">
                Vanilla planifolia<br />
                <span className="text-[#a3ff12]/60">Madagascar · SAVA</span>
              </p>
            </motion.div>
          </div>

          {/* Right — chiffres clés */}
          <div>
            {/* Grands compteurs */}
            <motion.div
              className="grid grid-cols-1 gap-4 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-[rgba(163,255,18,0.2)] transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-black text-4xl leading-none" style={{ color: stat.color }}>
                        <AnimatedCounter
                          target={stat.num}
                          suffix={stat.suffix}
                          duration={2}
                        />
                      </p>
                      <p className="text-[var(--text-secondary)] text-sm mt-2">{stat.label}</p>
                    </div>
                    {/* Cercle animé */}
                    <div className="relative w-14 h-14 flex-shrink-0">
                      <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                        <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                        <motion.circle
                          cx="28" cy="28" r="22"
                          fill="none"
                          stroke={stat.color}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 22}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                          whileInView={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - stat.num / 100) }}
                          transition={{ duration: 2, ease: 'easeOut', delay: 0.4 }}
                          viewport={{ once: true }}
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Badge région SAVA */}
            <motion.div
              className="bg-[var(--surface)] border border-[rgba(163,255,18,0.15)] rounded-2xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-start gap-4">
                {/* Pulse dot */}
                <div className="relative flex-shrink-0 mt-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#a3ff12]"
                    animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#a3ff12]/20"
                    animate={{ scale: [1, 3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#a3ff12] mb-1">
                    {lang === 'fr' ? 'Zone d\'approvisionnement certifiée' : 'Certified sourcing zone'}
                  </p>
                  <p className="text-[var(--text-primary)] font-display font-bold text-base">
                    Région SAVA · Mananara
                  </p>
                  <p className="text-[var(--text-tertiary)] text-xs mt-1">
                    {lang === 'fr'
                      ? 'Nord-est de Madagascar — traçabilité complète depuis la récolte'
                      : 'North-eastern Madagascar — full traceability from harvest'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
