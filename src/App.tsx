import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { hasPlayedLanding } from "./lib/landingState";
import { NavProvider } from "./components/NavContext";
import Nav from "./components/Nav";
import Grain from "./components/Grain";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // once the landing animation has played, returning home stays on the hero
    if (pathname === "/" && hasPlayedLanding()) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <NavProvider>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Grain />
    </NavProvider>
  );
}
