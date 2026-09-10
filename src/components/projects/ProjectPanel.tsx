import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router";
import type { Neighbor } from "../../lib/graph/ProjectGraph";
import { formatDate } from "../../lib/format";
import type { Project } from "../../types";
import { SkillList } from "./SkillList";

export interface ProjectPanelProps {
  project: Project;
  /** Position of this project in the list, for the index stamp. */
  index: number;
  total: number;
  /** The same related projects the flattened graph is showing. */
  neighbors: Neighbor[];
  onSelectNeighbor: (id: string) => void;
}

/** A dashed hairline, the panel's only divider. */
function Rule() {
  return <hr className="border-t border-dashed border-line" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[0.58rem] tracking-[0.2em] text-ink-soft uppercase">{children}</p>
  );
}

/**
 * The right half of the whiteboard: the selected project written up as a card
 * pinned to the board, with its screenshots tacked around it.
 */
export function ProjectPanel({ project, index, total, neighbors, onSelectNeighbor }: ProjectPanelProps) {
  const reduceMotion = useReducedMotion();
  const gallery = project.gallery ?? [];

  return (
    <div className="relative w-full max-w-xl">
      {/* Screenshots tacked to the board behind the card. Offsets stay inside
          the pane so a photo is never clipped by the viewport edge. */}
      {gallery[0] && (
        <img
          src={gallery[0].src}
          alt=""
          aria-hidden="true"
          className="polaroid-frame absolute -top-12 -left-12 hidden w-44 -rotate-3 object-cover lg:block"
        />
      )}
      {gallery[1] && (
        <img
          src={gallery[1].src}
          alt=""
          aria-hidden="true"
          className="polaroid-frame absolute -right-10 -bottom-8 hidden w-28 rotate-6 object-cover xl:block"
        />
      )}

      <article className="relative z-10 -rotate-[0.35deg] rounded-2xl border border-line bg-surface-raised shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-24px_rgba(0,0,0,0.35)]">

        <header className="flex items-center justify-between gap-4 border-b border-dashed border-line px-6 py-3 sm:px-8">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <SectionLabel>Selected project</SectionLabel>
          </span>
          <span className="font-display text-[0.6rem] tracking-[0.18em] text-ink-soft tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </header>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 px-6 py-6 sm:px-8 sm:py-7"
          >
            <div className="flex flex-col gap-1.5">
              <h2 className="font-display text-3xl leading-tight tracking-tight">{project.title}</h2>
              <p className="text-sm leading-relaxed text-ink-soft">{project.tagline}</p>
              <p className="font-display mt-1 text-[0.6rem] tracking-[0.18em] text-ink-soft uppercase">
                Created {formatDate(project.date)}
              </p>
            </div>

            <Rule />

            <p className="text-[0.9rem] leading-relaxed text-ink-soft">{project.description}</p>

            <Rule />

            <section className="flex flex-col gap-3">
              <SectionLabel>Languages &amp; tools</SectionLabel>
              <SkillList skills={project.skills} />
            </section>

            {neighbors.length > 0 && (
              <>
                <Rule />
                <section className="flex flex-col gap-2">
                  <SectionLabel>Nearest by skill overlap</SectionLabel>
                  <ul className="flex flex-col">
                    {neighbors.map((neighbor) => (
                      <li key={neighbor.node.id}>
                        <button
                          type="button"
                          onClick={() => onSelectNeighbor(neighbor.node.id)}
                          className="group flex w-full items-center gap-3 py-1.5 text-left"
                        >
                          <span className="text-[0.82rem] text-ink-soft transition-colors group-hover:text-accent">
                            {neighbor.node.project.title}
                          </span>
                          <span
                            className="h-px flex-1 bg-line"
                            aria-hidden="true"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(90deg, currentColor 0 3px, transparent 3px 6px)",
                            }}
                          />
                          <span className="font-display text-[0.68rem] text-ink-soft tabular-nums transition-colors group-hover:text-accent">
                            {Math.round(neighbor.similarity * 100)}%
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            <Rule />

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                to={`/projects/${project.id}`}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent"
              >
                Read the full write-up
                <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
              {project.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  );
}
