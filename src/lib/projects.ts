import type { CollectionEntry } from 'astro:content';

export type ProjectEntry = CollectionEntry<'projects'>;

export function sortProjects(projects: ProjectEntry[]): ProjectEntry[] {
  return [...projects].sort((a, b) => a.data.order - b.data.order);
}

export function selectedProjects(projects: ProjectEntry[]): ProjectEntry[] {
  return sortProjects(
    projects.filter((project) => project.data.featured && project.data.status !== 'archived'),
  );
}

export function homepageProjects(projects: ProjectEntry[]): ProjectEntry[] {
  return sortProjects(
    projects.filter((project) => project.data.homepage && project.data.status !== 'archived'),
  );
}

export function projectRoute(project: ProjectEntry): string {
  return `/projects/${project.data.slug}/`;
}

export function assertUniqueProjectSlugs(projects: ProjectEntry[]): void {
  const slugs = projects.map((project) => project.data.slug);
  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);

  if (duplicates.length > 0) {
    throw new Error(`Duplicate project slugs: ${[...new Set(duplicates)].join(', ')}`);
  }
}
