import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['fr', 'en', 'es'] as const;
export const defaultLocale = 'fr' as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || defaultLocale;
  if (!locales.includes(locale as any)) notFound();
  return { locale, messages: (await import(`../../messages/${locale}.json`)).default };
});
