// src/pages/sitemap.xml.ts
import { CITIES } from '../data/constants';
import { MAJOR_CITIES, STATES, formatCityUrl } from '../data/cities';
import { slugify } from '../utils/slug';

export async function GET() {
  const baseUrl = import.meta.env.SITE_URL ?? 'https://thekpsgroup.com';
  const today = new Date().toISOString().split('T')[0];

  // Core pages with highest priority
  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.9', changefreq: 'weekly' },
    { path: '/about-us', priority: '0.9', changefreq: 'weekly' },
    { path: '/leadership', priority: '0.8', changefreq: 'monthly' },
    { path: '/team', priority: '0.8', changefreq: 'monthly' },
    { path: '/contact', priority: '0.9', changefreq: 'weekly' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/locations', priority: '0.8', changefreq: 'weekly' },
    { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
    { path: '/thank-you', priority: '0.2', changefreq: 'never' }
  ];

  // Premium service pages for SEO domination
  const servicePages = [
    { path: '/quickbooks-consulting-premium', priority: '0.9', changefreq: 'weekly' },
    { path: '/payroll-services', priority: '0.9', changefreq: 'weekly' },
    { path: '/hr-services', priority: '0.9', changefreq: 'weekly' },
    { path: '/technology-consulting', priority: '0.9', changefreq: 'weekly' },
    { path: '/bookkeeping-services', priority: '0.9', changefreq: 'weekly' },
    { path: '/hvac-consulting', priority: '0.9', changefreq: 'weekly' },
    { path: '/electrical-consulting', priority: '0.9', changefreq: 'weekly' },
    { path: '/plumbing-consulting', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/quickbooks-consulting', priority: '0.9', changefreq: 'weekly' },
    { path: '/services/peo-payroll', priority: '0.9', changefreq: 'weekly' },
  ];

  // MAJOR CITIES - Comprehensive National Coverage
  const majorCityPages = MAJOR_CITIES.map((city) => ({
    path: formatCityUrl(city),
    priority: city.opportunity === 'high' ? '0.9' : city.opportunity === 'medium' ? '0.8' : '0.7',
    changefreq: 'weekly'
  }));

  // STATE-LEVEL PAGES for regional SEO
  const statePages = STATES.map((state) => ({
    path: `/locations/${state.code.toLowerCase()}`,
    priority: state.opportunities === 'high' ? '0.8' : '0.7',
    changefreq: 'weekly'
  }));

  // Additional Texas cities (legacy support + comprehensive coverage)
  const texasCityPages = [
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
    { path: '/locations/texas/arlington', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/texas/el-paso', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/texas/carrollton', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/texas/richardson', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/texas/grand-prairie', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/texas/mesquite', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/texas/lewisville', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/texas/allen', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/texas/flower-mound', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/texas/euless', priority: '0.6', changefreq: 'weekly' }
  ];

  // Oklahoma cities for regional expansion
  const oklahomaCityPages = [
    { path: '/locations/oklahoma/oklahoma-city', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/oklahoma/tulsa', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/oklahoma/norman', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/oklahoma/broken-arrow', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/oklahoma/edmond', priority: '0.6', changefreq: 'weekly' }
  ];

  // Major national markets for growth
  const nationalCityPages = [
    // California
    { path: '/locations/california/los-angeles', priority: '0.8', changefreq: 'weekly' },
    { path: '/locations/california/san-diego', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/california/san-francisco', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/california/sacramento', priority: '0.6', changefreq: 'weekly' },
    // Illinois
    { path: '/locations/illinois/chicago', priority: '0.8', changefreq: 'weekly' },
    { path: '/locations/illinois/aurora', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/illinois/naperville', priority: '0.6', changefreq: 'weekly' },
    // Arizona
    { path: '/locations/arizona/phoenix', priority: '0.8', changefreq: 'weekly' },
    { path: '/locations/arizona/tucson', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/arizona/mesa', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/arizona/chandler', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/arizona/scottsdale', priority: '0.6', changefreq: 'weekly' },
    // Pennsylvania
    { path: '/locations/pennsylvania/philadelphia', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/pennsylvania/pittsburgh', priority: '0.6', changefreq: 'weekly' },
    // Colorado
    { path: '/locations/colorado/denver', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/colorado/colorado-springs', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/colorado/aurora', priority: '0.6', changefreq: 'weekly' },
    // Tennessee
    { path: '/locations/tennessee/nashville', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/tennessee/memphis', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/tennessee/knoxville', priority: '0.6', changefreq: 'weekly' },
    // Florida
    { path: '/locations/florida/miami', priority: '0.8', changefreq: 'weekly' },
    { path: '/locations/florida/tampa', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/florida/orlando', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/florida/jacksonville', priority: '0.6', changefreq: 'weekly' },
    // Washington
    { path: '/locations/washington/seattle', priority: '0.7', changefreq: 'weekly' },
    { path: '/locations/washington/spokane', priority: '0.6', changefreq: 'weekly' },
    { path: '/locations/washington/tacoma', priority: '0.6', changefreq: 'weekly' }
  ];

  // DFW area city pages for local SEO (legacy support)
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
    { path: '/industries/technology-companies', priority: '0.7', changefreq: 'weekly' },
    { path: '/industries/healthcare-providers', priority: '0.7', changefreq: 'weekly' },
    { path: '/industries/manufacturing', priority: '0.7', changefreq: 'weekly' },
    { path: '/industries/retail-businesses', priority: '0.7', changefreq: 'weekly' },
    { path: '/industries/restaurants-hospitality', priority: '0.7', changefreq: 'weekly' },
    { path: '/industries/legal-services', priority: '0.7', changefreq: 'weekly' },
    { path: '/industries/accounting-firms', priority: '0.7', changefreq: 'weekly' },
    { path: '/industries/real-estate', priority: '0.7', changefreq: 'weekly' }
  ];

  // Service + Location combinations for hyper-local SEO
  const serviceLocationPages = [
    // Texas QuickBooks consulting
    { path: '/services/quickbooks-consulting-austin-tx', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/quickbooks-consulting-dallas-tx', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/quickbooks-consulting-houston-tx', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/payroll-services-austin-tx', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/payroll-services-dallas-tx', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/payroll-services-houston-tx', priority: '0.8', changefreq: 'weekly' },
    // National markets
    { path: '/services/quickbooks-consulting-chicago-il', priority: '0.7', changefreq: 'weekly' },
    { path: '/services/quickbooks-consulting-phoenix-az', priority: '0.7', changefreq: 'weekly' },
    { path: '/services/quickbooks-consulting-denver-co', priority: '0.7', changefreq: 'weekly' },
    { path: '/services/technology-consulting-austin-tx', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/technology-consulting-dallas-tx', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/hr-services-austin-tx', priority: '0.8', changefreq: 'weekly' },
    { path: '/services/hr-services-dallas-tx', priority: '0.8', changefreq: 'weekly' }
  ];

  // Additional service-specific pages for long-tail SEO
  const serviceLandingPages = [
    { path: '/quickbooks-cleanup-services', priority: '0.8', changefreq: 'weekly' },
    { path: '/quickbooks-migration-experts', priority: '0.8', changefreq: 'weekly' },
    { path: '/payroll-services-small-business', priority: '0.8', changefreq: 'weekly' },
    { path: '/peo-services-contractors', priority: '0.8', changefreq: 'weekly' },
    { path: '/website-design-contractors', priority: '0.7', changefreq: 'weekly' },
    { path: '/business-consulting-austin', priority: '0.7', changefreq: 'weekly' },
    { path: '/quickbooks-proadvisor-near-me', priority: '0.7', changefreq: 'weekly' },
    { path: '/small-business-accounting-help', priority: '0.7', changefreq: 'weekly' },
    { path: '/contractor-bookkeeping-services', priority: '0.7', changefreq: 'weekly' },
    { path: '/hvac-business-consulting', priority: '0.7', changefreq: 'weekly' },
    { path: '/plumbing-business-solutions', priority: '0.7', changefreq: 'weekly' },
    { path: '/electrical-contractor-support', priority: '0.7', changefreq: 'weekly' },
    { path: '/construction-company-consulting', priority: '0.7', changefreq: 'weekly' },
    { path: '/remote-bookkeeping-services', priority: '0.7', changefreq: 'weekly' },
    { path: '/virtual-cfo-services', priority: '0.7', changefreq: 'weekly' },
    { path: '/business-process-automation', priority: '0.7', changefreq: 'weekly' },
    { path: '/digital-transformation-consulting', priority: '0.7', changefreq: 'weekly' },
    { path: '/it-support-small-business', priority: '0.7', changefreq: 'weekly' },
    { path: '/cybersecurity-consulting', priority: '0.7', changefreq: 'weekly' },
    { path: '/cloud-migration-services', priority: '0.7', changefreq: 'weekly' }
  ];

  const allPages = [
    ...staticPages, 
    ...servicePages, 
    ...majorCityPages,
    ...statePages,
    ...texasCityPages,
    ...oklahomaCityPages,
    ...nationalCityPages,
    ...dfwCityPages, 
    ...industryPages,
    ...serviceLocationPages,
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

