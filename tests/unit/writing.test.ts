import { describe, expect, it } from 'vitest';
import {
  adjacentWriting,
  assertUniqueWritingSlugs,
  isPublished,
  publishedWriting,
  writingRoute,
  writingRouteSlugs,
  type WritingEntry,
} from '../../src/lib/writing';

function article(slug: string, date: string, draft = false) {
  return {
    id: `${slug}.md`,
    collection: 'writing',
    data: { slug, draft, publishedAt: new Date(`${date}T00:00:00Z`) },
  } as unknown as WritingEntry;
}

describe('published writing', () => {
  const old = article('old', '2025-01-01');
  const middle = article('middle', '2025-06-01');
  const current = article('current', '2026-01-01');
  const draft = article('secret-draft', '2027-01-01', true);
  const entries = [old, draft, current, middle];

  it('uses one filter for publication state and newest-first ordering', () => {
    expect(isPublished(draft)).toBe(false);
    expect(publishedWriting(entries).map((entry) => entry.data.slug)).toEqual([
      'current',
      'middle',
      'old',
    ]);
  });

  it('selects only published route slugs', () => {
    expect(writingRouteSlugs(entries)).toEqual(['current', 'middle', 'old']);
    expect(writingRoute(current)).toBe('/writing/current/');
  });

  it('rejects duplicate article slugs before route generation', () => {
    expect(() => assertUniqueWritingSlugs([old, article('old', '2026-06-01')])).toThrow(
      'Duplicate writing slugs: old',
    );
  });

  it('finds adjacent articles in publication order', () => {
    expect(adjacentWriting(entries, 'middle')).toEqual({ previous: old, next: current });
    expect(adjacentWriting(entries, 'missing')).toEqual({ previous: undefined, next: undefined });
  });
});
