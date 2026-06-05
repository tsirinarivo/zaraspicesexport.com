'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const LINKS = [
  { href: '/admin', label: 'Tableau de bord', icon: '◈' },
  { href: '/admin/products', label: 'Produits', icon: '◉' },
  { href: '/admin/orders', label: 'Commandes', icon: '◎' },
  { href: '/admin/content', label: 'Textes du site', icon: '◇' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-60 shrink-0 min-h-screen border-r border-white/10 bg-[#0a1628] flex flex-col fixed left-0 top-0">
      <div className="px-6 py-6 border-b border-white/10">
        <p className="font-display font-black text-lg text-white leading-none">
          Zara <span className="text-cyan-400">Admin</span>
        </p>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] mt-1">
          Spices Export
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {LINKS.map((link) => {
          const active =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                  : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <span className="text-cyan-400/70">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-white/5 hover:text-white transition-colors"
        >
          <span>↗</span> Voir le site
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <span>⏻</span> Déconnexion
        </button>
      </div>
    </aside>
  );
}
