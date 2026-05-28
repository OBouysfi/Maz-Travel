'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminQuotes() {
  const [items, setItems] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [selected, setSelected] = useState<any>(null);
  const [resp, setResp] = useState({ adminPrice: '', adminCurrency: 'MAD', adminNote: '' });
  const [sending, setSending] = useState(false);

  const load = () => {
    const url = filter ? `/quotes?status=${filter}` : '/quotes';
    api.get(url).then((r) => setItems(r.data)).catch(() => {});
  };

  useEffect(() => { load(); }, [filter]);

  const sendQuote = async () => {
    if (!selected) return;
    setSending(true);
    try {
      await api.put(`/quotes/${selected.id}/respond`, { adminPrice: +resp.adminPrice, adminCurrency: resp.adminCurrency, adminNote: resp.adminNote });
      alert('Devis envoyé au client !');
      setSelected(null);
      setResp({ adminPrice: '', adminCurrency: 'MAD', adminNote: '' });
      load();
    } catch { alert('Erreur'); } finally { setSending(false); }
  };

  const updateStatus = async (id: number, status: string) => {
    await api.put(`/quotes/${id}/status`, { status });
    load();
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-ink-900 mb-1">Gestion des devis</h1>
      <p className="text-sm text-ink-500 mb-6">Répondez aux clients en saisissant un prix</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { v: '', label: 'Tous' },
          { v: 'PENDING', label: '⏳ En attente' },
          { v: 'QUOTED', label: '📤 Envoyés' },
          { v: 'CONFIRMED', label: '✅ Confirmés' },
          { v: 'CANCELLED', label: '✗ Annulés' },
        ].map((f) => (
          <button key={f.v} onClick={() => setFilter(f.v)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filter === f.v ? 'bg-brand-600 text-white' : 'bg-white border border-ink-200 text-ink-700 hover:border-brand-300'}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
        <div className="space-y-3">
          {items.length === 0 && <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center text-ink-500">Aucun devis</div>}
          {items.map((q) => (
            <div key={q.id} onClick={() => { setSelected(q); setResp({ adminPrice: String(q.adminPrice || ''), adminCurrency: q.adminCurrency || 'MAD', adminNote: q.adminNote || '' }); }}
              className={`bg-white rounded-2xl p-5 cursor-pointer transition ${selected?.id === q.id ? 'border-2 border-brand-500 shadow-lg' : 'border border-ink-100 hover:border-ink-300'}`}>
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-xs bg-ink-100 text-ink-700 px-2 py-1 rounded">{q.quoteNumber}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      q.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                      q.status === 'QUOTED' ? 'bg-deep-100 text-deep-800' :
                      q.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-ink-100 text-ink-700'}`}>{q.status}</span>
                  </div>
                  <h3 className="font-bold text-ink-900">{q.fullName}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500 mt-1">
                    <span>📧 {q.email}</span>
                    <span>📱 {q.phone}</span>
                  </div>
                </div>
                <div className="bg-brand-50 text-brand-700 px-3 py-1 rounded-lg text-xs font-bold">{q.serviceType}</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 p-3 bg-ink-50 rounded-lg text-sm">
                <div><div className="text-[10px] text-ink-500 uppercase font-semibold">Service</div><div className="font-medium text-ink-900">{q.excursion?.titleFr || q.activity?.titleFr || (q.pickupLocation + (q.dropLocation ? ' → ' + q.dropLocation : ''))}</div></div>
                <div><div className="text-[10px] text-ink-500 uppercase font-semibold">Date</div><div className="font-medium text-ink-900">{new Date(q.date).toLocaleDateString('fr')}</div></div>
                <div><div className="text-[10px] text-ink-500 uppercase font-semibold">Participants</div><div className="font-medium text-ink-900">{q.adults}A {q.children}E {q.babies}B</div></div>
                <div><div className="text-[10px] text-ink-500 uppercase font-semibold">Heure</div><div className="font-medium text-ink-900">{q.time || '—'}</div></div>
              </div>
              {q.message && <p className="text-sm text-ink-600 mb-3 italic">"{q.message}"</p>}
              {q.status === 'QUOTED' && (
                <div className="flex gap-2 mt-3">
                  <button onClick={(e) => { e.stopPropagation(); updateStatus(q.id, 'CONFIRMED'); }} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">✓ Marquer confirmé</button>
                  <button onClick={(e) => { e.stopPropagation(); updateStatus(q.id, 'CANCELLED'); }} className="border border-ink-200 hover:bg-red-50 hover:border-red-300 px-3 py-1.5 rounded-lg text-xs font-medium">Annuler</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {selected && (
          <div className="bg-white rounded-2xl border border-ink-100 p-6 h-fit xl:sticky xl:top-6">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <h3 className="font-bold text-ink-900">Répondre au devis</h3>
              <span className="text-xs bg-ink-100 text-ink-700 px-2 py-1 rounded font-mono">#{selected.quoteNumber}</span>
            </div>
            <div className="bg-brand-50 border border-brand-100 rounded-lg p-3 mb-5">
              <div className="text-xs font-semibold text-brand-700 mb-1">Client : {selected.fullName}</div>
              <div className="text-xs text-ink-700">{selected.email}</div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink-700 mb-1.5 block">Prix total *</label>
                <div className="grid grid-cols-[1fr_100px] gap-2">
                  <input type="number" value={resp.adminPrice} onChange={(e) => setResp({ ...resp, adminPrice: e.target.value })}
                    className="px-4 py-3 border border-ink-200 rounded-lg text-sm font-bold text-brand-600 focus:outline-none focus:border-brand-500" />
                  <select value={resp.adminCurrency} onChange={(e) => setResp({ ...resp, adminCurrency: e.target.value })}
                    className="px-3 py-3 border border-ink-200 rounded-lg text-sm font-medium bg-white">
                    <option>MAD</option><option>EUR</option><option>USD</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-ink-700 mb-1.5 block">Message au client</label>
                <textarea rows={6} value={resp.adminNote} onChange={(e) => setResp({ ...resp, adminNote: e.target.value })}
                  placeholder="Bonjour,&#10;&#10;Voici notre devis pour votre demande...&#10;&#10;Cordialement,&#10;L'équipe Maz Travel"
                  className="w-full px-4 py-3 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 resize-none" />
              </div>
              <div className="bg-ink-50 p-3 rounded-lg text-xs text-ink-600">
                📧 Le devis sera envoyé par email à <strong className="text-ink-900">{selected.email}</strong>
              </div>
              <button onClick={sendQuote} disabled={sending || !resp.adminPrice} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-lg transition shadow-lg shadow-brand-600/30 disabled:opacity-60">
                {sending ? 'Envoi...' : 'Envoyer le devis'}
              </button>
              <button onClick={() => setSelected(null)} className="w-full border border-ink-200 hover:bg-ink-50 text-ink-700 font-medium py-3 rounded-lg transition text-sm">
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
