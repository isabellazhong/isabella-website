import { Link, useParams } from "react-router";
import { ArrowLeft } from "@phosphor-icons/react";
import { projects } from "../data/projects";
import { formatDate } from "../lib/format";
import { ContentBlocks } from "../components/content/ContentBlocks";
import { SkillList } from "../components/projects/SkillList";
import NotFoundPage from "./NotFoundPage";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) return <NotFoundPage />;

  return (
    <article className="container-page flex flex-col gap-10 pb-24 pt-12">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink">
        <ArrowLeft size={16} />
        All projects
      </Link>
      <header className="flex flex-col gap-3">
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">{project.title}</h1>
        <p className="max-w-[65ch] text-lg leading-relaxed text-ink-soft">{project.tagline}</p>
        <p className="font-display text-[0.65rem] tracking-[0.18em] text-ink-soft uppercase">
          Created {formatDate(project.date)}
        </p>
        <div className="mt-3 max-w-xl">
          <SkillList skills={project.skills} />
        </div>
        {project.links && project.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-accent hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>
      <ContentBlocks blocks={project.details} />
    </article>
  );
}
