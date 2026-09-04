import { PageHeader } from "../components/layout/PageHeader";
import { ProjectBlock } from "../components/projects/ProjectBlock";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" lede="Selected work. Click any block for the full story." />
      <div className="container-page flex flex-col gap-10 pb-24">
        {projects.length === 0 ? (
          <p className="text-ink-soft">Add projects in src/data/projects.ts and they will show up here.</p>
        ) : (
          projects.map((project, i) => (
            <ProjectBlock key={project.id} project={project} textSide={i % 2 === 0 ? "left" : "right"} />
          ))
        )}
      </div>
    </>
  );
}
