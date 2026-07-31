import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectStatus = z.enum(['active', 'maintained', 'experimental', 'archived']);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    repository: z.url().optional(),
    website: z.url().optional(),
    organization: z.string().optional(),
    period: z.string().optional(),
    status: projectStatus.optional(),
    featured: z.boolean(),
    homepage: z.boolean(),
    category: z.string(),
    technologies: z.array(z.string()),
    role: z.string().optional(),
    socialImage: z.string().optional(),
    order: z.number().int(),
    sources: z.array(z.url()).min(1),
    reflection: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    categories: z.array(z.string()),
    draft: z.boolean().default(false),
    canonical: z.url().optional(),
  }),
});

export const collections = { projects, writing };
