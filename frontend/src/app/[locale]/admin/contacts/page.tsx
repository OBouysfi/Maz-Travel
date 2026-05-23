'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from '@/components/admin/AdminShell';

export default function AdminContacts() {
  const [items, setItems] = useState<any[]>([]);

  const load = () => { api.get('/contacts').then((r) => setItems(r.data)).catch(() => {}); };
  useEffect(load, []);

  const markRead = async (id: number) => { await api.put(`/contacts/${id}/read`); load(); };
  const remove = async (id: number) => { if (confirm('Supprimer ?')) { await api.delete(`/contacts/${id}`); load(); } };

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-ink-900 mb-1">Messages contact</h1>
      <p className="text-sm text-ink-500 mb-6">{items.length} message(s)</p>

      <div className="space-y-3">
        {items.length === 0 && <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center text-ink-500">Aucun message</div>}
        {items.map((c) => (
          <div key={c.id} className={`bg-white rounded-2xl p-5 ${c.read ? 'border border-ink-100 opacity-75' : 'border-2 border-brand-500'}`}>
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {!c.read && <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">NOUVEAU</span>}
                  <h3 className="font-bold text-ink-900">{c.name}</h3>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-ink-500">
                  <span>📧 {c.email}</span>
                  {c.phone && <span>📱 {c.phone}</span>}
                  {c.service && <span>🛎 {c.service}</span>}
                </div>
              </div>
              <div className="text-xs text-ink-400">{new Date(c.createdAt).toLocaleString('fr')}</div>
            </div>
            <p className="text-sm text-ink-700 mb-4 whitespace-pre-wrap">{c.message}</p>
            <div className="flex gap-2">
              {!c.read && <button onClick={() => markRead(c.id)} className="bg-ink-900 hover:bg-brand-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition">✓ Marquer lu</button>}
              <a href={`mailto:${c.email}`} className="border border-ink-200 hover:bg-ink-50 px-3 py-1.5 rounded-lg text-xs font-medium">Répondre</a>
              <button onClick={() => remove(c.id)} className="border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-medium ml-auto">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
