'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SplitText from '@/components/ui/SplitText';

const regions = [
  { name: 'Région SAVA', sub: 'Sambava · Antalaha · Vohémar · Andapa', x: 72, y: 28 },
  { name: 'Mananara', sub: 'Analanjirofo', x: 68, y: 52 },
];

export default function OriginSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative bg-stone-950 py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: map visual */}
          <RevealOnScroll direction="right">
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              {/* Madagascar silhouette - SVG stylisé */}
              <div className="relative w-full h-full bg-stone-900/50 border border-gold/10 overflow-hidden">
                <svg viewBox="0 0 200 280" className="w-full h-full opacity-30" fill="none">
                  <path
                    d="M100 10 C120 15 140 30 145 60 C150 90 148 110 142 130 C136 150 130 165 125 185 C120 205 118 225 110 245 C102 265 90 270 80 255 C70 240 68 215 72 190 C76 165 72 145 68 120 C64 95 62 75 70 50 C78 25 80 5 100 10Z"
                    fill="rgba(200,169,110,0.15)"
                    stroke="rgba(200,169,110,0.3)"
                    strokeWidth="1"
                  />
                </svg>

                {/* Region markers */}
                {regions.map((region, i) => (
                  <motion.div
                    key={region.name}
                    className="absolute"
                    style={{ left: `${region.x}%`, top: `${region.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.2, type: 'spring' }}
                    viewport={{ once: true }}
                  >
                    {/* Pulse */}
                    <motion.div
                      className="absolute -inset-3 rounded-full border border-gold/30"
                      animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap">
                      <p className="text-gold text-[10px] font-medium tracking-wider">{region.name}</p>
                      <p className="text-cream/30 text-[9px]">{region.sub}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Frame decoration */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/30" />

                {/* Label */}
                <div className="absolute bottom-8 left-8">
                  <p className="text-cream/20 text-[9px] tracking-[0.4em] uppercase">Madagascar</p>
                  <p className="text-cream/10 text-[8px] tracking-wider">Indian Ocean</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right: text */}
          <div>
            <RevealOnScroll>
              <span className="text-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-6">
                {lang === 'fr' ? 'Traçabilité' : 'Traceability'}
              </span>
            </RevealOnScroll>

            <SplitText
              text={lang === 'fr' ? 'Origine Contrôlée' : 'Controlled Origin'}
              className="font-serif text-cream text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-8"
              delay={0.1}
            />

            <RevealOnScroll delay={0.2}>
              <p className="text-cream/50 leading-relaxed mb-8">
                {lang === 'fr'
                  ? 'L\'origine de nos produits est rigoureusement suivie, depuis les zones de production du nord de Madagascar, en particulier la région SAVA et Mananara (Analanjirofo). Chaque lot est traçable de la récolte à l\'expédition.'
                  : 'The origin of our products is carefully monitored, from the production areas of northern Madagascar, particularly the SAVA region and Mananara (Analanjirofo). Every batch is traceable from harvest to shipment.'}
              </p>
            </RevealOnScroll>

            <div className="space-y-4">
              {[
                { step: '01', label: lang === 'fr' ? 'Récolte locale' : 'Local harvest', desc: lang === 'fr' ? 'Région SAVA & Mananara' : 'SAVA Region & Mananara' },
                { step: '02', label: lang === 'fr' ? 'Préparation traditionnelle' : 'Traditional preparation', desc: lang === 'fr' ? 'Selon les savoir-faire locaux' : 'Following local know-how' },
                { step: '03', label: lang === 'fr' ? 'Contrôle qualité' : 'Quality control', desc: lang === 'fr' ? 'Analyses & certifications' : 'Analysis & certifications' },
                { step: '04', label: lang === 'fr' ? 'Expédition mondiale' : 'Global shipment', desc: lang === 'fr' ? 'Conditionnement sous vide' : 'Vacuum packed' },
              ].map((item, i) => (
                <RevealOnScroll key={item.step} delay={i * 0.08}>
                  <div className="flex items-center gap-6 group">
                    <span className="font-serif text-gold/20 group-hover:text-gold/50 text-2xl w-10 flex-shrink-0 transition-colors duration-300">
                      {item.step}
                    </span>
                    <div className="flex-1 flex items-center gap-4 py-3 border-b border-gold/10 group-hover:border-gold/20 transition-colors duration-300">
                      <div>
                        <p className="text-cream/70 text-sm font-medium group-hover:text-gold transition-colors duration-300">{item.label}</p>
                        <p className="text-cream/30 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
