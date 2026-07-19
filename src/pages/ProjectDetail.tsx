import { Link, useParams } from "react-router-dom";
import Tag from "../components/Tag";
import Doodle from "../components/Doodle";
import { PROJECTS } from "../data/projects";
import { useSnapScroll } from "../hooks/useSnapScroll";

export default function ProjectDetail() {
  useSnapScroll();
  const { id } = useParams();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="page">
        <h1 className="display page-title">hmm.</h1>
        <p>that project does not exist (yet).</p>
        <p>
          <Link to="/projects" className="text-link">
            back to projects
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="project-detail">
      <Link to="/projects" className="back-arrow" aria-label="back to projects">
        <svg viewBox="0 0 48 30" aria-hidden="true">
          <path d="M45 15 C 34 13.6, 22 14.8, 5.5 15.3" />
          <path d="M5.5 15.3 L 14 8" />
          <path d="M5.5 15.3 L 13.4 23.4" />
        </svg>
      </Link>

      <section className="pd-intro snap-start">
        <div className="pd-text">
          <h1 className="display">{project.title}</h1>
          <p className="pd-short">{project.short}</p>
          <div className="pd-stack">
            <h2>tech stack</h2>
            <div className="pd-stack-box">
              {project.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>
        </div>
        <div className="pd-art">
          <div className="art-placeholder">
            <Doodle kind="star" size={56} rotate={-8} />
            <span>project doodle placeholder</span>
          </div>
          <Doodle kind="sparkle" className="doodle-abs" size={28} rotate={12} style={{ top: "-1.4rem", right: "10%" }} />
        </div>
      </section>

      <div className="pd-sections">
        {project.sections.map((s, i) =>
          s.layout === "full" ? (
            <section key={i} className="pd-section pd-full">
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
              <img src={s.image} alt={s.caption ?? s.heading} loading="lazy" />
              {s.caption && <p className="pd-caption">{s.caption}</p>}
            </section>
          ) : (
            <section key={i} className={`pd-section pd-split ${i % 2 ? "pd-flip" : ""}`}>
              <div>
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </div>
              <img src={s.image} alt={s.caption ?? s.heading} loading="lazy" />
            </section>
          ),
        )}
      </div>
    </main>
  );
}
