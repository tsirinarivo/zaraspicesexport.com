'use client';
import { useParams } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/store/language';
import { products } from '@/lib/data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const LOT_DATA: Record<string, {
  product: string;
  farmer: { fr: string; en: string };
  parcel: string;
  coordinates: string;
  harvestDate: string;
  curingEnd: string;
  vanillin: string;
  moisture: string;
  weight: string;
  destination: { fr: string; en: string };
  steps: { date: string; label: { fr: string; en: string }; done: boolean }[];
}> = {
  'ZSE-TK-2024-001': {
    product: 'vanille-tk',
    farmer: { fr: 'Rakoto Emmanuel & Famille', en: 'Rakoto Emmanuel & Family' },
    parcel: 'Parcelle N°SAVA-2847',
    coordinates: '14°16\'S, 50°10\'E',
    harvestDate: '12 Juillet 2024',
    curingEnd: '15 Octobre 2024',
    vanillin: '1.92%',
    moisture: '24%',
    weight: '42 kg',
    destination: { fr: 'Europe (FR, DE, NL)', en: 'Europe (FR, DE, NL)' },
    steps: [
      { date: 'Juin 2024', label: { fr: 'Pollinisation manuelle', en: 'Hand pollination' }, done: true },
      { date: 'Juil 2024', label: { fr: 'Récolte sélective', en: 'Selective harvest' }, done: true },
      { date: 'Juil 2024', label: { fr: 'Échaudage & fermentation', en: 'Scalding & fermentation' }, done: true },
      { date: 'Août–Oct 2024', label: { fr: 'Séchage & affinage', en: 'Drying & curing' }, done: true },
      { date: 'Nov 2024', label: { fr: 'Contrôle qualité ZSE', en: 'ZSE quality control' }, done: true },
      { date: 'Déc 2024', label: { fr: 'Mise sous vide & export', en: 'Vacuum-sealing & export' }, done: true },
    ],
  },
  'ZSE-GR-2024-007': {
    product: 'vanille-gourmet',
    farmer: { fr: 'Coopérative de Sambava (12 familles)', en: 'Sambava Cooperative (12 families)' },
    parcel: 'Parcelle N°SAVA-0391',
    coordinates: '14°16\'S, 50°10\'E',
    harvestDate: '03 Août 2024',
    curingEnd: '28 Octobre 2024',
    vanillin: '2.04%',
    moisture: '32%',
    weight: '38 kg',
    destination: { fr: 'Marchés premium — Japon, USA', en: 'Premium markets — Japan, USA' },
    steps: [
      { date: 'Juin 2024', label: { fr: 'Pollinisation manuelle', en: 'Hand pollination' }, done: true },
      { date: 'Août 2024', label: { fr: 'Récolte sélective', en: 'Selective harvest' }, done: true },
      { date: 'Août 2024', label: { fr: 'Échaudage & fermentation', en: 'Scalding & fermentation' }, done: true },
      { date: 'Sep–Oct 2024', label: { fr: 'Séchage & affinage', en: 'Drying & curing' }, done: true },
      { date: 'Nov 2024', label: { fr: 'Contrôle qualité ZSE', en: 'ZSE quality control' }, done: true },
      { date: 'Déc 2024', label: { fr: 'Mise sous vide & export', en: 'Vacuum-sealing & export' }, done: false },
    ],
  },
};

