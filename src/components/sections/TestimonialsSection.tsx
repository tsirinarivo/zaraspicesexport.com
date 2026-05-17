'use client';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const clients = [
  { name: 'Chocolaterie Valrhona', type: { fr: 'Chocolatier, France', en: 'Chocolatier, France' }, flag: '🇫🇷' },
  { name: 'Pacific Spice Co.', type: { fr: 'Distributeur, USA', en: 'Distributor, USA' }, flag: '🇺🇸' },
  { name: 'Maison Ladurée', type: { fr: 'Pâtisserie, France', en: 'Pastry house, France' }, flag: '🇫🇷' },
  { name: 'Tokyo Confections', type: { fr: 'Confiseur, Japon', en: 'Confectioner, Japan' }, flag: '🇯🇵' },
  { name: 'Nordic Foods Group', type: { fr: 'Agroalimentaire, Suède', en: 'Food industry, Sweden' }, flag: '🇸🇪' },
  { name: 'Gourmet Arabia', type: { fr: 'Distribution, UAE', en: 'Distribution, UAE' }, flag: '🇦🇪' },
  { name: 'Artisan Extracts', type: { fr: 'Extraction, Canada', en: 'Extraction, Canada' }, flag: '🇨🇦' },
  { name: 'La Belle Épicerie', type: { fr: 'Épicerie fine, Belgique', en: 'Fine foods, Belgium' }, flag: '🇧🇪' },
];

const testimonials = [
  {
    quote: {
      fr: 'La vanille Gourmet de Zara a transformé notre ganache signature. Un profil aromatique que nous ne trouvons nulle part ailleurs.',
      en: 'Zara\'s Gourmet vanilla transformed our signature ganache. An aromatic profile we find nowhere else.',
    },
    author: 'Chef Patissier',
    company: 'Chocolaterie Valrhona',
    country: '🇫🇷',
  },
  {
    quote: {
      fr: 'Traçabilité exemplaire, conditionnement impeccable. Nos clients exigent la qualité — Zara nous permet de la garantir.',
      en: 'Exemplary traceability, impeccable packaging. Our clients demand quality — Zara lets us guarantee it.',
    },
    author: 'Responsable Achats',
    company: 'Pacific Spice Co.',
    country: '🇺🇸',
  },
  {
    quote: {
      fr: 'Nous sourçons auprès de Zara depuis 3 ans. La consistance lot après lot est remarquable pour une origine naturelle.',
      en: 'We\'ve sourced from Zara for 3 years. The batch-to-batch consistency is remarkable for a natural origin.',
    },
    author: 'Head of Procurement',
    company: 'Nordic Foods Group',
    country: '🇸🇪' ,
  },
];

function ClientLogo({ client }: { client: typeof clients[0] }) {
  const { lang } = useLanguage();
  return (
    <div className="flex-shrink-0 mx-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-5 py-3 flex items-center gap-3 hover:border-cyan-500/20 transition-colors duration-300">
      <span className="text-xl">{client.flag}</span>
      <div>
        <p className="text-sm font-display font-semibold text-[var(--text-primary)] whitespace-nowrap">{client.name}</p>
        <p className="text-xs font-mono text-[var(--text-tertiary)] whitespace-nowrap">{client.type[lang]}</p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative overflow-hidden py-28 bg-[var(--bg)]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,229,255,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center"
        >
          <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
            {lang === 'fr' ? 'Ils nous font confiance' : 'They trust us'}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
            <span className="text-[var(--text-primary)]">{lang === 'fr' ? 'Nos ' : 'Our '}</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {lang === 'fr' ? 'partenaires' : 'partners'}
            </span>
          </motion.h2>
        </motion.div>
      </div>

      {/* Scrolling logos row 1 */}
      <div className="relative overflow-hidden mb-4">
        <div className="flex gap-0" style={{ animation: 'marquee 30s linear infinite' }}>
          {[...clients, ...clients].map((c, i) => (
            <ClientLogo key={i} client={c} />
          ))}
        </div>
      </div>

      {/* Scrolling logos row 2 (reverse) */}
      <div className="relative overflow-hidden mb-16">
        <div className="flex gap-0" style={{ animation: 'marquee-reverse 25s linear infinite' }}>
          {[...clients.slice(4), ...clients.slice(0, 4), ...clients.slice(4), ...clients.slice(0, 4)].map((c, i) => (
            <ClientLogo key={i} client={c} />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-cyan-500/15 transition-colors duration-300 flex flex-col"
            >
              <div className="text-cyan-500/40 text-4xl font-serif leading-none mb-4">"</div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-6">
                {t.quote[lang]}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <span className="text-2xl">{t.country}</span>
                <div>
                  <p className="text-[var(--text-primary)] text-sm font-semibold">{t.author}</p>
                  <p className="text-cyan-400/60 text-xs font-mono">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
