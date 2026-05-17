'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import { products } from '@/lib/data';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SplitText from '@/components/ui/SplitText';

export default function ProductsShowcase() {
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const featured = products.filter((p) => p.featured);

  return (
    <section className="bg-obsidian py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <RevealOnScroll>
              <span className="text-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-4">
                {lang === 'fr' ? 'Nos Produits' : 'Our Products'}
              </span>
            </RevealOnScroll>
            <SplitText
              text={lang === 'fr' ? 'Sélection Premium' : 'Premium Selection'}
              className="font-serif text-cream text-[clamp(2.5rem,5vw,4rem)] leading-[1.1]"
              delay={0.1}
            />
          </div>
          <RevealOnScroll delay={0.2}>
            <Link
              href="/products"
              className="group flex items-center gap-3 text-cream/40 hover:text-gold text-xs tracking-[0.3em] uppercase transition-colors duration-300"
            >
              {lang === 'fr' ? 'Voir tout' : 'View all'}
              <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
            </Link>
          </RevealOnScroll>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((product, i) => (
            <RevealOnScroll key={product.id} delay={i * 0.08}>
              <ProductCard product={product} lang={lang} onAddToCart={() => addItem(product)} index={i} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  lang,
  onAddToCart,
  index,
}: {
  product: (typeof products)[0];
  lang: 'fr' | 'en';
  onAddToCart: () => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 20 : -20, index % 2 === 0 ? -20 : 20]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="group relative bg-stone-950/50 border border-gold/10 hover:border-gold/30 transition-all duration-500 overflow-hidden cursor-pointer"
    >
      {/* Card visual */}
      <div className="relative h-64 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${product.gradient} opacity-80`} />

        {/* Emoji / icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-7xl opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
            style={{ filter: 'blur(0px)' }}
          >
            {product.emoji}
          </motion.span>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[9px] tracking-[0.3em] uppercase border border-gold/30 text-gold/70 px-2 py-1">
            {product.category}
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 right-4">
          <div className="text-right">
            {product.priceNote && (
              <span className="text-cream/30 text-[9px] tracking-wider block">
                {product.priceNote[lang]}
              </span>
            )}
            <span className="text-gold font-serif text-xl">{product.price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-cream text-xl mb-1 group-hover:text-gold transition-colors duration-300">
          {product.name[lang]}
        </h3>
        <p className="text-cream/30 text-xs tracking-wider mb-4">{product.tagline[lang]}</p>
        <p className="text-cream/50 text-sm leading-relaxed line-clamp-2 mb-6">
          {product.description[lang]}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onAddToCart}
            className="flex-1 bg-gold/10 hover:bg-gold text-gold hover:text-obsidian text-[10px] tracking-[0.2em] uppercase py-3 transition-all duration-300 border border-gold/20 hover:border-gold"
          >
            {lang === 'fr' ? 'Demander' : 'Inquire'}
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="w-10 h-10 border border-gold/20 hover:border-gold/60 flex items-center justify-center text-cream/40 hover:text-gold transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
