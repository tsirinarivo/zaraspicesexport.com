'use client';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/store/language';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export default function ServicesSection() {
  const { lang } = useLanguage();

  const services = [
    {
      icon: '↗',
      color: '#00e5ff',
      title: { fr: 'Expédition Internationale', en: 'International Shipping' },
      desc: {
        fr: 'Livraison sécurisée et tracée vers l\'Europe, les USA et l\'Asie. Accompagnement douanier complet.',
        en: 'Secure, tracked delivery to Europe, USA and Asia. Full customs support included.',
      },
    },
    {
      icon: '→',
      color: '#00e5ff',
      title: { fr: 'Livraison Locale', en: 'Local Delivery' },
      desc: {
        fr: 'Livraisons directes à Antananarivo et dans toutes les régions de Madagascar.',
        en: 'Direct deliveries to Antananarivo and all regions of Madagascar.',
      },
    },
    {
      icon: '◈',
      color: '#a3ff12',
      title: { fr: 'Tarification Flexible', en: 'Flexible Pricing' },
      desc: {
        fr: 'Prix adaptés au volume commandé. Paliers Retail, Professionnel et Wholesale disponibles.',
        en: 'Pricing adapted to order volume. Retail, Professional, and Wholesale tiers available.',
      },
    },
    {
      icon: '⊡',
      color: '#a3ff12',
      title: { fr: 'Échantillons Gratuits', en: 'Free Samples' },
      desc: {
        fr: 'Testez notre qualité avant de commander. Envoi d\'échantillons de 50–100g pour les acheteurs qualifiés.',
        en: 'Test our quality before ordering. 50–100g samples dispatched for qualified buyers.',
      },
    },
    {
      icon: '◎',
      color: '#ff6b35',
      title: { fr: 'Emballage Personnalisé', en: 'Custom Packaging' },
      desc: {
        fr: 'Conditionnement sous vide sur mesure : vrac, boîtes retail, sachets private label selon vos besoins.',
        en: 'Custom vacuum packaging: bulk, retail boxes, private label pouches to your specifications.',
      },
    },
    {
      icon: '◇',
      color: '#ff6b35',
      title: { fr: 'Support Certifications', en: 'Certification Support' },
      desc: {
        fr: 'Fourniture de tous les documents requis : REX, certificats phyto, résultats d\'analyse à chaque expédition.',
        en: 'All required documents provided: REX, phytosanitary certificates, lab results with every shipment.',
      },
    },
  ];

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
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div>
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
              {lang === 'fr' ? 'Nos Services' : 'Our Services'}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight text-[var(--text-primary)]">
              {lang === 'fr' ? (
                <>
                  Ce que nous{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    offrons
                  </span>
                </>
              ) : (
                <>
                  What we{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    offer
                  </span>
                </>
              )}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-sm max-w-md mt-3 leading-relaxed">
              {lang === 'fr'
                ? 'De la récolte à la livraison, nous gérons chaque étape pour vous offrir une expérience d\'achat sans friction.'
                : 'From harvest to delivery, we manage every step to offer you a frictionless buying experience.'}
            </motion.p>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-sm text-cyan-400/70 hover:text-cyan-400 transition-colors duration-300 font-mono group"
            >
              {lang === 'fr' ? 'Demander un devis' : 'Request a quote'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 hover:border-opacity-40 transition-all duration-300 overflow-hidden"
              whileHover={{ borderColor: `${service.color}25` }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${service.color}60, transparent)` }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl border flex items-center justify-center mb-5 transition-colors duration-300"
                style={{
                  borderColor: `${service.color}20`,
                  background: `${service.color}08`,
                }}
              >
                <span
                  className="text-lg font-mono transition-colors duration-300"
                  style={{ color: `${service.color}80` }}
                >
                  {service.icon}
                </span>
              </div>

              <h3 className="font-display font-bold text-[var(--text-primary)] group-hover:text-white text-base mb-2 transition-colors duration-300">
                {service.title[lang]}
              </h3>
              <p className="text-[var(--text-tertiary)] text-sm leading-relaxed">{service.desc[lang]}</p>

              {/* Bottom number */}
              <div className="absolute bottom-4 right-5 font-display font-black text-5xl text-white/[0.025] group-hover:text-white/[0.04] transition-colors duration-300 leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          className="mt-10 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div>
            <p className="text-[var(--text-primary)] font-semibold text-sm mb-1">
              {lang === 'fr' ? 'Besoin d\'un service sur mesure ?' : 'Need a custom service?'}
            </p>
            <p className="text-[var(--text-tertiary)] text-xs font-mono">
              {lang === 'fr' ? 'Conditionnement, documentation, logistique — discutons de vos besoins spécifiques.' : 'Packaging, documentation, logistics — let\'s discuss your specific needs.'}
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href={`https://wa.me/${'+261375930617'.replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[#25D366]/30 hover:border-[#25D366]/60 text-[#25D366] font-mono text-xs px-4 py-2.5 rounded-xl transition-colors duration-300"
            >
              <span>📱</span> WhatsApp
            </a>
            <Link
              href="/contact"
              className="bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-5 py-2.5 rounded-xl text-xs transition-colors duration-300"
            >
              {lang === 'fr' ? 'Nous contacter' : 'Contact us'}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
