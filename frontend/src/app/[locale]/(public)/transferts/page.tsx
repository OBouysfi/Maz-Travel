'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import PageHeader from '@/components/layout/PageHeader';
import { api } from '@/lib/api';
import { useCurrencyStore } from '@/store/currency';

interface Vehicle {
  id: number;
  name: string;
  type: string;
  capacity: number;
  pricePerDayMad: number;
  pricePerDayEur: number | null;
  image: string;
}

export default function TransfersPage() {
  const t = useTranslations('transfersPage');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency } = useCurrencyStore();

  const [routes, setRoutes] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', message: '' });

  // URL params from BookingTabs
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '12:00';
  const adults = searchParams.get('adults') || '2';
  const children = searchParams.get('children') || '0';
  const babies = searchParams.get('babies') || '0';
  const hasSearch = !!(from || to || date);

  useEffect(() => {
    api.get('/transfers').then((r) => setRoutes(r.data)).catch(() => {});
    api.get('/vehicles').then((r) => setVehicles(r.data)).catch(() => {});
  }, []);

  const priceFor = (r: any) =>
    currency === 'EUR' ? (r.priceEur || Math.round(r.priceMad / 10.8)) :
    currency === 'USD' ? (r.priceUsd || Math.round(r.priceMad / 9.85)) : r.priceMad;

  const selectVehicle = (v: Vehicle) => {
    setSelectedVehicle(v);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const payload: any = {
        fullName: form.fullName, email: form.email, phone: form.phone,
        language: locale, serviceType: 'TRANSFER',
        date, time,
        adults: +adults, children: +children, babies: +babies,
        message: form.message || null,
        vehicleType: selectedVehicle?.name || null,
        pickupLocation: from,
        dropLocation: to,
      };
      const { data } = await api.post('/quotes', payload);
      setResult(data.quote);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} badge="✈️ 24/7" />

      {/* SUCCESS */}
      {status === 'success' && result && (
        <section className="py-16 bg-white">
          <div className="container max-w-lg mx-auto text-center">
            <div className="bg-white rounded-3xl p-10 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-ink-900 mb-2">Demande envoyée !</h3>
              <div className="inline-block bg-brand-50 border border-brand-200 text-brand-700 font-mono font-bold px-4 py-2 rounded-lg mt-2 mb-4">{result.quoteNumber}</div>
              <p className="text-ink-600 mb-6">Nous vous contacterons dans les plus brefs délais.</p>
              <button onClick={() => { setStatus('idle'); setShowForm(false); setResult(null); setSelectedVehicle(null); }} className="btn-primary">
                Voir les véhicules
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FORM après sélection véhicule */}
      {showForm && !result && selectedVehicle && (
        <section className="py-10 bg-ink-50">
          <div className="container max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
              {/* Vehicle recap */}
              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 flex items-center gap-4 mb-6">
                <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0">
                  <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80'; }} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-brand-800">{selectedVehicle.name}</div>
                  <div className="text-sm text-brand-600">{selectedVehicle.capacity} passagers · {selectedVehicle.pricePerDayMad.toLocaleString()} MAD</div>
                </div>
                <button onClick={() => setShowForm(false)} className="text-xs text-brand-600 underline shrink-0">Changer</button>
              </div>
              <h2 className="text-xl font-bold text-ink-900 mb-5">Vos coordonnées</h2>
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Nom complet" style={{ color: '#111827' }}
                    className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="Email" style={{ color: '#111827' }}
                    className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
                  <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value.replace(/[^0-9+\s]/g, '') })} inputMode="tel"
                    placeholder="Téléphone" style={{ color: '#111827' }}
                    className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 md:col-span-2" />
                </div>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Message (optionnel)" rows={3} style={{ color: '#111827' }}
                  className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 resize-none" />
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">Une erreur est survenue.</div>
                )}
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1">← Retour</button>
                  <button type="submit" disabled={status === 'loading'} className="btn-primary flex-1 disabled:opacity-60">
                    {status === 'loading' ? '...' : 'Demander un devis'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* TRAJETS les plus demandés */}
      {!showForm && !result && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-8">{t('mostRequested')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {routes.map((r) => (
                <div key={r.id} className="card p-6 group">
                  <div className="flex items-start justify-between mb-4">
                    <svg className="w-8 h-8 text-brand-600 group-hover:rotate-45 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                    <div className="text-right">
                      <div className="text-xs text-ink-400">Dès</div>
                      <div className="text-xl font-bold text-brand-600">{priceFor(r)} <span className="text-xs">{currency}</span></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-5">
                    <div className="text-sm font-medium text-ink-800">📍 {r.fromLoc}</div>
                    <div className="text-sm font-medium text-ink-800">→ {r.toLoc}</div>
                    <div className="text-xs text-ink-500">⏱ {r.duration}</div>
                  </div>
                  <Link href="/contact" className="block text-center bg-ink-900 hover:bg-brand-600 text-white py-2.5 rounded-xl text-sm font-medium transition">
                    {t('book')}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VÉHICULES — liste avec prix + Réserver */}
      {!showForm && !result && (
        <section className="py-16 lg:py-20 bg-ink-50">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-3">{t('fleet')}</h2>

            {/* Summary bar si venu du booking */}
            {hasSearch && (
              <div className="bg-white rounded-2xl px-5 py-3 mb-8 mt-4 flex flex-wrap items-center gap-3 text-sm border border-ink-100 shadow-sm">
                <svg className="w-4 h-4 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {date && <span className="font-medium text-ink-700">{date}</span>}
                <span className="text-ink-400">·</span>
                <span className="font-medium text-brand-600">{time}</span>
                {from && (
                  <>
                    <span className="text-ink-400">·</span>
                    <span className="font-medium text-ink-700 truncate max-w-[140px]">{from}</span>
                    <svg className="w-3.5 h-3.5 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></svg>
                    <span className="font-medium text-ink-700 truncate max-w-[140px]">{to}</span>
                  </>
                )}
                <button onClick={() => router.push(`/${locale}`)} className="ml-auto text-brand-600 hover:text-brand-700 font-medium text-xs underline underline-offset-2">
                  Modifier
                </button>
              </div>
            )}

            <p className="text-sm text-ink-500 mb-6">{vehicles.length} véhicules disponibles</p>
            <div className="space-y-4">
              {vehicles.map((v) => (
                <div key={v.id} className="bg-white rounded-2xl shadow-sm border border-ink-100 p-5 flex items-center gap-5 hover:border-brand-300 hover:shadow-md transition-all group">
                  <div className="w-28 h-20 rounded-xl overflow-hidden bg-ink-100 shrink-0">
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80'; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-ink-900">{v.name}</h3>
                      <span className="text-xs bg-ink-100 text-ink-500 px-2 py-0.5 rounded-full capitalize">{v.type}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-ink-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        {v.capacity} passagers
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.5H2l4-8 4 2 2-6 2 6 4-2 4 8z"/></svg>
                        Climatisé
                      </span>
                      <span className="flex items-center gap-1 text-green-600">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
                        60 min d'attente gratuite
                      </span>
                      <span className="flex items-center gap-1 text-green-600">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
                        Annulation gratuite 12h avant
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold text-ink-900">{v.pricePerDayMad.toLocaleString()} MAD</div>
                    <div className="text-xs text-ink-400 mb-3">Prix total TTC</div>
                    <button onClick={() => selectVehicle(v)}
                      className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-full transition shadow-md shadow-brand-600/20 text-sm">
                      Réserver maintenant
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}