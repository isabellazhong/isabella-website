import type { ContentBlock } from "./content-block";
import type { ImageAsset } from "./image-object";
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
  /** Screenshots pinned around the info panel on /projects. */
  gallery?: ImageAsset[];
  /** Body of the detail subpage. Omit it (or leave it empty) and the project
      has no write-up: the panel drops its "Read the full write-up" link and
      /projects/:id falls through to the 404 page. */
  details?: ContentBlock[];
  /** Source repository; shown with the GitHub mark beside the write-up link. */
  github?: string;
  /** Hackathon submission; shown with the Devpost mark next to GitHub. */
  devpost?: string;
  /** Any other external links (live demo, writeup, ...), listed after the two above. */
  links?: { label: string; url: string }[];
}
