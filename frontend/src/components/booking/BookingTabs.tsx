'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { MOROCCO_LOCATIONS } from '@/lib/locations';

type Tab = 'TRANSFER' | 'DISPOSITION';

function LocationIcon({ type }: { type: string }) {
  if (type === 'Aéroport') return (
    <svg className="w-5 h-5 text-brand-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M22 16.5H2l4-8 4 2 2-6 2 6 4-2 4 8z"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  );
  if (type === 'Gare') return (
    <svg className="w-5 h-5 text-brand-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="4" y="3" width="16" height="13" rx="2"/><path d="M4 11h16"/><path d="M8 3v8"/><path d="M16 3v8"/><path d="M7 19l-2 2"/><path d="M17 19l2 2"/><path d="M9 19h6"/>
    </svg>
  );
  return (
    <svg className="w-5 h-5 text-brand-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
}

function useLocationSearch(value: string) {
  if (!value || value.length < 1) {
    const airports = MOROCCO_LOCATIONS.filter(l => l.type === 'Aéroport').slice(0, 4);
    const gares = MOROCCO_LOCATIONS.filter(l => l.type === 'Gare').slice(0, 3);
    const villes = MOROCCO_LOCATIONS.filter(l => l.type === 'Ville').slice(0, 3);
    return [...airports, ...gares, ...villes];
  }
  const q = value.toLowerCase();
  return MOROCCO_LOCATIONS.filter(
    l => l.name.toLowerCase().includes(q) || l.city.toLowerCase().includes(q) || l.type.toLowerCase().includes(q)
  );
}

function LocationInput({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const results = useLocationSearch(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative z-[100]" ref={ref}>
      <input
        value={value}
        onChange={e => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium placeholder:text-ink-400 focus:outline-none focus:border-brand-500"
        style={{ color: '#111827' }}
      />
      {open && results.length > 0 && (
        <div className="absolute z-[9999] top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-ink-100 overflow-hidden">
          {!value && (
            <div className="px-4 pt-3 pb-1 text-xs font-semibold text-ink-400 uppercase tracking-wider">
              Lieux populaires
            </div>
          )}
          <ul className="overflow-y-auto divide-y divide-ink-50" style={{ maxHeight: '380px' }}>
            {results.map((loc, i) => (
              <li key={i}>
                <button
                  type="button"
                  onMouseDown={() => { onChange(loc.name); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-50 transition text-left"
                >
                  <LocationIcon type={loc.type} />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink-900 truncate">{loc.name}</div>
                    <div className="text-xs text-ink-400">{loc.city}, Maroc · {loc.type}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function BookingTabs() {
  const t = useTranslations('booking');
  const locale = useLocale();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('TRANSFER');

  const [form, setForm] = useState({
    pickupLocation: '', dropLocation: '', location: '',
    date: '', time: '12:00', duration: 'half',
    adults: 2, children: 0, babies: 0,
  });

  const swap = () => setForm({ ...form, pickupLocation: form.dropLocation, dropLocation: form.pickupLocation });

  const search = () => {
    if (tab === 'TRANSFER') {
      const params = new URLSearchParams({
        from: form.pickupLocation,
        to: form.dropLocation,
        date: form.date,
        time: form.time,
        adults: String(form.adults),
        children: String(form.children),
        babies: String(form.babies),
      });
      router.push(`/${locale}/transferts?${params.toString()}`);
    } else {
      const params = new URLSearchParams({
        location: form.location,
        date: form.date,
        time: form.time,
        duration: form.duration,
        adults: String(form.adults),
        children: String(form.children),
        babies: String(form.babies),
        type: 'DISPOSITION',
      });
      router.push(`/${locale}/transferts?${params.toString()}`);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl p-6 lg:p-8 shadow-2xl text-left">
      {/* TABS */}
      <div className="bg-ink-100 rounded-full p-1.5 flex gap-1 mb-6">
        <button onClick={() => setTab('TRANSFER')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-400 ${tab === 'TRANSFER' ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30' : 'text-ink-700 hover:text-ink-900'}`}>
          {t('tabTransfer')}
        </button>
        <button onClick={() => setTab('DISPOSITION')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-400 ${tab === 'DISPOSITION' ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30' : 'text-ink-700 hover:text-ink-900'}`}>
          {t('tabDisposition')}
        </button>
      </div>

      {tab === 'TRANSFER' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-3 items-center">
            <LocationInput value={form.pickupLocation} onChange={v => setForm({ ...form, pickupLocation: v })} placeholder={t('pickup')} />
            <button onClick={swap} type="button" title={t('swap')} className="w-11 h-11 bg-ink-100 hover:bg-brand-100 hover:text-brand-600 rounded-full flex items-center justify-center transition group">
              <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            </button>
            <LocationInput value={form.dropLocation} onChange={v => setForm({ ...form, dropLocation: v })} placeholder={t('dropoff')} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium focus:outline-none focus:border-brand-500" style={{ color: '#111827' }} />
            <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium focus:outline-none focus:border-brand-500" style={{ color: '#EA580C' }} />
            <button onClick={search} className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-full transition hover:scale-[1.02] shadow-lg shadow-brand-600/30">
              {t('search')}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <LocationInput value={form.location} onChange={v => setForm({ ...form, location: v })} placeholder={t('location')} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium focus:outline-none focus:border-brand-500" style={{ color: '#111827' }} />
            <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium focus:outline-none focus:border-brand-500" style={{ color: '#EA580C' }} />
            <select value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium focus:outline-none focus:border-brand-500 bg-white" style={{ color: '#111827' }}>
              <option value="half">{t('durations.half')}</option>
              <option value="full">{t('durations.full')}</option>
              <option value="multi">{t('durations.multi')}</option>
            </select>
            <button onClick={search} className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-full transition hover:scale-[1.02] shadow-lg shadow-brand-600/30">
              {t('search')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}