'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import type { Product } from '@/lib/data';
import { products } from '@/lib/data';
import RadarChart from '@/components/ui/RadarChart';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function ProductDetail({ product }: { product: Product }) {
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-[var(--text-tertiary)] text-xs font-mono">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            {lang === 'fr' ? 'Accueil' : 'Home'}
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-cyan-400 transition-colors">
            {lang === 'fr' ? 'Produits' : 'Products'}
          </Link>
          <span>/</span>
          <span className="text-cyan-400/60">{product.name[lang]}</span>
        </div>
      </div>

      {/* Hero section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="relative">
              <div className="relative aspect-square bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-colors duration-300">
                {/* Main emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-[10rem] opacity-15 select-none"
                    animate={{ scale: [1, 1.04, 1], rotate: [0, 1, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {product.emoji}
                  </motion.span>
                </div>

                {/* Subtle radial glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,229,255,0.05) 0%, transparent 70%)' }}
                />

                {/* Decorative corners */}
                <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-cyan-500/30" />
                <div className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-cyan-500/30" />

                {/* Category badge */}
                <div className="absolute top-5 right-5">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-500 bg-[var(--bg)]/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-cyan-500/20">
                    {product.category}
                  </span>
                </div>

                {/* Price */}
                <div className="absolute bottom-6 left-6">
                  {product.priceNote && (
                    <p className="text-[var(--text-tertiary)] text-[10px] font-mono tracking-wider mb-1">{product.priceNote[lang]}</p>
                  )}
                  <p className="font-display font-bold text-cyan-400 text-4xl">{product.price}</p>
                </div>
              </div>

              {/* Floating accent */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-20 h-20 border border-cyan-500/10 rounded-xl"
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Right: info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
              {lang === 'fr' ? 'Fiche Produit' : 'Product Sheet'}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] tracking-tight leading-[1.0] text-[var(--text-primary)] mb-2"
            >
              {product.name[lang]}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-cyan-400/70 text-sm font-mono mb-6">{product.tagline[lang]}</motion.p>

            <motion.p variants={fadeUp} className="text-[var(--text-secondary)] leading-relaxed mb-10">
              {product.description[lang]}
            </motion.p>

            {/* Specs table */}
            <motion.div variants={fadeUp} className="mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-4">
                {lang === 'fr' ? 'Caractéristiques' : 'Specifications'}
              </h3>
              <div className="border border-[var(--border)] rounded-2xl overflow-hidden">
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-5 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-[var(--text-tertiary)] text-xs">{spec.label[lang]}</span>
                    <span className="text-[var(--text-primary)] text-xs font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sensory radar */}
            <motion.div variants={fadeUp} className="mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-4">
                {lang === 'fr' ? 'Profil sensoriel' : 'Sensory profile'}
              </h3>
              <div className="flex gap-6 items-center">
                <div className="w-44 h-44 flex-shrink-0">
                  <RadarChart profile={product.sensoryProfile} color="#00e5ff" />
                </div>
                <div className="space-y-2 flex-1">
                  {[
                    { key: 'vanillin' as const, label: { fr: 'Vanilline', en: 'Vanillin' } },
                    { key: 'floral' as const, label: { fr: 'Floral', en: 'Floral' } },
                    { key: 'sweetness' as const, label: { fr: 'Douceur', en: 'Sweetness' } },
                    { key: 'richness' as const, label: { fr: 'Richesse', en: 'Richness' } },
                    { key: 'suppleness' as const, label: { fr: 'Souplesse', en: 'Suppleness' } },
                    { key: 'purity' as const, label: { fr: 'Pureté', en: 'Purity' } },
                  ].map((axis) => (
                    <div key={axis.key} className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest">{axis.label[lang]}</span>
                        <span className="text-[10px] font-mono text-cyan-400">{product.sensoryProfile[axis.key]}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${product.sensoryProfile[axis.key]}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-5">
              <span className="text-[var(--text-tertiary)] text-xs font-mono mr-2">
                {lang === 'fr' ? 'Certifié :' : 'Certified:'}
              </span>
              {['REX', lang === 'fr' ? 'Agrément Export' : 'Export License', 'Madagascar'].map((c) => (
                <span key={c} className="text-xs font-mono tracking-wider border border-cyan-500/20 text-cyan-400/60 px-2.5 py-1 rounded-lg">
                  {c}
                </span>
              ))}
            </motion.div>

            {/* Traceability */}
            {product.lot && (
              <motion.div variants={fadeUp} className="mb-10">
                <Link
                  href={`/trace/${encodeURIComponent(product.lot)}`}
                  className="inline-flex items-center gap-3 bg-[rgba(163,255,18,0.05)] border border-[#a3ff12]/20 hover:border-[#a3ff12]/40 rounded-xl px-4 py-3 transition-colors duration-300 group"
                >
                  <div className="relative">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-[#a3ff12]"
                      animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#a3ff12] uppercase tracking-widest">
                      {lang === 'fr' ? 'Traçabilité lot' : 'Lot traceability'}
                    </p>
                    <p className="text-[var(--text-tertiary)] text-xs font-mono">{product.lot} · {product.harvest}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a3ff12" strokeWidth="2" className="ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <button
                onClick={() => addItem(product)}
                className="group flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300 text-sm"
              >
                {lang === 'fr' ? 'Ajouter au Devis' : 'Add to Quote'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <Link
                href="/contact"
                className="flex items-center gap-3 border border-cyan-500/30 hover:border-cyan-500/60 text-[var(--text-secondary)] hover:text-white px-7 py-3.5 rounded-xl transition-all duration-300 text-sm"
              >
                {lang === 'fr' ? 'Nous Contacter' : 'Contact Us'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="border-t border-white/5 mt-20 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="font-display font-bold text-[var(--text-primary)] text-2xl mb-10"
            >
              {lang === 'fr' ? 'Produits similaires' : 'Related products'}
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {related.map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group block bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-colors duration-300"
                  >
                    <div className="h-36 bg-[var(--bg-secondary)] relative flex items-center justify-center">
                      <span className="text-5xl opacity-10 group-hover:opacity-25 transition-opacity duration-500 select-none">
                        {p.emoji}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors text-lg mb-1">
                        {p.name[lang]}
                      </h3>
                      <p className="text-cyan-400 text-sm font-mono">{p.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </main>
  );
}
