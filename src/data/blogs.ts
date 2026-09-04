import type { BlogFolder } from "../entities";

/**
 * Folders group posts by section on /blogs. Opening a folder lists its posts
 * as vertically stacked blocks; each post opens its own subpage at
 * /blogs/:folderId/:postId.
 */
export const blogFolders: BlogFolder[] = [
  {
    id: "tech-notes",
    name: "Tech notes",
    description: "Things I learned while building and breaking software.",
    posts: [
      {
        id: "first-post",
        title: "Title of your first post",
        date: "2026-08-14",
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
      {
        id: "second-post",
        title: "Title of your second post",
        date: "2026-07-02",
        summary: "One-line teaser shown on the stacked list block.",
        content: [
          {
            kind: "paragraph",
            text: "Every post is just data: duplicate this object, change the id, and the routes and lists update automatically.",
          },
        ],
      },
    ],
  },
  {
    id: "life",
    name: "Life",
    description: "Everything that is not code.",
    posts: [
      {
        id: "hello",
        title: "Title of a post in another folder",
        date: "2026-06-10",
        summary: "One-line teaser shown on the stacked list block.",
        content: [
          {
            kind: "paragraph",
            text: "Folders keep sections separate. Add a new folder in src/data/blogs.ts and it appears on the blogs page immediately.",
          },
        ],
      },
    ],
  },
];
