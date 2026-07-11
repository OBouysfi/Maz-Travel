'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import PageHeader from '@/components/layout/PageHeader';
import { api } from '@/lib/api';
import { useCurrencyStore } from '@/store/currency';

export default function ExcursionDetailPage() {
  const t = useTranslations('excursionsPage');
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const { currency } = useCurrencyStore();

  const [excursion, setExcursion] = useState<any>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  // ------- Formulaire de devis -------
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formResult, setFormResult] = useState<any>(null);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    date: '', adults: '2', children: '0', babies: '0', message: '',
  });

  useEffect(() => {
    if (!slug) return;
    setStatus('loading');
    api.get(`/excursions/${slug}?lang=${locale}`)
      .then((r) => { setExcursion(r.data); setStatus('success'); })
      .catch(() => setStatus('error'));
  }, [slug, locale]);

  const priceFor = (e: any) =>
    currency === 'EUR' ? (e.priceEur || Math.round(e.priceMad / 10.8)) :
    currency === 'USD' ? (e.priceUsd || Math.round(e.priceMad / 9.85)) : e.priceMad;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date) {
      setFormStatus('error');
      return;
    }
    setFormStatus('loading');
    try {
      const payload = {
        fullName: form.fullName, email: form.email, phone: form.phone,
        language: locale, serviceType: 'EXCURSION',
        excursionId: excursion?.id,
        date: form.date,
        adults: +form.adults, children: +form.children, babies: +form.babies,
        message: form.message || null,
      };
      const { data } = await api.post('/quotes', payload);
      setFormResult(data.quote);
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  };

  if (status === 'loading') {
    return (
      <div className="py-32 text-center text-ink-500">
        Chargement...
      </div>
    );
  }

  if (status === 'error' || !excursion) {
    return (
      <div className="py-32 text-center">
        <p className="text-ink-500 mb-4">Excursion introuvable.</p>
        <button onClick={() => router.push(`/${locale}/excursions`)} className="text-brand-600 underline">
          Retour aux excursions
        </button>
      </div>
    );
  }

  const gallery: string[] = excursion.gallery || [];

  return (
    <>
      <PageHeader title={excursion.title} subtitle={excursion.duration} badge="🏜️" />

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

          {/* CONTENU PRINCIPAL */}
          <div>
            <div className="rounded-2xl overflow-hidden mb-6 aspect-[16/9] bg-ink-100">
              <img src={excursion.image} alt={excursion.title} className="w-full h-full object-cover" />
            </div>

            {gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-8">
                {gallery.slice(0, 3).map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-square bg-ink-100">
                    <img src={img} alt={`${excursion.title} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            <div className="bg-white rounded-2xl border border-ink-100 p-6 mb-6">
              <h2 className="text-xl font-bold text-ink-900 mb-4">Description</h2>
              <p className="text-ink-600 leading-relaxed whitespace-pre-wrap">{excursion.description}</p>
            </div>

            {excursion.program && (
              <div className="bg-white rounded-2xl border border-ink-100 p-6 mb-6">
                <h2 className="text-xl font-bold text-ink-900 mb-4">Programme</h2>
                <div className="text-ink-600 leading-relaxed whitespace-pre-wrap">{excursion.program}</div>
              </div>
            )}

            {excursion.badges?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {excursion.badges.map((b: string) => (
                  <span key={b} className="bg-ink-100 text-ink-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR: RÉSERVATION */}
          <aside>
            <div className="bg-white border-l-4 border-brand-600 rounded-xl shadow-lg p-6 lg:sticky lg:top-24">

              <div className="flex items-baseline justify-between mb-5">
                <span className="text-sm text-ink-500">À partir de</span>
                <span className="text-2xl font-bold text-brand-600">{priceFor(excursion)} {currency}</span>
              </div>

              {formStatus === 'success' && formResult ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="font-bold text-ink-900 mb-1">Demande envoyée !</h3>
                  <div className="inline-block bg-brand-50 border border-brand-200 text-brand-700 font-mono font-bold px-3 py-1.5 rounded-lg text-sm my-2">
                    {formResult.quoteNumber}
                  </div>
                  <p className="text-ink-600 text-sm">Nous vous contacterons rapidement.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <input
                    required type="date" value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    style={{ color: '#111827' }}
                    className="w-full px-4 py-3 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <select value={form.adults} onChange={(e) => setForm({ ...form, adults: e.target.value })}
                      style={{ color: '#111827' }}
                      className="px-2 py-3 border border-ink-200 rounded-lg text-xs bg-white focus:outline-none focus:border-brand-500">
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Ad.</option>)}
                    </select>
                    <select value={form.children} onChange={(e) => setForm({ ...form, children: e.target.value })}
                      style={{ color: '#111827' }}
                      className="px-2 py-3 border border-ink-200 rounded-lg text-xs bg-white focus:outline-none focus:border-brand-500">
                      {[0,1,2,3].map(n => <option key={n} value={n}>{n} Enf.</option>)}
                    </select>
                    <select value={form.babies} onChange={(e) => setForm({ ...form, babies: e.target.value })}
                      style={{ color: '#111827' }}
                      className="px-2 py-3 border border-ink-200 rounded-lg text-xs bg-white focus:outline-none focus:border-brand-500">
                      {[0,1,2].map(n => <option key={n} value={n}>{n} Béb.</option>)}
                    </select>
                  </div>
                  <input
                    required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Nom complet" style={{ color: '#111827' }}
                    className="w-full px-4 py-3 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                  />
                  <input
                    required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email" style={{ color: '#111827' }}
                    className="w-full px-4 py-3 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                  />
                  <input
                    required value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9+\s]/g, '') })}
                    inputMode="tel" placeholder="Téléphone" style={{ color: '#111827' }}
                    className="w-full px-4 py-3 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                  />
                  <textarea
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Message (optionnel)" rows={3} style={{ color: '#111827' }}
                    className="w-full px-4 py-3 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 resize-none"
                  />

                  {formStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                      Une erreur est survenue.
                    </div>
                  )}

                  <button
                    type="submit" disabled={formStatus === 'loading'}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg uppercase text-sm tracking-wider transition shadow-lg shadow-brand-600/30 disabled:opacity-60"
                  >
                    {formStatus === 'loading' ? '...' : 'Demander un devis'}
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}