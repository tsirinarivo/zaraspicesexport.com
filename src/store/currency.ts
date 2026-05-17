'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Currency = 'EUR' | 'USD';

interface CurrencyStore {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggle: () => void;
  rate: number;
  convert: (amountEur: number) => number;
  format: (amountEur: number) => string;
}

export const useCurrency = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: 'EUR',
      rate: 1.08,
      setCurrency: (currency) => set({ currency }),
      toggle: () => set((s) => ({ currency: s.currency === 'EUR' ? 'USD' : 'EUR' })),
      convert: (amountEur) => {
        const { currency, rate } = get();
        return currency === 'EUR' ? amountEur : Math.round(amountEur * rate * 100) / 100;
      },
      format: (amountEur) => {
        const { currency, convert } = get();
        const amount = convert(amountEur);
        return currency === 'EUR'
          ? `€${amount.toFixed(2)}`
          : `$${amount.toFixed(2)}`;
      },
    }),
    { name: 'zara-currency' }
  )
);
