import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { NavBar } from "./components/layout/NavBar";
import { SITE_NAME } from "./data/profile";
import HomePage from "./pages/HomePage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogsPage from "./pages/BlogsPage";
import BlogFolderPage from "./pages/BlogFolderPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
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
      <footer className="border-t border-line">
        <div className="container-page flex h-16 items-center justify-between text-sm text-ink-soft">
          <span>{SITE_NAME}</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
