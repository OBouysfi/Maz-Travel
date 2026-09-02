'use client';

import { useTranslations } from 'next-intl';
import BookingTabs from '@/components/booking/BookingTabs';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[760px] overflow-visible bg-ink-900">
      {/* <video
        className="absolute inset-0 w-full h-full object-cover overflow-hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="https://videos.pexels.com/video-files/4146226/4146226-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video> */}
      <img src="\images\hero.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover overflow-hidden" />     
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/55 via-ink-900/35 to-ink-900/85" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-2 h-2 rounded-full bg-brand-500 opacity-60 animate-float" style={{ top: '20%', left: '10%' }} />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-white opacity-40 animate-float" style={{ top: '60%', left: '15%', animationDelay: '1s' }} />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-brand-400 opacity-50 animate-float" style={{ top: '35%', right: '15%', animationDelay: '2s' }} />
        <div className="absolute w-1 h-1 rounded-full bg-white opacity-60 animate-float" style={{ top: '75%', right: '20%', animationDelay: '0.5s' }} />
      </div>

      <div className="relative flex flex-col items-center justify-center text-center text-white px-4 pt-32 pb-16 z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-medium mb-6 animate-fade-down">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {t('badge')}
        </div>

        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-4 animate-fade-up max-w-5xl"
          style={{ animationDelay: '100ms' }}
        >
          {t('title1')}<br />
          {t('title2')} <span className="text-gradient">{t('titleAccent')}</span>
        </h1>

        <p
          className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          {t('subtitle')}
        </p>

        <div
          className="w-full animate-scale-in flex justify-center"
          style={{ animationDelay: '300ms' }}
        >
          <BookingTabs />
        </div>

        <div
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm text-white/90 animate-fade-up"
          style={{ animationDelay: '400ms' }}
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t('trustPrice')}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t('trustPayment')}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t('trustSupport')}
          </span>
        </div>
      </div>
    </section>
  );
}