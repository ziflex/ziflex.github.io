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
  options: {
    featured?: boolean;
    homepage?: boolean;
    status?: 'active' | 'maintained' | 'experimental' | 'archived';
  } = {},
) {
  return {
    id: `${slug}.md`,
    collection: 'projects',
    data: {
      slug,
      order,
      featured: options.featured ?? true,
      homepage: options.homepage ?? true,
      status: options.status ?? 'maintained',
    },
  } as unknown as ProjectEntry;
}

describe('project selection', () => {
  const projects = [
    project('third', 3, { homepage: false }),
    project('first', 1),
    project('second', 2, { featured: false }),
    project('archived', 4, {
      featured: false,
      homepage: false,
      status: 'archived',
    }),
    project('misclassified-archived', 5, { status: 'archived' }),
  ];

  it('orders project entries without mutating the source array', () => {
    expect(sortProjects(projects).map((entry) => entry.data.slug)).toEqual([
      'first',
      'second',
      'third',
      'archived',
      'misclassified-archived',
    ]);
    expect(projects[0].data.slug).toBe('third');
  });

  it('uses explicit featured and homepage flags', () => {
    expect(selectedProjects(projects).map((entry) => entry.data.slug)).toEqual(['first', 'third']);
    expect(homepageProjects(projects).map((entry) => entry.data.slug)).toEqual(['first', 'second']);
  });

  it('excludes archived projects from current surfaces', () => {
    expect(selectedProjects(projects).map((entry) => entry.data.slug)).not.toContain('archived');
    expect(homepageProjects(projects).map((entry) => entry.data.slug)).not.toContain('archived');
    expect(selectedProjects(projects).map((entry) => entry.data.slug)).not.toContain(
      'misclassified-archived',
    );
    expect(homepageProjects(projects).map((entry) => entry.data.slug)).not.toContain(
      'misclassified-archived',
    );
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
