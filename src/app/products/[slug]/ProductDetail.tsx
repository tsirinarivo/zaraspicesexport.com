'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import type { Product } from '@/lib/data';
import { products } from '@/lib/data';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SplitText from '@/components/ui/SplitText';
import MagneticButton from '@/components/ui/MagneticButton';

export default function ProductDetail({ product }: { product: Product }) {
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <main className="min-h-screen bg-obsidian pt-24">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-3 text-cream/30 text-xs tracking-wider">
          <Link href="/" className="hover:text-gold transition-colors">
            {lang === 'fr' ? 'Accueil' : 'Home'}
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold transition-colors">
            {lang === 'fr' ? 'Produits' : 'Products'}
          </Link>
          <span>/</span>
          <span className="text-gold/60">{product.name[lang]}</span>
        </div>
      </div>

      {/* Hero section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: visual */}
          <RevealOnScroll direction="right">
            <div className="relative">
              <div className={`relative aspect-square bg-gradient-to-b ${product.gradient} border border-gold/10 overflow-hidden`}>
                {/* Main emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-[12rem] opacity-25"
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {product.emoji}
                  </motion.span>
                </div>

                {/* Decorative */}
                <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/30" />
                <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/30" />

                {/* Category */}
                <div className="absolute top-6 right-6">
                  <span className="text-[9px] tracking-[0.3em] uppercase border border-gold/30 text-gold/70 px-3 py-1">
                    {product.category}
                  </span>
                </div>

                {/* Price */}
                <div className="absolute bottom-8 left-8">
                  {product.priceNote && (
                    <p className="text-cream/30 text-[10px] tracking-wider mb-1">{product.priceNote[lang]}</p>
                  )}
                  <p className="font-serif text-gold text-4xl">{product.price}</p>
                </div>
              </div>

              {/* Floating accent */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/20"
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </RevealOnScroll>

          {/* Right: info */}
          <div>
            <RevealOnScroll>
              <span className="text-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-4">
                {lang === 'fr' ? 'Fiche Produit' : 'Product Sheet'}
              </span>
            </RevealOnScroll>

            <SplitText
              text={product.name[lang]}
              className="font-serif text-cream text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] mb-2"
              delay={0.1}
            />

            <RevealOnScroll delay={0.15}>
              <p className="text-gold/70 text-sm tracking-wider mb-6">{product.tagline[lang]}</p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-cream/50 leading-relaxed mb-10 text-base">
                {product.description[lang]}
              </p>
            </RevealOnScroll>

            {/* Specs table */}
            <RevealOnScroll delay={0.25}>
              <div className="mb-10">
                <h3 className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4">
                  {lang === 'fr' ? 'Caractéristiques' : 'Specifications'}
                </h3>
                <div className="space-y-0 border border-gold/10">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-5 py-3 border-b border-gold/10 last:border-b-0 hover:bg-gold/[0.03] transition-colors"
                    >
                      <span className="text-cream/40 text-xs tracking-wide">{spec.label[lang]}</span>
                      <span className="text-cream/80 text-xs font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Certifications */}
            <RevealOnScroll delay={0.3}>
              <div className="flex flex-wrap gap-2 mb-10">
                <span className="text-cream/20 text-[10px] tracking-wider mr-2">
                  {lang === 'fr' ? 'Certifié :' : 'Certified:'}
                </span>
                {['REX', lang === 'fr' ? 'Agrément Export' : 'Export License', 'Madagascar'].map((c) => (
                  <span key={c} className="text-[9px] tracking-wider border border-gold/20 text-gold/50 px-2 py-1">
                    {c}
                  </span>
                ))}
              </div>
            </RevealOnScroll>

            {/* Actions */}
            <RevealOnScroll delay={0.35}>
              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <button
                    onClick={() => addItem(product)}
                    className="group flex items-center gap-4 bg-gold text-obsidian px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-cream transition-colors duration-300"
                  >
                    {lang === 'fr' ? 'Ajouter au Devis' : 'Add to Quote'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </MagneticButton>

                <MagneticButton>
                  <Link
                    href="/contact"
                    className="flex items-center gap-4 border border-gold/30 hover:border-gold text-cream/60 hover:text-gold px-8 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-300"
                  >
                    {lang === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                  </Link>
                </MagneticButton>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="border-t border-gold/10 mt-24 py-24">
          <div className="container mx-auto px-6">
            <RevealOnScroll>
              <h2 className="font-serif text-cream text-3xl mb-12">
                {lang === 'fr' ? 'Produits similaires' : 'Related products'}
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <RevealOnScroll key={p.id} delay={i * 0.08}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group block border border-gold/10 hover:border-gold/30 transition-colors duration-300 overflow-hidden"
                  >
                    <div className={`h-40 bg-gradient-to-b ${p.gradient} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                          {p.emoji}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-cream group-hover:text-gold transition-colors text-xl mb-1">
                        {p.name[lang]}
                      </h3>
                      <p className="text-gold text-sm">{p.price}</p>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
