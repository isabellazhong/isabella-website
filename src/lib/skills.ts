import { SKILL_CATEGORY_ORDER, type Skill, type SkillCategory } from "../types";

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}

/** Buckets a project's skills by category, in the canonical display order. */
export function groupSkills(skills: Skill[]): SkillGroup[] {
  return SKILL_CATEGORY_ORDER.map((category) => ({
    category,
    skills: skills.filter((skill) => skill.category === category),
  })).filter((group) => group.skills.length > 0);
}
