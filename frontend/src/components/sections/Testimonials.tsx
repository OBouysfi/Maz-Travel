'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/api';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => { api.get('/testimonials?featured=1').then((r) => setItems(r.data.slice(0, 3))).catch(() => {}); }, []);

  if (!items.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-gradient-warm relative overflow-hidden">
      <div className="absolute top-20 right-20 w-72 h-72 bg-brand-300 rounded-full blur-[100px] opacity-30 animate-blob" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-deep-200 rounded-full blur-[100px] opacity-40 animate-blob" style={{ animationDelay: '3s' }} />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <div className="text-xs text-brand-600 tracking-[3px] font-semibold mb-3">— {t('tagline')}</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 mb-4 tracking-tight">{t('title')}</h2>
          <p className="text-ink-600">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={it.id} className="reveal bg-white rounded-2xl p-7 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative" style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: it.rating }).map((_, i) => <span key={i} className="text-brand-500 text-lg">★</span>)}
              </div>
              <p className="text-ink-700 leading-relaxed mb-5">"{it.comment}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-deep-800 flex items-center justify-center text-white font-bold">{it.name.charAt(0)}</div>
                <div>
                  <div className="font-semibold text-ink-900 text-sm">{it.name}</div>
                  <div className="text-xs text-ink-500">{it.flag} {it.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
