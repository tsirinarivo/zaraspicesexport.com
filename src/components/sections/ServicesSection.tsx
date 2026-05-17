'use client';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { services } from '@/lib/data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function ServicesSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,229,255,0.05) 0%, transparent 70%), #0a1628' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
            {lang === 'fr' ? 'Nos Services' : 'Our Services'}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight text-[var(--text-primary)]">
            {lang === 'fr' ? (
              <>
                Livraison &{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Expédition
                </span>
              </>
            ) : (
              <>
                Delivery &{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Shipping
                </span>
              </>
            )}
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 hover:border-cyan-500/20 transition-colors duration-300 text-center overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-cyan-500/30 group-hover:w-24 group-hover:bg-cyan-500/60 transition-all duration-500" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl border border-cyan-500/20 group-hover:border-cyan-500/40 flex items-center justify-center mx-auto mb-6 transition-colors duration-300 bg-cyan-500/5">
                <span className="text-cyan-400/60 group-hover:text-cyan-400 text-xl font-mono transition-colors duration-300">
                  {service.icon}
                </span>
              </div>

              <h3 className="font-display font-bold text-[var(--text-primary)] group-hover:text-cyan-400 text-lg mb-3 transition-colors duration-300">
                {service.title[lang]}
              </h3>
              <p className="text-[var(--text-tertiary)] text-sm leading-relaxed">{service.description[lang]}</p>

              {/* Bottom number */}
              <div className="absolute bottom-5 right-5 font-display font-black text-5xl text-white/[0.03] group-hover:text-white/[0.05] transition-colors duration-300 leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
