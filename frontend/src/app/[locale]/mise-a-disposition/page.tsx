'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageHeader from '@/components/layout/PageHeader';

export default function DispositionPage() {
  const t = useTranslations('dispositionPage');

  const durations = [
    { label: t('halfDay'), desc: '4h', price: 800 },
    { label: t('fullDay'), desc: '8h-10h', price: 1400 },
    { label: t('multiDay'), desc: '2 jours +', price: 'Sur devis' },
  ];
  const uses = [t('tourism'), t('business'), t('events'), t('private')];

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} badge="🚙" />

      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-10 text-center">{t('durations')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {durations.map((d, i) => (
              <div key={i} className="card p-7 text-center group">
                <div className="w-14 h-14 rounded-xl bg-brand-50 group-hover:bg-brand-600 transition flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-brand-600 group-hover:text-white transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h3 className="font-bold text-lg text-ink-900 mb-1">{d.label}</h3>
                <div className="text-sm text-ink-500 mb-4">{d.desc}</div>
                <div className="text-2xl font-bold text-brand-600 mb-5">
                  {typeof d.price === 'number' ? <>{d.price} <span className="text-sm">MAD</span></> : d.price}
                </div>
                <Link href="/contact" className="block bg-ink-900 hover:bg-brand-600 text-white py-2.5 rounded-xl text-sm font-semibold transition">Réserver</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-ink-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-3 text-center">{t('uses')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {uses.map((u, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center border border-ink-100 hover:border-brand-300 hover:-translate-y-1 transition duration-500">
                <div className="font-semibold text-ink-900">{u}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
