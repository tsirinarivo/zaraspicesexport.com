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

export default function ShopPage() {
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const { format } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<string>('all');

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
  onAddToCart,
}: {
  product: Product;
  lang: 'fr' | 'en';
  format: (amountEur: number) => string;
  onAddToCart: (weightKg: number) => void;
}) {
  const [weightKg, setWeightKg] = useState(1);

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
            {format(product.priceEur)}
          </span>
          <span className="text-[var(--text-tertiary)] text-xs font-mono">/kg</span>
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
            {format(product.priceEur * weightKg)}
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
