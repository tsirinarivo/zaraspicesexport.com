'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import { useCurrency } from '@/store/currency';
import { products } from '@/lib/data';
import type { Product } from '@/lib/data';
import CurrencyToggle from '@/components/ui/CurrencyToggle';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const categories = {
  fr: [
    { id: 'all', label: 'Tous' },
    { id: 'vanilla', label: 'Vanille' },
    { id: 'derivatives', label: 'Dérivés' },
  ],
  en: [
    { id: 'all', label: 'All' },
    { id: 'vanilla', label: 'Vanilla' },
    { id: 'derivatives', label: 'Derivatives' },
  ],
};

const B2B_TIERS = {
  fr: [
    { range: '< 5 kg', label: 'Retail', desc: 'Prix public', discount: 0, color: '#00e5ff' },
    { range: '5 – 50 kg', label: 'Professionnel', desc: '–15% sur le prix public', discount: 0.15, color: '#a3ff12' },
    { range: '> 50 kg', label: 'Wholesale', desc: 'Prix négocié — nous contacter', discount: null, color: '#ff6b35' },
  ],
  en: [
    { range: '< 5 kg', label: 'Retail', desc: 'Public price', discount: 0, color: '#00e5ff' },
    { range: '5 – 50 kg', label: 'Professional', desc: '–15% off public price', discount: 0.15, color: '#a3ff12' },
    { range: '> 50 kg', label: 'Wholesale', desc: 'Negotiated price — contact us', discount: null, color: '#ff6b35' },
  ],
};

