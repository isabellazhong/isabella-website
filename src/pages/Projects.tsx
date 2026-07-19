import { Link } from "react-router-dom";
import Tag from "../components/Tag";
import Doodle from "../components/Doodle";
import { PROJECTS } from "../data/projects";

export default function Projects() {
  return (
    <main className="page projects">
      <h1 className="display page-title">projects</h1>
      <div className="project-grid">
        {PROJECTS.map((p) => (
          <Link key={p.id} to={`/projects/${p.id}`} className="project-card">
            <h2>{p.title}</h2>
            <p className="project-date">{p.date}</p>
            <div className="tags">
              {p.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </Link>
        ))}
      </div>
      <Doodle kind="star" className="doodle-abs" size={34} rotate={14} style={{ top: "4.2rem", right: "6%" }} />
      <Doodle kind="squiggle" className="doodle-abs" size={44} rotate={-4} style={{ bottom: "2rem", left: "2%" }} />
    </main>
  );
}
