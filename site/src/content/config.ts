import { defineCollection, z } from 'astro:content';

const site = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    catch: z.string().optional(),
    intro: z.string().optional(),
    avatar: z.string().optional(),
    topics: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { site };
