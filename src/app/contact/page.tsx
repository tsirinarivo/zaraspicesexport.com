'use client';
import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import { contact, products } from '@/lib/data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  quantity: string;
  message: string;
}

export default function ContactPage() {
  const { lang } = useLanguage();
  const { items } = useCart();
  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    product: items[0]?.product.slug || '',
    quantity: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const t = {
    fr: {
      title: 'Demande de Devis',
      subtitle: 'Contact',
      desc: 'Remplissez le formulaire ci-dessous pour obtenir un devis personnalisé. Nous vous répondons sous 48h.',
      name: 'Nom complet *',
      company: 'Société',
      email: 'Email *',
      phone: 'Téléphone',
      country: 'Pays *',
      product: 'Produit souhaité',
      quantity: 'Quantité estimée (kg)',
      message: 'Message complémentaire',
      send: 'Envoyer la demande',
      sending: 'Envoi en cours...',
      success: 'Demande envoyée avec succès !',
      successMsg: 'Nous vous répondrons dans les 48 heures.',
      error: 'Une erreur est survenue. Veuillez réessayer.',
      select: 'Sélectionner un produit',
    },
    en: {
      title: 'Quote Request',
      subtitle: 'Contact',
      desc: 'Fill in the form below to receive a personalized quote. We respond within 48 hours.',
      name: 'Full name *',
      company: 'Company',
      email: 'Email *',
      phone: 'Phone',
      country: 'Country *',
      product: 'Desired product',
      quantity: 'Estimated quantity (kg)',
      message: 'Additional message',
      send: 'Send request',
      sending: 'Sending...',
      success: 'Request sent successfully!',
      successMsg: 'We will respond within 48 hours.',
      error: 'An error occurred. Please try again.',
      select: 'Select a product',
    },
  };
  const tx = t[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full bg-white/5 border border-white/8 focus:border-cyan-500/40 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] px-5 py-3.5 text-sm outline-none transition-colors duration-300 rounded-xl';

  const labelClass = 'text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] block mb-2';

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3">
            {tx.subtitle}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[0.9] mb-5"
          >
            <span className="text-[var(--text-primary)]">
              {lang === 'fr' ? 'Demande de ' : 'Request a '}
            </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {lang === 'fr' ? 'Devis' : 'Quote'}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] max-w-md text-sm leading-relaxed">
            {tx.desc}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 rounded-2xl border border-cyan-500/40 mb-8 flex items-center justify-center bg-cyan-500/10"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <h3 className="font-display font-bold text-cyan-400 text-3xl mb-4">{tx.success}</h3>
                  <p className="text-[var(--text-secondary)]">{tx.successMsg}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{tx.name}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{tx.company}</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className={inputClass}
                        placeholder="Acme Corp"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{tx.email}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                        placeholder="jean@example.com"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{tx.phone}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                        placeholder="+33 6 00 00 00 00"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{tx.country}</label>
                      <input
                        type="text"
                        required
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className={inputClass}
                        placeholder="France"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{tx.quantity}</label>
                      <input
                        type="text"
                        value={form.quantity}
                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                        className={inputClass}
                        placeholder="ex: 10 kg"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label className={labelClass}>{tx.product}</label>
                    <select
                      value={form.product}
                      onChange={(e) => setForm({ ...form, product: e.target.value })}
                      className={`${inputClass} appearance-none bg-[#0d1f3c]`}
                    >
                      <option value="">{tx.select}</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.slug}>
                          {p.name[lang]}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label className={labelClass}>{tx.message}</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      placeholder={lang === 'fr' ? 'Vos besoins spécifiques, conditionnement souhaité...' : 'Your specific needs, desired packaging...'}
                    />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-10 py-4 rounded-xl transition-colors duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                          </svg>
                          {tx.sending}
                        </>
                      ) : (
                        <>
                          {tx.send}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="space-y-6 sticky top-28">
              <motion.div variants={fadeUp} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-cyan-500/20 transition-colors duration-300">
                <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[var(--text-secondary)] hover:text-white text-sm transition-colors duration-300 break-all"
                >
                  {contact.email}
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-cyan-500/20 transition-colors duration-300">
                <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">
                  {lang === 'fr' ? 'Téléphone' : 'Phone'}
                </p>
                {contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="block text-[var(--text-secondary)] hover:text-white text-sm transition-colors duration-300 mb-1.5 font-mono"
                  >
                    {phone}
                  </a>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-cyan-500/20 transition-colors duration-300">
                <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">
                  {lang === 'fr' ? 'Origines' : 'Origins'}
                </p>
                {contact.regions[lang].map((region) => (
                  <p key={region} className="text-[var(--text-secondary)] text-sm mb-1">{region}</p>
                ))}
                <p className="text-[var(--text-tertiary)] text-xs font-mono mt-2">Madagascar</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-cyan-500/20 transition-colors duration-300">
                <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">Facebook</p>
                <p className="text-[var(--text-secondary)] text-sm">{contact.facebook}</p>
              </motion.div>

              {/* Certif badges */}
              <motion.div variants={fadeUp} className="pt-2">
                <p className="text-[var(--text-tertiary)] text-[10px] font-mono tracking-wider mb-3">Certifié REX · Agrément Export</p>
                <div className="flex gap-2 flex-wrap">
                  {['REX', 'Export', 'Quality'].map((badge) => (
                    <span key={badge} className="text-xs font-mono tracking-wider border border-cyan-500/15 text-cyan-400/50 px-2.5 py-1 rounded-lg">
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
