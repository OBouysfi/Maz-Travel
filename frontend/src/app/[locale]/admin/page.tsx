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
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <div className="inline-flex w-20 h-20 rounded-2xl items-center justify-center mb-4">
            <img
              src="/images/maz_logo.png"
              alt="Maz Travel"
              className="w-20 h-20 object-contain"
            />
          </div>
            <h1 className="text-3xl font-bold text-white">
              Maz Travel Admin
            </h1>

            <p className="text-sm text-white/70 mt-2">
              Connectez-vous pour continuer
            </p>
          </div>

          <form
            onSubmit={submit}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 shadow-2xl"
          >
            <div className="mb-4">
              <label className="text-xs font-semibold text-white mb-1.5 block">
                Email
              </label>

              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-white mb-1.5 block">
                Mot de passe
              </label>

              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>

            {err && (
              <div className="bg-red-500/20 text-red-100 border border-red-400/30 px-4 py-2.5 rounded-xl text-sm mb-4">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loading ? '...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
