'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { values, certifications, contact } from '@/lib/data';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SplitText from '@/components/ui/SplitText';

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-obsidian pt-32 pb-24">
      {/* Hero */}
      <div className="container mx-auto px-6 mb-32">
        <RevealOnScroll>
          <span className="text-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-6">
            {lang === 'fr' ? 'Notre Histoire' : 'Our Story'}
          </span>
        </RevealOnScroll>
        <SplitText
          text={lang === 'fr' ? 'À Propos de Nous' : 'About Us'}
          className="font-serif text-cream text-[clamp(3rem,8vw,7rem)] leading-[0.9] mb-12"
          delay={0.1}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <RevealOnScroll delay={0.2}>
            <p className="text-cream/60 text-lg leading-relaxed">
              {lang === 'fr'
                ? 'ZARA SPICES EXPORT est une entreprise spécialisée dans la valorisation et l\'exportation de produits locaux d\'origine malagasy. Active depuis 2017, la société est légalement constituée en 2025.'
                : 'ZARA SPICES EXPORT is a company specialized in the promotion and export of locally sourced Malagasy products. Active since 2017, the company was legally incorporated in 2025.'}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <p className="text-cream/40 leading-relaxed">
              {lang === 'fr'
                ? 'Spécialisés dans la vanille malagasy, nous proposons également d\'autres produits locaux : cacao, girofle, cannelle et poivres rares. Chaque produit est sélectionné avec exigence, dans une démarche de qualité, de traçabilité et de respect des traditions locales.'
                : 'Specializing in Malagasy vanilla, we also offer other local products: cocoa, cloves, cinnamon, and rare peppers. Each product is rigorously selected, with a commitment to quality, traceability, and respect for local traditions.'}
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Values */}
      <div className="border-t border-gold/10 py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <RevealOnScroll>
              <span className="text-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-6">
                {lang === 'fr' ? 'Nos Valeurs' : 'Our Values'}
              </span>
            </RevealOnScroll>
            <SplitText
              text={lang === 'fr' ? 'Ce Qui Nous Guide' : 'What Guides Us'}
              className="font-serif text-cream text-[clamp(2rem,5vw,4rem)]"
              delay={0.1}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <RevealOnScroll key={value.id} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group p-8 border border-gold/10 hover:border-gold/30 transition-all duration-300"
                >
                  <span className="text-gold/30 group-hover:text-gold text-3xl mb-6 block transition-colors duration-300">
                    {value.icon}
                  </span>
                  <h3 className="font-serif text-cream group-hover:text-gold text-xl mb-3 transition-colors duration-300">
                    {value.title[lang]}
                  </h3>
                  <p className="text-cream/40 text-sm leading-relaxed">{value.description[lang]}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="border-t border-gold/10 py-32 bg-stone-950/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <RevealOnScroll>
                <span className="text-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-6">
                  {lang === 'fr' ? 'Conformité' : 'Compliance'}
                </span>
              </RevealOnScroll>
              <SplitText
                text={lang === 'fr' ? 'Certifications & Agréments' : 'Certifications & Approvals'}
                className="font-serif text-cream text-[clamp(2rem,4vw,3rem)] mb-8"
                delay={0.1}
              />
              <RevealOnScroll delay={0.2}>
                <p className="text-cream/40 text-sm leading-relaxed">
                  {lang === 'fr'
                    ? 'Nos produits sont conformes aux exigences de qualité des marchés locaux et internationaux, avec toutes les certifications nécessaires à l\'exportation.'
                    : 'Our products comply with the quality requirements of local and international markets, with all certifications required for export.'}
                </p>
              </RevealOnScroll>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <RevealOnScroll key={i} delay={i * 0.08}>
                  <div className="flex items-center gap-6 p-5 border border-gold/10 hover:border-gold/30 transition-colors duration-300 group">
                    <div className="w-8 h-8 border border-gold/30 group-hover:border-gold rotate-45 transition-colors duration-300 flex-shrink-0" />
                    <span className="text-cream/60 text-sm group-hover:text-cream transition-colors duration-300">
                      {cert}
                    </span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact quick */}
      <div className="border-t border-gold/10 py-20">
        <div className="container mx-auto px-6 text-center">
          <RevealOnScroll>
            <p className="text-cream/30 text-xs tracking-[0.4em] uppercase mb-8">
              {lang === 'fr' ? 'Nous Joindre' : 'Get in Touch'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <a
                href={`mailto:${contact.email}`}
                className="font-serif text-cream/50 hover:text-gold text-xl transition-colors duration-300"
              >
                {contact.email}
              </a>
              {contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-cream/30 hover:text-gold text-sm transition-colors duration-300"
                >
                  {phone}
                </a>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
