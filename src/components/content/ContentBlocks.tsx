import type { ContentBlock } from "../../types";
import { ImageObjectView } from "../image-objects/ImageObjectView";
import { TextImageBlock } from "../blocks/TextImageBlock";

/**
 * Renders an ordered list of content blocks (project details, blog posts).
 * Register new ContentBlock variants here after adding them to the entity.
 */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-10">
      {blocks.map((block, i) => {
        const key = `${block.kind}-${i}`;
        switch (block.kind) {
          case "heading":
            return (
              <h2 key={key} className="font-display text-2xl tracking-tight">
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={key} className="max-w-[65ch] leading-relaxed text-ink-soft">
                {block.text}
              </p>
            );
          case "image":
            return (
              <figure key={key} className="flex flex-col gap-2">
                <ImageObjectView object={block.image} />
                {block.caption && <figcaption className="text-sm text-ink-soft">{block.caption}</figcaption>}
              </figure>
            );
          case "text-image":
            return (
              <TextImageBlock key={key} textSide={block.textSide} image={block.image} title={block.title}>
                <p className="leading-relaxed text-ink-soft">{block.text}</p>
              </TextImageBlock>
            );
        }
      })}
    </div>
  );
}
