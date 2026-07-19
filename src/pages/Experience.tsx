import Tag from "../components/Tag";
import Doodle from "../components/Doodle";
import { EXPERIENCE } from "../data/experience";

const LINE =
  "M5 0 C 6.6 90 3.4 180 5.2 270 C 6.9 360 3.6 460 5 550 C 6.2 640 3.9 730 5.4 820 C 6.7 900 4.1 950 5 1000";

export default function Experience() {
  return (
    <main className="page experience">
      <h1 className="display page-title">experience</h1>
      <div className="timeline">
        <svg className="timeline-line" viewBox="0 0 10 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d={LINE} vectorEffect="non-scaling-stroke" />
        </svg>
        {EXPERIENCE.map((e) => (
          <article key={e.id} className="xp-row">
            <div className="xp-date">{e.start}</div>
            <span className="xp-dot" aria-hidden="true" />
            <div className="xp-panel">
              <span className="xp-duration">{e.duration}</span>
              <div className="xp-main">
                <h2>{e.company}</h2>
                <p className="xp-role">{e.role}</p>
                <div className="tags">
                  {e.tags.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
                <p className="xp-desc">{e.description}</p>
              </div>
              <div className="xp-logo">
                <Doodle kind="sun" size={44} rotate={6} />
                <span>hand-drawn logo placeholder</span>
              </div>
            </div>
          </article>
        ))}
        <Doodle kind="sparkle" className="doodle-abs" size={30} rotate={10} style={{ top: "-2.6rem", right: "5%" }} />
        <Doodle kind="loop" className="doodle-abs" size={44} rotate={-8} style={{ bottom: "-1rem", right: "12%" }} />
      </div>
    </main>
  );
}
