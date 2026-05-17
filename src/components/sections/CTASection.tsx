'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import MagneticButton from '@/components/ui/MagneticButton';
import SplitText from '@/components/ui/SplitText';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function CTASection() {
  const { lang } = useLanguage();

  return (
    <section className="relative bg-obsidian py-40 overflow-hidden">
      {/* Gold radial glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-3xl" />
      </div>

      {/* Border frame */}
      <div className="absolute inset-8 md:inset-16 border border-gold/8 pointer-events-none" />
      <div className="absolute top-8 md:top-16 left-8 md:left-16 w-12 h-12 border-t border-l border-gold/20" />
      <div className="absolute bottom-8 md:bottom-16 right-8 md:right-16 w-12 h-12 border-b border-r border-gold/20" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <RevealOnScroll>
          <span className="text-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-8">
            {lang === 'fr' ? 'Travailler Ensemble' : 'Work Together'}
          </span>
        </RevealOnScroll>

        <SplitText
          text={lang === 'fr' ? 'Prêt à Commander ?' : 'Ready to Order?'}
          className="font-serif text-cream text-[clamp(2.5rem,6vw,5rem)] leading-tight mb-6"
          delay={0.1}
        />

        <RevealOnScroll delay={0.2}>
          <p className="text-cream/40 max-w-lg mx-auto mb-12 leading-relaxed">
            {lang === 'fr'
              ? 'Nos prix s\'ajustent selon la quantité commandée. Contactez-nous pour obtenir un devis personnalisé adapté à vos besoins.'
              : 'Our prices adjust based on order quantity. Contact us for a personalized quote tailored to your needs.'}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <MagneticButton>
              <Link
                href="/contact"
                className="group flex items-center gap-4 bg-gold text-obsidian px-10 py-5 text-xs tracking-[0.3em] uppercase font-medium hover:bg-cream transition-colors duration-300"
              >
                {lang === 'fr' ? 'Demander un Devis' : 'Request a Quote'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/products"
                className="group flex items-center gap-4 border border-gold/30 hover:border-gold text-cream/60 hover:text-gold px-10 py-5 text-xs tracking-[0.3em] uppercase transition-all duration-300"
              >
                {lang === 'fr' ? 'Explorer les Produits' : 'Explore Products'}
              </Link>
            </MagneticButton>
          </div>
        </RevealOnScroll>

        {/* Contact details */}
        <RevealOnScroll delay={0.4}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-cream/20 text-xs tracking-wider">
            <a href="mailto:zaraspicesexport@gmail.com" className="hover:text-gold transition-colors">
              zaraspicesexport@gmail.com
            </a>
            <span className="w-1 h-1 rounded-full bg-gold/20" />
            <a href="tel:+261375930617" className="hover:text-gold transition-colors">
              +261 37 59 306 17
            </a>
            <span className="w-1 h-1 rounded-full bg-gold/20" />
            <a href="tel:+261347286235" className="hover:text-gold transition-colors">
              +261 34 72 862 35
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
