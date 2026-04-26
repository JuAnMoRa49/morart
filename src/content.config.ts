import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string(),
      inspo: z.string().optional(),
      tags: z.array(z.string()).optional(),
      pubDate: z.coerce.date(),
      updDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      imageCredits: z.string().optional(),
    }),
});

const portfolio = defineCollection({
  // Load Markdown and MDX files in the `src/content/portfolio/` directory.
  loader: glob({ base: "./src/content/portfolio", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      live: z.boolean().default(false),
      technologies: z.array(z.string()),
      demo: z.string().optional(),
      repo: z.string().optional(),
      status: z.enum(["in-progress", "completed", "archived"]),
      pubDate: z.coerce.date(),
      updDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
    }),
});

export const collections = { blog, portfolio };
