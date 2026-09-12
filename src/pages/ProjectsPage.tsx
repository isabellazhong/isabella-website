import { useMemo } from "react";
import { ProjectGraphCanvas } from "../components/projects/ProjectGraphCanvas";
import { ProjectPanel } from "../components/projects/ProjectPanel";
import { ProjectGraph } from "../lib/graph/ProjectGraph";
import { useStickyState } from "../lib/useStickyState";
import { defaultProjectId, focusNeighborCount, projectGraphSettings, projects } from "../data/projects";

/**
 * The projects whiteboard: a rotatable 3-D similarity graph on one half, the
 * selected project written up on the other.
 *
 * The two halves share a single piece of state -- the selected project id --
 * so a release over a node, a tap, and a click in the panel's neighbor list
 * all drive the same transition. That id is remembered for the tab, so opening
 * a project write-up and wandering off returns to that same project.
 */
export default function ProjectsPage() {
  const graph = useMemo(() => new ProjectGraph(projects, projectGraphSettings), []);

  const openingId = defaultProjectId ?? graph.mostRecentId() ?? "";
  const [selectedId, setSelectedId] = useStickyState(
    "projects:selected",
    openingId,
    (id) => graph.node(id) !== undefined,
  );

  const selected = graph.node(selectedId) ?? graph.node(openingId);
  const neighbors = selected ? graph.neighbors(selected.id, focusNeighborCount) : [];
  const index = selected ? projects.findIndex((project) => project.id === selected.id) : -1;

  if (!selected) {
    return (
      <div className="whiteboard -mt-16 flex min-h-dvh items-center justify-center pt-16">
        <p className="text-ink-soft">Add projects in src/data/projects.ts and they will show up here.</p>
      </div>
    );
  }

  return (
    <div className="whiteboard -mt-16 border-b border-line pt-16">
      <div className="grid min-h-[calc(100dvh-4rem)] grid-cols-1 lg:grid-cols-2">
        <section
          aria-label="Project similarity graph"
          className="relative h-[58dvh] border-b border-dashed border-line lg:h-auto lg:border-r lg:border-b-0"
        >
          <ProjectGraphCanvas
            graph={graph}
            selectedId={selected.id}
            onSelect={setSelectedId}
            neighborCount={focusNeighborCount}
          />
        </section>

        <section
          aria-label="Selected project"
          className="relative flex items-center justify-center px-6 py-14 sm:px-10 lg:px-14 xl:px-20"
        >
          <ProjectPanel
            project={selected.project}
            index={index}
            total={projects.length}
            neighbors={neighbors}
            onSelectNeighbor={setSelectedId}
          />
        </section>
      </div>
    </div>
  );
}
