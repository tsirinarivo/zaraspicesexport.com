'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { services } from '@/lib/data';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SplitText from '@/components/ui/SplitText';

export default function ServicesSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative bg-obsidian py-32 overflow-hidden">
      {/* Center line */}
      <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <RevealOnScroll>
            <span className="text-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-6">
              {lang === 'fr' ? 'Nos Services' : 'Our Services'}
            </span>
          </RevealOnScroll>
          <SplitText
            text={lang === 'fr' ? 'Livraison & Expédition' : 'Delivery & Shipping'}
            className="font-serif text-cream text-[clamp(2rem,4vw,3.5rem)] leading-tight"
            delay={0.1}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <RevealOnScroll key={service.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative p-8 border border-gold/10 hover:border-gold/30 transition-colors duration-500 text-center"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gold/30 group-hover:w-24 group-hover:bg-gold/60 transition-all duration-500" />

                {/* Icon */}
                <div className="w-14 h-14 border border-gold/20 group-hover:border-gold/50 flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <span className="text-gold/60 group-hover:text-gold text-xl font-light transition-colors duration-300">
                    {service.icon}
                  </span>
                </div>

                <h3 className="font-serif text-cream group-hover:text-gold text-xl mb-4 transition-colors duration-300">
                  {service.title[lang]}
                </h3>
                <p className="text-cream/40 text-sm leading-relaxed">{service.description[lang]}</p>

                {/* Bottom number */}
                <div className="absolute bottom-6 right-6 font-serif text-6xl text-gold/5 group-hover:text-gold/10 transition-colors duration-300 leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
