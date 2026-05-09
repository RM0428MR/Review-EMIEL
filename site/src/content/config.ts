import { defineCollection, z } from 'astro:content';

const site = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    catch: z.string().optional(),
    intro: z.string().optional(),
    avatar: z.string().optional(),
    heroBubble: z.string().optional(),
    profile: z
      .object({
        reviewCount: z.string().optional(),
        favoriteFlavor: z.string().optional(),
        timing: z.string().optional(),
        favoriteWay: z.string().optional(),
        updateRhythm: z.string().optional(),
      })
      .optional(),
    capabilities: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
          icon: z.enum(['cup', 'heart', 'sparkle']).optional(),
        }),
      )
      .optional(),
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
