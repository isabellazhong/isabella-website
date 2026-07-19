import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Doodle from "../components/Doodle";
import { HOBBIES, POLAROIDS } from "../data/about";
import { useSnapScroll } from "../hooks/useSnapScroll";

const spring = { type: "spring", stiffness: 260, damping: 26 } as const;

export default function About() {
  useSnapScroll();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activePolaroid = POLAROIDS.find((p) => p.id === active);

  return (
    <main className="about">
      <section className="about-hello snap-start">
        <div className="about-hello-text">
          <h1 className="display">hello!</h1>
          <p>
            i'm isabella, a software developer who likes building things that feel a little more human. this paragraph
            is a placeholder, so tell people what you study, where you are, and what you care about.
          </p>
          <p>
            when i'm not coding you'll probably find me drawing, chasing good coffee, or adding one more thing to this
            website.
          </p>
        </div>
        <div className="about-photo">
          <img src="https://picsum.photos/seed/isabella-portrait/720/900" alt="placeholder portrait, swap for a real photo" />
          <Doodle kind="star" className="doodle-abs" size={34} rotate={-12} style={{ top: "-1.6rem", right: "8%" }} />
          <Doodle kind="sparkle" className="doodle-abs" size={26} rotate={8} style={{ bottom: "-1.2rem", left: "-1.8rem" }} />
          <Doodle kind="squiggle" className="doodle-abs" size={44} rotate={-6} style={{ top: "38%", left: "-3.2rem" }} />
        </div>
      </section>

      <section className="about-polaroids snap-start">
        <h2 className="display">get to know me a bit better...</h2>
        <div className="pol-pile">
          {POLAROIDS.map(
            (p) =>
              active !== p.id && (
                <motion.button
                  key={p.id}
                  layoutId={p.id}
                  className="polaroid"
                  style={{ rotate: p.rotate, x: p.x, y: p.y }}
                  transition={spring}
                  whileHover={{ y: p.y - 10 }}
                  onClick={() => setActive(p.id)}
                  aria-label={`look closer at the polaroid: ${p.title}`}
                >
                  <img src={p.src} alt={p.title} draggable={false} />
                  <span className="pol-caption">
                    {p.title}
                    <br />
                    <small>{p.date}</small>
                  </span>
                </motion.button>
              ),
          )}
          <Doodle kind="arrow" className="doodle-abs" size={46} rotate={16} style={{ top: "-2.4rem", right: "-3.4rem" }} />
          <Doodle kind="heart" className="doodle-abs" size={30} rotate={-10} style={{ bottom: "-1.6rem", left: "-3rem" }} />
        </div>
      </section>

      <section className="about-hobbies">
        <h2 className="display">and the things i love doing</h2>
        {HOBBIES.map((h, i) => (
          <div key={h.id} className={`hobby ${i === 2 ? "hobby-wide" : i % 2 ? "hobby-flip" : ""}`}>
            <div className="hobby-art">
              <Doodle kind={h.doodle} size={54} />
              <span>drawing coming soon</span>
            </div>
            <div className="hobby-text">
              <h3>{h.name}</h3>
              <p>{h.blurb}</p>
            </div>
          </div>
        ))}
      </section>

      <AnimatePresence>
        {activePolaroid && (
          <motion.div
            className="pol-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              layoutId={activePolaroid.id}
              className="polaroid polaroid-open"
              transition={spring}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={activePolaroid.src} alt={activePolaroid.title} />
              <span className="pol-caption">
                {activePolaroid.title}
                <br />
                <small>{activePolaroid.date}</small>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
