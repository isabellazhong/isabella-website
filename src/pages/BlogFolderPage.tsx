import { Link, useParams } from "react-router";
import { ArrowLeft } from "@phosphor-icons/react";
import { blogFolders } from "../data/blogs";
import { BlogListItem } from "../components/blogs/BlogListItem";
import NotFoundPage from "./NotFoundPage";

export default function BlogFolderPage() {
  const { folderId } = useParams();
  const folder = blogFolders.find((f) => f.id === folderId);

  if (!folder) return <NotFoundPage />;

  return (
    <div className="container-page flex flex-col gap-8 pb-24 pt-12">
      <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink">
        <ArrowLeft size={16} />
        All folders
      </Link>
      <header className="flex flex-col gap-3">
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">{folder.name}</h1>
        {folder.description && <p className="max-w-[65ch] leading-relaxed text-ink-soft">{folder.description}</p>}
      </header>
      {folder.posts.length === 0 ? (
        <p className="text-ink-soft">No posts in this folder yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {folder.posts.map((post) => (
            <BlogListItem key={post.id} folder={folder} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
