'use client';

import { useTranslations } from 'next-intl';
import PageHeader from '@/components/layout/PageHeader';

export default function AboutPage() {
  const t = useTranslations('about');
  const values = [
    { title: t('ponctuality'), desc: t('ponctualityDesc') },
    { title: t('comfort'), desc: t('comfortDesc') },
    { title: t('safety'), desc: t('safetyDesc') },
    { title: t('service'), desc: t('serviceDesc') },
  ];

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('intro')} badge={t('tagline')} />

      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="text-xs text-brand-600 tracking-[3px] font-semibold mb-3">— {t('story').toUpperCase()}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight mb-6">{t('story')}</h2>
              <p className="text-ink-600 leading-relaxed mb-4">{t('storyText')}</p>
              <p className="text-ink-600 leading-relaxed">{t('intro')}</p>
              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-ink-100">
                <div><div className="text-3xl font-bold text-brand-600">10+</div><div className="text-xs text-ink-500 mt-1">Années</div></div>
                <div><div className="text-3xl font-bold text-brand-600">5K+</div><div className="text-xs text-ink-500 mt-1">Clients</div></div>
                <div><div className="text-3xl font-bold text-brand-600">50+</div><div className="text-xs text-ink-500 mt-1">Destinations</div></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src="https://images.unsplash.com/photo-1539020140153-e479b8c5cf75?w=600&q=80" alt="" className="rounded-2xl aspect-[3/4] object-cover" />
              <div className="space-y-3 pt-8">
                <img src="https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80" alt="" className="rounded-2xl aspect-square object-cover" />
                <img src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80" alt="" className="rounded-2xl aspect-square object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-ink-50">
        <div className="container">
          <div className="text-center mb-12 reveal">
            <div className="text-xs text-brand-600 tracking-[3px] font-semibold mb-3">— {t('values').toUpperCase()}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight">{t('values')}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="reveal bg-white rounded-2xl p-6 border border-ink-100 hover:border-brand-300 hover:shadow-xl transition duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 mb-4" />
                <h3 className="font-bold text-ink-900 mb-1">{v.title}</h3>
                <p className="text-sm text-ink-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
