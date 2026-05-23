'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useCurrencyStore } from '@/store/currency';

export default function Services() {
  const t = useTranslations('services');
  const { currency } = useCurrencyStore();

  const items = [
    { title: t('transfers'), desc: t('transfersDesc'), href: '/transferts', priceMad: 250, priceEur: 25, priceUsd: 28, accent: 'brand', popular: true },
    { title: t('excursions'), desc: t('excursionsDesc'), href: '/excursions', priceMad: 450, priceEur: 45, priceUsd: 49, accent: 'brand' },
    { title: t('activities'), desc: t('activitiesDesc'), href: '/activites', priceMad: 200, priceEur: 20, priceUsd: 22, accent: 'deep' },
    { title: t('disposition'), desc: t('dispositionDesc'), href: '/mise-a-disposition', priceMad: 800, priceEur: 80, priceUsd: 88, accent: 'dark' },
  ];

  const priceFor = (s: any) => currency === 'EUR' ? s.priceEur : currency === 'USD' ? s.priceUsd : s.priceMad;

  return (
    <section className="py-20 lg:py-28 bg-ink-50 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-200 rounded-full blur-[120px] opacity-30 animate-blob" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-deep-200 rounded-full blur-[120px] opacity-30 animate-blob" style={{ animationDelay: '3s' }} />

      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <div className="text-xs text-brand-600 tracking-[3px] font-semibold mb-3">— {t('tagline')}</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 mb-4 tracking-tight">{t('title')}</h2>
          <p className="text-ink-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((s, i) => {
            const isDark = s.accent === 'dark';
            const isDeep = s.accent === 'deep';
            return (
              <Link key={s.title} href={s.href as any} style={{ transitionDelay: `${i * 100}ms` }}
                className={`reveal group relative rounded-2xl p-6 border transition-all duration-500 hover:-translate-y-3 ${
                  isDark ? 'bg-ink-900 text-white border-ink-900 overflow-hidden'
                  : isDeep ? 'bg-white border-ink-100 hover:border-deep-300 hover:shadow-2xl'
                  : 'bg-white border-ink-100 hover:border-brand-300 hover:shadow-2xl'
                }`}>
                {isDark && <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition" />}
                {s.popular && <div className="absolute top-4 right-4 bg-brand-600 text-white text-[10px] font-bold tracking-wider px-2 py-1 rounded animate-pulse">★</div>}
                <h3 className={`relative font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-ink-900'}`}>{s.title}</h3>
                <p className={`relative text-sm leading-relaxed mb-5 ${isDark ? 'text-ink-300' : 'text-ink-600'}`}>{s.desc}</p>
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className={`text-[10px] tracking-wider font-semibold ${isDark ? 'text-brand-300' : 'text-ink-400'}`}>{t('from')}</div>
                    <div className={`text-xl font-bold ${isDark ? 'text-brand-400' : isDeep ? 'text-deep-800' : 'text-brand-600'}`}>
                      {priceFor(s)} <span className="text-xs font-medium">{currency}</span>
                    </div>
                  </div>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1 ${isDark ? 'bg-white/10 group-hover:bg-brand-600' : 'bg-ink-100 group-hover:bg-brand-600'}`}>
                    <svg className={`w-4 h-4 transition ${isDark ? 'text-white' : 'text-ink-700 group-hover:text-white'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
