import { useEffect, useState } from "react";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useNav } from "./NavContext";

const LINKS = [
  { to: "/", label: "home" },
  { to: "/about", label: "about me" },
  { to: "/experience", label: "experience" },
  { to: "/projects", label: "projects" },
  { to: "/blogs", label: "blogs" },
  { to: "/contact", label: "contact me" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const { pinned } = useNav();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (pinned || y < 80) {
      setHidden(false);
      return;
    }
    setHidden(y > prev);
  });

  useEffect(() => {
    if (pinned) setHidden(false);
  }, [pinned]);

  // project detail pages swap the menu for a hand-drawn back arrow
  if (matchPath("/projects/:id", pathname)) return null;

  return (
    <motion.header
      className="nav"
      animate={{ y: hidden ? "-130%" : "0%" }}
      transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="nav-links">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </motion.header>
  );
}
