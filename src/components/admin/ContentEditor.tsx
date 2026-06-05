'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SiteContent } from '@/lib/content';

const inputCls =
  'w-full bg-[#060e1c] border border-white/10 focus:border-cyan-500/50 rounded-lg px-3 py-2 text-sm text-white outline-none transition-colors';
const labelCls =
  'block text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-1.5';

export default function ContentEditor({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
        setTimeout(() => setSaved(false), 2500);
      } else {
        alert('Erreur lors de l\'enregistrement');
      }
    } finally {
      setSaving(false);
    }
  };

  const hero = content.hero;
  const contact = content.contact;
  const setHero = (patch: Partial<SiteContent['hero']>) =>
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));
  const setContact = (patch: Partial<SiteContent['contact']>) =>
    setContent((c) => ({ ...c, contact: { ...c.contact, ...patch } }));

  const Bilingual = ({
    label,
    value,
    onChange,
    textarea,
  }: {
    label: string;
    value: { fr: string; en: string };
    onChange: (v: { fr: string; en: string }) => void;
    textarea?: boolean;
  }) => (
    <div className="grid sm:grid-cols-2 gap-3">
      <div>
        <label className={labelCls}>{label} (FR)</label>
        {textarea ? (
          <textarea
            rows={2}
            className={inputCls}
            value={value.fr}
            onChange={(e) => onChange({ ...value, fr: e.target.value })}
          />
        ) : (
          <input
            className={inputCls}
            value={value.fr}
            onChange={(e) => onChange({ ...value, fr: e.target.value })}
          />
        )}
      </div>
      <div>
        <label className={labelCls}>{label} (EN)</label>
        {textarea ? (
          <textarea
            rows={2}
            className={inputCls}
            value={value.en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
          />
        ) : (
          <input
            className={inputCls}
            value={value.en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="px-8 py-10 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-black text-3xl text-white">Textes du site</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            Modifiez le bandeau d&apos;accueil et vos coordonnées.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-lime-400">✓ Enregistré</span>}
          <button
            onClick={save}
            disabled={saving}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-[#0a1628] font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0a1628] border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
        <h2 className="font-display font-bold text-white">Bandeau d&apos;accueil</h2>
        <Bilingual label="Badge" value={hero.badge} onChange={(v) => setHero({ badge: v })} />
        <Bilingual
          label="Titre — mot 1"
          value={hero.titleLine1a}
          onChange={(v) => setHero({ titleLine1a: v })}
        />
        <Bilingual
          label="Titre — mot 2 (couleur)"
          value={hero.titleLine1b}
          onChange={(v) => setHero({ titleLine1b: v })}
        />
        <Bilingual
          label="Titre — ligne 2"
          value={hero.titleLine2}
          onChange={(v) => setHero({ titleLine2: v })}
        />
        <Bilingual
          label="Sous-titre"
          value={hero.subtitle}
          onChange={(v) => setHero({ subtitle: v })}
          textarea
        />
        <Bilingual
          label="Bouton principal"
          value={hero.ctaPrimary}
          onChange={(v) => setHero({ ctaPrimary: v })}
        />
        <Bilingual
          label="Bouton secondaire"
          value={hero.ctaSecondary}
          onChange={(v) => setHero({ ctaSecondary: v })}
        />
      </section>

      {/* Contact */}
      <section className="bg-[#0a1628] border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="font-display font-bold text-white">Coordonnées</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Email</label>
            <input
              className={inputCls}
              value={contact.email}
              onChange={(e) => setContact({ email: e.target.value })}
            />
          </div>
          <div>
            <label className={labelCls}>Facebook</label>
            <input
              className={inputCls}
              value={contact.facebook}
              onChange={(e) => setContact({ facebook: e.target.value })}
            />
          </div>
          <div>
            <label className={labelCls}>Téléphone 1</label>
            <input
              className={inputCls}
              value={contact.phone1}
              onChange={(e) => setContact({ phone1: e.target.value })}
            />
          </div>
          <div>
            <label className={labelCls}>Téléphone 2</label>
            <input
              className={inputCls}
              value={contact.phone2}
              onChange={(e) => setContact({ phone2: e.target.value })}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
