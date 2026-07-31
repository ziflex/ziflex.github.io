import type { CollectionEntry } from 'astro:content';

export type WritingEntry = CollectionEntry<'writing'>;

export function isPublished(entry: WritingEntry): boolean {
  return !entry.data.draft;
}

export function publishedWriting(entries: WritingEntry[]): WritingEntry[] {
  return entries
    .filter(isPublished)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export function writingRoute(entry: WritingEntry): string {
  return `/writing/${entry.data.slug}/`;
}

export function writingRouteSlugs(entries: WritingEntry[]): string[] {
  return publishedWriting(entries).map((entry) => entry.data.slug);
}

export function assertUniqueWritingSlugs(entries: WritingEntry[]): void {
  const slugs = entries.map((entry) => entry.data.slug);
  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);

  if (duplicates.length > 0) {
    throw new Error(`Duplicate writing slugs: ${[...new Set(duplicates)].join(', ')}`);
  }
}

export function adjacentWriting(entries: WritingEntry[], slug: string) {
  const ordered = publishedWriting(entries);
  const index = ordered.findIndex((entry) => entry.data.slug === slug);

  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: ordered[index + 1],
    next: ordered[index - 1],
  };
}
