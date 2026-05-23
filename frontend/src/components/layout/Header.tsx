'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useCurrencyStore } from '@/store/currency';

const locales = [{ code: 'fr', label: 'FR' }, { code: 'en', label: 'EN' }, { code: 'es', label: 'ES' }];
const currencies = ['MAD', 'EUR', 'USD'] as const;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrencyStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [curOpen, setCurOpen] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || !isHome;

  const links = [
    { href: '/', label: t('home') },
    { href: '/transferts', label: t('transfers') },
    { href: '/excursions', label: t('excursions') },
    { href: '/activites', label: t('activities') },
    { href: '/mise-a-disposition', label: t('disposition') },
    { href: '/a-propos', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      solid ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-ink-100 py-3' : 'bg-transparent py-4'
    )}>
      <div className="container flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center group-hover:rotate-180 transition-transform duration-700 shadow-lg shadow-brand-500/40">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
              <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
          </div>
          <div>
            <div className={cn('font-bold text-base leading-none tracking-tight transition-colors', solid ? 'text-ink-900' : 'text-white')}>Maz Travel</div>
            <div className={cn('text-[9px] tracking-widest uppercase mt-0.5 transition-colors', solid ? 'text-ink-400' : 'text-white/70')}>Marrakech · Morocco</div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href as any}
              className={cn(
                'px-3 py-2 text-[13px] font-medium rounded-lg transition-all',
                pathname === l.href
                  ? (solid ? 'text-brand-600 bg-brand-50' : 'text-white bg-white/15')
                  : (solid ? 'text-ink-700 hover:text-brand-600 hover:bg-ink-50' : 'text-white/90 hover:text-white hover:bg-white/10')
              )}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-1">
          <div className="relative">
            <button onClick={() => { setCurOpen(!curOpen); setLangOpen(false); }}
              className={cn('px-3 py-2 rounded-lg text-sm font-semibold transition',
                solid ? 'text-ink-700 hover:bg-ink-50' : 'text-white hover:bg-white/10')}>
              {currency}
            </button>
            {curOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-xl p-1.5 min-w-[80px] border border-ink-100 animate-scale-in">
                {currencies.map((c) => (
                  <button key={c} onClick={() => { setCurrency(c); setCurOpen(false); }}
                    className={cn('block w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-brand-50 transition', currency === c && 'text-brand-600 font-semibold bg-brand-50/50')}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => { setLangOpen(!langOpen); setCurOpen(false); }}
              className={cn('px-3 py-2 rounded-lg text-sm font-semibold transition',
                solid ? 'text-ink-700 hover:bg-ink-50' : 'text-white hover:bg-white/10')}>
              {locale.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-xl p-1.5 min-w-[80px] border border-ink-100 animate-scale-in">
                {locales.map((l) => (
                  <Link key={l.code} href={pathname as any} locale={l.code as any}
                    onClick={() => setLangOpen(false)}
                    className={cn('block px-3 py-2 text-sm rounded-lg hover:bg-brand-50 transition', locale === l.code && 'text-brand-600 font-semibold bg-brand-50/50')}>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/contact" className="btn-primary text-sm py-2.5 px-5 ml-2">{t('book')}</Link>
        </div>

        <button onClick={() => setOpen(!open)} className={cn('xl:hidden p-2 rounded-lg transition', solid ? 'text-ink-900 hover:bg-ink-50' : 'text-white hover:bg-white/10')}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            {open ? <path d="M18 6L6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-white border-t border-ink-100 absolute top-full left-0 right-0 shadow-xl animate-fade-down">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href as any} onClick={() => setOpen(false)}
                className={cn('px-4 py-3 rounded-lg font-medium transition',
                  pathname === l.href ? 'text-brand-600 bg-brand-50' : 'text-ink-800 hover:bg-ink-50')}>
                {l.label}
              </Link>
            ))}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-100">
              <div className="flex gap-1.5">
                {locales.map((l) => (
                  <Link key={l.code} href={pathname as any} locale={l.code as any}
                    onClick={() => setOpen(false)}
                    className={cn('px-3 py-1.5 rounded-md text-xs font-semibold border transition',
                      locale === l.code ? 'bg-brand-600 text-white border-brand-600' : 'border-ink-200 text-ink-800')}>
                    {l.label}
                  </Link>
                ))}
              </div>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary text-sm py-2 px-4">{t('book')}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
