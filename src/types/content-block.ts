import type { ImageObject } from "./image-object";

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
      /** Split block: text on one side, any ImageObject on the other. */
      kind: "text-image";
      textSide: "left" | "right";
      title?: string;
      text: string;
      image: ImageObject;
    };
