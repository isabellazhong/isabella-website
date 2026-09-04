import type { ContentBlock } from "./content-block";
import type { ImageObject } from "./image-object";

/** One project: a half-screen block on /projects and a detail subpage. */
export interface Project {
  /** Used in the URL: /projects/:id */
  id: string;
  title: string;
  /** One line under the title on the project block. */
  tagline: string;
  year?: string;
  tech?: string[];
  /**
   * Visual shown on the project block. Prefer non-interactive kinds here
   * (the whole block is a link); interactive kinds like carousels belong in
   * `details`.
   */
  cover: ImageObject;
  /** Body of the detail subpage. */
  details: ContentBlock[];
  /** External links (repo, live demo, writeup). */
  links?: { label: string; url: string }[];
}
