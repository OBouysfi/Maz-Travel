'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-white pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600 rounded-full blur-[120px] opacity-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-deep-800 rounded-full blur-[120px] opacity-20 animate-blob" style={{ animationDelay: '4s' }} />

      <div className="container relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/40">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              </div>
              <div>
                <div className="font-bold text-lg leading-none">Maz Travel</div>
                <div className="text-[10px] tracking-widest uppercase text-brand-300 mt-1">Marrakech · Morocco</div>
              </div>
            </div>
            <p className="text-ink-400 text-sm leading-relaxed mb-6 max-w-sm">{t('tagline')}</p>
            <div className="space-y-2.5 text-sm">
              <div className="text-ink-300">Avenue Mohamed VI, Marrakech 40000</div>
              <div className="text-ink-300"><a href="tel:+212600000000" className="hover:text-white">+212 6 00 00 00 00</a></div>
              <div className="text-ink-300"><a href="mailto:contact@maztravel.ma" className="hover:text-white">contact@maztravel.ma</a></div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">{t('services')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/transferts" className="text-ink-400 hover:text-brand-400 transition">{tn('transfers')}</Link></li>
              <li><Link href="/excursions" className="text-ink-400 hover:text-brand-400 transition">{tn('excursions')}</Link></li>
              <li><Link href="/activites" className="text-ink-400 hover:text-brand-400 transition">{tn('activities')}</Link></li>
              <li><Link href="/mise-a-disposition" className="text-ink-400 hover:text-brand-400 transition">{tn('disposition')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">{t('company')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/a-propos" className="text-ink-400 hover:text-brand-400 transition">{tn('about')}</Link></li>
              <li><Link href="/contact" className="text-ink-400 hover:text-brand-400 transition">{tn('contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">{t('newsletter')}</h4>
            <form className="flex flex-col gap-2.5">
              <input type="email" placeholder={t('newsletterPlaceholder')}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-ink-500 focus:outline-none focus:border-brand-500" />
              <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition">{t('subscribe')}</button>
            </form>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-ink-500">
          <p>© {year} Maz Travel. {t('rights')}</p>
          <div className="flex gap-5 text-xs">
            <a href="#" className="hover:text-white transition">Mentions légales</a>
            <a href="#" className="hover:text-white transition">CGV</a>
            <a href="#" className="hover:text-white transition">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
