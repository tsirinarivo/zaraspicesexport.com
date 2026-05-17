'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import { useCurrency } from '@/store/currency';
import CurrencyToggle from '@/components/ui/CurrencyToggle';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function CartPage() {
  const { lang } = useLanguage();
  const { items, removeItem, updateWeight, totalItems, totalWeight, totalPrice } = useCart();
  const { format } = useCurrency();

  const count = totalItems();

  if (count === 0) {
    return (
      <main className="min-h-screen bg-[var(--bg)] pt-28 pb-24 flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-md"
        >
          <motion.div
            variants={fadeUp}
            className="w-24 h-24 mx-auto mb-8 rounded-2xl border border-white/8 flex items-center justify-center"
            style={{ background: 'rgba(0,229,255,0.04)' }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[var(--text-tertiary)]"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </motion.div>
          <motion.span
            variants={fadeUp}
            className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3"
          >
            {lang === 'fr' ? 'Panier vide' : 'Empty cart'}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold text-[var(--text-primary)] text-3xl mb-4"
          >
            {lang === 'fr' ? 'Votre panier est vide' : 'Your cart is empty'}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-[var(--text-secondary)] text-sm mb-8 leading-relaxed"
          >
            {lang === 'fr'
              ? 'Découvrez notre sélection de vanilles premium de Madagascar.'
              : 'Discover our selection of premium Madagascar vanilla.'}
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300 text-sm"
            >
              {lang === 'fr' ? 'Découvrir la boutique' : 'Explore the shop'}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-2">
              {lang === 'fr' ? 'Votre Panier' : 'Your Cart'}
            </span>
            <h1 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-[0.95]">
              <span className="text-[var(--text-primary)]">
                {lang === 'fr' ? 'Panier' : 'Cart'}{' '}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ({count})
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest">
              {lang === 'fr' ? 'Devise' : 'Currency'}
            </span>
            <CurrencyToggle />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex flex-col gap-4"
            >
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  variants={fadeUp}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-cyan-500/20 transition-colors duration-300"
                >
                  <div className="flex gap-5 flex-wrap">
                    {/* Emoji */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(0,229,255,0.06)' }}
                    >
                      <span className="text-3xl">{item.product.emoji}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <h3 className="font-display font-bold text-[var(--text-primary)] text-lg">
                            {item.product.name[lang]}
                          </h3>
                          <p className="text-[var(--text-tertiary)] text-xs font-mono mt-0.5">
                            {item.product.tagline[lang]}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="w-8 h-8 rounded-xl border border-white/8 hover:border-red-500/40 text-[var(--text-tertiary)] hover:text-red-400 transition-all duration-300 flex items-center justify-center text-sm flex-shrink-0"
                          aria-label="Remove item"
                        >
                          ×
                        </button>
                      </div>

                      {/* Price per kg */}
                      <p className="text-sm text-[var(--text-secondary)] mt-2">
                        {format(item.priceEur)}{' '}
                        <span className="text-[var(--text-tertiary)] font-mono text-xs">/kg</span>
                      </p>

                      {/* Weight controls */}
                      <div className="flex items-center gap-3 mt-4 flex-wrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateWeight(item.product.id, item.weightKg - 0.5)}
                            className="w-8 h-8 rounded-xl border border-white/8 hover:border-cyan-500/30 text-[var(--text-secondary)] hover:text-cyan-400 transition-all duration-300 flex items-center justify-center font-mono"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min={0.5}
                            step={0.5}
                            value={item.weightKg}
                            onChange={(e) =>
                              updateWeight(item.product.id, parseFloat(e.target.value) || 0.5)
                            }
                            className="w-20 text-center bg-white/5 border border-white/8 focus:border-cyan-500/40 rounded-xl py-1.5 text-sm font-mono text-[var(--text-primary)] outline-none transition-colors duration-300"
                          />
                          <span className="text-xs font-mono text-[var(--text-tertiary)]">kg</span>
                          <button
                            onClick={() => updateWeight(item.product.id, item.weightKg + 0.5)}
                            className="w-8 h-8 rounded-xl border border-white/8 hover:border-cyan-500/30 text-[var(--text-secondary)] hover:text-cyan-400 transition-all duration-300 flex items-center justify-center font-mono"
                          >
                            +
                          </button>
                        </div>

                        {/* Line subtotal */}
                        <div className="ml-auto text-right">
                          <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                            {lang === 'fr' ? 'Sous-total' : 'Subtotal'}
                          </p>
                          <p className="text-cyan-400 font-display font-bold text-xl">
                            {format(item.priceEur * item.weightKg)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-cyan-400 transition-colors duration-300"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {lang === 'fr' ? 'Continuer vos achats' : 'Continue shopping'}
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 lg:sticky lg:top-28">
              <h2 className="font-display font-bold text-[var(--text-primary)] text-xl mb-6">
                {lang === 'fr' ? 'Récapitulatif' : 'Summary'}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">
                    {lang === 'fr' ? 'Poids total' : 'Total weight'}
                  </span>
                  <span className="font-mono text-[var(--text-primary)]">
                    {totalWeight().toFixed(1)} kg
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">
                    {lang === 'fr' ? 'Nombre d\'articles' : 'Items'}
                  </span>
                  <span className="font-mono text-[var(--text-primary)]">{count}</span>
                </div>
                <div className="border-t border-white/8 pt-4 flex items-center justify-between">
                  <span className="text-[var(--text-primary)] font-semibold">
                    {lang === 'fr' ? 'Total' : 'Total'}
                  </span>
                  <span className="text-cyan-400 font-display font-bold text-2xl">
                    {format(totalPrice())}
                  </span>
                </div>
              </div>

              <p className="text-xs font-mono text-[var(--text-tertiary)] mb-6 leading-relaxed">
                {lang === 'fr'
                  ? 'Frais de livraison calculés au checkout'
                  : 'Shipping costs calculated at checkout'}
              </p>

              <Link
                href="/checkout"
                className="w-full block text-center bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold rounded-xl px-6 py-3.5 transition-colors duration-300 text-sm"
              >
                {lang === 'fr' ? 'Procéder au paiement' : 'Proceed to checkout'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
