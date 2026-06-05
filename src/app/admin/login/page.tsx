'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Erreur de connexion');
      }
    } catch {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060e1c] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display font-black text-2xl text-white">
            Zara <span className="text-cyan-400">Admin</span>
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mt-2">
            Espace de gestion
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-[#0a1628] border border-white/10 rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full bg-[#060e1c] border border-white/10 focus:border-cyan-500/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-[#0a1628] font-semibold py-3 rounded-lg transition-colors text-sm"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
