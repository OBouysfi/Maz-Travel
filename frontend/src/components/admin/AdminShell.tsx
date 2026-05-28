'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

// ─── Icons ───────────────────────────────────────────────────────────────────
const icons: Record<string, JSX.Element> = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  ),
  quotes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  contacts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  excursions: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <path d="M3 17l4-8 4 4 3-6 4 10"/><circle cx="17" cy="7" r="2"/>
    </svg>
  ),
  activities: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  transfers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  testimonials: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  gallery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
};

// ─── Nav items ────────────────────────────────────────────────────────────────
const nav = [
  { href: '/admin/dashboard',    label: 'Dashboard',     icon: 'dashboard' },
  { href: '/admin/quotes',       label: 'Devis',         icon: 'quotes' },
  { href: '/admin/contacts',     label: 'Messages',      icon: 'contacts' },
  { href: '/admin/excursions',   label: 'Excursions',    icon: 'excursions' },
  { href: '/admin/activities',   label: 'Activités',     icon: 'activities' },
  { href: '/admin/transfers',    label: 'Trajets',       icon: 'transfers' },
  { href: '/admin/testimonials', label: 'Témoignages',   icon: 'testimonials' },
  { href: '/admin/gallery',      label: 'Galerie',       icon: 'gallery' },
  { href: '/admin/settings',     label: 'Paramètres',    icon: 'settings' },
];

// ─── Chevron icon ─────────────────────────────────────────────────────────────
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  // Replace with your actual auth store:
  // const { user, token, logout } = useAuthStore();
  const user = { email: 'admin@maztravel.ma' };
  const token = true;
  const logout = () => {};

  useEffect(() => { if (!token) router.push('/admin'); }, [token, router]);
  if (!token) return null;

  // Active page label
  const activeNav = nav.find((n) => n.href === pathname);

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex font-sans">

      {/* ── Sidebar ────────────────────────────────────────────────────── */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-40
          bg-[#14171F] text-white flex flex-col
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[68px]' : 'w-[220px]'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/8 shrink-0 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 shrink-0 bg-[#F97316] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 text-white" stroke="currentColor" strokeWidth={2.5}>
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="font-bold text-[13px] leading-none tracking-tight text-white">Maz Travel</div>
              <div className="text-[9px] tracking-[0.15em] uppercase text-white/40 mt-1">Admin Panel</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {nav.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + '/');
            return (
              <Link
                key={n.href}
                href={n.href}
                title={collapsed ? n.label : undefined}
                className={`
                  group flex items-center gap-3 rounded-xl text-[13px] font-medium
                  transition-all duration-150 relative
                  ${collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5'}
                  ${active
                    ? 'bg-[#F97316] text-white shadow-md shadow-orange-500/25'
                    : 'text-white/50 hover:text-white hover:bg-white/6'
                  }
                `}
              >
                <span className="shrink-0">{icons[n.icon]}</span>
                {!collapsed && <span className="truncate">{n.label}</span>}

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <span className="
                    absolute left-full ml-3 px-2.5 py-1.5 bg-[#1E2130] text-white text-xs
                    rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
                    pointer-events-none transition-opacity duration-150 shadow-xl
                    border border-white/8
                  ">
                    {n.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`shrink-0 border-t border-white/8 p-3 ${collapsed ? 'flex justify-center' : ''}`}>
          {collapsed ? (
            <div
              className="w-8 h-8 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[10px] font-bold text-[#F97316] uppercase cursor-pointer"
              title={user?.email}
            >
              {user?.email?.[0]}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[11px] font-bold text-[#F97316] uppercase shrink-0">
                {user?.email?.[0]}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-[11px] text-white/40 leading-none">Connecté</div>
                <div className="text-[12px] font-medium text-white/80 truncate mt-0.5">{user?.email}</div>
              </div>
              <button
                onClick={() => { logout(); router.push('/admin'); }}
                title="Se déconnecter"
                className="text-white/30 hover:text-white/70 transition-colors shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`
            absolute -right-3 top-[72px]
            w-6 h-6 bg-[#14171F] border border-white/10 rounded-full
            flex items-center justify-center text-white/40 hover:text-white/80
            transition-all duration-200 shadow-md hover:scale-110
          `}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className={`w-3 h-3 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'ml-[68px]' : 'ml-[220px]'}`}>

        {/* Admin Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100/80 shadow-sm">
          <div className="flex items-center justify-between px-6 h-14">
            {/* Breadcrumb / page title */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400 font-medium">Admin</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 text-gray-300">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span className="font-semibold text-gray-800">{activeNav?.label ?? 'Dashboard'}</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1">
              {/* Notification bell */}
              <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
                <BellIcon />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full ring-2 ring-white"/>
              </button>

              {/* View site */}
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                Voir le site
              </Link>

              {/* Avatar */}
              <div className="flex items-center gap-2 pl-2 ml-1 border-l border-gray-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center text-[11px] font-bold text-white uppercase shadow-sm">
                  {user?.email?.[0]}
                </div>
                <div className="hidden md:block">
                  <div className="text-[11px] text-gray-400 leading-none">Admin</div>
                  <div className="text-[12px] font-semibold text-gray-700 leading-tight">{user?.email?.split('@')[0]}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}