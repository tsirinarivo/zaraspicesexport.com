'use client';
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/store/language';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const SEGMENTS = [
  { id: 'vanilla', fr: 'Vanille', en: 'Vanilla', icon: '🌿' },
  { id: 'cacao', fr: 'Cacao', en: 'Cocoa', icon: '🍫' },
  { id: 'cloves', fr: 'Girofle', en: 'Cloves', icon: '🌺' },
  { id: 'all', fr: 'Toutes épices', en: 'All spices', icon: '📦' },
];

export default function NewsletterSection() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState<string[]>(['all']);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const toggleSegment = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, segments: selected }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="relative overflow-hidden py-24 bg-[var(--bg)]">
      {/* Decorative background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(163,255,18,0.04) 0%, transparent 65%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(163,255,18,1) 1px, transparent 1px), linear-gradient(90deg, rgba(163,255,18,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-10"
        >
          <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-[#a3ff12] block mb-3">
            {lang === 'fr' ? 'Restez informé' : 'Stay informed'}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">
            <span className="text-[var(--text-primary)]">
              {lang === 'fr' ? 'Alerte ' : 'Harvest '}
            </span>
            <span className="bg-gradient-to-r from-[#a3ff12] to-cyan-400 bg-clip-text text-transparent">
              {lang === 'fr' ? 'Récolte' : 'Alert'}
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-sm leading-relaxed">
            {lang === 'fr'
              ? 'Soyez le premier informé de la nouvelle récolte, des variations de prix et des stocks disponibles.'
              : 'Be the first to know about new harvests, price changes and available stock.'}
          </motion.p>
        </motion.div>

        {status === 'success' ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[rgba(163,255,18,0.06)] border border-[#a3ff12]/20 rounded-2xl p-8 text-center"
          >
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-[#a3ff12] font-display font-bold text-xl mb-2">
              {lang === 'fr' ? 'Vous êtes inscrit !' : 'You\'re subscribed!'}
            </p>
            <p className="text-[var(--text-secondary)] text-sm">
              {lang === 'fr'
                ? 'Vous recevrez nos alertes récolte en avant-première.'
                : 'You\'ll receive our harvest alerts first.'}
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
          >
            {/* Segment selector */}
            <div className="mb-6">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
                {lang === 'fr' ? 'Je suis intéressé par' : 'I\'m interested in'}
              </p>
              <div className="flex flex-wrap gap-2">
                {SEGMENTS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSegment(s.id)}
                    className={`flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl border transition-all duration-300 ${
                      selected.includes(s.id)
                        ? 'bg-[#a3ff12]/10 border-[#a3ff12]/40 text-[#a3ff12]'
                        : 'border-white/8 text-[var(--text-tertiary)] hover:border-white/20'
                    }`}
                  >
                    <span>{s.icon}</span>
                    {s[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Email input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={lang === 'fr' ? 'votre@email.com' : 'your@email.com'}
                required
                className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[#a3ff12]/40 transition-colors duration-300 font-mono"
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="bg-[#a3ff12] hover:bg-[#b8ff40] text-[#0a1628] font-semibold px-6 py-3 rounded-xl text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading'
                  ? '...'
                  : lang === 'fr'
                  ? 'S\'inscrire'
                  : 'Subscribe'}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-xs font-mono mt-3">
                {lang === 'fr' ? 'Une erreur est survenue. Réessayez.' : 'An error occurred. Please try again.'}
              </p>
            )}

            <p className="text-[var(--text-tertiary)] text-xs font-mono mt-4">
              {lang === 'fr'
                ? 'Pas de spam. Désinscription en un clic.'
                : 'No spam. Unsubscribe in one click.'}
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
