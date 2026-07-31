import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const siteOrigin = 'https://tvoronov.dev';
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(target) : [target];
    }),
  );
  return nested.flat();
}

function routeFor(file) {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html') return '/404/';
  return `/${relative.replace(/index\.html$/, '')}`;
}

function decode(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');
}

function attributes(html, attribute) {
  return [...html.matchAll(new RegExp(`\\b${attribute}=["']([^"']+)["']`, 'gi'))].map((match) =>
    decode(match[1]),
  );
}

function ids(html) {
  return new Set(attributes(html, 'id').concat(attributes(html, 'name')));
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function targetFile(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (!clean) return path.join(dist, 'index.html');
  if (clean === '404' || clean === '404/') return path.join(dist, '404.html');
  if (path.extname(clean)) return path.join(dist, clean);
  return clean.endsWith('/')
    ? path.join(dist, clean, 'index.html')
    : path.join(dist, clean, 'index.html');
}

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const htmlByRoute = new Map();

for (const file of htmlFiles) {
  htmlByRoute.set(routeFor(file), await readFile(file, 'utf8'));
}

for (const [route, html] of htmlByRoute) {
  const pageUrl = new URL(route, siteOrigin);
  const canonicalMatch = html.match(
    /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i,
  );
  if (!canonicalMatch) {
    errors.push(`${route}: missing canonical link`);
  } else {
    const canonical = new URL(decode(canonicalMatch[1]), siteOrigin);
    if (canonical.origin === siteOrigin && canonical.pathname !== pageUrl.pathname) {
      errors.push(`${route}: canonical points to ${canonical.pathname}`);
    }
  }

  for (const href of attributes(html, 'href')) {
    if (/^(mailto:|tel:|data:|javascript:)/i.test(href)) continue;
    const target = new URL(href, pageUrl);
    if (target.origin !== siteOrigin && target.origin !== 'http://127.0.0.1') continue;

    const file = await targetFile(target.pathname);
    if (!(await exists(file))) {
      errors.push(`${route}: ${href} does not resolve`);
      continue;
    }

    if (target.hash && file.endsWith('.html')) {
      const targetHtml = await readFile(file, 'utf8');
      if (!ids(targetHtml).has(decodeURIComponent(target.hash.slice(1)))) {
        errors.push(`${route}: ${href} references a missing anchor`);
      }
    }
  }

  for (const source of attributes(html, 'src')) {
    if (/^(https?:|data:)/i.test(source)) continue;
    const target = new URL(source, pageUrl);
    if (!(await exists(await targetFile(target.pathname)))) {
      errors.push(`${route}: asset ${source} does not resolve`);
    }
  }
}

const sitemapIndex = await readFile(path.join(dist, 'sitemap-index.xml'), 'utf8');
const childSitemaps = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapRoutes = new Set();

for (const sitemapUrl of childSitemaps) {
  const sitemapPath = path.join(dist, new URL(sitemapUrl).pathname.replace(/^\/+/, ''));
  const sitemap = await readFile(sitemapPath, 'utf8');
  for (const location of [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])) {
    const target = new URL(location);
    sitemapRoutes.add(target.pathname);
    if (!(await exists(await targetFile(target.pathname)))) {
      errors.push(`sitemap: ${location} does not resolve`);
    }
  }
}

for (const route of htmlByRoute.keys()) {
  if (route === '/404/') continue;
  if (!sitemapRoutes.has(route)) errors.push(`${route}: missing from sitemap`);
}

if (errors.length > 0) {
  console.error(
    `Internal-link validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${htmlFiles.length} HTML files, ${sitemapRoutes.size} sitemap entries, internal anchors, canonical targets, and referenced assets.`,
  );
}
