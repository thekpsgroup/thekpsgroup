import { promises as fs } from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

/** Recursively collect all HTML files */
async function getHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return getHtmlFiles(fullPath);
    return fullPath.endsWith('.html') ? [fullPath] : [];
  }));
  return files.flat();
}

/** Normalize internal link to target file */
function resolveLink(href) {
  if (href.endsWith('/')) return href + 'index.html';
  if (!path.extname(href)) return href + '.html';
  return href;
}

async function checkLinks() {
  const htmlFiles = await getHtmlFiles(distDir);
  const missing = [];
  for (const file of htmlFiles) {
    const html = await fs.readFile(file, 'utf8');
    const links = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    for (const href of links) {
      if (/^(?:https?:|mailto:|tel:|#|javascript:)/.test(href)) continue;
      const target = path.resolve(distDir, resolveLink(href.replace(/^\//, '')));
      try {
        await fs.access(target);
      } catch {
        missing.push(`${file.replace(distDir + '/', '')} -> ${href}`);
      }
    }
  }
  if (missing.length) {
    console.error('Missing internal links:\n' + missing.join('\n'));
    process.exit(1);
  } else {
    console.log('All internal links OK');
  }
}

checkLinks();
