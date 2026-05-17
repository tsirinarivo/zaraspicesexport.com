'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import { products } from '@/lib/data';
import type { Product } from '@/lib/data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
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
    { id: 'spices', label: 'Épices' },
  ],
  en: [
    { id: 'all', label: 'All' },
    { id: 'vanilla', label: 'Vanilla' },
    { id: 'derivatives', label: 'Derivatives' },
    { id: 'spices', label: 'Spices' },
  ],
};

export default function ProductsPage() {
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
              {lang === 'fr' ? 'Notre Catalogue' : 'Our Catalogue'}
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display font-black text-[clamp(3rem,7vw,6rem)] tracking-tight leading-[0.9] mb-5">
              <span className="text-[var(--text-primary)]">
                {lang === 'fr' ? 'Produits ' : 'Malagasy '}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {lang === 'fr' ? 'Malagasy' : 'Products'}
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[var(--text-secondary)] max-w-xl text-base leading-relaxed">
              {lang === 'fr'
                ? 'Vanille de qualité premium, caviar de vanille, poudre et épices rares — sélectionnés avec exigence depuis Madagascar.'
                : 'Premium quality vanilla, vanilla caviar, powder and rare spices — rigorously selected from Madagascar.'}
            </motion.p>
          </motion.div>
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
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <FullProductCard product={product} lang={lang} onAddToCart={() => addItem(product)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-14 h-14 rounded-2xl border border-white/8 mx-auto mb-5" />
            <p className="text-[var(--text-tertiary)]">{lang === 'fr' ? 'Aucun produit trouvé' : 'No products found'}</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 max-w-2xl mx-auto text-center hover:border-cyan-500/20 transition-colors duration-300"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
            {lang === 'fr' ? 'Commande personnalisée' : 'Custom order'}
          </span>
          <h3 className="font-display font-bold text-[var(--text-primary)] text-2xl mb-4">
            {lang === 'fr' ? "Besoin d'un produit spécifique ?" : 'Need a specific product?'}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm mb-8 leading-relaxed">
            {lang === 'fr'
              ? "Nous travaillons aussi avec le cacao, le girofle, la cannelle et d'autres épices malagasy. Contactez-nous pour toute demande spéciale."
              : 'We also work with cocoa, cloves, cinnamon and other Malagasy spices. Contact us for any special requests.'}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300 text-sm"
          >
            {lang === 'fr' ? 'Nous Contacter' : 'Contact Us'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

function FullProductCard({
  product,
  lang,
  onAddToCart,
}: {
  product: Product;
  lang: 'fr' | 'en';
  onAddToCart: () => void;
}) {
  return (
    <div className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-colors duration-300">
      {/* Visual */}
      <div className="relative h-52 overflow-hidden rounded-t-2xl bg-[var(--bg-secondary)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl opacity-10 group-hover:opacity-25 group-hover:scale-110 transition-all duration-700 select-none">
            {product.emoji}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-500 bg-[var(--bg)]/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-cyan-500/20">
            {product.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 text-right">
          {product.priceNote && (
            <p className="text-[var(--text-tertiary)] text-[10px] font-mono tracking-wider">{product.priceNote[lang]}</p>
          )}
          <p className="text-cyan-400 font-display font-bold text-2xl">{product.price}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-display font-bold text-[var(--text-primary)] group-hover:text-cyan-400 text-xl mb-1 transition-colors duration-300">
          {product.name[lang]}
        </h3>
        <p className="text-[var(--text-tertiary)] text-xs font-mono mb-3">{product.tagline[lang]}</p>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5 line-clamp-2">
          {product.description[lang]}
        </p>

        {/* Specs preview */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {product.specs.slice(0, 4).map((spec) => (
            <div key={spec.label.en} className="bg-white/[0.03] border border-white/5 rounded-xl px-3 py-2">
              <p className="text-[var(--text-tertiary)] text-[10px] font-mono tracking-wider">{spec.label[lang]}</p>
              <p className="text-[var(--text-secondary)] text-xs mt-0.5">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onAddToCart}
            className="flex-1 border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-widest py-3 rounded-xl transition-all duration-300"
          >
            {lang === 'fr' ? 'Demander un devis' : 'Request a quote'}
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="w-11 h-11 border border-[var(--border)] hover:border-cyan-500/30 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-cyan-400 transition-all duration-300"
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
