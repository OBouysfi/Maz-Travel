'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PageHeader from '@/components/layout/PageHeader';
import { api } from '@/lib/api';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', date: '', persons: 1, message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/contacts', { ...form, persons: Number(form.persons) });
      setStatus('success');
      setForm({ name: '', phone: '', email: '', service: '', date: '', persons: 1, message: '' });
    } catch { setStatus('error'); }
  };

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} badge="💬 15 min" />
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-ink-900 mb-2">{t('infoTitle')}</h2>
                <p className="text-ink-600 text-sm">Notre équipe est à votre disposition.</p>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl hover:bg-brand-50/50 transition">
                  <div className="text-xs text-ink-400 tracking-wider uppercase font-semibold mb-1">{t('address')}</div>
                  <div className="text-ink-900 font-medium">Avenue Mohamed VI, Marrakech 40000, Maroc</div>
                </div>
                <div className="p-4 rounded-xl hover:bg-brand-50/50 transition">
                  <div className="text-xs text-ink-400 tracking-wider uppercase font-semibold mb-1">{t('phoneLabel')}</div>
                  <a href="tel:+212679067586" className="text-ink-900 font-medium hover:text-brand-600">+212 6 00 00 00 00</a>
                </div>
                <div className="p-4 rounded-xl hover:bg-brand-50/50 transition">
                  <div className="text-xs text-ink-400 tracking-wider uppercase font-semibold mb-1">{t('emailLabel')}</div>
                  <a href="mailto:contact@maztravel.ma" className="text-ink-900 font-medium hover:text-brand-600">contact@maztravel.ma</a>
                </div>
                <div className="p-4 rounded-xl">
                  <div className="text-xs text-ink-400 tracking-wider uppercase font-semibold mb-1">{t('hours')}</div>
                  <div className="text-ink-900 font-medium">{t('hoursValue')}</div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-ink-100">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.345!2d-7.989!3d31.629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakech!5e0!3m2!1sen!2sma!4v1700000000000" width="100%" height="280" style={{ border: 0 }} loading="lazy" />
              </div>
            </div>

            <div className="lg:col-span-3">
              <form onSubmit={submit} className="bg-ink-50 rounded-3xl p-7 lg:p-10 border border-ink-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-ink-700 mb-1.5 block">{t('name')} *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink-700 mb-1.5 block">{t('phone')} *</label>
                    <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value.replace(/[^0-9+\s]/g, '') })} inputMode="tel" className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-ink-700 mb-1.5 block">{t('email')} *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink-700 mb-1.5 block">{t('service')}</label>
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500">
                      <option value="">—</option>
                      <option value="transfer">Transfert</option>
                      <option value="excursion">Excursion</option>
                      <option value="activity">Activité</option>
                      <option value="disposition">Mise à disposition</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink-700 mb-1.5 block">{t('date')}</label>
                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-ink-700 mb-1.5 block">{t('persons')}</label>
                    <input type="number" min={1} value={form.persons} onChange={(e) => setForm({ ...form, persons: +e.target.value })} className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-ink-700 mb-1.5 block">{t('message')} *</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 resize-none" />
                  </div>
                </div>
                <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full text-base disabled:opacity-60">
                  {status === 'loading' ? '...' : t('send')}
                </button>
                {status === 'success' && <div className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">✓ {t('success')}</div>}
                {status === 'error' && <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">✗ {t('error')}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
