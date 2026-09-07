import type { ReactNode } from "react";
import type { ImageObject, TextImagePosition, TextVerticalPosition, TitleSize } from "../../types";
import { ImageObjectView } from "../image-objects/ImageObjectView";

/** Maps a vertical position to the text column's self-alignment within the
    side-by-side row (the image stays row-centered). */
const VERTICAL_POSITION_CLASS: Record<TextVerticalPosition, string> = {
  top: "self-start",
  center: "self-center",
  bottom: "self-end",
};

export interface TextImageBlockProps {
  /** Side by side at desktop widths for "left"/"right", stacked for "top"/"bottom". */
  textSide: TextImagePosition;
  /** Any ImageObject variant: single, carousel, spring-stack, frame-sequence, photo-scatter. */
  image: ImageObject;
  title?: string;
  /** Tailwind text-size utility for the title. Defaults to "text-9xl". */
  titleSize?: TitleSize;
  /** Text content: paragraphs, lists, links. */
  children?: ReactNode;
  className?: string;
  /** Vertical position of the text against the image in "left"/"right" layouts. Defaults to "center". */
  position?: TextVerticalPosition;
  align?: "text-left" | "text-center" | "text-right";
}

/**
 * Generic block: text alongside (or stacked with) an image object.
 * "left"/"right" sit side by side at desktop widths, collapsing to a single
 * column with text first below md. "top"/"bottom" always stack vertically.
 */
export function TextImageBlock({
  textSide,
  image,
  title,
  titleSize = "text-9xl",
  children,
  className,
  align = "text-left",
  position = "center",
}: TextImageBlockProps) {
  const textContent = (
    <>
      {title && <h2 className={`font-display ${titleSize} tracking-tight gradient-text ${align}`}>{title}</h2>}
      {children}
    </>
  );

  if (textSide === "top" || textSide === "bottom") {
    return (
      <div className={`flex flex-col gap-8 ${className ?? ""}`}>
        <div className={`flex flex-col gap-4 ${textSide === "top" ? "order-1" : "order-2"}`}>{textContent}</div>
        <div className={textSide === "top" ? "order-2" : "order-1"}>
          <ImageObjectView object={image} />
        </div>
      </div>
    );
  }

  const textOrder = textSide === "left" ? "md:order-1" : "md:order-2";
  const imageOrder = textSide === "left" ? "md:order-2" : "md:order-1";

  return (
    <div className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${className ?? ""}`}>
      <div className={`order-1 flex flex-col gap-4 ${textOrder} ${VERTICAL_POSITION_CLASS[position]}`}>
        {textContent}
      </div>
      <div className={`order-2 ${imageOrder}`}>
        <ImageObjectView object={image} />
      </div>
    </div>
  );
}
