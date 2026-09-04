import { Link, useParams } from "react-router";
import { ArrowLeft } from "@phosphor-icons/react";
import { blogFolders } from "../data/blogs";
import { ContentBlocks } from "../components/content/ContentBlocks";
import { formatDate } from "../lib/format";
import NotFoundPage from "./NotFoundPage";

export default function BlogPostPage() {
  const { folderId, postId } = useParams();
  const folder = blogFolders.find((f) => f.id === folderId);
  const post = folder?.posts.find((p) => p.id === postId);

  if (!folder || !post) return <NotFoundPage />;

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 pb-24 pt-12 sm:px-6">
      <Link
        to={`/blogs/${folder.id}`}
        className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to {folder.name}
      </Link>
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">{post.title}</h1>
        <p className="text-sm text-ink-soft">{formatDate(post.date)}</p>
      </header>
      <ContentBlocks blocks={post.content} />
    </article>
  );
}
