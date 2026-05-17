'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/store/cart';
import { useLanguage } from '@/store/language';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, totalWeight } = useCart();
  const { lang } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0d1f3c] border-l border-white/8 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div>
                <h2 className="font-display font-bold text-[var(--text-primary)] text-lg">
                  {lang === 'fr' ? 'Demande de devis' : 'Quote Request'}
                </h2>
                <p className="text-[var(--text-tertiary)] text-xs font-mono mt-1 tracking-wider">
                  {items.length} {lang === 'fr' ? 'produit(s)' : 'product(s)'}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-xl border border-white/8 hover:border-cyan-500/30 flex items-center justify-center text-[var(--text-secondary)] hover:text-cyan-400 transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 rounded-2xl border border-white/8 mx-auto mb-5 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-tertiary)]">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </div>
                  <p className="text-[var(--text-tertiary)] text-sm">
                    {lang === 'fr' ? 'Votre panier est vide' : 'Your cart is empty'}
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-start gap-4 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-cyan-500/20 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/5 border border-cyan-500/15 flex items-center justify-center text-2xl flex-shrink-0">
                      {item.product.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--text-primary)] text-sm font-medium truncate">
                        {item.product.name[lang]}
                      </p>
                      <p className="text-cyan-400 text-xs font-mono mt-1">{item.product.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          min="1"
                          value={item.weightKg}
                          className="w-16 bg-white/5 border border-white/8 text-[var(--text-primary)] text-xs px-2 py-1 rounded-lg focus:outline-none focus:border-cyan-500/40 transition-colors"
                          readOnly
                        />
                        <span className="text-[var(--text-tertiary)] text-xs">kg</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-[var(--text-tertiary)] hover:text-red-400 transition-colors mt-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[var(--text-tertiary)] text-xs font-mono uppercase tracking-wider">
                    {lang === 'fr' ? 'Poids total' : 'Total weight'}
                  </span>
                  <span className="text-cyan-400 text-sm font-medium font-mono">{totalWeight()} kg</span>
                </div>
                <Link
                  href="/contact"
                  onClick={closeCart}
                  className="block w-full bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] text-center text-sm font-semibold py-3.5 rounded-xl transition-colors duration-300"
                >
                  {lang === 'fr' ? 'Demander un devis' : 'Request a Quote'}
                </Link>
                <p className="text-[var(--text-tertiary)] text-xs text-center mt-3 font-mono">
                  {lang === 'fr'
                    ? 'Prix sur demande selon quantité'
                    : 'Pricing on request based on quantity'}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
