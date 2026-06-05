'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { useLanguage } from '@/store/language';
import FloatingBotanicals from '@/components/ui/FloatingBotanicals';

export default function Hero() {
  const { lang } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Establish initial hidden states (GSAP owns this, not JSX)
      gsap.set('.hero-label', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-subtitle', { autoAlpha: 0, y: 20 });
      gsap.set('.hero-cta', { autoAlpha: 0, y: 16 });
      gsap.set('.hero-stat', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-scroll', { autoAlpha: 0 });
      gsap.set('.hero-word', { yPercent: 110 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-vline', { scaleY: 0, duration: 1.2, stagger: 0.15, transformOrigin: 'top center' })
        .to('.hero-label', { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.6')
        .from('.hero-hline', { scaleX: 0, duration: 0.5, stagger: 0.1, transformOrigin: 'left center' }, '-=0.3')
        .to('.hero-word', { yPercent: 0, duration: 0.7, stagger: 0.07, ease: 'power4.out' }, '-=0.3')
        .to('.hero-subtitle', { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('.hero-cta', { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
        .to('.hero-stat', { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
        .to('.hero-scroll', { autoAlpha: 1, duration: 0.6 }, '-=0.2');

      // Infinite bounce on scroll indicator
      gsap.to('.hero-scroll-line', {
        y: 8,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: tl.duration(),
      });
    },
    { scope: heroRef }
  );

  const titleWords =
    lang === 'fr'
      ? [
          { text: 'Épices', accent: false },
          { text: 'Malagasy', accent: true },
        ]
      : [
          { text: 'Spices', accent: false },
          { text: 'Malagasy', accent: true },
        ];

  return (
    <section ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 30% 50%, rgba(0,229,255,0.08) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)',
        }}
      />

      <FloatingBotanicals count={12} />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Animated vertical accent lines */}
      <div
        aria-hidden
        className="hero-vline absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
      />
      <div
        aria-hidden
        className="hero-vline absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20 w-full">
        <div className="max-w-4xl">
          {/* Label row */}
          <div className="hero-label flex items-center gap-3 mb-8">
            <div className="hero-hline w-8 h-px bg-cyan-500/60" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Madagascar · {lang === 'fr' ? 'Depuis 2017' : 'Since 2017'}
            </span>
            <div className="hero-hline w-8 h-px bg-cyan-500/60" />
          </div>

          {/* H1 line 1 — masked word reveal */}
          <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.05] mb-4">
            {titleWords.map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-[0.25em]"
              >
                <span
                  className={`hero-word inline-block ${
                    w.accent
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'
                      : 'text-[var(--text-primary)]'
                  }`}
                >
                  {w.text}
                </span>
              </span>
            ))}
          </h1>

          {/* H1 line 2 */}
          <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.05] mb-8">
            <span className="inline-block overflow-hidden align-bottom">
              <span className="hero-word inline-block text-[var(--text-primary)]/20">
                {lang === 'fr' ? "D'Excellence" : 'Of Excellence'}
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-subtitle text-[var(--text-secondary)] text-base md:text-lg max-w-md leading-relaxed mb-12"
          >
            {lang === 'fr'
              ? 'De la source au monde — Vanille, cacao, girofle et épices rares de Madagascar, sélectionnés avec exigence.'
              : 'From the source to the world — Vanilla, cocoa, cloves and rare spices from Madagascar, selected with rigour.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link
              href="/products"
              className="hero-cta group flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300 text-sm"
            >
              {lang === 'fr' ? 'Découvrir' : 'Discover'}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="hero-cta group flex items-center gap-3 border border-cyan-500/30 hover:border-cyan-500/60 text-[var(--text-secondary)] hover:text-white px-7 py-3.5 rounded-xl transition-all duration-300 text-sm"
            >
              {lang === 'fr' ? 'Nous Contacter' : 'Contact Us'}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { num: '2017', label: lang === 'fr' ? 'Fondée' : 'Founded' },
              { num: '5+', label: lang === 'fr' ? 'Produits' : 'Products' },
              { num: '100%', label: lang === 'fr' ? 'Traçable' : 'Traceable' },
            ].map((stat) => (
              <div key={stat.num} className="hero-stat">
                <p className="font-display font-black text-2xl text-cyan-400 leading-none">{stat.num}</p>
                <p className="text-[var(--text-tertiary)] text-xs font-mono uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="hero-scroll-line w-px h-10 bg-gradient-to-b from-cyan-500/40 to-transparent" />
      </div>
    </section>
  );
}
