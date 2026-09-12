import type { ListStyle } from "../../types";

export interface ListBlockProps {
  /** "bullet" renders a <ul>, "number" an <ol>. Defaults to "bullet". */
  style?: ListStyle;
  /** Optional small heading above the list. */
  title?: string;
  items: string[];
  className?: string;
}

const LIST_STYLE_CLASS: Record<ListStyle, string> = {
  bullet: "list-disc",
  number: "list-decimal",
};

/**
 * A plain list for project details: bulleted or numbered, with an optional
 * title. Typography matches the paragraph block so lists read as part of the
 * same write-up.
 */
export function ListBlock({ style = "bullet", title, items, className }: ListBlockProps) {
  const Tag = style === "number" ? "ol" : "ul";
  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      {title && <h3 className="font-display text-xl tracking-tight">{title}</h3>}
      <Tag className={`${LIST_STYLE_CLASS[style]} max-w-[65ch] flex flex-col gap-2 pl-6 leading-relaxed text-ink-soft marker:text-ink`}>
        {items.map((item, i) => (
          <li key={i} className="pl-1">
            {item}
          </li>
        ))}
      </Tag>
    </div>
  );
}
