'use client';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ScrollProgress from '@/components/ui/ScrollProgress';

/**
 * Renders the public site chrome (navbar, footer, cart, etc.) for normal
 * pages, but gets out of the way on /admin so the dashboard is standalone.
 */
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      {children}
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
}
