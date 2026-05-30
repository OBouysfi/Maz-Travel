import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maz Travel — Transport touristique privé à Marrakech',
  description: 'Agence locale Marrakech : transferts aéroport, excursions privées, activités touristiques au Maroc.',
  icons: {
  icon: [
    {
      url: '/images/maz_logo.png',
      type: 'image/png',
    },
  ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}