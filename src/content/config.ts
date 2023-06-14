import { ZodType } from 'astro/zod';
import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		published_at: z.date(),
		modified_at: z.date().optional(),
		image: z.object({
			src: image(),
			alt: z.string(),
		}).optional(),
		draft: z.boolean().default(false),
		author: z.object({
			name: z.string(),
			url: z.string(),
		}),
		theme: z.string().default('default') as ZodType<"default" | "astro" | "loggy" | undefined>
	}),
});

export const collections = {
  'blog': blogCollection,
};