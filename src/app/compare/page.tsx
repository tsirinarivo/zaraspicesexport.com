'use client';
import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/store/language';
import { useCurrency } from '@/store/currency';
import type { Product } from '@/lib/data';
import { useProducts } from '@/lib/site-data';
import RadarChart from '@/components/ui/RadarChart';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const CHART_COLORS = ['#00e5ff', '#a3ff12', '#ff6b35'];

export default function ComparePage() {
  const { lang } = useLanguage();
  const { format } = useCurrency();
  const products = useProducts();
  const [selected, setSelected] = useState<string[]>(
    products.slice(0, 2).map((p) => p.id)
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.length > 1 ? prev.filter((x) => x !== id) : prev;
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const compared = products.filter((p) => selected.includes(p.id));

  const allSpecKeys = Array.from(
    new Set(compared.flatMap((p) => p.specs.map((s) => JSON.stringify(s.label))))
  ).map((k) => JSON.parse(k) as { fr: string; en: string });

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-24 pb-24">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
            {lang === 'fr' ? 'Comparateur' : 'Comparator'}
          </motion.span>
          <motion.h1 variants={fadeUp} className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] tracking-tight mb-4">
            <span className="text-[var(--text-primary)]">{lang === 'fr' ? 'Comparer ' : 'Compare '}</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {lang === 'fr' ? 'les produits' : 'products'}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-sm max-w-lg leading-relaxed">
            {lang === 'fr'
              ? 'Sélectionnez jusqu\'à 3 produits pour comparer leurs profils sensoriels et caractéristiques techniques.'
              : 'Select up to 3 products to compare their sensory profiles and technical specifications.'}
          </motion.p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product selector */}
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
            {lang === 'fr' ? 'Choisir les produits' : 'Select products'}
          </p>
          <div className="flex flex-wrap gap-3">
            {products.map((p) => {
              const idx = selected.indexOf(p.id);
              const active = idx !== -1;
              const color = active ? CHART_COLORS[idx] : undefined;
              return (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-mono transition-all duration-300"
                  style={{
                    borderColor: active ? `${color}50` : 'rgba(255,255,255,0.08)',
                    background: active ? `${color}10` : 'transparent',
                    color: active ? color : 'var(--text-secondary)',
                  }}
                >
                  <span>{p.emoji}</span>
                  {p.name[lang]}
                  {active && (
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {compared.length > 0 && (
            <motion.div
              key={selected.join(',')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Radar overlay */}
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-6">
                  {lang === 'fr' ? 'Profils sensoriels' : 'Sensory profiles'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Radar charts */}
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {compared.map((p, i) => (
                      <div key={p.id} className="flex flex-col items-center gap-3">
                        <div className="w-44 h-44">
                          <RadarChart profile={p.sensoryProfile} color={CHART_COLORS[i]} />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i] }} />
                          <span className="text-xs font-mono text-[var(--text-secondary)]">{p.name[lang]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Legend */}
                  <div className="space-y-2">
                    {[
                      { fr: 'Vanilline', en: 'Vanillin' },
                      { fr: 'Floral', en: 'Floral' },
                      { fr: 'Douceur', en: 'Sweetness' },
                      { fr: 'Richesse', en: 'Richness' },
                      { fr: 'Souplesse', en: 'Suppleness' },
                      { fr: 'Pureté', en: 'Purity' },
                    ].map((axis) => (
                      <div key={axis.en} className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[var(--text-tertiary)]">{axis[lang]}</span>
                        <div className="flex gap-2">
                          {compared.map((p, i) => {
                            const val = p.sensoryProfile[axis.en.toLowerCase() as keyof typeof p.sensoryProfile];
                            return (
                              <span key={p.id} style={{ color: CHART_COLORS[i] }}>{val}</span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spec comparison table */}
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left px-5 py-4 text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] w-1/4">
                          {lang === 'fr' ? 'Caractéristique' : 'Specification'}
                        </th>
                        {compared.map((p, i) => (
                          <th key={p.id} className="px-5 py-4 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-2xl">{p.emoji}</span>
                              <span className="text-sm font-display font-bold" style={{ color: CHART_COLORS[i] }}>
                                {p.name[lang]}
                              </span>
                              <span className="text-lg font-display font-black text-[var(--text-primary)]">
                                {format(p.priceEur)}/kg
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allSpecKeys.map((specLabel, ri) => (
                        <tr key={ri} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-3 text-xs text-[var(--text-tertiary)] font-mono">
                            {specLabel[lang]}
                          </td>
                          {compared.map((p) => {
                            const spec = p.specs.find((s) => s.label.fr === specLabel.fr);
                            return (
                              <td key={p.id} className="px-5 py-3 text-xs text-[var(--text-primary)] text-center">
                                {spec?.value ?? <span className="text-white/20">—</span>}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      {/* Price row */}
                      <tr className="bg-white/[0.02]">
                        <td className="px-5 py-4 text-xs text-cyan-400 font-mono font-semibold">
                          {lang === 'fr' ? 'Prix / kg' : 'Price / kg'}
                        </td>
                        {compared.map((p, i) => (
                          <td key={p.id} className="px-5 py-4 text-center">
                            <span className="font-display font-bold text-base" style={{ color: CHART_COLORS[i] }}>
                              {format(p.priceEur)}
                            </span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {compared.map((p, i) => (
                  <div key={p.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: CHART_COLORS[i] }} />
                      <span className="text-sm font-display font-semibold text-[var(--text-primary)]">{p.name[lang]}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${p.slug}`}
                        className="flex-1 text-center border border-cyan-500/30 hover:border-cyan-500 text-[var(--text-secondary)] hover:text-white rounded-xl py-2 text-xs font-mono transition-all duration-300"
                      >
                        {lang === 'fr' ? 'Voir →' : 'View →'}
                      </Link>
                      <Link
                        href="/shop"
                        className="flex-1 text-center bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold rounded-xl py-2 text-xs transition-colors duration-300"
                      >
                        {lang === 'fr' ? 'Commander' : 'Order'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
