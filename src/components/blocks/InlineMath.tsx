import { Fragment } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

/**
 * Splits prose into plain-text and `$...$` math segments. A literal dollar
 * sign is written as `\$`. An unterminated `$` is left as plain text rather
 * than swallowing the rest of the paragraph.
 */
export function splitInlineMath(text: string): { math: boolean; value: string }[] {
  const segments: { math: boolean; value: string }[] = [];
  let plain = "";
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === "\\" && text[i + 1] === "$") {
      plain += "$";
      i += 2;
      continue;
    }
    if (ch === "$") {
      const end = text.indexOf("$", i + 1);
      if (end === -1) {
        plain += text.slice(i);
        break;
      }
      if (plain) segments.push({ math: false, value: plain });
      plain = "";
      segments.push({ math: true, value: text.slice(i + 1, end) });
      i = end + 1;
      continue;
    }
    plain += ch;
    i += 1;
  }
  if (plain) segments.push({ math: false, value: plain });
  return segments;
}

/**
 * Renders prose with inline KaTeX math between `$...$` delimiters, e.g.
 * "Let $\\beta_1 \\in (0, 1]$ be a decay rate." Backslashes must be doubled
 * in string literals (or use String.raw). Invalid math renders the source in
 * red instead of throwing, matching LatexBlock.
 */
export function InlineMath({ text }: { text: string }) {
  return (
    <>
      {splitInlineMath(text).map((seg, i) =>
        seg.math ? (
          <span
            key={i}
            className="text-ink"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(seg.value, { displayMode: false, throwOnError: false }),
            }}
          />
        ) : (
          <Fragment key={i}>{seg.value}</Fragment>
        ),
      )}
    </>
  );
}
