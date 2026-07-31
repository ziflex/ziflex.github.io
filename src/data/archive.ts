export type ArchiveEntry = {
  name: string;
  description: string;
  repository: string;
  period: string;
  status?: 'maintained' | 'archived';
  technologies: string[];
  links?: { label: string; url: string }[];
};

export type ArchiveGroup = {
  title: string;
  introduction: string;
  entries: ArchiveEntry[];
};

export const archiveGroups: ArchiveGroup[] = [
  {
    title: 'Current utilities',
    introduction: 'Focused tools that keep one concern small, explicit, and reusable.',
    entries: [
      {
        name: 'pinterval',
        description:
          'Async-aware interval management with dynamic timing, stop conditions, polling helpers, retry helpers, and built-in backoff strategies.',
        repository: 'https://github.com/ziflex/pinterval',
        period: 'Since 2017',
        status: 'maintained',
        technologies: ['TypeScript', 'Scheduling'],
      },
    ],
  },
  {
    title: 'Node-RED and connected systems',
    introduction:
      'Tools at the boundary between software, services, messages, and physical devices.',
    entries: [
      {
        name: 'Node-RED Tools',
        description:
          'An ecosystem of reusable Node-RED integrations and testing tools, created from project work involving Node-RED.',
        repository: 'https://github.com/node-red-tools',
        period: 'Since 2020',
        technologies: ['JavaScript', 'Node-RED', 'Integrations'],
        links: [{ label: 'project story', url: '/projects/node-red-tools/' }],
      },
      {
        name: 'Beagle',
        description:
          'A Go beacon-tracking system designed for small Linux devices such as Raspberry Pi, with REST notifications for beacon arrival and departure.',
        repository: 'https://github.com/blent/beagle',
        period: 'Since 2017',
        technologies: ['Go', 'Bluetooth LE', 'REST'],
      },
    ],
  },
  {
    title: 'JavaScript tooling and Electron',
    introduction:
      'A chapter about packaging, resource lifecycles, dependency boundaries, and build systems.',
    entries: [
      {
        name: 'electron-ipc-socket',
        description:
          'Event and request-response communication built on top of Electron IPC, giving renderer and main processes a two-way socket-like abstraction.',
        repository: 'https://github.com/ziflex/electron-ipc-socket',
        period: 'Since 2016',
        technologies: ['TypeScript', 'Electron', 'IPC'],
      },
      {
        name: 'compose-record',
        description:
          'A type-safe utility for composing nested Immutable.js Records and reducing boilerplate around structured immutable data.',
        repository: 'https://github.com/ziflex/compose-record',
        period: 'Since 2018',
        technologies: ['TypeScript', 'Immutable.js'],
      },
      {
        name: 'resource-handler',
        description:
          'A thin lifecycle and recovery wrapper for asynchronous resources such as database or message-broker connections.',
        repository: 'https://github.com/ziflex/resource-handler',
        period: 'Since 2020',
        technologies: ['TypeScript', 'Async resources'],
      },
      {
        name: 'env-manager',
        description:
          'A build-task utility for selecting, merging, and overriding environment files from command-line arguments.',
        repository: 'https://github.com/ziflex/env-manager',
        period: 'Since 2015',
        technologies: ['JavaScript', 'Build tooling'],
      },
      {
        name: 'namespaces',
        description:
          'An Angular-inspired dependency container with values, factories, dependency resolution, and nested namespaces.',
        repository: 'https://github.com/ziflex/namespaces',
        period: '2015–2025',
        status: 'archived',
        technologies: ['JavaScript', 'Dependency injection'],
      },
      {
        name: 'Gulp toolchain',
        description:
          'Three packages for wrapping AMD, UMD, and CommonJS modules; registering isolated tasks by convention; and applying reusable tasks across monorepo packages.',
        repository: 'https://github.com/ziflex/gulp-tasks-monorepo',
        period: '2014–2025',
        status: 'archived',
        technologies: ['JavaScript', 'Gulp', 'Monorepos'],
        links: [
          { label: 'module wrapper', url: 'https://github.com/ziflex/gulp-module-wrapper' },
          { label: 'task registrator', url: 'https://github.com/ziflex/gulp-tasks-registrator' },
          { label: 'monorepo tasks', url: 'https://github.com/ziflex/gulp-tasks-monorepo' },
        ],
      },
    ],
  },
  {
    title: 'Earlier developer tools',
    introduction: 'The interest in focused interfaces predates the later Go and language work.',
    entries: [
      {
        name: 'queryconsole',
        description:
          'A .NET SQL console with multiple data providers, tabbed queries, saved files, autocompletion, and spreadsheet export.',
        repository: 'https://github.com/ziflex/queryconsole',
        period: '2013–2019',
        status: 'archived',
        technologies: ['C#', '.NET', 'SQL'],
      },
    ],
  },
];
