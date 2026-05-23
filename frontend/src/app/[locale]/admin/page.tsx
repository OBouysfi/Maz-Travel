'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

export default function AdminLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState('admin@maztravel.ma');
  const [password, setPassword] = useState('admin123');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setAuth(data.user, data.token);
      router.push('/admin/dashboard');
    } catch { setErr('Identifiants invalides'); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl items-center justify-center mb-4 shadow-xl shadow-brand-500/30">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-ink-900">Maz Travel Admin</h1>
          <p className="text-sm text-ink-500 mt-1">Connectez-vous pour continuer</p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl border border-ink-100 p-7 shadow-sm">
          <div className="mb-4">
            <label className="text-xs font-semibold text-ink-700 mb-1.5 block">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ink-50 border border-ink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" />
          </div>
          <div className="mb-5">
            <label className="text-xs font-semibold text-ink-700 mb-1.5 block">Mot de passe</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-ink-50 border border-ink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" />
          </div>
          {err && <div className="bg-red-50 text-red-800 border border-red-200 px-4 py-2.5 rounded-xl text-sm mb-4">{err}</div>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? '...' : 'Se connecter'}
          </button>
          <div className="text-xs text-ink-400 text-center mt-4">
            Demo : <code className="bg-ink-100 px-2 py-0.5 rounded">admin@maztravel.ma / admin123</code>
          </div>
        </form>
      </div>
    </div>
  );
}
