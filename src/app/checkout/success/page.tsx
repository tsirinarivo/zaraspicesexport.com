'use client';
import { Suspense } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/store/language';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

function SuccessContent() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || `ZSE-${Math.floor(100000 + Math.random() * 900000).toString().slice(-4)}`;

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-28 pb-24 flex items-center justify-center">
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 40%, rgba(0,229,255,0.06) 0%, transparent 70%)',
        }}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="text-center max-w-md relative z-10 px-4"
      >
        {/* Check circle */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="w-24 h-24 rounded-full border-2 border-cyan-500 flex items-center justify-center"
              style={{ background: 'rgba(0,229,255,0.06)' }}
            >
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan-400"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </motion.svg>
            </motion.div>
            {/* Pulse ring */}
            <motion.div
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.4, repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-cyan-500/30"
            />
          </div>
        </motion.div>

        <motion.span
          variants={fadeUp}
          className="text-xs font-mono uppercase tracking-widest text-cyan-500 block mb-3"
        >
          {lang === 'fr' ? 'Merci pour votre commande' : 'Thank you for your order'}
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="font-display font-black text-[var(--text-primary)] text-4xl mb-4"
        >
          {lang === 'fr' ? 'Commande confirmée !' : 'Order confirmed!'}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="bg-[var(--surface)] border border-cyan-500/20 rounded-2xl px-6 py-4 mb-6 inline-block"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-1">
            {lang === 'fr' ? 'Numéro de commande' : 'Order number'}
          </p>
          <p className="text-cyan-400 font-display font-bold text-2xl">{orderNumber}</p>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8"
        >
          {lang === 'fr'
            ? "Un email de confirmation vous a été envoyé. Nous traiterons votre commande dès réception du virement bancaire et vous tiendrons informé de son avancement."
            : "A confirmation email has been sent to you. We will process your order upon receipt of the bank transfer and keep you informed of its progress."}
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-8 py-3.5 rounded-xl transition-colors duration-300 text-sm"
          >
            {lang === 'fr' ? 'Retour à la boutique' : 'Back to shop'}
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

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[var(--bg)] pt-28 pb-24 flex items-center justify-center">
          <div className="w-8 h-8 border border-cyan-500/30 rounded-full animate-spin border-t-cyan-500" />
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
