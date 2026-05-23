'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function CTA() {
  const t = useTranslations('cta');
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || '+212600000000';

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="reveal relative rounded-3xl overflow-hidden bg-gradient-to-br from-ink-900 via-ink-900 to-deep-900 p-10 lg:p-16 text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600 rounded-full blur-[120px] opacity-30 animate-blob" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-deep-700 rounded-full blur-[120px] opacity-40 animate-blob" style={{ animationDelay: '3s' }} />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">{t('title')}</h2>
            <p className="text-ink-300 text-base md:text-lg mb-8">{t('subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-primary text-base px-7 py-4">{t('button')} →</Link>
              <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base px-7 py-4">{t('whatsapp')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
