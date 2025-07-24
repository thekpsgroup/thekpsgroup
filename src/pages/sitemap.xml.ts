// src/pages/sitemap.xml.ts
import { CITIES } from '../data/constants';
import { slugify } from '../utils/slug';

export async function GET() {
  const baseUrl = import.meta.env.SITE_URL ?? 'https://thekpsgroup.com';
  const today = new Date().toISOString().split('T')[0];

  // Core pages with highest priority
  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.9', changefreq: 'weekly' },
    { path: '/leadership', priority: '0.8', changefreq: 'monthly' },
    { path: '/bookkeeping-services', priority: '0.9', changefreq: 'weekly' },
    { path: '/technology-consulting', priority: '0.9', changefreq: 'weekly' },
    { path: '/hvac-consulting', priority: '0.9', changefreq: 'weekly' },
    { path: '/electrical-consulting', priority: '0.9', changefreq: 'weekly' },
    { path: '/contact', priority: '0.9', changefreq: 'weekly' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/team', priority: '0.8', changefreq: 'monthly' },
    { path: '/locations', priority: '0.8', changefreq: 'weekly' },
    { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
    { path: '/thank-you', priority: '0.2', changefreq: 'never' }
  ];

  // High-value service pages for SEO domination
  const servicePages = [
    { path: '/services/quickbooks-consulting', priority: '0.9', changefreq: 'weekly' },
    { path: '/services/peo-payroll', priority: '0.9', changefreq: 'weekly' },
    { path: '/services/branding', priority: '0.9', changefreq: 'weekly' },
  ];

  // Major Texas cities with high search volume
  const majorCityPages = [
    { path: '/locations/texas/austin', priority: '0.9', changefreq: 'weekly' },
    { path: '/locations/texas/dallas', priority: '0.8', changefreq: 'weekly' },
    { path: '/locations/texas/houston', priority: '0.8', changefreq: 'weekly' },
    { path: '/locations/texas/san-antonio', priority: '0.8', changefreq: 'weekly' },
    { path: '/locations/texas/fort-worth', priority: '0.8', changefreq: 'weekly' },
    { path: '/locations/texas/plano', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/texas/irving', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/texas/garland', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/texas/frisco', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/texas/mckinney', priority: '0.7', changefreq: 'weekly' },
  ];

  // DFW area city pages for local SEO
  const dfwCityPages = CITIES.map((city) => ({
    path: `/${slugify(city)}`,
    priority: '0.6',
    changefreq: 'monthly'
  }));

  // Industry-specific landing pages for targeted SEO
  const industryPages = [
    { path: '/industries/hvac-contractors', priority: '0.8', changefreq: 'weekly' },
    { path: '/industries/plumbing-companies', priority: '0.8', changefreq: 'weekly' },
    { path: '/industries/electrical-contractors', priority: '0.8', changefreq: 'weekly' },
    { path: '/industries/general-contractors', priority: '0.8', changefreq: 'weekly' },
    { path: '/industries/construction-companies', priority: '0.8', changefreq: 'weekly' },
    { path: '/industries/home-services', priority: '0.7', changefreq: 'weekly' },
    { path: '/industries/professional-services', priority: '0.7', changefreq: 'weekly' },
  ];

  // Additional service-specific pages for long-tail SEO
  const serviceLandingPages = [
    { path: '/quickbooks-cleanup-services', priority: '0.8', changefreq: 'weekly' },
    { path: '/quickbooks-migration-experts', priority: '0.8', changefreq: 'weekly' },
    { path: '/payroll-services-small-business', priority: '0.8', changefreq: 'weekly' },
    { path: '/peo-services-contractors', priority: '0.8', changefreq: 'weekly' },
    { path: '/website-design-contractors', priority: '0.7', changefreq: 'weekly' },
    { path: '/business-consulting-austin', priority: '0.7', changefreq: 'weekly' },
  ];

  const allPages = [
    ...staticPages, 
    ...servicePages, 
    ...majorCityPages, 
    ...dfwCityPages, 
    ...industryPages,
    ...serviceLandingPages
  ];

  const urls = allPages
    .map((page) => 
      `<url>
        <loc>${baseUrl}${page.path}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${urls}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      },
    }
  );
}

