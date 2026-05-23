'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { api } from '@/lib/api';

type Tab = 'TRANSFER' | 'DISPOSITION';

export default function BookingTabs() {
  const t = useTranslations('booking');
  const locale = useLocale();
  const [tab, setTab] = useState<Tab>('TRANSFER');
  const [step, setStep] = useState<'search' | 'details'>('search');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);

  const [form, setForm] = useState({
    pickupLocation: '', dropLocation: '', location: '',
    date: '', time: '12:00', duration: 'half',
    adults: 2, children: 0, babies: 0,
    fullName: '', email: '', phone: '', message: '',
  });

  const swap = () => setForm({ ...form, pickupLocation: form.dropLocation, dropLocation: form.pickupLocation });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const payload: any = {
        fullName: form.fullName, email: form.email, phone: form.phone,
        language: locale, serviceType: tab,
        date: form.date, time: form.time,
        adults: form.adults, children: form.children, babies: form.babies,
        message: form.message || null,
      };
      if (tab === 'TRANSFER') {
        payload.pickupLocation = form.pickupLocation;
        payload.dropLocation = form.dropLocation;
      } else {
        payload.pickupLocation = form.location;
        payload.duration = form.duration;
      }
      const { data } = await api.post('/quotes', payload);
      setResult(data.quote);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success' && result) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-8 lg:p-10 shadow-2xl text-center animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="text-2xl font-bold text-ink-900 mb-2">{t('success')}</h3>
        <div className="inline-block bg-brand-50 border border-brand-200 text-brand-700 font-mono font-bold px-4 py-2 rounded-lg mt-2 mb-4">{result.quoteNumber}</div>
        <p className="text-ink-600 mb-6">{t('successMsg')}</p>
        <button onClick={() => { setStatus('idle'); setStep('search'); setResult(null); }} className="btn-outline">OK</button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl p-6 lg:p-8 shadow-2xl text-left">
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

      {step === 'search' && (
        <div className="space-y-4 animate-fade-in">
          {tab === 'TRANSFER' ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-3 items-center">
                <input value={form.pickupLocation} onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                  placeholder={t('pickup')} className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium placeholder:text-ink-400 focus:outline-none focus:border-brand-500" />
                <button onClick={swap} type="button" title={t('swap')} className="w-11 h-11 bg-ink-100 hover:bg-brand-100 hover:text-brand-600 rounded-full flex items-center justify-center transition group">
                  <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                </button>
                <input value={form.dropLocation} onChange={(e) => setForm({ ...form, dropLocation: e.target.value })}
                  placeholder={t('dropoff')} className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium placeholder:text-ink-400 focus:outline-none focus:border-brand-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium focus:outline-none focus:border-brand-500 text-ink-700" />
                <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium focus:outline-none focus:border-brand-500 text-brand-600" />
                <button onClick={() => setStep('details')} className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-full transition hover:scale-[1.02] shadow-lg shadow-brand-600/30">
                  {t('search')}
                </button>
              </div>
            </>
          ) : (
            <>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder={t('location')} className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium placeholder:text-ink-400 focus:outline-none focus:border-brand-500" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium focus:outline-none focus:border-brand-500 text-ink-700" />
                <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium focus:outline-none focus:border-brand-500 text-brand-600" />
                <select value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full px-4 py-3.5 border border-ink-200 rounded-full text-sm font-medium focus:outline-none focus:border-brand-500 text-ink-700 bg-white">
                  <option value="half">{t('durations.half')}</option>
                  <option value="full">{t('durations.full')}</option>
                  <option value="multi">{t('durations.multi')}</option>
                </select>
                <button onClick={() => setStep('details')} className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-full transition hover:scale-[1.02] shadow-lg shadow-brand-600/30">
                  {t('search')}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {step === 'details' && (
        <form onSubmit={submit} className="space-y-4 animate-fade-in">
          <h3 className="text-lg font-bold text-ink-900">{t('stepDetails')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder={t('fullName')} className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t('email')} className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder={t('phone')} className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 md:col-span-2" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-ink-600 font-medium mb-1 block">{t('adults')}</label>
              <input type="number" min={1} value={form.adults} onChange={(e) => setForm({ ...form, adults: +e.target.value })}
                className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
            </div>
            <div>
              <label className="text-xs text-ink-600 font-medium mb-1 block">{t('children')}</label>
              <input type="number" min={0} value={form.children} onChange={(e) => setForm({ ...form, children: +e.target.value })}
                className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
            </div>
            <div>
              <label className="text-xs text-ink-600 font-medium mb-1 block">{t('babies')}</label>
              <input type="number" min={0} value={form.babies} onChange={(e) => setForm({ ...form, babies: +e.target.value })}
                className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
            </div>
          </div>
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={t('message')} rows={3}
            className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 resize-none" />

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">{t('error')}</div>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep('search')} className="btn-outline flex-1">← Retour</button>
            <button type="submit" disabled={status === 'loading'} className="btn-primary flex-1 disabled:opacity-60">
              {status === 'loading' ? '...' : t('submit')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
