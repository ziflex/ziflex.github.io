import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../data/site';
import { publishedWriting, writingRoute } from '../lib/writing';

export async function GET(context: APIContext) {
  const articles = publishedWriting(await getCollection('writing'));

  return rss({
    title: `${SITE.name} — Writing`,
    description:
      'Writing about language design, developer tooling, infrastructure, and open source.',
    site: context.site ?? SITE.url,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: writingRoute(article),
      categories: article.data.categories,
    })),
  });
}
