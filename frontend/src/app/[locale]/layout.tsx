import '../globals.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsappFloat from '@/components/layout/WhatsappFloat';
import ScrollReveal from '@/components/layout/ScrollReveal';

export const metadata: Metadata = {
  title: { default: 'Maz Travel — Transport touristique privé à Marrakech', template: '%s · Maz Travel' },
  description: 'Transport touristique premium, transferts aéroport, excursions et activités au départ de Marrakech.',
  keywords: ['transport touristique Marrakech', 'transfert aéroport Marrakech', 'excursion Marrakech', 'désert Merzouga', 'Maz Travel'],
  openGraph: {
    title: 'Maz Travel — Transport touristique Marrakech',
    description: 'Transferts aéroport, excursions privées, activités touristiques au Maroc.',
    type: 'website',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  const messages = await getMessages();

  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isAdmin = pathname.includes('/admin');

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="bg-white font-sans">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          {!isAdmin && <Footer />}
          <WhatsappFloat />
          <ScrollReveal />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}