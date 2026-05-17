'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-serif text-gold/20 text-[8rem] leading-none mb-4">404</p>
          <h1 className="font-serif text-cream text-3xl mb-4">Page introuvable</h1>
          <p className="text-cream/30 text-sm mb-10">Page not found</p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-gold text-obsidian px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-cream transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
