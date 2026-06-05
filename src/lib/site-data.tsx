'use client';
import { createContext, useContext } from 'react';
import { products as defaultProducts, type Product } from '@/lib/data';
import { defaultContent, type SiteContent } from '@/lib/content';

/**
 * Makes the store-backed products + editable text available to client
 * components without prop-drilling. The root layout reads the data on the
 * server and seeds this provider, so admin edits appear live on next request.
 * Falls back to the static defaults if used outside a provider.
 */

interface SiteData {
  products: Product[];
  content: SiteContent;
}

const SiteDataContext = createContext<SiteData>({
  products: defaultProducts,
  content: defaultContent,
});

export function SiteDataProvider({
  products,
  content,
  children,
}: SiteData & { children: React.ReactNode }) {
  return (
    <SiteDataContext.Provider value={{ products, content }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useProducts(): Product[] {
  return useContext(SiteDataContext).products;
}

export function useSiteContent(): SiteContent {
  return useContext(SiteDataContext).content;
}
