'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product, ProductSpec, SensoryProfile } from '@/lib/data';

const CATEGORIES: Product['category'][] = ['vanilla', 'spices', 'derivatives'];
const SENSORY_AXES: (keyof SensoryProfile)[] = [
  'vanillin',
  'floral',
  'sweetness',
  'richness',
  'suppleness',
  'purity',
];
const SENSORY_LABELS: Record<keyof SensoryProfile, string> = {
  vanillin: 'Vanilline',
  floral: 'Floral',
  sweetness: 'Sucré',
  richness: 'Richesse',
  suppleness: 'Souplesse',
  purity: 'Pureté',
};

function emptyProduct(): Product {
  return {
    id: '',
    slug: '',
    name: { fr: '', en: '' },
    tagline: { fr: '', en: '' },
    description: { fr: '', en: '' },
    price: '',
    priceEur: 0,
    priceNote: { fr: 'à partir de', en: 'from' },
    category: 'spices',
    featured: false,
    specs: [],
    gradient: 'from-amber-950 via-amber-900 to-stone-900',
    accentColor: '#C8A96E',
    emoji: '🌿',
    sensoryProfile: {
      vanillin: 50,
      floral: 50,
      sweetness: 50,
      richness: 50,
      suppleness: 50,
      purity: 50,
    },
    lot: '',
    harvest: '',
  };
}

const inputCls =
  'w-full bg-[#060e1c] border border-white/10 focus:border-cyan-500/50 rounded-lg px-3 py-2 text-sm text-white outline-none transition-colors';
const labelCls =
  'block text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-1.5';

