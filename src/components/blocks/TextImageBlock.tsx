import type { ReactNode } from "react";
import type { ImageObject } from "../../types";
import { ImageObjectView } from "../image-objects/ImageObjectView";

export interface TextImageBlockProps {
  /** Which side the text sits on at desktop widths. */
  textSide: "left" | "right";
  /** Any ImageObject variant: single, carousel, spring-stack, frame-sequence. */
  image: ImageObject;
  title?: string;
  /** Text content: paragraphs, lists, links. */
  children: ReactNode;
  className?: string;
}

/**
 * Generic split block: text on one side, an image object on the other.
 * Collapses to a single column with text first below md.
 */
export function TextImageBlock({ textSide, image, title, children, className }: TextImageBlockProps) {
  const textOrder = textSide === "left" ? "md:order-1" : "md:order-2";
  const imageOrder = textSide === "left" ? "md:order-2" : "md:order-1";

  return (
    <div className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${className ?? ""}`}>
      <div className={`order-1 flex flex-col gap-4 ${textOrder}`}>
        {title && <h2 className="font-display text-3xl tracking-tight">{title}</h2>}
        {children}
      </div>
      <div className={`order-2 ${imageOrder}`}>
        <ImageObjectView object={image} />
      </div>
    </div>
  );
}
