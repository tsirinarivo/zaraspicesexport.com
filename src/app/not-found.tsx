'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-display font-black text-cyan-500/10 text-[8rem] leading-none mb-4 select-none">404</p>
          <h1 className="font-display font-bold text-[var(--text-primary)] text-3xl mb-3">Page introuvable</h1>
          <p className="text-[var(--text-tertiary)] text-sm font-mono mb-10">Page not found</p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300 text-sm"
          >
            Retour à l&apos;accueil
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
