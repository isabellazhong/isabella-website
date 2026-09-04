import { useEffect } from "react";
import { LandingSection } from "../components/home/LandingSection";
import { AboutSection } from "../components/home/AboutSection";

export default function HomePage() {
  // Scroll snapping applies only while home is mounted (see index.css).
  useEffect(() => {
    document.documentElement.classList.add("home-snap");
    return () => document.documentElement.classList.remove("home-snap");
  }, []);

  return (
    <>
      <LandingSection />
      <AboutSection />
    </>
  );
}
