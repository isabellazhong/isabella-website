import type { ImageAsset } from "./image-object";

/** One internship or role, rendered as a block on the experience timeline. */
export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location?: string;
  /** Human-readable, e.g. "May 2026". */
  start: string;
  /** null while the role is ongoing; renders as "Present". */
  end: string | null;
  summary: string;
  /** Optional bullet points under the summary. */
  highlights?: string[];
  /** Rendered as small chips. */
  skills?: string[];
  logo?: ImageAsset;
}
