'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import MagneticButton from '@/components/ui/MagneticButton';

const navLinks = {
  fr: [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Produits' },
    { href: '/about', label: 'À Propos' },
    { href: '/contact', label: 'Contact' },
  ],
  en: [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
};

export default function Navbar() {
  const { lang, toggle } = useLanguage();
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = navLinks[lang];
  const count = mounted ? totalItems() : 0;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-obsidian/90 backdrop-blur-xl border-b border-gold/10' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 border border-gold/60 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
              <div className="absolute inset-[6px] bg-gold/20 rotate-45" />
            </div>
            <div>
              <span className="font-serif text-gold tracking-[0.2em] text-sm uppercase block leading-none">
                Zara Spices
              </span>
              <span className="text-cream/40 text-[9px] tracking-[0.35em] uppercase">Export</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/60 hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Lang toggle */}
            <MagneticButton>
              <button
                onClick={toggle}
                className="text-xs tracking-[0.2em] uppercase text-cream/40 hover:text-gold transition-colors duration-300 w-8 text-center"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>
            </MagneticButton>

            {/* Cart */}
            <MagneticButton>
              <button
                onClick={openCart}
                className="relative w-10 h-10 flex items-center justify-center border border-gold/20 hover:border-gold/60 transition-colors duration-300 group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream/60 group-hover:text-gold transition-colors">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-obsidian text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            </MagneticButton>

            {/* Burger */}
            <button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span
                className="w-6 h-px bg-cream block"
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              />
              <motion.span
                className="w-6 h-px bg-cream block"
                animate={{ opacity: menuOpen ? 0 : 1 }}
              />
              <motion.span
                className="w-6 h-px bg-cream block"
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-4xl text-cream hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