export default function ProductsManager({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditing(emptyProduct());
    setIsNew(true);
  };
  const openEdit = (p: Product) => {
    setEditing(JSON.parse(JSON.stringify(p)));
    setIsNew(false);
  };
  const close = () => setEditing(null);

  const refresh = async () => {
    const res = await fetch('/api/admin/products');
    if (res.ok) setProducts(await res.json());
    router.refresh();
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const url = isNew ? '/api/admin/products' : `/api/admin/products/${editing.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      if (res.ok) {
        await refresh();
        close();
      } else {
        alert('Erreur lors de l\'enregistrement');
      }
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Product) => {
    if (!confirm(`Supprimer "${p.name.fr}" ?`)) return;
    const res = await fetch(`/api/admin/products/${p.id}`, { method: 'DELETE' });
    if (res.ok) await refresh();
  };

  const set = <K extends keyof Product>(key: K, value: Product[K]) =>
    setEditing((prev) => (prev ? { ...prev, [key]: value } : prev));

  return (
    <div className="px-8 py-10 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-black text-3xl text-white">Produits</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            {products.length} produit{products.length > 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={openNew}
          className="bg-cyan-500 hover:bg-cyan-400 text-[#0a1628] font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
        >
          + Ajouter un produit
        </button>
      </div>

      <div className="space-y-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 bg-[#0a1628] border border-white/10 rounded-xl px-4 py-3"
          >
            <span className="text-2xl w-8 text-center">{p.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{p.name.fr}</p>
              <p className="text-xs text-[var(--text-tertiary)] truncate">
                {p.tagline.fr} · /{p.slug}
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 hidden sm:block">
              {p.category}
            </span>
            <span className="font-display font-bold text-white w-20 text-right">
              €{p.priceEur}
            </span>
            {p.featured && (
              <span className="text-[10px] font-mono uppercase text-lime-400 hidden md:block">
                ★ featured
              </span>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(p)}
                className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:border-cyan-500/50 text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                Modifier
              </button>
              <button
                onClick={() => remove(p)}
                className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-500/50 text-[var(--text-secondary)] hover:text-red-300 transition-colors"
              >
                Suppr.
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4">
          <div className="bg-[#0a1628] border border-white/10 rounded-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-[#0a1628] rounded-t-2xl">
              <h2 className="font-display font-bold text-lg text-white">
                {isNew ? 'Nouveau produit' : 'Modifier le produit'}
              </h2>
              <button onClick={close} className="text-[var(--text-tertiary)] hover:text-white text-xl">
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Names */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Nom (FR)</label>
                  <input
                    className={inputCls}
                    value={editing.name.fr}
                    onChange={(e) => set('name', { ...editing.name, fr: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelCls}>Nom (EN)</label>
                  <input
                    className={inputCls}
                    value={editing.name.en}
                    onChange={(e) => set('name', { ...editing.name, en: e.target.value })}
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Accroche (FR)</label>
                  <input
                    className={inputCls}
                    value={editing.tagline.fr}
                    onChange={(e) => set('tagline', { ...editing.tagline, fr: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelCls}>Accroche (EN)</label>
                  <input
                    className={inputCls}
                    value={editing.tagline.en}
                    onChange={(e) => set('tagline', { ...editing.tagline, en: e.target.value })}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Description (FR)</label>
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={editing.description.fr}
                    onChange={(e) =>
                      set('description', { ...editing.description, fr: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Description (EN)</label>
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={editing.description.en}
                    onChange={(e) =>
                      set('description', { ...editing.description, en: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Price / category / emoji */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className={labelCls}>Prix €/kg</label>
                  <input
                    type="number"
                    className={inputCls}
                    value={editing.priceEur}
                    onChange={(e) => set('priceEur', Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Catégorie</label>
                  <select
                    className={inputCls}
                    value={editing.category}
                    onChange={(e) =>
                      set('category', e.target.value as Product['category'])
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Emoji</label>
                  <input
                    className={inputCls}
                    value={editing.emoji}
                    onChange={(e) => set('emoji', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Couleur</label>
                  <input
                    type="color"
                    className="w-full h-[38px] bg-[#060e1c] border border-white/10 rounded-lg cursor-pointer"
                    value={editing.accentColor}
                    onChange={(e) => set('accentColor', e.target.value)}
                  />
                </div>
              </div>

              {/* Lot / harvest / featured */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className={labelCls}>Lot (traçabilité)</label>
                  <input
                    className={inputCls}
                    value={editing.lot ?? ''}
                    onChange={(e) => set('lot', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Récolte</label>
                  <input
                    className={inputCls}
                    value={editing.harvest ?? ''}
                    onChange={(e) => set('harvest', e.target.value)}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-white pb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(e) => set('featured', e.target.checked)}
                    className="w-4 h-4 accent-cyan-500"
                  />
                  Mis en avant
                </label>
              </div>

              {/* Gradient */}
              <div>
                <label className={labelCls}>Dégradé (classes Tailwind)</label>
                <input
                  className={inputCls}
                  value={editing.gradient}
                  onChange={(e) => set('gradient', e.target.value)}
                  placeholder="from-amber-950 via-amber-900 to-stone-900"
                />
              </div>

              {/* Sensory profile */}
              <div>
                <label className={labelCls}>Profil sensoriel (0–100)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SENSORY_AXES.map((axis) => (
                    <div key={axis}>
                      <p className="text-xs text-[var(--text-secondary)] mb-1">
                        {SENSORY_LABELS[axis]}: {editing.sensoryProfile[axis]}
                      </p>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={editing.sensoryProfile[axis]}
                        onChange={(e) =>
                          set('sensoryProfile', {
                            ...editing.sensoryProfile,
                            [axis]: Number(e.target.value),
                          })
                        }
                        className="w-full accent-cyan-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={labelCls + ' mb-0'}>Spécifications</label>
                  <button
                    onClick={() =>
                      set('specs', [
                        ...editing.specs,
                        { label: { fr: '', en: '' }, value: '' },
                      ])
                    }
                    className="text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    + Ajouter
                  </button>
                </div>
                <div className="space-y-2">
                  {editing.specs.map((spec: ProductSpec, i: number) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
                      <input
                        className={inputCls}
                        placeholder="Label FR"
                        value={spec.label.fr}
                        onChange={(e) => {
                          const specs = [...editing.specs];
                          specs[i] = { ...specs[i], label: { ...specs[i].label, fr: e.target.value } };
                          set('specs', specs);
                        }}
                      />
                      <input
                        className={inputCls}
                        placeholder="Label EN"
                        value={spec.label.en}
                        onChange={(e) => {
                          const specs = [...editing.specs];
                          specs[i] = { ...specs[i], label: { ...specs[i].label, en: e.target.value } };
                          set('specs', specs);
                        }}
                      />
                      <input
                        className={inputCls}
                        placeholder="Valeur"
                        value={spec.value}
                        onChange={(e) => {
                          const specs = [...editing.specs];
                          specs[i] = { ...specs[i], value: e.target.value };
                          set('specs', specs);
                        }}
                      />
                      <button
                        onClick={() =>
                          set('specs', editing.specs.filter((_, j) => j !== i))
                        }
                        className="text-[var(--text-tertiary)] hover:text-red-300 px-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 sticky bottom-0 bg-[#0a1628] rounded-b-2xl">
              <button
                onClick={close}
                className="px-5 py-2.5 rounded-lg border border-white/10 text-[var(--text-secondary)] hover:text-white text-sm transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-[#0a1628] font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
