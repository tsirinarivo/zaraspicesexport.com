'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import { useCurrency } from '@/store/currency';
import CurrencyToggle from '@/components/ui/CurrencyToggle';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const countries = [
  'France',
  'Madagascar',
  'USA',
  'UK',
  'Germany',
  'Italy',
  'Spain',
  'Belgium',
  'Switzerland',
  'Canada',
  'Australia',
  'Japan',
  'UAE',
  'Autres',
];

interface CustomerForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  country: string;
  notes: string;
}

const initialForm: CustomerForm = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  postalCode: '',
  country: 'France',
  notes: '',
};

const stepLabels = {
  fr: ['Récapitulatif', 'Informations', 'Paiement'],
  en: ['Summary', 'Information', 'Payment'],
};

export default function CheckoutPage() {
  const { lang } = useLanguage();
  const { items, totalPrice, clearCart } = useCart();
  const { format, currency } = useCurrency();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CustomerForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const updateField = (field: keyof CustomerForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            productId: i.product.id,
            productName: i.product.name[lang],
            weightKg: i.weightKg,
            priceEur: i.priceEur,
            subtotal: i.priceEur * i.weightKg,
          })),
          total: totalPrice(),
          currency,
        }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        router.push(`/checkout/success?order=${data.orderNumber}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-white/5 border border-white/8 focus:border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-colors duration-300';

  const labels = stepLabels[lang];

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-2">
              {lang === 'fr' ? 'Finaliser la commande' : 'Complete your order'}
            </span>
            <h1 className="font-display font-bold text-[var(--text-primary)] text-3xl">
              {lang === 'fr' ? 'Checkout' : 'Checkout'}
            </h1>
          </div>
          <CurrencyToggle />
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-10">
          {labels.map((label, i) => {
            const num = i + 1;
            const isActive = step === num;
            const isCompleted = step > num;
            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                      isCompleted
                        ? 'bg-cyan-500 text-[#0a1628]'
                        : isActive
                        ? 'border-2 border-cyan-500 text-cyan-400'
                        : 'border border-white/20 text-[var(--text-tertiary)]'
                    }`}
                  >
                    {isCompleted ? '✓' : num}
                  </div>
                  <span
                    className={`text-xs font-mono hidden sm:block ${
                      isActive
                        ? 'text-[var(--text-primary)]'
                        : isCompleted
                        ? 'text-cyan-400'
                        : 'text-[var(--text-tertiary)]'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < labels.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 transition-all duration-300 ${
                      isCompleted ? 'bg-cyan-500/50' : 'bg-white/8'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1 — Summary */}
        {step === 1 && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <h2 className="font-display font-bold text-[var(--text-primary)] text-xl mb-6">
                {lang === 'fr' ? 'Récapitulatif de la commande' : 'Order summary'}
              </h2>
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[var(--text-tertiary)] text-sm mb-4">
                    {lang === 'fr' ? 'Votre panier est vide.' : 'Your cart is empty.'}
                  </p>
                  <Link
                    href="/shop"
                    className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                  >
                    {lang === 'fr' ? '← Retour à la boutique' : '← Back to shop'}
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(0,229,255,0.06)' }}
                      >
                        <span className="text-2xl">{item.product.emoji}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[var(--text-primary)] text-sm">
                          {item.product.name[lang]}
                        </p>
                        <p className="text-xs font-mono text-[var(--text-tertiary)] mt-0.5">
                          {item.weightKg} kg × {format(item.priceEur)}/kg
                        </p>
                      </div>
                      <span className="text-cyan-400 font-display font-bold">
                        {format(item.priceEur * item.weightKg)}
                      </span>
                    </div>
                  ))}

                  <div className="pt-4 flex items-center justify-between">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {lang === 'fr' ? 'Total' : 'Total'}
                    </span>
                    <span className="text-cyan-400 font-display font-bold text-2xl">
                      {format(totalPrice())}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold rounded-xl px-8 py-3.5 transition-colors duration-300 text-sm"
                >
                  {lang === 'fr' ? 'Continuer' : 'Continue'} →
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2 — Customer info */}
        {step === 2 && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <h2 className="font-display font-bold text-[var(--text-primary)] text-xl mb-6">
                {lang === 'fr' ? 'Informations client' : 'Customer information'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">
                    {lang === 'fr' ? 'Prénom *' : 'First name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    placeholder={lang === 'fr' ? 'Jean' : 'John'}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">
                    {lang === 'fr' ? 'Nom *' : 'Last name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    placeholder={lang === 'fr' ? 'Dupont' : 'Smith'}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">
                    {lang === 'fr' ? 'Email *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="contact@example.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">
                    {lang === 'fr' ? 'Société' : 'Company'}
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    placeholder={lang === 'fr' ? 'Optionnel' : 'Optional'}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">
                    {lang === 'fr' ? 'Téléphone' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+33 6 00 00 00 00"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">
                    {lang === 'fr' ? 'Adresse *' : 'Address *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.address1}
                    onChange={(e) => updateField('address1', e.target.value)}
                    placeholder={lang === 'fr' ? '123 rue de la Paix' : '123 Main Street'}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">
                    {lang === 'fr' ? 'Adresse ligne 2' : 'Address line 2'}
                  </label>
                  <input
                    type="text"
                    value={form.address2}
                    onChange={(e) => updateField('address2', e.target.value)}
                    placeholder={lang === 'fr' ? 'Bâtiment, appartement... (optionnel)' : 'Building, apt... (optional)'}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">
                    {lang === 'fr' ? 'Ville *' : 'City *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="Paris"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">
                    {lang === 'fr' ? 'Code postal *' : 'Postal code *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.postalCode}
                    onChange={(e) => updateField('postalCode', e.target.value)}
                    placeholder="75001"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">
                    {lang === 'fr' ? 'Pays *' : 'Country *'}
                  </label>
                  <select
                    required
                    value={form.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    className={inputClass}
                  >
                    {countries.map((c) => (
                      <option key={c} value={c} className="bg-[#0d1f3c]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2">
                    {lang === 'fr' ? 'Notes commande' : 'Order notes'}
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    placeholder={
                      lang === 'fr'
                        ? 'Instructions spéciales, demandes particulières...'
                        : 'Special instructions, specific requests...'
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-2"
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
                {lang === 'fr' ? 'Retour' : 'Back'}
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.firstName || !form.lastName || !form.email || !form.address1 || !form.city || !form.postalCode}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#0a1628] font-semibold rounded-xl px-8 py-3.5 transition-colors duration-300 text-sm"
              >
                {lang === 'fr' ? 'Continuer' : 'Continue'} →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 — Payment */}
        {step === 3 && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            {/* Order summary (read-only) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <h2 className="font-display font-bold text-[var(--text-primary)] text-xl mb-6">
                {lang === 'fr' ? 'Résumé de la commande' : 'Order summary'}
              </h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <span className="text-xl">{item.product.emoji}</span>
                    <span className="flex-1 text-sm text-[var(--text-secondary)]">
                      {item.product.name[lang]} — {item.weightKg} kg
                    </span>
                    <span className="text-[var(--text-primary)] font-mono text-sm">
                      {format(item.priceEur * item.weightKg)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-white/8 pt-3 flex justify-between">
                  <span className="font-semibold text-[var(--text-primary)]">Total</span>
                  <span className="text-cyan-400 font-display font-bold text-xl">
                    {format(totalPrice())}
                  </span>
                </div>
              </div>
            </div>

            {/* Bank transfer info */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(0,229,255,0.06)' }}
                >
                  <span className="text-xl">🏦</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-[var(--text-primary)] text-lg">
                    {lang === 'fr' ? 'Paiement par virement bancaire' : 'Bank transfer payment'}
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-tertiary)]">
                    {lang === 'fr'
                      ? 'Votre commande sera traitée après réception du virement'
                      : 'Your order will be processed upon receipt of payment'}
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-2 text-sm font-mono">
                <div className="flex gap-3">
                  <span className="text-[var(--text-tertiary)] w-32 flex-shrink-0">
                    {lang === 'fr' ? 'Bénéficiaire' : 'Beneficiary'}
                  </span>
                  <span className="text-[var(--text-primary)]">ZARA SPICES EXPORT</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[var(--text-tertiary)] w-32 flex-shrink-0">IBAN</span>
                  <span className="text-[var(--text-secondary)] italic">
                    {lang === 'fr' ? 'À compléter' : 'To be completed'}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[var(--text-tertiary)] w-32 flex-shrink-0">
                    {lang === 'fr' ? 'Référence' : 'Reference'}
                  </span>
                  <span className="text-cyan-400">
                    {lang === 'fr'
                      ? 'Numéro de commande (envoyé par email)'
                      : 'Order number (sent by email)'}
                  </span>
                </div>
              </div>

              <p className="text-xs font-mono text-amber-400/70 mt-4 border border-amber-500/20 rounded-xl px-3 py-2 bg-amber-500/5">
                ℹ {lang === 'fr' ? 'Intégration Stripe à venir' : 'Stripe integration coming soon'}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-2"
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
                {lang === 'fr' ? 'Retour' : 'Back'}
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-70 disabled:cursor-not-allowed text-[#0a1628] font-semibold rounded-xl px-8 py-3.5 transition-colors duration-300 text-sm flex items-center gap-2"
              >
                {loading && (
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0110 10" />
                  </svg>
                )}
                {lang === 'fr' ? 'Confirmer la commande' : 'Confirm order'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