export default function ShopPage() {
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const { format } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTier, setActiveTier] = useState<number>(0);

  const tiers = B2B_TIERS[lang];
  const tierDiscount = tiers[activeTier].discount;

  const filtered =
    activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 30% 50%, rgba(0,229,255,0.06) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-16">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.span
                variants={fadeUp}
                className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3"
              >
                {lang === 'fr' ? 'Boutique en ligne' : 'Online Shop'}
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="font-display font-black text-[clamp(3rem,7vw,6rem)] tracking-tight leading-[0.9] mb-5"
              >
                <span className="text-[var(--text-primary)]">
                  {lang === 'fr' ? 'Notre ' : 'Our '}
                </span>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {lang === 'fr' ? 'Boutique' : 'Shop'}
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-[var(--text-secondary)] max-w-xl text-base leading-relaxed"
              >
                {lang === 'fr'
                  ? 'Commandez directement nos vanilles premium de Madagascar. Livraison internationale assurée.'
                  : 'Order our premium Madagascar vanilla directly. International shipping guaranteed.'}
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 pt-4"
            >
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest">
                {lang === 'fr' ? 'Devise' : 'Currency'}
              </span>
              <CurrencyToggle />
            </motion.div>
          </div>
        </div>
      </section>

      {/* B2B Tiers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
          {lang === 'fr' ? 'Tarification selon volume' : 'Volume pricing'}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {tiers.map((tier, i) => (
            <button
              key={i}
              onClick={() => {
                if (tier.discount !== null) setActiveTier(i);
              }}
              className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                activeTier === i
                  ? 'border-opacity-40'
                  : 'border-white/8 hover:border-white/15'
              }`}
              style={activeTier === i ? { borderColor: `${tier.color}40`, background: `${tier.color}06` } : {}}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: tier.color }} />
                <span className="text-xs font-mono font-semibold" style={{ color: tier.color }}>{tier.label}</span>
              </div>
              <p className="text-[var(--text-primary)] text-xs font-mono font-bold">{tier.range}</p>
              <p className="text-[var(--text-tertiary)] text-[10px] font-mono mt-0.5">{tier.desc}</p>
            </button>
          ))}
        </div>
        {activeTier === 2 && (
          <div className="mt-3 bg-[rgba(255,107,53,0.06)] border border-[#ff6b35]/20 rounded-xl p-3 flex items-center justify-between">
            <p className="text-sm text-[var(--text-secondary)]">
              {lang === 'fr' ? 'Pour > 50 kg, contactez-nous pour un devis personnalisé.' : 'For > 50 kg, contact us for a custom quote.'}
            </p>
            <a
              href="mailto:zaraspicesexport@gmail.com?subject=Devis wholesale"
              className="flex-shrink-0 bg-[#ff6b35] hover:bg-[#ff8555] text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors duration-300"
            >
              {lang === 'fr' ? 'Demander →' : 'Request →'}
            </a>
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories[lang].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-mono uppercase tracking-widest px-5 py-2.5 rounded-xl border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-[#0a1628] border-cyan-500 font-semibold'
                  : 'border-white/8 text-[var(--text-secondary)] hover:border-cyan-500/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <ShopProductCard
                  product={product}
                  lang={lang}
                  format={format}
                  discount={tierDiscount ?? 0}
                  onAddToCart={(weightKg) => addItem(product, weightKg)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-14 h-14 rounded-2xl border border-white/8 mx-auto mb-5" />
            <p className="text-[var(--text-tertiary)]">
              {lang === 'fr' ? 'Aucun produit trouvé' : 'No products found'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function ShopProductCard({
  product,
  lang,
  format,
  discount,
  onAddToCart,
}: {
  product: Product;
  lang: 'fr' | 'en';
  format: (amountEur: number) => string;
  discount: number;
  onAddToCart: (weightKg: number) => void;
}) {
  const [weightKg, setWeightKg] = useState(1);
  const discountedPrice = product.priceEur * (1 - discount);

  const adjustWeight = (delta: number) => {
    setWeightKg((prev) => Math.max(0.5, Math.round((prev + delta) * 10) / 10));
  };

  return (
    <div className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-colors duration-300 flex flex-col">
      {/* Visual */}
      <div className="relative h-44 bg-[var(--bg-secondary)] flex items-center justify-center overflow-hidden">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(0,229,255,0.06)' }}
        >
          <span className="text-4xl select-none">{product.emoji}</span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-500 bg-[var(--bg)]/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-cyan-500/20">
            {product.category}
          </span>
        </div>
        {discount > 0 && (
          <div className="absolute top-4 right-4">
            <span className="text-xs font-mono font-bold bg-[#a3ff12] text-[#0a1628] px-2 py-1 rounded-lg">
              -{Math.round(discount * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="font-display font-bold text-[var(--text-primary)] group-hover:text-cyan-400 text-xl mb-1 transition-colors duration-300">
            {product.name[lang]}
          </h3>
          <p className="text-[var(--text-tertiary)] text-xs font-mono">{product.tagline[lang]}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-cyan-400 font-display font-bold text-2xl">
            {format(discountedPrice)}
          </span>
          <span className="text-[var(--text-tertiary)] text-xs font-mono">/kg</span>
          {discount > 0 && (
            <span className="text-[var(--text-tertiary)] text-xs font-mono line-through">
              {format(product.priceEur)}
            </span>
          )}
        </div>

        {/* Weight control */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-2">
            {lang === 'fr' ? 'Quantité (kg)' : 'Quantity (kg)'}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => adjustWeight(-0.5)}
              className="w-9 h-9 rounded-xl border border-white/8 hover:border-cyan-500/30 text-[var(--text-secondary)] hover:text-cyan-400 transition-all duration-300 flex items-center justify-center font-mono text-lg leading-none"
            >
              −
            </button>
            <div className="flex-1 text-center bg-white/5 border border-white/8 rounded-xl py-2 text-sm font-mono text-[var(--text-primary)]">
              {weightKg} kg
            </div>
            <button
              onClick={() => adjustWeight(0.5)}
              className="w-9 h-9 rounded-xl border border-white/8 hover:border-cyan-500/30 text-[var(--text-secondary)] hover:text-cyan-400 transition-all duration-300 flex items-center justify-center font-mono text-lg leading-none"
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="text-sm text-[var(--text-secondary)]">
          {lang === 'fr' ? 'Sous-total' : 'Subtotal'}:{' '}
          <span className="text-[var(--text-primary)] font-semibold">
            {format(discountedPrice * weightKg)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={() => onAddToCart(weightKg)}
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold rounded-xl px-6 py-3 text-sm transition-colors duration-300"
          >
            {lang === 'fr' ? 'Ajouter au panier' : 'Add to cart'}
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="px-4 py-3 border border-cyan-500/30 hover:border-cyan-500 text-[var(--text-secondary)] hover:text-white rounded-xl transition-all duration-300 text-sm whitespace-nowrap"
          >
            {lang === 'fr' ? 'Détails →' : 'Details →'}
          </Link>
        </div>
      </div>
    </div>
  );
}
