import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import type { BlogFolder, BlogPost } from "../../types";
import { formatDate } from "../../lib/format";

/** One vertically stacked post block inside a folder. */
export function BlogListItem({ folder, post }: { folder: BlogFolder; post: BlogPost }) {
  return (
    <Link
      to={`/blogs/${folder.id}/${post.id}`}
      className="group flex items-center justify-between gap-6 rounded-2xl border border-line bg-surface-raised p-6 transition-shadow hover:shadow-lg hover:shadow-ink/5"
    >
      <span className="flex flex-col gap-1">
        <span className="font-display text-lg tracking-tight text-ink">{post.title}</span>
        {post.summary && <span className="text-sm leading-relaxed text-ink-soft">{post.summary}</span>}
        <span className="mt-1 text-xs text-ink-soft">{formatDate(post.date)}</span>
      </span>
      <ArrowRight size={18} className="shrink-0 text-ink-soft transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
