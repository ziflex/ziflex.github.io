const WORDS_PER_MINUTE = 220;

export function countWords(source: string): number {
  const withoutMarkup = source
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_~\-]/g, ' ')
    .trim();

  if (!withoutMarkup) return 0;

  return withoutMarkup.split(/\s+/u).filter(Boolean).length;
}

export function readingTime(source: string): { minutes: number; label: string; words: number } {
  const words = countWords(source);
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

  return { words, minutes, label: `${minutes} min read` };
}
