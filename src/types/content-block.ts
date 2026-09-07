import type { ImageObject } from "./image-object";

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

/**
 * ContentBlock is the building unit for long-form pages (project details,
 * blog posts). Pages hold an ordered ContentBlock[] and the ContentBlocks
 * component renders each variant. Add new variants here and register them in
 * src/components/content/ContentBlocks.tsx.
 */
export type ContentBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "image"; image: ImageObject; caption?: string }
  | {
      /** Split block: text alongside (or stacked with) any ImageObject. */
      kind: "text-image";
      textSide: TextImagePosition;
      title?: string;
      /** Tailwind text-size utility for the title. Defaults to "text-9xl". */
      titleSize?: TitleSize;
      /** Vertical position of the text against the image. Defaults to "center". */
      position?: TextVerticalPosition;
      text: string;
      image: ImageObject;
    };
