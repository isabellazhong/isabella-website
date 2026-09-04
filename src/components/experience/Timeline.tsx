import { Reveal } from "../motion/Reveal";
import type { ExperienceEntry } from "../../entities";

/** Vertical timeline; ongoing roles (end === null) get the accent marker. */
export function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-ink-soft">Add entries in src/data/experiences.ts and they will show up here.</p>;
  }

  return (
    <ol className="relative flex flex-col gap-10 border-l border-line pl-8">
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          <span
            className={`absolute top-2 -left-[2.45rem] h-3.5 w-3.5 rounded-full border-2 border-surface ${
              entry.end === null ? "bg-accent" : "bg-line"
            }`}
            aria-hidden="true"
          />
          <Reveal>
            <article className="rounded-2xl border border-line bg-surface-raised p-6 md:p-8">
              <p className="text-sm text-ink-soft">
                {entry.start} to {entry.end ?? "Present"}
                {entry.location ? ` · ${entry.location}` : ""}
              </p>
              <h2 className="mt-1 font-display text-xl tracking-tight">{entry.role}</h2>
              <p className="text-ink-soft">{entry.company}</p>
              <p className="mt-3 max-w-[65ch] leading-relaxed text-ink-soft">{entry.summary}</p>
              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-3 flex list-disc flex-col gap-1 pl-5 text-sm text-ink-soft">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
              {entry.skills && entry.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
