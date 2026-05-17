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
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-obsidian border-l border-gold/10 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gold/10">
              <div>
                <h2 className="font-serif text-gold text-xl">
                  {lang === 'fr' ? 'Demande de devis' : 'Quote Request'}
                </h2>
                <p className="text-cream/30 text-xs mt-1 tracking-wider">
                  {items.length} {lang === 'fr' ? 'produit(s)' : 'product(s)'}
                </p>
              </div>
              <button onClick={closeCart} className="text-cream/40 hover:text-gold transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 border border-gold/20 rotate-45 mx-auto mb-6" />
                  <p className="text-cream/30 text-sm">
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
                    className="flex items-start gap-4 p-4 border border-gold/10 hover:border-gold/20 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 flex items-center justify-center text-2xl flex-shrink-0">
                      {item.product.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-cream text-sm font-medium truncate">
                        {item.product.name[lang]}
                      </p>
                      <p className="text-gold text-xs mt-1">{item.product.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          min="1"
                          value={item.weightKg}
                          className="w-16 bg-white/5 border border-gold/20 text-cream text-xs px-2 py-1 focus:outline-none focus:border-gold/40"
                          readOnly
                        />
                        <span className="text-cream/30 text-xs">kg</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-cream/20 hover:text-red-400 transition-colors mt-1"
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
              <div className="px-8 py-6 border-t border-gold/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-cream/40 text-xs tracking-wider uppercase">
                    {lang === 'fr' ? 'Poids total' : 'Total weight'}
                  </span>
                  <span className="text-gold text-sm font-medium">{totalWeight()} kg</span>
                </div>
                <Link
                  href="/contact"
                  onClick={closeCart}
                  className="block w-full bg-gold text-obsidian text-center text-xs tracking-[0.2em] uppercase font-medium py-4 hover:bg-gold/90 transition-colors"
                >
                  {lang === 'fr' ? 'Demander un devis' : 'Request a Quote'}
                </Link>
                <p className="text-cream/20 text-xs text-center mt-3">
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
