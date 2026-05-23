import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function formatPrice(price: number, currency = 'MAD', locale = 'fr') {
  try {
    return new Intl.NumberFormat(locale === 'fr' ? 'fr-MA' : locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(price);
  } catch { return `${price} ${currency}`; }
}

// Returns the price field name based on currency
export function getPriceField(currency: string) {
  if (currency === 'EUR') return 'priceEur';
  if (currency === 'USD') return 'priceUsd';
  return 'priceMad';
}

// Default currency per locale
export const defaultCurrencyByLocale: Record<string, string> = { fr: 'MAD', en: 'EUR', es: 'EUR' };
