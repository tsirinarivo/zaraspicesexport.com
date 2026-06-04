import Hero from '@/components/sections/Hero';
import HorizontalProducts from '@/components/sections/HorizontalProducts';
import ProductsShowcase from '@/components/sections/ProductsShowcase';
import AboutSection from '@/components/sections/AboutSection';
import BiodiversitySection from '@/components/sections/BiodiversitySection';
import ServicesSection from '@/components/sections/ServicesSection';
import OriginSection from '@/components/sections/OriginSection';
import CTASection from '@/components/sections/CTASection';
import ProcessSection from '@/components/sections/ProcessSection';
import HarvestCalendar from '@/components/sections/HarvestCalendar';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HorizontalProducts />
      <ProductsShowcase />
      <BiodiversitySection />
      <ProcessSection />
      <HarvestCalendar />
      <AboutSection />
      <CertificationsSection />
      <ServicesSection />
      <OriginSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </main>
  );
}
