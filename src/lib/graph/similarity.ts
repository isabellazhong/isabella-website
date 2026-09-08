import type { Skill } from "../../types";

/**
 * Normalized comparison key for a skill. Category is deliberately ignored:
 * "React" tagged as a library on one project and a framework on another is
 * still the same skill as far as similarity is concerned.
 */
export function skillKey(skill: Skill): string {
  return skill.name.trim().toLowerCase();
}

export function toSkillSet(skills: Skill[]): Set<string> {
  return new Set(skills.map(skillKey));
}

/** |A n B| / |A u B|, in 0..1. Empty sets score 0 rather than dividing by zero. */
export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;

  let intersection = 0;
  for (const key of a) if (b.has(key)) intersection += 1;

  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/** The skills two projects share, in the order the first project lists them. */
export function sharedSkills(a: Skill[], b: Skill[]): Skill[] {
  const other = toSkillSet(b);
  return a.filter((skill) => other.has(skillKey(skill)));
}
