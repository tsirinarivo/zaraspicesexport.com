import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ScrollProgress from '@/components/ui/ScrollProgress';

const spaceGrotesk = Space_Grotesk({ variable: '--font-space-grotesk', subsets: ['latin'], display: 'swap' });
const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ variable: '--font-jetbrains', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Zara Spices Export — Pure Malagasy Excellence',
  description: 'Exportation de vanille et épices rares de Madagascar.',
  keywords: ['vanilla madagascar', 'vanille malagasy', 'spices export', 'vanilla beans', 'zara spices'],
  openGraph: {
    title: 'Zara Spices Export — Pure Malagasy Excellence',
    description: 'Premium Malagasy vanilla and spices. From the source to the world.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--text-primary)] antialiased">
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
