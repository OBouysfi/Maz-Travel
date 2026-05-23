import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const locales = ['fr', 'en', 'es'];
  const routes = ['', '/transferts', '/excursions', '/activites', '/mise-a-disposition', '/a-propos', '/contact'];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    }
  }
  return entries;
}
