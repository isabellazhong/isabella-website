import { Reveal } from "../motion/Reveal";
import type { ExperienceEntry } from "../../types";

/** Vertical timeline; ongoing roles (end === null) get the accent marker. */
export function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-ink-soft">Add entries in src/data/experiences.ts and they will show up here.</p>;
  }

  return (
    <ol className="relative flex flex-col gap-10">
      {entries.map((entry, index) => (
        <li
          key={entry.id}
          className="relative grid grid-cols-[minmax(5.5rem,7rem)_1.5rem_1fr] items-start md:grid-cols-[minmax(6.5rem,8rem)_1.5rem_1fr]"
        >
          <h1 className={`pt-1 text-left font-display text-md font-bold tracking-tight md:text-1xl ${entry.end === null ? "text-accent" : "text-accent-ink"}`}>
            {entry.start}
          </h1>

          <div className="relative flex h-full justify-center">
            <span
              className={`absolute left-1/2 w-px -translate-x-1/2 bg-line ${index === 0 ? "top-0" : "-top-10"} bottom-0`}
              aria-hidden="true"
            />
            <span
              className={`relative top-2 h-3.5 w-3.5 rounded-full border-2 border-surface ${
                entry.end === null ? "bg-accent" : "bg-line"
              }`}
              aria-hidden="true"
            />
          </div>

          <Reveal>
            <article className="rounded-2xl border border-line bg-surface-raised p-6 md:p-8">
              {entry.location && <p className="text-sm text-ink-soft">{entry.location}</p>}
              <h2 className="mt-1 font-display text-xl tracking-tight">{entry.role}</h2>
              <p className="text-ink-soft">{`${entry.start} - ${entry.end === null ? "Present" : entry.end}` }</p>
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
