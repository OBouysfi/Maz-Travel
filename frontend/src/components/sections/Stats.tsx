'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

function CountUp({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const t = useTranslations('stats');
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 bg-gradient-night rounded-3xl p-8 lg:p-12 relative overflow-hidden reveal">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500 rounded-full blur-[100px] opacity-30 animate-blob" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-deep-500 rounded-full blur-[100px] opacity-20 animate-blob" style={{ animationDelay: '2s' }} />
          <div className="text-center relative">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-400 mb-2"><CountUp end={5000} suffix="+" /></div>
            <div className="text-xs md:text-sm text-ink-300">{t('clients')}</div>
          </div>
          <div className="text-center relative">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-400 mb-2"><CountUp end={50} suffix="+" /></div>
            <div className="text-xs md:text-sm text-ink-300">{t('destinations')}</div>
          </div>
          <div className="text-center relative">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-400 mb-2"><CountUp end={10} suffix="+" /></div>
            <div className="text-xs md:text-sm text-ink-300">{t('years')}</div>
          </div>
          <div className="text-center relative">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-400 mb-2">24/7</div>
            <div className="text-xs md:text-sm text-ink-300">{t('support')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
