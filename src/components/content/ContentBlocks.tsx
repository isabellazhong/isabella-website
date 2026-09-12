import type { ContentBlock, ImageObject, TextContentBlock } from "../../types";
import { ImageObjectView } from "../image-objects/ImageObjectView";
import { TextImageBlock } from "../blocks/TextImageBlock";
import { ListBlock } from "../blocks/ListBlock";

/**
 * Photos set into a write-up read as illustrations rather than as prints on a
 * table, so single images and spring stacks default to no polaroid frame here
 * -- the opposite of the default elsewhere (the About portrait, for one, is
 * framed). Data can still ask for a frame back with an explicit variant.
 */
function unframed(image: ImageObject): ImageObject {
  return image.kind === "single" || image.kind === "spring-stack"
    ? { ...image, variant: image.variant ?? "plain" }
    : image;
}

/** Renders one text-only block. Shared by the top-level list and the text
    column of a text-image block. */
function renderTextBlock(block: TextContentBlock, key: string) {
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
    case "list":
      return <ListBlock key={key} items={block.items} title={block.title} style={block.style} />;
  }
}

/** Normalises a text-image block's `text` (string or block list) to blocks. */
function toTextBlocks(text: string | TextContentBlock[]): TextContentBlock[] {
  return typeof text === "string" ? [{ kind: "paragraph", text }] : text;
}

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
          case "paragraph":
          case "list":
            return renderTextBlock(block, key);
          case "image":
            return (
              <figure key={key} className="flex flex-col gap-2">
                <ImageObjectView object={unframed(block.image)} />
                {block.caption && <figcaption className="text-sm text-ink-soft">{block.caption}</figcaption>}
              </figure>
            );
          case "video": {
            const { kind: _kind, caption, ...video } = block;
            return (
              <figure key={key} className="flex flex-col gap-2">
                <ImageObjectView object={{ kind: "video", ...video }} />
                {caption && <figcaption className="text-sm text-ink-soft">{caption}</figcaption>}
              </figure>
            );
          }
          case "text-image":
            return (
              <TextImageBlock
                key={key}
                textSide={block.textSide}
                image={unframed(block.image)}
                title={block.title}
                titleSize={block.titleSize}
                position={block.position}
              >
                {toTextBlocks(block.text).map((b, j) => renderTextBlock(b, `${key}-${b.kind}-${j}`))}
              </TextImageBlock>
            );
        }
      })}
    </div>
  );
}
