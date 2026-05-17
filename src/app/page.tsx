import Hero from '@/components/sections/Hero';
import ProductsShowcase from '@/components/sections/ProductsShowcase';
import AboutSection from '@/components/sections/AboutSection';
import BiodiversitySection from '@/components/sections/BiodiversitySection';
import ServicesSection from '@/components/sections/ServicesSection';
import OriginSection from '@/components/sections/OriginSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProductsShowcase />
      <BiodiversitySection />
      <AboutSection />
      <ServicesSection />
      <OriginSection />
      <CTASection />
    </main>
  );
}
