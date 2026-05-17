'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { contact } from '@/lib/data';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="relative bg-obsidian border-t border-gold/10 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gold/30 to-transparent" />

      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <RevealOnScroll>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 border border-gold/60 rotate-45" />
                <span className="font-serif text-gold tracking-[0.3em] text-sm uppercase">Zara Spices Export</span>
              </div>
              <p className="text-cream/40 text-sm leading-relaxed max-w-xs">
                {lang === 'fr'
                  ? 'De la source au monde. Valorisation et exportation de produits malagasy d\'excellence.'
                  : 'From the source to the world. Premium Malagasy product promotion and export.'}
              </p>
              <p className="text-cream/20 text-xs mt-4 tracking-wider">Active since 2017 · Incorporated 2025</p>
            </div>
          </RevealOnScroll>

          {/* Links */}
          <RevealOnScroll delay={0.1}>
            <div>
              <h4 className="text-gold/60 text-[10px] tracking-[0.3em] uppercase mb-6">
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
                      className="text-cream/50 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-4 h-px bg-gold/30 group-hover:w-6 group-hover:bg-gold transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          {/* Contact */}
          <RevealOnScroll delay={0.2}>
            <div>
              <h4 className="text-gold/60 text-[10px] tracking-[0.3em] uppercase mb-6">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-cream/50 hover:text-gold text-sm transition-colors duration-300 break-all"
                  >
                    {contact.email}
                  </a>
                </li>
                {contact.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-cream/50 hover:text-gold text-sm transition-colors duration-300"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
                <li>
                  <span className="text-cream/30 text-xs tracking-wider">
                    Madagascar · {contact.regions[lang].join(' · ')}
                  </span>
                </li>
              </ul>
            </div>
          </RevealOnScroll>
        </div>

        {/* Bottom */}
        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/20 text-xs tracking-wider">
            © 2025 Zara Spices Export. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
          <p className="text-cream/10 text-xs tracking-widest uppercase">
            From the source to the world
          </p>
        </div>
      </div>
    </footer>
  );
}
