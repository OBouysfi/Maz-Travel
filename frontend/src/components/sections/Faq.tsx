'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Faq() {
  const t = useTranslations('faq');
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: t('q1'), a: t('a1') }, { q: t('q2'), a: t('a2') }, { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') }, { q: t('q5'), a: t('a5') },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <div className="text-xs text-brand-600 tracking-[3px] font-semibold mb-3">— {t('tagline')}</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight">{t('title')}</h2>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i}
              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${open === i ? 'border-brand-200 bg-brand-50/40' : 'border-ink-100 bg-white hover:border-ink-200'}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className={`font-semibold ${open === i ? 'text-brand-700' : 'text-ink-900'}`}>{item.q}</span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition text-xl font-bold ${open === i ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-700'}`}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><p className="px-5 pb-5 text-ink-600 leading-relaxed text-sm">{item.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}