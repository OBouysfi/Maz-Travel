'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageHeader from '@/components/layout/PageHeader';
import { api } from '@/lib/api';
import { useCurrencyStore } from '@/store/currency';

export default function TransfersPage() {
  const t = useTranslations('transfersPage');
  const { currency } = useCurrencyStore();
  const [routes, setRoutes] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    api.get('/transfers').then((r) => setRoutes(r.data)).catch(() => {});
    api.get('/vehicles').then((r) => setVehicles(r.data)).catch(() => {});
  }, []);

  const priceFor = (r: any) => currency === 'EUR' ? (r.priceEur || Math.round(r.priceMad / 10.8)) : currency === 'USD' ? (r.priceUsd || Math.round(r.priceMad / 9.85)) : r.priceMad;

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} badge="✈️ 24/7" />

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

      <section className="py-16 lg:py-20 bg-ink-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-3">{t('fleet')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {vehicles.map((v) => (
              <div key={v.id} className="card group">
                <div className="aspect-[4/3] overflow-hidden bg-ink-100">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover zoom-img" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-brand-600 font-semibold mb-1">{v.type.toUpperCase()}</div>
                  <h3 className="font-bold text-ink-900">{v.name}</h3>
                  <p className="text-sm text-ink-500 mt-1">{v.capacity} pax</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
