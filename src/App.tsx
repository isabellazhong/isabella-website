import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { useRememberSection } from "./lib/nav-memory";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogsPage from "./pages/BlogsPage";
import BlogFolderPage from "./pages/BlogFolderPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

/** Keeps the nav bar's Projects and Blogs links pointing at the last page visited there. */
function SectionMemory() {
  useRememberSection();
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <ScrollToTop />
      <SectionMemory />
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:folderId" element={<BlogFolderPage />} />
          <Route path="/blogs/:folderId/:postId" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
