/**
 * A single capability a project was built with. The full set of a project's
 * skills is what the projects graph compares: two projects are connected when
 * the Jaccard similarity of their skill sets clears the graph threshold.
 *
 * `category` is presentation only (it groups the list on the info panel);
 * similarity matches on the normalized name, so labelling React a "library" in
 * one project and a "framework" in another still counts as the same skill.
 */
export type SkillCategory = "language" | "framework" | "library" | "tool";

export interface Skill {
  name: string;
  category: SkillCategory;
}

/** Display order and headings for the grouped skill list on the info panel. */
export const SKILL_CATEGORY_ORDER: SkillCategory[] = ["language", "framework", "library", "tool"];

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  language: "Languages",
  framework: "Frameworks",
  library: "Libraries",
  tool: "Tools",
};
