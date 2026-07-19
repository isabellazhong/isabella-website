import { useEffect, useId, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion } from "motion/react";
import Doodle from "../components/Doodle";
import { BLOGS, type Blog } from "../data/blogs";

const CRUMPLE = 34;

function CrumpledCard({ blog, seed }: { blog: Blog; seed: number }) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const filterId = `crumple-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const start = reduce ? 0 : CRUMPLE;
  const scale = useMotionValue(start);
  const shade = useMotionValue(reduce ? 0 : 1);
  const touchTimer = useRef<number | null>(null);
  const touchModeRef = useRef(false);

  useMotionValueEvent(scale, "change", (v) => {
    dispRef.current?.setAttribute("scale", String(v));
  });

  useEffect(() => {
    return () => {
      if (touchTimer.current) window.clearTimeout(touchTimer.current);
    };
  }, []);

  const uncrumple = () => {
    if (reduce) return;
    animate(scale, 0, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
    animate(shade, 0, { duration: 0.5 });
  };
  const recrumple = () => {
    if (reduce) return;
    animate(scale, CRUMPLE, { duration: 0.45, ease: "easeOut" });
    animate(shade, 1, { duration: 0.45 });
  };

  const go = () => navigate(`/blogs/${blog.id}`);

  // mobile: press and hold to smooth the paper out, then open the post
  const onTouchStart = () => {
    touchModeRef.current = true;
    uncrumple();
    touchTimer.current = window.setTimeout(() => {
      touchTimer.current = null;
      go();
    }, 800);
  };
  const onTouchEnd = () => {
    if (touchTimer.current) {
      window.clearTimeout(touchTimer.current);
      touchTimer.current = null;
      recrumple();
    }
  };
  const onClick = () => {
    if (touchModeRef.current) return;
    go();
  };

  return (
    <div className="blog-cell">
      <motion.button
        className="blog-paper-wrap"
        onMouseEnter={uncrumple}
        onMouseLeave={recrumple}
        onClick={onClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        whileTap={{ scale: 0.985 }}
        aria-label={`read blog: ${blog.title}`}
      >
       
      </motion.button>
      <h2 className="blog-name">{blog.title}</h2>
      <p className="blog-date">{blog.date}</p>
    </div>
  );
}

export default function Blogs() {
  return (
    <main className="page blogs">
      <h1 className="display page-title">blogs</h1>
      <div className="blog-grid">
        {BLOGS.map((b, i) => (
          <CrumpledCard key={b.id} blog={b} seed={i * 7 + 3} />
        ))}
      </div>
      <Doodle kind="loop" className="doodle-abs" size={44} rotate={6} style={{ top: "4.6rem", right: "4%" }} />
    </main>
  );
}
