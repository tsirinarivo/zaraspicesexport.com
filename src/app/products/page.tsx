'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import { products } from '@/lib/data';
import type { Product } from '@/lib/data';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SplitText from '@/components/ui/SplitText';
import MagneticButton from '@/components/ui/MagneticButton';

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
    <main className="min-h-screen bg-obsidian pt-32 pb-24">
      {/* Hero */}
      <div className="container mx-auto px-6 mb-20">
        <RevealOnScroll>
          <span className="text-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-6">
            {lang === 'fr' ? 'Notre Catalogue' : 'Our Catalogue'}
          </span>
        </RevealOnScroll>
        <SplitText
          text={lang === 'fr' ? 'Produits Malagasy' : 'Malagasy Products'}
          className="font-serif text-cream text-[clamp(3rem,7vw,6rem)] leading-[0.9] mb-6"
          delay={0.1}
        />
        <RevealOnScroll delay={0.2}>
          <p className="text-cream/40 max-w-xl text-sm leading-relaxed">
            {lang === 'fr'
              ? 'Vanille de qualité premium, caviar de vanille, poudre et épices rares — sélectionnés avec exigence depuis Madagascar.'
              : 'Premium quality vanilla, vanilla caviar, powder and rare spices — rigorously selected from Madagascar.'}
          </p>
        </RevealOnScroll>
      </div>

      {/* Filter tabs */}
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-wrap gap-2">
          {categories[lang].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gold text-obsidian border-gold'
                  : 'border-gold/20 text-cream/40 hover:border-gold/40 hover:text-cream'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <FullProductCard product={product} lang={lang} onAddToCart={() => addItem(product)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 border border-gold/20 rotate-45 mx-auto mb-6" />
            <p className="text-cream/30">{lang === 'fr' ? 'Aucun produit trouvé' : 'No products found'}</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 mt-24 text-center">
        <RevealOnScroll>
          <div className="border border-gold/10 p-12 max-w-2xl mx-auto">
            <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4">
              {lang === 'fr' ? 'Commande personnalisée' : 'Custom order'}
            </p>
            <h3 className="font-serif text-cream text-3xl mb-6">
              {lang === 'fr' ? 'Besoin d\'un produit spécifique ?' : 'Need a specific product?'}
            </h3>
            <p className="text-cream/40 text-sm mb-8">
              {lang === 'fr'
                ? 'Nous travaillons aussi avec le cacao, le girofle, la cannelle et d\'autres épices malagasy. Contactez-nous pour toute demande spéciale.'
                : 'We also work with cocoa, cloves, cinnamon and other Malagasy spices. Contact us for any special requests.'}
            </p>
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-gold text-obsidian px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-cream transition-colors"
              >
                {lang === 'fr' ? 'Nous Contacter' : 'Contact Us'}
              </Link>
            </MagneticButton>
          </div>
        </RevealOnScroll>
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
    <div className="group border border-gold/10 hover:border-gold/30 transition-all duration-500 overflow-hidden bg-stone-950/30">
      {/* Visual */}
      <div className="relative h-56 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${product.gradient}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700">
            {product.emoji}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="text-[9px] tracking-[0.3em] uppercase border border-gold/30 text-gold/70 px-2 py-1">
            {product.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 text-right">
          {product.priceNote && (
            <p className="text-cream/30 text-[9px] tracking-wider">{product.priceNote[lang]}</p>
          )}
          <p className="text-gold font-serif text-2xl">{product.price}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-serif text-cream group-hover:text-gold text-2xl mb-1 transition-colors duration-300">
          {product.name[lang]}
        </h3>
        <p className="text-gold/60 text-xs tracking-wider mb-3">{product.tagline[lang]}</p>
        <p className="text-cream/40 text-sm leading-relaxed mb-6 line-clamp-2">
          {product.description[lang]}
        </p>

        {/* Specs preview */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {product.specs.slice(0, 4).map((spec) => (
            <div key={spec.label.en} className="bg-white/[0.02] px-3 py-2">
              <p className="text-cream/30 text-[9px] tracking-wider">{spec.label[lang]}</p>
              <p className="text-cream/70 text-xs mt-0.5">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onAddToCart}
            className="flex-1 bg-gold/10 hover:bg-gold text-gold hover:text-obsidian py-3 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border border-gold/20 hover:border-gold"
          >
            {lang === 'fr' ? 'Demander un devis' : 'Request a quote'}
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="w-12 h-12 border border-gold/20 hover:border-gold/60 flex items-center justify-center text-cream/40 hover:text-gold transition-all duration-300"
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