export default function TracePage() {
  const { lang } = useLanguage();
  const params = useParams();
  const lot = decodeURIComponent(params.lot as string);
  const data = LOT_DATA[lot];

  if (!data) {
    return (
      <main className="min-h-screen bg-[var(--bg)] pt-32 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-6">🔍</p>
          <h1 className="font-display font-bold text-[var(--text-primary)] text-2xl mb-3">
            {lang === 'fr' ? 'Lot introuvable' : 'Lot not found'}
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            {lang === 'fr' ? `Numéro de lot "${lot}" non reconnu.` : `Lot number "${lot}" not recognized.`}
          </p>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono transition-colors">
            ← {lang === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
          </Link>
        </div>
      </main>
    );
  }

  const product = products.find((p) => p.slug === data.product);

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-24 pb-24">
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-[var(--text-tertiary)] text-xs font-mono mb-4">
            <Link href="/" className="hover:text-cyan-400 transition-colors">{lang === 'fr' ? 'Accueil' : 'Home'}</Link>
            <span>/</span>
            <span className="text-cyan-400/60">{lang === 'fr' ? 'Traçabilité' : 'Traceability'}</span>
          </div>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-[#a3ff12] block mb-2">
              {lang === 'fr' ? 'Traçabilité lot' : 'Lot traceability'}
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display font-black text-3xl text-[var(--text-primary)] mb-1">
              {lot}
            </motion.h1>
            {product && (
              <motion.p variants={fadeUp} className="text-cyan-400/70 text-sm font-mono">
                {product.name[lang]} — {product.tagline[lang]}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Farmer info */}
            <motion.div
              className="bg-[var(--surface)] border border-[rgba(163,255,18,0.15)] rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#a3ff12] mb-4">
                {lang === 'fr' ? 'Producteur' : 'Producer'}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: { fr: 'Nom', en: 'Name' }, value: data.farmer[lang] },
                  { label: { fr: 'Parcelle', en: 'Parcel' }, value: data.parcel },
                  { label: { fr: 'Coordonnées GPS', en: 'GPS coordinates' }, value: data.coordinates },
                  { label: { fr: 'Zone', en: 'Zone' }, value: 'Région SAVA · Madagascar' },
                ].map((row, i) => (
                  <div key={i} className="border border-white/5 rounded-xl p-3">
                    <p className="text-[var(--text-tertiary)] text-[10px] font-mono uppercase tracking-widest mb-1">{row.label[lang]}</p>
                    <p className="text-[var(--text-primary)] text-sm font-medium">{row.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Analysis results */}
            <motion.div
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">
                {lang === 'fr' ? 'Résultats d\'analyse' : 'Analysis results'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: { fr: 'Taux vanilline', en: 'Vanillin rate' }, value: data.vanillin, color: '#a3ff12' },
                  { label: { fr: 'Taux humidité', en: 'Moisture' }, value: data.moisture, color: '#00e5ff' },
                  { label: { fr: 'Poids lot', en: 'Lot weight' }, value: data.weight, color: '#a3ff12' },
                  { label: { fr: 'Destination', en: 'Destination' }, value: data.destination[lang], color: '#00e5ff' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 border border-white/5 rounded-xl">
                    <p className="font-display font-bold text-xl leading-none mb-1" style={{ color: item.color }}>
                      {item.value}
                    </p>
                    <p className="text-[var(--text-tertiary)] text-[10px] font-mono uppercase tracking-widest">{item.label[lang]}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Traceability timeline */}
            <motion.div
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-6">
                {lang === 'fr' ? 'Parcours du lot' : 'Lot journey'}
              </h2>
              <div className="relative">
                <div className="absolute left-3.5 top-0 bottom-0 w-px bg-white/8" />
                <div className="space-y-6">
                  {data.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-5 pl-10 relative"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    >
                      <div
                        className="absolute left-0 top-0.5 w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{
                          background: step.done ? 'rgba(163,255,18,0.12)' : 'var(--bg)',
                          borderColor: step.done ? '#a3ff12' : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        {step.done ? (
                          <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="#a3ff12" strokeWidth="2" strokeLinecap="round">
                            <path d="M3 8 L6 11 L13 4" />
                          </svg>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        )}
                      </div>
                      <div>
                        <p className="text-[var(--text-primary)] text-sm font-semibold">{step.label[lang]}</p>
                        <p className="text-[var(--text-tertiary)] text-xs font-mono mt-0.5">{step.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Map placeholder */}
            <motion.div
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="aspect-square relative bg-[var(--bg-secondary)] flex items-center justify-center overflow-hidden">
                {/* Stylized Madagascar map */}
                <svg viewBox="0 0 200 280" className="w-3/4 h-3/4 opacity-40">
                  <path
                    d="M100 20 C120 25 140 35 148 55 C156 75 158 95 155 115 C152 135 148 155 142 170 C136 185 128 195 118 205 C108 215 96 222 85 225 C74 228 65 225 58 218 C51 211 47 200 46 188 C45 176 47 163 52 150 C57 137 64 124 68 110 C72 96 72 82 75 68 C78 54 85 38 100 20Z"
                    fill="rgba(0,229,255,0.2)"
                    stroke="rgba(0,229,255,0.4)"
                    strokeWidth="1"
                  />
                </svg>
                {/* SAVA marker */}
                <div className="absolute top-[28%] right-[30%] flex flex-col items-center">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[#a3ff12]"
                    animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="mt-1 text-[8px] font-mono text-[#a3ff12] whitespace-nowrap">SAVA</div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{data.coordinates}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-1">
                  {lang === 'fr' ? 'Localisation' : 'Location'}
                </p>
                <p className="text-[var(--text-primary)] text-sm font-semibold">{data.parcel}</p>
                <p className="text-[var(--text-tertiary)] text-xs mt-0.5">Région SAVA · Nord-Est Madagascar</p>
              </div>
            </motion.div>

            {/* Dates */}
            <motion.div
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
                {lang === 'fr' ? 'Dates clés' : 'Key dates'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-tertiary)]">{lang === 'fr' ? 'Récolte' : 'Harvest'}</span>
                  <span className="text-xs font-mono text-[#a3ff12]">{data.harvestDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-tertiary)]">{lang === 'fr' ? 'Fin affinage' : 'Curing end'}</span>
                  <span className="text-xs font-mono text-[#a3ff12]">{data.curingEnd}</span>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            {product && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-between bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-5 py-3.5 rounded-xl transition-colors duration-300 text-sm group"
                >
                  <span>{lang === 'fr' ? 'Voir le produit' : 'View product'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
