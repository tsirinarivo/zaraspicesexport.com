'use client';
import { useCurrency } from '@/store/currency';

export default function CurrencyToggle({ className = '' }: { className?: string }) {
  const { currency, toggle } = useCurrency();
  return (
    <button
      onClick={toggle}
      className={`text-xs font-mono border border-white/8 rounded-lg px-2.5 py-1 transition-colors duration-300 ${
        currency === 'EUR'
          ? 'text-cyan-400 border-cyan-500/30'
          : 'text-[#a3ff12] border-[#a3ff12]/30'
      } hover:border-current ${className}`}
    >
      {currency === 'EUR' ? '€ EUR' : '$ USD'}
    </button>
  );
}
