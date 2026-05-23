'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { api } from '@/lib/api';
import { useCurrencyStore } from '@/store/currency';

export default function ExcursionsSection() {
  const t = useTranslations('excursions');
  const locale = useLocale();
  const { currency } = useCurrencyStore();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    api.get(`/excursions?featured=1&lang=${locale}&limit=4`).then((r) => setItems(r.data)).catch(() => {});
  }, [locale]);

  const priceFor = (e: any) => currency === 'EUR' ? (e.priceEur || Math.round(e.priceMad / 10.8)) : currency === 'USD' ? (e.priceUsd || Math.round(e.priceMad / 9.85)) : e.priceMad;

  if (!items.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div className="reveal">
            <div className="text-xs text-brand-600 tracking-[3px] font-semibold mb-3">— {t('tagline')}</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight">{t('title')}</h2>
          </div>
          <Link href="/excursions" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 reveal group">
            {t('viewAll')}
            <svg className="w-4 h-4 group-hover:translate-x-2 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((ex, i) => (
            <Link key={ex.id} href="/excursions" className="group block reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="card">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-100">
                  <img src={ex.image} alt={ex.title} className="w-full h-full object-cover zoom-img" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur text-ink-900 px-3 py-1.5 rounded-lg text-xs font-bold">{priceFor(ex)} {currency}</div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    {ex.tag && <div className="text-[10px] tracking-wider text-brand-300 font-semibold mb-1">{ex.tag}</div>}
                    <h3 className="font-bold text-lg leading-tight mb-2">{ex.title}</h3>
                    <div className="text-xs text-white/90">⏱ {ex.duration}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
