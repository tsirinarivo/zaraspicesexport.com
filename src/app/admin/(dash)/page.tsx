import Link from 'next/link';
import { getProducts, getOrders } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [products, orders] = await Promise.all([getProducts(), getOrders()]);
  const newOrders = orders.filter((o) => o.status === 'new').length;
  const revenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: 'Produits', value: products.length, href: '/admin/products' },
    { label: 'Commandes', value: orders.length, href: '/admin/orders' },
    { label: 'Nouvelles commandes', value: newOrders, href: '/admin/orders' },
    { label: 'Chiffre (€)', value: `€${revenue.toFixed(0)}`, href: '/admin/orders' },
  ];

  return (
    <div className="px-8 py-10 max-w-5xl">
      <h1 className="font-display font-black text-3xl text-white mb-1">Tableau de bord</h1>
      <p className="text-[var(--text-secondary)] text-sm mb-8">
        Gérez vos produits, commandes et le contenu du site.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-[#0a1628] border border-white/10 hover:border-cyan-500/30 rounded-xl p-5 transition-colors"
          >
            <p className="font-display font-black text-3xl text-cyan-400 leading-none">
              {s.value}
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mt-2">
              {s.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/admin/products"
          className="bg-[#0a1628] border border-white/10 hover:border-cyan-500/30 rounded-xl p-6 transition-colors"
        >
          <p className="text-2xl mb-2">◉</p>
          <p className="font-semibold text-white">Gérer les produits</p>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">
            Ajouter, modifier ou supprimer des produits.
          </p>
        </Link>
        <Link
          href="/admin/orders"
          className="bg-[#0a1628] border border-white/10 hover:border-cyan-500/30 rounded-xl p-6 transition-colors"
        >
          <p className="text-2xl mb-2">◎</p>
          <p className="font-semibold text-white">Commandes</p>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">
            Suivre et traiter les commandes reçues.
          </p>
        </Link>
        <Link
          href="/admin/content"
          className="bg-[#0a1628] border border-white/10 hover:border-cyan-500/30 rounded-xl p-6 transition-colors"
        >
          <p className="text-2xl mb-2">◇</p>
          <p className="font-semibold text-white">Textes du site</p>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">
            Modifier le hero et les coordonnées.
          </p>
        </Link>
      </div>
    </div>
  );
}
