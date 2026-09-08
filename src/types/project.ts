import type { ContentBlock } from "./content-block";
import type { ImageAsset, ImageObject } from "./image-object";
import type { Skill } from "./skill";

/**
 * One project: a node in the /projects graph, an info panel beside it, and a
 * detail subpage at /projects/:id.
 */
export interface Project {
  /** Used in the URL: /projects/:id */
  id: string;
  title: string;
  /** One line under the title; also the caption on the detail page. */
  tagline: string;
  /** ISO creation date ("2026-03-14"). Orders the list and picks the project
      the graph opens on when no default is set in data/projects.ts. */
  date: string;
  /** Paragraph shown on the info panel, longer than the tagline. */
  description: string;
  /** Everything the project was built with. Drives the graph's connections. */
  skills: Skill[];
  /**
   * Visual shown on the project detail page header context. Prefer
   * non-interactive kinds here; interactive kinds like carousels belong in
   * `details`.
   */
  cover: ImageObject;
  /** Screenshots pinned around the info panel on /projects. */
  gallery?: ImageAsset[];
  /** Body of the detail subpage. */
  details: ContentBlock[];
  /** External links (repo, live demo, writeup). */
  links?: { label: string; url: string }[];
}
