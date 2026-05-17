'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/data';

export interface CartItem {
  product: Product;
  quantity: number;
  weightKg: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, weightKg?: number) => void;
  removeItem: (productId: string) => void;
  updateWeight: (productId: string, weightKg: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalWeight: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, weightKg = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1, weightKg: i.weightKg + weightKg }
                : i
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1, weightKg }] });
        }
        set({ isOpen: true });
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.product.id !== productId) }),
      updateWeight: (productId, weightKg) =>
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, weightKg } : i
          ),
        }),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      totalWeight: () => get().items.reduce((acc, i) => acc + i.weightKg, 0),
    }),
    { name: 'zara-cart' }
  )
);
