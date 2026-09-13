import katex from "katex";
import "katex/dist/katex.min.css";

export interface LatexBlockProps {
  /** LaTeX source, without surrounding $$ delimiters. */
  text: string;
  /** Optional caption below the equation. */
  caption?: string;
  className?: string;
}

/**
 * A display-math block for project details and blog posts, rendered with
 * KaTeX. Invalid input renders the offending source in red rather than
 * throwing, so a typo in data doesn't take the page down. Scrolls
 * horizontally when an equation is wider than the column.
 */
export function LatexBlock({ text, caption, className }: LatexBlockProps) {
  const html = katex.renderToString(text, { displayMode: true, throwOnError: false });
  return (
    <figure className={`flex flex-col gap-2 ${className ?? ""}`}>
      <div className="overflow-x-auto py-2 text-ink" dangerouslySetInnerHTML={{ __html: html }} />
      {caption && <figcaption className="text-sm text-ink-soft">{caption}</figcaption>}
    </figure>
  );
}
