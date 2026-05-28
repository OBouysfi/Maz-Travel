'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageHeader from '@/components/layout/PageHeader';
import { api } from '@/lib/api';
import { useCurrencyStore } from '@/store/currency';

export default function ActivitiesPage() {
  const t = useTranslations('activitiesPage');
  const locale = useLocale();
  const { currency } = useCurrencyStore();
  const [items, setItems] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'marrakech' | 'agafay' | 'other'>('all');

  useEffect(() => {
    const url = filter === 'all' ? `/activities?lang=${locale}` : `/activities?category=${filter}&lang=${locale}`;
    api.get(url).then((r) => setItems(r.data)).catch(() => {});
  }, [filter, locale]);

  const priceFor = (a: any) => currency === 'EUR' ? (a.priceEur || Math.round(a.priceMad / 10.8)) : currency === 'USD' ? (a.priceUsd || Math.round(a.priceMad / 9.85)) : a.priceMad;

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} badge="🌟" />
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {(['all','marrakech','agafay','other'] as const).map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${filter === c ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>
                {t(c)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((a) => (
              <div key={a.id} className="card group">
                <div className="relative aspect-[5/4] overflow-hidden bg-ink-100">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover zoom-img" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur text-ink-900 px-3 py-1 rounded-lg text-xs font-bold">{priceFor(a)} {currency}</div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-ink-900">{a.title}</h3>
                    <div className="text-xs text-ink-500 mt-1">⏱ {a.duration}</div>
                  </div>
                  <Link href="/contact" className="bg-ink-900 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition">Réserver</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
