import fs from 'fs';
import path from 'path';

export async function GET() {
  const baseUrl = 'https://thekpsgroup.com';
  const today = new Date().toISOString().split('T')[0];

  const pages: { url: string; priority: string; changefreq: string }[] = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.8', changefreq: 'weekly' },
    { url: '/team', priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
    { url: '/thank-you', priority: '0.3', changefreq: 'yearly' },
    { url: '/locations', priority: '0.6', changefreq: 'monthly' },
  ];

  // Service pages
  const servicesDir = path.join(process.cwd(), 'src/pages/services');
  if (fs.existsSync(servicesDir)) {
    fs.readdirSync(servicesDir).forEach((file) => {
      if (file.endsWith('.astro') && file !== 'index.astro') {
        const slug = file.replace('.astro', '');
        pages.push({ url: `/services/${slug}`, priority: '0.8', changefreq: 'weekly' });
      }
    });
  }

  // Location pages
  const locationsDir = path.join(process.cwd(), 'src/pages/locations');
  if (fs.existsSync(locationsDir)) {
    fs.readdirSync(locationsDir).forEach((entry) => {
      const full = path.join(locationsDir, entry);
      const stat = fs.statSync(full);
      if (stat.isFile() && entry.endsWith('.astro') && entry !== 'index.astro') {
        const state = entry.replace('.astro', '');
        pages.push({ url: `/locations/${state}`, priority: '0.6', changefreq: 'monthly' });
      } else if (stat.isDirectory()) {
        const state = entry;
        const files = fs.readdirSync(full).filter((f) => f.endsWith('.astro'));
        files.forEach((file) => {
          const city = file.replace('.astro', '');
          pages.push({ url: `/locations/${state}/${city}`, priority: '0.6', changefreq: 'monthly' });
        });
      }
    });
  }

  const urls = pages
    .map((p) =>
      `<url><loc>${baseUrl}${p.url}</loc><lastmod>${today}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
}

