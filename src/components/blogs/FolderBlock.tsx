import { Link } from "react-router";
import type { BlogFolder } from "../../types";

/** Folder-shaped block on /blogs; the tab shape is pure CSS. */
export function FolderBlock({ folder }: { folder: BlogFolder }) {
  const count = folder.posts.length;

  return (
    <Link to={`/blogs/${folder.id}`} className="group flex flex-col transition-transform hover:-translate-y-1">
      <span className="h-3.5 w-24 rounded-t-lg border border-b-0 border-line bg-surface-raised" aria-hidden="true" />
      <span className="flex min-h-40 flex-col gap-2 rounded-b-2xl rounded-tr-2xl border border-line bg-surface-raised p-6">
        <span className="font-display text-xl tracking-tight text-ink">{folder.name}</span>
        {folder.description && <span className="text-sm leading-relaxed text-ink-soft">{folder.description}</span>}
        <span className="mt-auto text-sm text-ink-soft">
          {count} {count === 1 ? "post" : "posts"}
        </span>
      </span>
    </Link>
  );
}
