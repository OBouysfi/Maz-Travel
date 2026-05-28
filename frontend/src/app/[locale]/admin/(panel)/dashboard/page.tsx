'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Link } from '@/i18n/routing';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => { api.get('/admin/stats').then((r) => setStats(r.data)).catch(() => {}); }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-ink-900 mb-1">Vue d'ensemble</h1>
      <p className="text-sm text-ink-500 mb-8">Tableau de bord — Maz Travel</p>

      {stats && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <div className="text-xs text-ink-500 tracking-wider uppercase font-semibold mb-1">Devis ce mois</div>
              <div className="text-3xl font-bold text-brand-600">{stats.totals.monthQuotes}</div>
            </div>
            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <div className="text-xs text-ink-500 tracking-wider uppercase font-semibold mb-1">En attente</div>
              <div className="text-3xl font-bold text-amber-600">{stats.totals.pendingQuotes}</div>
            </div>
            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <div className="text-xs text-ink-500 tracking-wider uppercase font-semibold mb-1">Envoyés</div>
              <div className="text-3xl font-bold text-deep-700">{stats.totals.quotedQuotes}</div>
            </div>
            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <div className="text-xs text-ink-500 tracking-wider uppercase font-semibold mb-1">Confirmés</div>
              <div className="text-3xl font-bold text-green-700">{stats.totals.confirmedQuotes}</div>
            </div>
            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <div className="text-xs text-ink-500 tracking-wider uppercase font-semibold mb-1">CA mois (MAD)</div>
              <div className="text-3xl font-bold text-ink-900">{stats.monthRevenue?.toLocaleString() || 0}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
            <div className="p-5 border-b border-ink-100 flex items-center justify-between">
              <h3 className="font-bold text-ink-900">Dernières demandes de devis</h3>
              <Link href="/admin/quotes" className="text-sm text-brand-600 hover:text-brand-700 font-semibold">Voir tout →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-ink-500 uppercase bg-ink-50 border-b border-ink-100">
                    <th className="px-5 py-3">N°</th><th className="px-5 py-3">Client</th><th className="px-5 py-3">Service</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentQuotes.map((q: any) => (
                    <tr key={q.id} className="border-b border-ink-100 hover:bg-ink-50/50">
                      <td className="px-5 py-4 font-mono text-xs text-ink-500">{q.quoteNumber}</td>
                      <td className="px-5 py-4 font-medium">{q.fullName}</td>
                      <td className="px-5 py-4 text-ink-600">{q.excursion?.titleFr || q.activity?.titleFr || q.serviceType}</td>
                      <td className="px-5 py-4 text-ink-600">{new Date(q.date).toLocaleDateString('fr')}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          q.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                          q.status === 'QUOTED' ? 'bg-deep-100 text-deep-800' :
                          q.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                          'bg-ink-100 text-ink-700'
                        }`}>{q.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
