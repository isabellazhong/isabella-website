import type { ContentBlock } from "./content-block";

/** One blog post, rendered as a stacked block inside its folder and as a subpage. */
export interface BlogPost {
  /** Used in the URL: /blogs/:folderId/:postId */
  id: string;
  title: string;
  /** ISO date, e.g. "2026-08-14". */
  date: string;
  /** Short teaser shown on the stacked list block. */
  summary?: string;
  content: ContentBlock[];
}

/** A folder-shaped block on /blogs that groups posts by section. */
export interface BlogFolder {
  /** Used in the URL: /blogs/:id */
  id: string;
  name: string;
  description?: string;
  posts: BlogPost[];
}
