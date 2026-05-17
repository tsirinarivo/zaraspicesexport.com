'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { values } from '@/lib/data';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SplitText from '@/components/ui/SplitText';

export default function AboutSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative bg-stone-950 py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="w-full h-full bg-gradient-to-l from-gold to-transparent" />
      </div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-gold/10 opacity-20" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-gold/10 opacity-15 translate-x-16 translate-y-8" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: text */}
          <div>
            <RevealOnScroll>
              <span className="text-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-6">
                {lang === 'fr' ? 'À Propos' : 'About'}
              </span>
            </RevealOnScroll>

            <SplitText
              text={lang === 'fr' ? 'De la Source au Monde' : 'From the Source to the World'}
              className="font-serif text-cream text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-8"
              delay={0.1}
            />

            <RevealOnScroll delay={0.2}>
              <p className="text-cream/50 leading-relaxed mb-6">
                {lang === 'fr'
                  ? 'ZARA SPICES EXPORT est une entreprise spécialisée dans la valorisation et l\'exportation de produits locaux d\'origine malagasy. Active depuis 2017, la société est légalement constituée en 2025.'
                  : 'ZARA SPICES EXPORT is a company specialized in the promotion and export of locally sourced Malagasy products. Active since 2017, the company was legally incorporated in 2025.'}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="border-l-2 border-gold/30 pl-6 mb-10">
                <p className="text-cream/60 text-sm leading-relaxed italic font-serif text-lg">
                  {lang === 'fr'
                    ? '"L\'origine de nos produits est rigoureusement suivie, depuis les zones de production du nord de Madagascar, en particulier la région SAVA et Mananara."'
                    : '"The origin of our products is carefully monitored, from the production areas of northern Madagascar, particularly the SAVA region and Mananara."'}
                </p>
              </div>
            </RevealOnScroll>

            {/* Certifications */}
            <RevealOnScroll delay={0.4}>
              <div>
                <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4">
                  {lang === 'fr' ? 'Certifications' : 'Certifications'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['REX', lang === 'fr' ? 'Agrément Export' : 'Export License', lang === 'fr' ? 'Consommabilité' : 'Consumability'].map((cert) => (
                    <span
                      key={cert}
                      className="text-[10px] tracking-wider border border-gold/20 text-gold/60 px-3 py-1"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: values grid */}
          <div className="space-y-4">
            {values.map((value, i) => (
              <RevealOnScroll key={value.id} delay={i * 0.07} direction="left">
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group flex items-start gap-6 p-6 border border-gold/10 hover:border-gold/30 transition-colors duration-300"
                >
                  <span className="text-gold/40 group-hover:text-gold text-2xl transition-colors duration-300 mt-0.5 flex-shrink-0">
                    {value.icon}
                  </span>
                  <div>
                    <h4 className="text-cream group-hover:text-gold text-sm tracking-wide font-medium mb-2 transition-colors duration-300">
                      {value.title[lang]}
                    </h4>
                    <p className="text-cream/40 text-sm leading-relaxed">{value.description[lang]}</p>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
