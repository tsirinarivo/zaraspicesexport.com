'use client';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stampVariant: Variants = {
  hidden: { scale: 0, rotate: -15, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 250, damping: 18 },
  },
};

interface Cert {
  code: string;
  title: { fr: string; en: string };
  desc: { fr: string; en: string };
  color: string;
  year: string;
}

const certs: Cert[] = [
  {
    code: 'REX',
    title: { fr: 'Exportateur Enregistré', en: 'Registered Exporter' },
    desc: {
      fr: 'Système REX de l\'Union Européenne. Autorise l\'auto-certification de l\'origine préférentielle des marchandises.',
      en: 'European Union REX system. Authorises self-certification of preferential origin of goods.',
    },
    color: '#00e5ff',
    year: '2019',
  },
  {
    code: 'AGR',
    title: { fr: 'Agrément Export', en: 'Export License' },
    desc: {
      fr: 'Certificat d\'agrément d\'exportateur délivré par le Ministère du Commerce de Madagascar.',
      en: 'Export approval certificate issued by the Madagascar Ministry of Commerce.',
    },
    color: '#a3ff12',
    year: '2017',
  },
  {
    code: 'CSO',
    title: { fr: 'Certificat de Consommabilité', en: 'Consumability Certificate' },
    desc: {
      fr: 'Garantit la conformité sanitaire et alimentaire de nos produits selon les normes internationales CODEX.',
      en: 'Guarantees the sanitary and food compliance of our products to international CODEX standards.',
    },
    color: '#a3ff12',
    year: '2023',
  },
  {
    code: 'ANA',
    title: { fr: 'Résultats d\'Analyse', en: 'Lab Analysis Results' },
    desc: {
      fr: 'Analyses en laboratoire accrédité : taux de vanilline, pesticites, métaux lourds. Renouvelées à chaque récolte.',
      en: 'Accredited laboratory analyses: vanillin content, pesticides, heavy metals. Renewed every harvest.',
    },
    color: '#ff6b35',
    year: '2024',
  },
];

function StampSVG({ code, color }: { code: string; color: string }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />
      <circle cx="50" cy="50" r="36" stroke={color} strokeWidth="1" opacity="0.3" />
      <text
        x="50" y="55"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: '18px',
          fontFamily: 'var(--font-jetbrains)',
          fontWeight: 700,
          fill: color,
          letterSpacing: '2px',
        }}
      >
        {code}
      </text>
      <text
        x="50" y="72"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: '7px', fontFamily: 'var(--font-jetbrains)', fill: color, opacity: 0.5, letterSpacing: '1px' }}
      >
        CERTIFIED
      </text>
      <path
        d="M22 50 A28 28 0 0 1 78 50"
        stroke={color}
        strokeWidth="1"
        opacity="0.3"
        fill="none"
      />
    </svg>
  );
}

export default function CertificationsSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative overflow-hidden py-28 bg-[var(--bg-secondary)]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 20% 50%, rgba(0,229,255,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16"
        >
          <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
            {lang === 'fr' ? 'Conformité & traçabilité' : 'Compliance & traceability'}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
            <span className="text-[var(--text-primary)]">{lang === 'fr' ? 'Certifications ' : 'Certifications '}</span>
            <span className="bg-gradient-to-r from-cyan-400 to-[#a3ff12] bg-clip-text text-transparent">
              {lang === 'fr' ? 'officielles' : 'official'}
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-sm max-w-lg mt-4 leading-relaxed">
            {lang === 'fr'
              ? 'Tous nos produits sont certifiés conformes aux exigences de l\'UE et des marchés internationaux. Documents disponibles sur demande.'
              : 'All our products are certified compliant with EU and international market requirements. Documents available on request.'}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.code}
              className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-opacity-30 transition-all duration-300 overflow-hidden relative"
              style={{ '--hover-border': cert.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ borderColor: `${cert.color}30` }}
            >
              {/* Stamp */}
              <motion.div
                className="w-20 h-20 mx-auto mb-5"
                variants={stampVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <StampSVG code={cert.code} color={cert.color} />
              </motion.div>

              {/* Year badge */}
              <div
                className="absolute top-4 right-4 text-[9px] font-mono px-2 py-0.5 rounded-md border"
                style={{ color: cert.color, borderColor: `${cert.color}30`, background: `${cert.color}08` }}
              >
                {cert.year}
              </div>

              <h3 className="font-display font-bold text-[var(--text-primary)] text-base text-center mb-2">
                {cert.title[lang]}
              </h3>
              <p className="text-[var(--text-tertiary)] text-xs text-center leading-relaxed">
                {cert.desc[lang]}
              </p>

              {/* Bottom glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${cert.color}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          className="mt-10 bg-[var(--surface)] border border-cyan-500/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-lg">
              📄
            </div>
            <div>
              <p className="text-[var(--text-primary)] font-semibold text-sm">
                {lang === 'fr' ? 'Besoin des documents officiels ?' : 'Need official documents?'}
              </p>
              <p className="text-[var(--text-tertiary)] text-xs font-mono">
                {lang === 'fr' ? 'Certificats, analyses et REX disponibles sur demande' : 'Certificates, analyses and REX available on request'}
              </p>
            </div>
          </div>
          <a
            href="mailto:zaraspicesexport@gmail.com?subject=Documents certificats"
            className="flex-shrink-0 bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors duration-300"
          >
            {lang === 'fr' ? 'Demander →' : 'Request →'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
