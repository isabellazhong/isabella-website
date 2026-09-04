import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import type { Project } from "../../types";
import { ImageObjectView } from "../image-objects/ImageObjectView";

export interface ProjectBlockProps {
  project: Project;
  /** Which side the text sits on at desktop widths; the list alternates this. */
  textSide: "left" | "right";
}

/** Half-viewport-height clickable block linking to the project subpage. */
export function ProjectBlock({ project, textSide }: ProjectBlockProps) {
  const textOrder = textSide === "left" ? "md:order-1" : "md:order-2";
  const imageOrder = textSide === "left" ? "md:order-2" : "md:order-1";

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group grid min-h-[50dvh] overflow-hidden rounded-2xl border border-line bg-surface-raised transition-shadow hover:shadow-lg hover:shadow-ink/5 md:grid-cols-2"
    >
      <div className={`order-2 flex items-center p-6 pt-0 md:p-8 ${imageOrder} md:pt-8`}>
        <ImageObjectView object={project.cover} />
      </div>
      <div className={`order-1 flex flex-col justify-center gap-4 p-6 md:p-12 ${textOrder}`}>
        <h2 className="font-display text-3xl tracking-tight">{project.title}</h2>
        <p className="max-w-[45ch] leading-relaxed text-ink-soft">{project.tagline}</p>
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft">
                {tech}
              </span>
            ))}
          </div>
        )}
        <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent">
          View project
          <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
