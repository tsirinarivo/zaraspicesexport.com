'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import Link from 'next/link';
import { useProducts } from '@/lib/site-data';
import { useLanguage } from '@/store/language';
import { useCurrency } from '@/store/currency';

export default function HorizontalProducts() {
  const { lang } = useLanguage();
  const products = useProducts();
  const { format } = useCurrency();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Hide cards first, then reveal with stagger when section enters view
      gsap.set('.hprod-card', { autoAlpha: 0, y: 40 });
      gsap.to('.hprod-card', {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 85%',
          once: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        ScrollTrigger.getAll()
          .filter((t) => t.trigger === wrapper)
          .forEach((t) => t.kill());
      };
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="relative overflow-hidden">
      {/* Section header — visible above the pinned area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex items-end justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
            {lang === 'fr' ? 'Notre catalogue' : 'Our catalogue'}
          </p>
          <h2 className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] tracking-tight text-[var(--text-primary)]">
            {lang === 'fr' ? 'Nos Produits' : 'Our Products'}
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden md:flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
        >
          {lang === 'fr' ? 'Voir tout' : 'View all'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Horizontal scroll track */}
      <div className="flex items-center h-[70vh]" style={{ willChange: 'transform' }}>
        <div
          ref={trackRef}
          className="flex gap-6 px-[max(2rem,calc((100vw-80rem)/2))] py-4"
          style={{ width: 'max-content' }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="hprod-card group flex-none w-[320px] rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-500 bg-[var(--surface)]"
            >
              {/* Card gradient top */}
              <div
                className={`h-48 bg-gradient-to-br ${product.gradient} relative overflow-hidden`}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center text-7xl opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                >
                  {product.emoji}
                </div>
                {/* Accent glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${product.accentColor}, transparent 70%)`,
                  }}
                />
                {/* Lot badge */}
                {product.lot && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-cyan-300">{product.lot.split('-').slice(-1)[0]}</span>
                  </div>
                )}
              </div>

              {/* Card content */}
              <div className="p-6">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-1">
                  {product.tagline[lang]}
                </p>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2 group-hover:text-cyan-300 transition-colors">
                  {product.name[lang]}
                </h3>
                <p className="text-[var(--text-tertiary)] text-sm leading-relaxed line-clamp-2 mb-4">
                  {product.description[lang]}
                </p>

                {/* Sensory mini-bars — top 2 axes */}
                <div className="space-y-1.5 mb-4">
                  {[
                    { key: 'vanillin', label: lang === 'fr' ? 'Vanilline' : 'Vanillin' },
                    { key: 'richness', label: lang === 'fr' ? 'Richesse' : 'Richness' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] w-16 shrink-0">{label}</span>
                      <div className="flex-1 h-0.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${product.sensoryProfile[key as keyof typeof product.sensoryProfile]}%`,
                            background: `linear-gradient(to right, ${product.accentColor}, ${product.accentColor}88)`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] w-6 text-right">
                        {product.sensoryProfile[key as keyof typeof product.sensoryProfile]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-xl" style={{ color: product.accentColor }}>
                    {format(product.priceEur)}
                    <span className="text-xs font-normal text-[var(--text-tertiary)] ml-1">/kg</span>
                  </span>
                  <span className="text-xs text-cyan-400 group-hover:gap-2 flex items-center gap-1 transition-all">
                    {lang === 'fr' ? 'Voir' : 'View'}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* End card — CTA */}
          <div className="hprod-card flex-none w-[280px] rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              {lang === 'fr' ? 'Besoin d\'une sélection sur mesure?' : 'Need a custom selection?'}
            </p>
            <Link
              href="/contact"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 px-4 py-2 rounded-lg transition-all"
            >
              {lang === 'fr' ? 'Nous contacter' : 'Contact us'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
