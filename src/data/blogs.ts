import type { BlogFolder } from "../types";

/**
 * Folders group posts by section on /blogs. Opening a folder lists its posts
 * as vertically stacked blocks; each post opens its own subpage at
 * /blogs/:folderId/:postId.
 */
export const blogFolders: BlogFolder[] = [
  {
    id: "machine-learning",
    name: "Machine Learning",
    description: "My Machine Learning Journey Documentation!",
    posts: [
      {
        id: "adam",
        title: "The Bug: Adam vs. AdamW Optimizers",
        date: "2026-09-12",
        summary: "One-line teaser shown on the stacked list block.",
        content: [
          {
            kind: "paragraph",
            text: "Write the post body as an ordered list of content blocks. Paragraphs, headings, images, and text-image splits all work here.",
          },
          { kind: "heading", text: "A section heading" },
          {
            kind: "paragraph",
            text: "Add as many blocks as the post needs. New block kinds can be added in src/entities/content-block.ts.",
          },
          {
            kind: "image",
            image: {
              kind: "single",
              image: { src: "https://picsum.photos/seed/isabella-blog-1/1200/700", alt: "Placeholder blog image" },
            },
            caption: "An optional caption under the image.",
          },
        ],
      },
    ],
  }
];
