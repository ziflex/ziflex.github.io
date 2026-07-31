import { describe, expect, it } from 'vitest';
import {
  assertUniqueProjectSlugs,
  homepageProjects,
  projectRoute,
  selectedProjects,
  sortProjects,
  type ProjectEntry,
} from '../../src/lib/projects';

function project(
  slug: string,
  order: number,
  options: { featured?: boolean; homepage?: boolean } = {},
) {
  return {
    id: `${slug}.md`,
    collection: 'projects',
    data: {
      slug,
      order,
      featured: options.featured ?? true,
      homepage: options.homepage ?? true,
    },
  } as unknown as ProjectEntry;
}

describe('project selection', () => {
  const projects = [
    project('third', 3, { homepage: false }),
    project('first', 1),
    project('second', 2, { featured: false }),
  ];

  it('orders project entries without mutating the source array', () => {
    expect(sortProjects(projects).map((entry) => entry.data.slug)).toEqual([
      'first',
      'second',
      'third',
    ]);
    expect(projects[0].data.slug).toBe('third');
  });

  it('uses explicit featured and homepage flags', () => {
    expect(selectedProjects(projects).map((entry) => entry.data.slug)).toEqual(['first', 'third']);
    expect(homepageProjects(projects).map((entry) => entry.data.slug)).toEqual(['first', 'second']);
  });

  it('builds canonical project routes', () => {
    expect(projectRoute(project('node-red-tools', 1))).toBe('/projects/node-red-tools/');
  });

  it('rejects duplicate editorial slugs', () => {
    expect(() => assertUniqueProjectSlugs([project('same', 1), project('same', 2)])).toThrow(
      'Duplicate project slugs: same',
    );
  });
});
