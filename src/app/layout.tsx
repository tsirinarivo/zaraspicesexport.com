import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import GrainOverlay from '@/components/ui/GrainOverlay';
import CustomCursor from '@/components/ui/CustomCursor';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zara Spices Export — Pure Malagasy Excellence',
  description:
    'Exportation de vanille et épices rares de Madagascar. Vanille TK, Gourmet, Pompona, Caviar de Vanille. From the source to the world.',
  keywords: ['vanilla madagascar', 'vanille malagasy', 'spices export', 'vanilla beans', 'zara spices'],
  openGraph: {
    title: 'Zara Spices Export — Pure Malagasy Excellence',
    description: 'Premium Malagasy vanilla and spices. From the source to the world.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-cream antialiased cursor-none">
        <SmoothScroll>
          <GrainOverlay />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
        </SmoothScroll>
      </body>
    </html>
  );
}
