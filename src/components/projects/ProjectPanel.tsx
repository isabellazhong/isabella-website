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

/**
 * Descriptions are written as indented template literals, so a blank line marks
 * a paragraph break and every other run of whitespace is just source formatting.
 */
function toParagraphs(description: string): string[] {
  return description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

/**
 * Where each screenshot gets tacked to the board, in order. A project with more
 * photos than there are slots is fine -- the list wraps, so a seventh photo
 * reuses the first corner. The far-flung slots only appear on wide screens, so
 * a narrow window keeps the scatter to the two closest photos. Class strings
 * are written out in full because Tailwind reads them straight from source.
 */
const scatterSlots = [
  { place: "-top-14 -left-10", size: "w-66", tilt: "-rotate-3", reveal: "hidden lg:block" },
  { place: "-top-8 -right-14", size: "w-36", tilt: "rotate-[7deg]", reveal: "hidden xl:block" },
];

/** The lifted-off-the-board shadow every tacked photo shares. */
const photoShadow =
  "shadow-[0_10px_20px_-8px_rgba(0,0,0,0.25),0_25px_40px_-15px_rgba(0,0,0,0.3)]";

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
      {/* Screenshots tacked to the board behind the card, scattered around it
          in slot order. They re-enter whenever the selection changes, a beat
          apart, so the pile settles rather than snapping into place. */}
      {gallery.map((photo, photoIndex) => {
        const slot = scatterSlots[photoIndex % scatterSlots.length];
        return (
          <motion.img
            key={`${project.id}-${photoIndex}`}
            src={photo.src}
            alt=""
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.35,
              delay: reduceMotion ? 0 : photoIndex * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`absolute rounded-sm object-cover ${photoShadow} ${slot.place} ${slot.size} ${slot.tilt} ${slot.reveal}`}
          />
        );
      })}

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

            <div className="flex flex-col gap-3">
              {toParagraphs(project.description).map((paragraph, index) => (
                <p key={index} className="text-[0.9rem] leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>

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
