'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/store/language';
import { useCart } from '@/store/cart';
import { contact, products } from '@/lib/data';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SplitText from '@/components/ui/SplitText';
import MagneticButton from '@/components/ui/MagneticButton';

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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('sent');
  };

  const inputClass =
    'w-full bg-white/[0.03] border border-gold/15 focus:border-gold/40 text-cream placeholder:text-cream/20 px-5 py-3.5 text-sm outline-none transition-colors duration-300';

  return (
    <main className="min-h-screen bg-obsidian pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <RevealOnScroll>
            <span className="text-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-6">
              {tx.subtitle}
            </span>
          </RevealOnScroll>
          <SplitText
            text={tx.title}
            className="font-serif text-cream text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] mb-6"
            delay={0.1}
          />
          <RevealOnScroll delay={0.2}>
            <p className="text-cream/40 max-w-md text-sm leading-relaxed">{tx.desc}</p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
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
                    className="w-20 h-20 border border-gold/40 rotate-45 mb-8 flex items-center justify-center"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold -rotate-45">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <h3 className="font-serif text-gold text-3xl mb-4">{tx.success}</h3>
                  <p className="text-cream/40">{tx.successMsg}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RevealOnScroll>
                      <div>
                        <label className="text-cream/30 text-[10px] tracking-[0.3em] uppercase block mb-2">{tx.name}</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={inputClass}
                          placeholder="Jean Dupont"
                        />
                      </div>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.05}>
                      <div>
                        <label className="text-cream/30 text-[10px] tracking-[0.3em] uppercase block mb-2">{tx.company}</label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className={inputClass}
                          placeholder="Acme Corp"
                        />
                      </div>
                    </RevealOnScroll>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RevealOnScroll delay={0.07}>
                      <div>
                        <label className="text-cream/30 text-[10px] tracking-[0.3em] uppercase block mb-2">{tx.email}</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={inputClass}
                          placeholder="jean@example.com"
                        />
                      </div>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.09}>
                      <div>
                        <label className="text-cream/30 text-[10px] tracking-[0.3em] uppercase block mb-2">{tx.phone}</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={inputClass}
                          placeholder="+33 6 00 00 00 00"
                        />
                      </div>
                    </RevealOnScroll>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RevealOnScroll delay={0.11}>
                      <div>
                        <label className="text-cream/30 text-[10px] tracking-[0.3em] uppercase block mb-2">{tx.country}</label>
                        <input
                          type="text"
                          required
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          className={inputClass}
                          placeholder="France"
                        />
                      </div>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.13}>
                      <div>
                        <label className="text-cream/30 text-[10px] tracking-[0.3em] uppercase block mb-2">{tx.quantity}</label>
                        <input
                          type="text"
                          value={form.quantity}
                          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                          className={inputClass}
                          placeholder="ex: 10 kg"
                        />
                      </div>
                    </RevealOnScroll>
                  </div>

                  <RevealOnScroll delay={0.15}>
                    <div>
                      <label className="text-cream/30 text-[10px] tracking-[0.3em] uppercase block mb-2">{tx.product}</label>
                      <select
                        value={form.product}
                        onChange={(e) => setForm({ ...form, product: e.target.value })}
                        className={`${inputClass} appearance-none`}
                      >
                        <option value="">{tx.select}</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.slug}>
                            {p.name[lang]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </RevealOnScroll>

                  <RevealOnScroll delay={0.17}>
                    <div>
                      <label className="text-cream/30 text-[10px] tracking-[0.3em] uppercase block mb-2">{tx.message}</label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputClass} resize-none`}
                        placeholder={lang === 'fr' ? 'Vos besoins spécifiques, conditionnement souhaité...' : 'Your specific needs, desired packaging...'}
                      />
                    </div>
                  </RevealOnScroll>

                  <RevealOnScroll delay={0.19}>
                    <MagneticButton className="w-full md:w-auto">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-gold text-obsidian px-12 py-5 text-xs tracking-[0.3em] uppercase font-medium hover:bg-cream transition-colors duration-300 disabled:opacity-50"
                      >
                        {status === 'sending' ? tx.sending : tx.send}
                      </button>
                    </MagneticButton>
                  </RevealOnScroll>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div>
            <RevealOnScroll direction="left" delay={0.2}>
              <div className="space-y-8 sticky top-32">
                <div>
                  <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4">Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-cream/60 hover:text-gold text-sm transition-colors duration-300 break-all"
                  >
                    {contact.email}
                  </a>
                </div>

                <div>
                  <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4">
                    {lang === 'fr' ? 'Téléphone' : 'Phone'}
                  </p>
                  {contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="block text-cream/60 hover:text-gold text-sm transition-colors duration-300 mb-1"
                    >
                      {phone}
                    </a>
                  ))}
                </div>

                <div>
                  <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4">
                    {lang === 'fr' ? 'Origines' : 'Origins'}
                  </p>
                  {contact.regions[lang].map((region) => (
                    <p key={region} className="text-cream/40 text-sm mb-1">{region}</p>
                  ))}
                  <p className="text-cream/20 text-xs mt-2">Madagascar</p>
                </div>

                <div>
                  <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4">Facebook</p>
                  <p className="text-cream/40 text-sm">{contact.facebook}</p>
                </div>

                {/* Certif badges */}
                <div className="pt-4 border-t border-gold/10">
                  <p className="text-cream/20 text-[10px] tracking-wider mb-3">Certifié REX · Agrément Export</p>
                  <div className="flex gap-2">
                    {['REX', 'Export', 'Quality'].map((badge) => (
                      <span key={badge} className="text-[9px] tracking-wider border border-gold/15 text-gold/40 px-2 py-1">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </main>
  );
}
