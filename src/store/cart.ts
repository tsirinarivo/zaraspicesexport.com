'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/data';

const priceBySlug: Record<string, number> = {
  'vanille-tk': 86,
  'vanille-gourmet': 96,
  'vanille-pompona': 96,
  'caviar-vanille': 240,
  'poudre-vanille': 75,
};

function extractPrice(product: Product): number {
  if (product.priceEur) return product.priceEur;
  const match = product.price.match(/(\d+)/);
  if (match) return parseInt(match[1], 10);
  return priceBySlug[product.slug] ?? 0;
}

export interface CartItem {
  product: Product;
  quantity: number;
  weightKg: number;
  priceEur: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, weightKg?: number) => void;
  removeItem: (productId: string) => void;
  updateWeight: (productId: string, weightKg: number) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalWeight: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, weightKg = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);
        const priceEur = extractPrice(product);
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1, weightKg: i.weightKg + weightKg }
                : i
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1, weightKg, priceEur }] });
        }
        set({ isOpen: true });
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.product.id !== productId) }),
      updateWeight: (productId, weightKg) =>
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, weightKg: Math.max(0.5, weightKg) } : i
          ),
        }),
      updateQuantity: (productId, qty) =>
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity: Math.max(1, qty) } : i
          ),
        }),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      totalWeight: () => get().items.reduce((acc, i) => acc + i.weightKg, 0),
      totalPrice: () =>
        get().items.reduce((acc, i) => acc + i.priceEur * i.weightKg, 0),
    }),
    { name: 'zara-cart' }
  )
);
