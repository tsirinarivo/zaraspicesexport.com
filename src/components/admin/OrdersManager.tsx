'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Order } from '@/lib/store';

const STATUS: { value: Order['status']; label: string; color: string }[] = [
  { value: 'new', label: 'Nouvelle', color: '#00e5ff' },
  { value: 'processing', label: 'En traitement', color: '#a3ff12' },
  { value: 'shipped', label: 'Expédiée', color: '#888' },
  { value: 'cancelled', label: 'Annulée', color: '#ff6b35' },
];

function statusMeta(s: Order['status']) {
  return STATUS.find((x) => x.value === s) ?? STATUS[0];
}

export default function OrdersManager({ initialOrders }: { initialOrders: Order[] }) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [open, setOpen] = useState<string | null>(null);

  const refresh = async () => {
    const res = await fetch('/api/admin/orders');
    if (res.ok) setOrders(await res.json());
    router.refresh();
  };

  const setStatus = async (id: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm('Supprimer cette commande ?')) return;
    const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
    if (res.ok) await refresh();
  };

  return (
    <div className="px-8 py-10 max-w-5xl">
      <h1 className="font-display font-black text-3xl text-white mb-1">Commandes</h1>
      <p className="text-[var(--text-secondary)] text-sm mb-8">
        {orders.length} commande{orders.length > 1 ? 's' : ''} reçue
        {orders.length > 1 ? 's' : ''}.
      </p>

      {orders.length === 0 && (
        <div className="bg-[#0a1628] border border-white/10 rounded-xl p-10 text-center">
          <p className="text-[var(--text-tertiary)]">
            Aucune commande pour le moment. Les commandes validées au paiement
            apparaîtront ici.
          </p>
        </div>
      )}

      <div className="space-y-2">
        {orders.map((o) => {
          const meta = statusMeta(o.status);
          const isOpen = open === o.id;
          return (
            <div
              key={o.id}
              className="bg-[#0a1628] border border-white/10 rounded-xl overflow-hidden"
            >
              <div className="flex items-center gap-4 px-4 py-3">
                <button
                  onClick={() => setOpen(isOpen ? null : o.id)}
                  className="flex-1 flex items-center gap-4 text-left min-w-0"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: meta.color }}
                  />
                  <div className="min-w-0">
                    <p className="font-mono font-semibold text-white">{o.orderNumber}</p>
                    <p className="text-xs text-[var(--text-tertiary)] truncate">
                      {o.customer.name || o.customer.email || 'Client'} ·{' '}
                      {new Date(o.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </button>
                <span className="font-display font-bold text-white">
                  {o.currency === 'USD' ? '$' : '€'}
                  {o.total.toFixed(2)}
                </span>
                <select
                  value={o.status}
                  onChange={(e) => setStatus(o.id, e.target.value as Order['status'])}
                  className="bg-[#060e1c] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                  style={{ color: meta.color }}
                >
                  {STATUS.map((s) => (
                    <option key={s.value} value={s.value} className="text-white">
                      {s.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => remove(o.id)}
                  className="text-[var(--text-tertiary)] hover:text-red-300 px-1"
                >
                  ✕
                </button>
              </div>

              {isOpen && (
                <div className="px-4 pb-4 pt-2 border-t border-white/10 grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-2">
                      Client
                    </p>
                    <div className="space-y-1 text-[var(--text-secondary)]">
                      {o.customer.name && <p>{o.customer.name}</p>}
                      {o.customer.company && <p>{o.customer.company}</p>}
                      {o.customer.email && <p className="text-cyan-400">{o.customer.email}</p>}
                      {o.customer.phone && <p>{o.customer.phone}</p>}
                      {o.customer.country && <p>{o.customer.country}</p>}
                      {o.customer.message && (
                        <p className="italic text-[var(--text-tertiary)] mt-2">
                          “{o.customer.message}”
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-2">
                      Articles
                    </p>
                    <div className="space-y-1.5">
                      {o.items.map((it, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-[var(--text-secondary)]"
                        >
                          <span>
                            {it.name || it.productId}
                            <span className="text-[var(--text-tertiary)]">
                              {' '}
                              × {it.weightKg}kg
                            </span>
                          </span>
                          <span className="text-white">
                            €{(it.priceEur * it.weightKg).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
