import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import type { Project } from "../../types";

/** Devpost's hexagon mark; Phosphor has no icon for it. */
function DevpostLogo({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.5 2h11L23 12l-5.5 10h-11L1 12z" />
      <path d="M9 7h3a5 5 0 0 1 0 10H9z" />
    </svg>
  );
}

const linkClass =
  "inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink";

/**
 * The project's outbound links: GitHub and Devpost get their own icons and
 * always come first, then any free-form `links` (live demo, writeup, ...).
 * Renders nothing when the project has no links at all.
 */
export function ProjectLinks({ project }: { project: Project }) {
  const { github, devpost, links } = project;
  if (!github && !devpost && !links?.length) return null;

  return (
    <>
      {github && (
        <a href={github} target="_blank" rel="noreferrer" className={linkClass}>
          <GithubLogo size={15} weight="bold" />
          GitHub
        </a>
      )}
      {devpost && (
        <a href={devpost} target="_blank" rel="noreferrer" className={linkClass}>
          <DevpostLogo size={15} />
          Devpost
        </a>
      )}
      {links?.map((link) => (
        <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className={linkClass}>
          {link.label}
          <ArrowUpRight size={13} />
        </a>
      ))}
    </>
  );
}
