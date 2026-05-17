'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { contact } from '@/lib/data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function Footer() {
  const { lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#060e1c] border-t border-white/5 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-cyan-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="md:col-span-1">
            <Link href="/" className="group flex items-center gap-3 mb-5">
              <div className="w-8 h-8 relative flex-shrink-0">
                <div className="absolute inset-0 border border-cyan-500/60 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
                <div className="absolute inset-[6px] bg-cyan-500/20 rotate-45" />
              </div>
              <div>
                <span className="font-display font-bold text-cyan-400 tracking-tight text-sm block leading-none">Zara</span>
                <span className="text-[var(--text-primary)] text-xs tracking-wider font-medium">Spices Export</span>
              </div>
            </Link>
            <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-4">
              {lang === 'fr'
                ? "De la source au monde. Valorisation et exportation de produits malagasy d'excellence."
                : 'From the source to the world. Premium Malagasy product promotion and export.'}
            </p>
            <p className="text-[var(--text-tertiary)]/50 text-xs font-mono tracking-wider mb-5">
              {lang === 'fr' ? 'Active depuis 2017 · Constituée 2025' : 'Active since 2017 · Incorporated 2025'}
            </p>
            {/* Social */}
            <div className="flex gap-2">
              <a
                href={`https://wa.me/${contact.phones[0].replace(/\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/8 hover:border-[#25D366]/40 hover:bg-[#25D366]/10 flex items-center justify-center transition-colors duration-300"
                title="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="w-8 h-8 rounded-lg border border-white/8 hover:border-cyan-500/40 hover:bg-cyan-500/10 flex items-center justify-center transition-colors duration-300"
                title="Email"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-tertiary)]">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-5">
              {lang === 'fr' ? 'Navigation' : 'Navigation'}
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: lang === 'fr' ? 'Accueil' : 'Home' },
                { href: '/shop', label: lang === 'fr' ? 'Boutique' : 'Shop' },
                { href: '/products', label: lang === 'fr' ? 'Produits' : 'Products' },
                { href: '/compare', label: lang === 'fr' ? 'Comparateur' : 'Compare' },
                { href: '/about', label: lang === 'fr' ? 'À Propos' : 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-cyan-500/30 group-hover:w-6 group-hover:bg-cyan-500 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-5">
              {lang === 'fr' ? 'Produits' : 'Products'}
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/products/vanille-tk', label: 'Vanille TK' },
                { href: '/products/vanille-gourmet', label: lang === 'fr' ? 'Vanille Gourmet' : 'Gourmet Vanilla' },
                { href: '/products/vanille-pompona', label: 'Vanille Pompona' },
                { href: '/products/caviar-vanille', label: lang === 'fr' ? 'Caviar de Vanille' : 'Vanilla Caviar' },
                { href: '/products/poudre-vanille', label: lang === 'fr' ? 'Poudre de Vanille' : 'Vanilla Powder' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-[#a3ff12]/20 group-hover:w-6 group-hover:bg-[#a3ff12]/60 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[var(--text-secondary)] hover:text-white text-sm transition-colors duration-300 break-all"
                >
                  {contact.email}
                </a>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-[var(--text-secondary)] hover:text-white text-sm transition-colors duration-300 font-mono"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <span className="text-[var(--text-tertiary)] text-xs font-mono tracking-wider">
                  Madagascar · {contact.regions[lang].join(' · ')}
                </span>
              </li>
            </ul>

            {/* Certs mini */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest mb-3">
                {lang === 'fr' ? 'Certifications' : 'Certified'}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['REX', 'AGR', 'CSO'].map((c) => (
                  <span key={c} className="text-[9px] font-mono border border-cyan-500/15 text-cyan-400/50 px-2 py-0.5 rounded">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-tertiary)] text-xs font-mono tracking-wider">
            © {currentYear} Zara Spices Export · Madagascar
          </p>
          <div className="flex items-center gap-6">
            <Link href="/trace/ZSE-TK-2024-001" className="text-[var(--text-tertiary)]/50 hover:text-[#a3ff12]/60 text-[10px] font-mono tracking-widest uppercase transition-colors duration-300">
              {lang === 'fr' ? 'Traçabilité' : 'Traceability'}
            </Link>
            <p className="text-[var(--text-tertiary)]/40 text-xs font-mono tracking-widest uppercase">
              From the source to the world
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
