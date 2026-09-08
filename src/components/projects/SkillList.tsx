import { SKILL_CATEGORY_LABELS, type Skill } from "../../types";
import { groupSkills } from "../../lib/skills";

export interface SkillListProps {
  skills: Skill[];
  /** Skill names to mark as shared with the project being compared against. */
  emphasize?: Set<string>;
}

/**
 * A project's skill set, grouped by category. This is the same set the graph
 * runs its Jaccard comparison over, so the panel and the edges always agree.
 */
export function SkillList({ skills, emphasize }: SkillListProps) {
  const groups = groupSkills(skills);
  if (groups.length === 0) return null;

  return (
    <dl className="flex flex-col gap-3">
      {groups.map((group) => (
        <div key={group.category} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-3 gap-y-1">
          <dt className="font-display text-[0.58rem] tracking-[0.16em] text-ink-soft uppercase">
            {SKILL_CATEGORY_LABELS[group.category]}
          </dt>
          <dd className="flex flex-wrap gap-x-1.5 gap-y-1.5">
            {group.skills.map((skill) => {
              const shared = emphasize?.has(skill.name.trim().toLowerCase());
              return (
                <span
                  key={skill.name}
                  className={`rounded-full border px-2.5 py-0.5 text-[0.7rem] leading-5 ${
                    shared ? "border-accent/50 text-accent" : "border-line text-ink-soft"
                  }`}
                >
                  {skill.name}
                </span>
              );
            })}
          </dd>
        </div>
      ))}
    </dl>
  );
}
