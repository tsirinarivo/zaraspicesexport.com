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

  return (
    <footer className="relative bg-[#060e1c] border-t border-white/5 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-cyan-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Brand */}
          <motion.div variants={fadeUp}>
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="w-8 h-8 relative flex-shrink-0">
                <div className="absolute inset-0 border border-cyan-500/60 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
                <div className="absolute inset-[6px] bg-cyan-500/20 rotate-45" />
              </div>
              <div>
                <span className="font-display font-bold text-cyan-400 tracking-tight text-sm block leading-none">
                  Zara
                </span>
                <span className="text-[var(--text-primary)] text-xs tracking-wider font-medium">Spices Export</span>
              </div>
            </Link>
            <p className="text-[var(--text-tertiary)] text-sm leading-relaxed max-w-xs">
              {lang === 'fr'
                ? "De la source au monde. Valorisation et exportation de produits malagasy d'excellence."
                : 'From the source to the world. Premium Malagasy product promotion and export.'}
            </p>
            <p className="text-[var(--text-tertiary)]/50 text-xs mt-4 font-mono tracking-wider">Active since 2017 · Incorporated 2025</p>
          </motion.div>

          {/* Links */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-5">
              {lang === 'fr' ? 'Navigation' : 'Navigation'}
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: lang === 'fr' ? 'Accueil' : 'Home' },
                { href: '/products', label: lang === 'fr' ? 'Produits' : 'Products' },
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
                    className="text-[var(--text-secondary)] hover:text-white text-sm transition-colors duration-300"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <span className="text-[var(--text-tertiary)] text-xs font-mono tracking-wider">
                  Madagascar · {contact.regions[lang].join(' · ')}
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-tertiary)] text-xs font-mono tracking-wider">
            © 2025 Zara Spices Export. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
          <p className="text-[var(--text-tertiary)]/40 text-xs font-mono tracking-widest uppercase">
            From the source to the world
          </p>
        </div>
      </div>
    </footer>
  );
}
