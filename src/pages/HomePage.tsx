import { useEffect } from "react";
import { LandingSection } from "../components/home/LandingSection";
import { AboutSection } from "../components/home/AboutSection";

export default function HomePage() {
  // Scroll snapping (see index.css) is armed only while the footer is out of
  // view. With proximity snapping, About being a snap point with nothing
  // past it makes the browser refuse to let a scroll gesture travel far
  // beyond it -- which clamped scrolling well short of the actual bottom of
  // the page, making the footer unreachable. (Watching About's own bottom
  // edge doesn't work as the disarm signal: the page isn't a full viewport
  // taller than About, so that edge can never actually scroll above the
  // viewport.) So snapping switches off as soon as any part of the footer
  // comes into view, and back on once it's scrolled fully out of view again.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    document.documentElement.classList.add("home-snap");
    const observer = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.classList.toggle("home-snap", !entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(footer);

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("home-snap");
    };
  }, []);

  return (
    <>
      <LandingSection />
      <AboutSection />
    </>
  );
}
