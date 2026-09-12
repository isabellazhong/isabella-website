import type { ImageObject, Video } from "./image-object";

/** Where the text sits relative to the image: side by side at desktop
    widths for "left"/"right", stacked vertically for "top"/"bottom". */
export type TextImagePosition = "left" | "right" | "top" | "bottom";

/** Tailwind text-size utility for a title, restricted to text-1xl..text-9xl
    (matches /^text-[1-9]xl$/). text-1xl fills the gap in Tailwind's default
    scale, see index.css. */
export type TitleSize = `text-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}xl`;

/** Vertical position of the text column against the image, for "left"/"right"
    layouts where the two sit in the same row. Defaults to "center". */
export type TextVerticalPosition = "center" | "top" | "bottom";

/** Marker style for a list block: bulleted (<ul>) or numbered (<ol>). */
export type ListStyle = "bullet" | "number";

/**
 * Text-only blocks: the ones that can also sit inside a text-image block's
 * text column. Kept separate so a text-image block can't nest images.
 */
export type TextContentBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  /** A bulleted or numbered list with an optional title, written as
      { kind: "list", items: ["...", "..."] }. Defaults to bullets. */
  | { kind: "list"; items: string[]; title?: string; style?: ListStyle };

/**
 * ContentBlock is the building unit for long-form pages (project details,
 * blog posts). Pages hold an ordered ContentBlock[] and the ContentBlocks
 * component renders each variant. Add new variants here and register them in
 * src/components/content/ContentBlocks.tsx.
 */
export type ContentBlock =
  | TextContentBlock
  | { kind: "image"; image: ImageObject; caption?: string }
  /** A video player with an optional caption. Carries the Video object's own
      options (variant, controls, autoPlay, loop, muted) inline, so a block is
      written as { kind: "video", video: { src, alt }, loop: true }. */
  | ({ kind: "video"; caption?: string } & Omit<Video, "kind">)
  | {
      /** Split block: text alongside (or stacked with) any ImageObject. */
      kind: "text-image";
      textSide: TextImagePosition;
      title?: string;
      /** Tailwind text-size utility for the title. Defaults to "text-9xl". */
      titleSize?: TitleSize;
      /** Vertical position of the text against the image. Defaults to "center". */
      position?: TextVerticalPosition;
      /** A single paragraph as a string, or an ordered mix of text blocks
          (paragraphs, lists, headings) for the text column. */
      text: string | TextContentBlock[];
      image: ImageObject;
    };
