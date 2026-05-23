'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/api';

export default function Gallery() {
  const t = useTranslations('gallery');
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => { api.get('/gallery').then((r) => setItems(r.data.slice(0, 5))).catch(() => {}); }, []);

  if (!items.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-ink-50">
      <div className="container">
        <div className="text-center mb-12 reveal">
          <div className="text-xs text-brand-600 tracking-[3px] font-semibold mb-3">— {t('tagline')}</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight">{t('title')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {items.map((img, i) => (
            <div key={img.id} style={{ transitionDelay: `${i * 100}ms` }}
              className={`reveal relative overflow-hidden rounded-2xl group ${i === 0 ? 'md:row-span-2 aspect-[4/5] md:aspect-auto' : 'aspect-square'}`}>
              <img src={img.image} alt={img.title || ''} className="w-full h-full object-cover zoom-img" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <span className="text-white font-semibold">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
