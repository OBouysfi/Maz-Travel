'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, Link } from '@/i18n/routing';
import { useAuthStore } from '@/store/auth';

const nav = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/quotes', label: 'Devis' },
  { href: '/admin/contacts', label: 'Messages' },
  { href: '/admin/excursions', label: 'Excursions' },
  { href: '/admin/activities', label: 'Activités' },
  { href: '/admin/transfers', label: 'Trajets' },
  { href: '/admin/testimonials', label: 'Témoignages' },
  { href: '/admin/gallery', label: 'Galerie' },
  { href: '/admin/settings', label: 'Paramètres' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, logout } = useAuthStore();

  useEffect(() => { if (!token) router.push('/admin'); }, [token, router]);
  if (!token) return null;

  return (
    <div className="min-h-screen bg-ink-50 flex">
      <aside className="w-64 bg-ink-900 text-white p-5 fixed h-screen overflow-y-auto">
        <Link href="/" className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          </div>
          <div>
            <div className="font-bold text-sm">Maz Travel</div>
            <div className="text-[10px] text-ink-400">ADMIN PANEL</div>
          </div>
        </Link>

        <nav className="space-y-1">
          {nav.map((n) => (
            <Link key={n.href} href={n.href as any}
              className={`block px-3 py-2.5 rounded-lg text-sm transition ${pathname === n.href ? 'bg-brand-600 text-white' : 'text-ink-300 hover:bg-white/5'}`}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="border-t border-white/10 pt-4">
            <div className="text-xs text-ink-400 mb-2">Connecté</div>
            <div className="text-sm font-medium mb-3">{user?.email}</div>
            <button onClick={() => { logout(); router.push('/admin'); }} className="text-xs text-ink-300 hover:text-white">
              Se déconnecter →
            </button>
          </div>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
