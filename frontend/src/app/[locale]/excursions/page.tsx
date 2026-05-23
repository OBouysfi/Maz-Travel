'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageHeader from '@/components/layout/PageHeader';
import { api } from '@/lib/api';
import { useCurrencyStore } from '@/store/currency';

export default function ExcursionsPage() {
  const t = useTranslations('excursionsPage');
  const locale = useLocale();
  const { currency } = useCurrencyStore();
  const [items, setItems] = useState<any[]>([]);
  const [filters, setFilters] = useState({ search: '', minPrice: '', maxPrice: '', sort: '' });

  const load = () => {
    const params = new URLSearchParams({ lang: locale });
    if (filters.search) params.set('search', filters.search);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.sort) params.set('sort', filters.sort);
    api.get(`/excursions?${params}`).then((r) => setItems(r.data)).catch(() => {});
  };

  useEffect(() => { load(); }, [locale]);

  const priceFor = (e: any) => currency === 'EUR' ? (e.priceEur || Math.round(e.priceMad / 10.8)) : currency === 'USD' ? (e.priceUsd || Math.round(e.priceMad / 9.85)) : e.priceMad;

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} badge="🏜️" />

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          <aside className="space-y-6">
            <div className="bg-white border-l-4 border-brand-600 rounded-xl shadow-lg p-6 lg:sticky lg:top-24">
              <h3 className="font-bold text-lg mb-5 text-ink-900">{t('searchTitle')}</h3>
              <div className="space-y-3">
                <select value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full px-4 py-3 border border-ink-200 rounded-lg text-sm bg-white focus:outline-none focus:border-brand-500">
                  <option value="">{t('selectExcursion')}</option>
                  {items.map((i) => <option key={i.id} value={i.title}>{i.title}</option>)}
                </select>
                <input type="date" className="w-full px-4 py-3 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500" />
                <select className="w-full px-4 py-3 border border-ink-200 rounded-lg text-sm bg-white focus:outline-none focus:border-brand-500">
                  {[1,2,3,4,5,6].map(n => <option key={n}>{n} adulte{n>1?'s':''}</option>)}
                </select>
                <select className="w-full px-4 py-3 border border-ink-200 rounded-lg text-sm bg-white focus:outline-none focus:border-brand-500">
                  {[0,1,2,3].map(n => <option key={n}>{n} enfant{n>1?'s':''} (-12)</option>)}
                </select>
                <select className="w-full px-4 py-3 border border-ink-200 rounded-lg text-sm bg-white focus:outline-none focus:border-brand-500">
                  {[0,1,2].map(n => <option key={n}>{n} bébé{n>1?'s':''} (-3)</option>)}
                </select>
                <button onClick={load} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg uppercase text-sm tracking-wider transition shadow-lg shadow-brand-600/30">
                  {t('search')}
                </button>
              </div>
            </div>

            <div className="bg-white border-l-4 border-brand-600 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-5 text-ink-900 text-center">{t('contactUs')}</h3>
              <div className="flex justify-center gap-3 flex-wrap">
                <a href="tel:+212600000000" className="w-12 h-12 bg-deep-100 hover:bg-deep-600 hover:text-white rounded-full flex items-center justify-center text-deep-800 transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </a>
                <a href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP || '+212600000000').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-green-100 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center text-green-700 transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/></svg>
                </a>
                <a href="mailto:contact@maztravel.ma" className="w-12 h-12 bg-brand-100 hover:bg-brand-600 hover:text-white rounded-full flex items-center justify-center text-brand-700 transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </a>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6 bg-ink-50 p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-ink-700">{t('filterPrice')} :</span>
                <input type="number" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} placeholder={t('min')}
                  className="w-20 px-3 py-1.5 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500" />
                <input type="number" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} placeholder={t('max')}
                  className="w-20 px-3 py-1.5 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500" />
              </div>
              <select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="px-3 py-1.5 border border-ink-200 rounded-lg text-sm bg-white focus:outline-none focus:border-brand-500">
                <option value="">{t('sortBy')} : {t('sortRelevance')}</option>
                <option value="price_asc">{t('sortPriceAsc')}</option>
                <option value="price_desc">{t('sortPriceDesc')}</option>
              </select>
              <button onClick={load} className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-1.5 rounded-lg text-sm font-bold transition">{t('ok')}</button>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-20 text-ink-500">{t('noResults')}</div>
            ) : (
              <div className="space-y-5">
                {items.map((ex) => (
                  <div key={ex.id} className="bg-white rounded-2xl border border-ink-100 overflow-hidden hover:shadow-xl transition-all group">
                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
                      <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-ink-100">
                        <img src={ex.image} alt={ex.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        <div className="absolute top-3 right-3 bg-brand-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-lg text-base">{priceFor(ex)} {currency}</div>
                        {ex.tag && <div className="absolute bottom-3 left-3"><div className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">{ex.tag}</div></div>}
                      </div>
                      <div className="p-5 flex flex-col">
                        <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-1 mb-1">
                              <div className="w-1 h-5 bg-brand-600 rounded" />
                              <h2 className="text-lg font-bold text-ink-900">{ex.title}</h2>
                            </div>
                            {ex.badges?.includes('TripAdvisor') && (
                              <div className="mt-2 inline-flex items-center gap-1 bg-[#34E0A1] text-black px-2 py-0.5 rounded text-xs font-bold">
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="14" r="3"/><circle cx="18" cy="14" r="3"/><path d="M12 6c-2 0-3.5 1-4 3h8c-.5-2-2-3-4-3z"/></svg>
                                TripAdvisor
                              </div>
                            )}
                          </div>
                          {ex.badges?.includes('WiFi') && (
                            <div className="bg-ink-900 text-white text-[9px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1">
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                              WiFi
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-ink-600 leading-relaxed mb-4 line-clamp-2">{ex.description}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-ink-100 mt-auto flex-wrap gap-2">
                          <div className="flex items-center gap-5 text-xs text-ink-600">
                            <span className="flex items-center gap-1.5">📅 <span className="font-medium">{ex.duration}</span></span>
                            {ex.badges?.includes('Annulation gratuite') && <span className="flex items-center gap-1.5 text-brand-600 font-medium">✓ {t('freeCancellation')}</span>}
                          </div>
                          <Link href="/contact" className="border-2 border-ink-900 hover:bg-ink-900 hover:text-white text-ink-900 px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition">
                            {t('details')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
