export type ExternalArticle = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  publication: string;
};

export const externalWriting: ExternalArticle[] = [
  {
    title: 'Why Ferret Was Built as a Library First',
    description: 'Build the library first. Everything else follows.',
    url: 'https://ferretlang.org/blog/ferret-v2-lib-first/',
    publishedAt: '2026-08-05',
    publication: 'Ferret',
  },
  {
    title: 'New Website, New Docs, and the Road to Ferret v2',
    description: 'A project update on Ferret’s new home, documentation, and direction toward v2.',
    url: 'https://ferretlang.org/blog/new-website/',
    publishedAt: '2026-06-25',
    publication: 'Ferret',
  },
  {
    title: 'Inside Ferret v2: New Language Capabilities',
    description: 'A tour of the first-class language capabilities introduced in Ferret v2.',
    url: 'https://ferretlang.org/blog/ferret-v2-new-syntax/',
    publishedAt: '2026-05-25',
    publication: 'Ferret',
  },
  {
    title: 'Inside Ferret v2: The New Execution Model',
    description: 'An overview of the compiler and runtime model behind Ferret v2.',
    url: 'https://ferretlang.org/blog/ferret-v2-execution-model/',
    publishedAt: '2026-04-08',
    publication: 'Ferret',
  },
];
