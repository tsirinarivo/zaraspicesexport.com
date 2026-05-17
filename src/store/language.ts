'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '@/lib/data';

interface LanguageStore {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      lang: 'fr',
      setLang: (lang) => set({ lang }),
      toggle: () => set({ lang: get().lang === 'fr' ? 'en' : 'fr' }),
    }),
    { name: 'zara-lang' }
  )
);
