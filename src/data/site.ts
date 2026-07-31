export const SITE = {
  name: 'Timofei Voronov',
  shortName: 'TV',
  url: 'https://tvoronov.dev',
  title: 'Timofei Voronov — Developer Tools, Languages, and Infrastructure',
  description:
    'Personal site of Timofei Voronov, creator of Ferret and builder of developer tools, programming languages, and infrastructure libraries.',
  github: 'https://github.com/ziflex',
  ferret: 'https://ferretlang.org',
  rss: '/rss.xml',
  socialImage: '/og.png',
} as const;

export const navigation = [
  { href: '/projects/', label: 'Projects' },
  { href: '/writing/', label: 'Writing' },
  { href: '/about/', label: 'About' },
  { href: '/now/', label: 'Now' },
] as const;
