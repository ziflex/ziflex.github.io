import { describe, expect, it } from 'vitest';
import { countWords, readingTime } from '../../src/lib/reading-time';

describe('reading time', () => {
  it('counts prose while ignoring code and Markdown syntax', () => {
    expect(countWords('A **small** [useful tool](https://example.com). `ignored code`')).toBe(4);
    expect(countWords('```ts\nconst hidden = true;\n```')).toBe(0);
  });

  it('uses a one-minute minimum and rounds longer articles up', () => {
    expect(readingTime('').label).toBe('1 min read');
    expect(readingTime(Array.from({ length: 221 }, () => 'word').join(' '))).toEqual({
      words: 221,
      minutes: 2,
      label: '2 min read',
    });
  });
});
