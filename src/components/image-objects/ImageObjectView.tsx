import type { ImageObject } from "../../types";
import { SingleImageView } from "./SingleImageView";
import { CarouselView } from "./CarouselView";
import { SpringStackView } from "./SpringStackView";
import { FrameSequenceView } from "./FrameSequenceView";
import { PhotoScatterView } from "./PhotoScatterView";

export interface ImageObjectViewProps {
  object: ImageObject;
  className?: string;
}

/**
 * Renders any ImageObject variant. This switch is the single registry for
 * image object types: after adding a variant to the entity union, add its
 * case here and TypeScript stops flagging the switch as non-exhaustive.
 */
export function ImageObjectView({ object, className }: ImageObjectViewProps) {
  switch (object.kind) {
    case "single":
      return <SingleImageView object={object} className={className} />;
    case "carousel":
      return <CarouselView object={object} className={className} />;
    case "spring-stack":
      return <SpringStackView object={object} className={className} />;
    case "frame-sequence":
      return <FrameSequenceView object={object} className={className} />;
    case "photo-scatter":
      return <PhotoScatterView object={object} className={className} />;
  }
}
