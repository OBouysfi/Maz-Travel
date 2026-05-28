import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maz Travel — Transport touristique privé à Marrakech',
  description: 'Agence locale Marrakech : transferts aéroport, excursions privées, activités touristiques au Maroc.',
  icons: {
    icon: [
      {
       url: "data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23FB923C'/%3E%3Cstop offset='100%25' stop-color='%23EA580C'/%3E%3C/linearGradient%3E%3ClinearGradient id='shine' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='white' stop-opacity='0.3'/%3E%3Cstop offset='100%25' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='24' height='24' rx='6' fill='url(%23bg)'/%3E%3Crect width='24' height='12' rx='6' fill='url(%23shine)'/%3E%3Ccircle cx='12' cy='12' r='8' stroke='white' stroke-width='2'/%3E%3Cpolygon points='16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76' stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E",
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}