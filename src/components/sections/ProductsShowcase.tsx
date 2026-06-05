'use client';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import { useCurrency } from '@/store/currency';
import type { Product } from '@/lib/data';
import { useProducts } from '@/lib/site-data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function ProductsShowcase() {
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const { format } = useCurrency();
  const products = useProducts();
  const featured = products.filter((p) => p.featured);

  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0a1628, #0d1f3c, #0a1628)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
              {lang === 'fr' ? 'Nos Produits' : 'Our Products'}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight text-[var(--text-primary)]">
              {lang === 'fr' ? 'Sélection Premium' : 'Premium Selection'}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-sm mt-2 max-w-md leading-relaxed">
              {lang === 'fr'
                ? 'Vanilles et épices sélectionnées à la source, certifiées REX, livrables partout dans le monde.'
                : 'Vanillas and spices sourced directly, REX certified, deliverable worldwide.'}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-center gap-4"
          >
            <Link
              href="/compare"
              className="text-xs font-mono text-[var(--text-tertiary)] hover:text-[#a3ff12] transition-colors duration-300 border border-white/8 hover:border-[#a3ff12]/30 rounded-lg px-3 py-2"
            >
              {lang === 'fr' ? 'Comparer →' : 'Compare →'}
            </Link>
            <Link
              href="/products"
              className="group flex items-center gap-3 text-[var(--text-secondary)] hover:text-white text-sm font-medium transition-colors duration-300"
            >
              {lang === 'fr' ? 'Voir tout' : 'View all'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Product grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {featured.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard
                product={product}
                lang={lang}
                format={format}
                onAddToCart={() => addItem(product)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  lang,
  format,
  onAddToCart,
}: {
  product: Product;
  lang: 'fr' | 'en';
  format: (n: number) => string;
  onAddToCart: () => void;
}) {
  // Top 2 sensory axes for quick preview
  const profileEntries = Object.entries(product.sensoryProfile) as [string, number][];
  const top2 = [...profileEntries].sort((a, b) => b[1] - a[1]).slice(0, 2);
  const axisLabels: Record<string, { fr: string; en: string }> = {
    vanillin: { fr: 'Vanilline', en: 'Vanillin' },
    floral: { fr: 'Floral', en: 'Floral' },
    sweetness: { fr: 'Douceur', en: 'Sweetness' },
    richness: { fr: 'Richesse', en: 'Richness' },
    suppleness: { fr: 'Souplesse', en: 'Suppleness' },
    purity: { fr: 'Pureté', en: 'Purity' },
  };

  return (
    <div className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-colors duration-300">
      {/* Card visual */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl bg-[var(--bg-secondary)]">
        {/* Emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(0,229,255,0.06)' }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-4xl">{product.emoji}</span>
          </motion.div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-500 bg-[var(--bg)]/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-cyan-500/20">
            {product.category}
          </span>
        </div>

        {/* Trace beacon */}
        {product.lot && (
          <Link
            href={`/trace/${encodeURIComponent(product.lot)}`}
            className="absolute top-4 right-4 flex items-center gap-1.5 bg-[var(--bg)]/80 backdrop-blur-sm border border-[#a3ff12]/20 hover:border-[#a3ff12]/50 rounded-lg px-2 py-1 transition-colors duration-200 group/trace"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#a3ff12] flex-shrink-0"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[8px] font-mono text-[#a3ff12]/70 group-hover/trace:text-[#a3ff12] uppercase tracking-widest transition-colors">
              {lang === 'fr' ? 'Lot' : 'Lot'}
            </span>
          </Link>
        )}

        {/* Price */}
        <div className="absolute bottom-4 right-4 text-right">
          {product.priceNote && (
            <span className="text-[var(--text-tertiary)] text-[10px] tracking-wider block">
              {product.priceNote[lang]}
            </span>
          )}
          <span className="text-cyan-400 font-display font-bold text-lg">{format(product.priceEur)}/kg</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-[var(--text-primary)] text-base mb-1 group-hover:text-cyan-400 transition-colors duration-300">
          {product.name[lang]}
        </h3>
        <p className="text-[var(--text-tertiary)] text-xs font-mono mb-3">{product.tagline[lang]}</p>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2 mb-4">
          {product.description[lang]}
        </p>

        {/* Sensory highlights */}
        <div className="flex gap-2 mb-4">
          {top2.map(([key, val]) => (
            <div
              key={key}
              className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-2 py-1.5 text-center"
            >
              <p className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest leading-none mb-1">
                {axisLabels[key]?.[lang] ?? key}
              </p>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{ width: `${val}%` }}
                />
              </div>
              <p className="text-[9px] font-mono text-cyan-400 mt-0.5">{val}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onAddToCart}
            className="flex-1 border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-widest py-2.5 rounded-xl transition-all duration-300"
          >
            {lang === 'fr' ? 'Demander' : 'Inquire'}
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="w-10 h-10 border border-[var(--border)] hover:border-cyan-500/30 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-cyan-400 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
