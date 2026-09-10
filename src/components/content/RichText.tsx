import type { ReactNode } from "react";
import { Link } from "react-router";

/** Matches a markdown-style inline link: [label](href). */
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

const LINK_CLASS =
  "text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent";

export interface RichTextProps {
  /** Plain text that may contain [label](href) links. */
  text: string;
}

/**
 * Renders a plain data string with inline links. Hrefs starting with "/" are
 * routed client-side; anything else opens as an external link.
 */
export function RichText({ text }: RichTextProps) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const [raw, label, href] = match;
    const start = match.index;

    if (start > lastIndex) nodes.push(text.slice(lastIndex, start));

    nodes.push(
      href.startsWith("/") ? (
        <Link key={start} to={href} className={LINK_CLASS}>
          {label}
        </Link>
      ) : (
        <a key={start} href={href} target="_blank" rel="noreferrer" className={LINK_CLASS}>
          {label}
        </a>
      ),
    );

    lastIndex = start + raw.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return <>{nodes}</>;
}
