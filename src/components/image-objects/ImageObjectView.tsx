import type { ImageObject } from "../../types";
import { SingleImageView } from "./SingleImageView";
import { VideoView } from "./VideoView";
import { CarouselView } from "./CarouselView";
import { SpringStackView } from "./SpringStackView";
import { FrameSequenceView } from "./FrameSequenceView";
import { PhotoScatterView } from "./PhotoScatterView";

export interface ImageObjectViewProps {
  object: ImageObject;
  className?: string;
  /** Rendered width hint for still images (see IMAGE_SIZES); defaults to half a content column. */
  sizes?: string;
}

/**
 * Renders any ImageObject variant. This switch is the single registry for
 * image object types: after adding a variant to the entity union, add its
 * case here and TypeScript stops flagging the switch as non-exhaustive.
 */
export function ImageObjectView({ object, className, sizes }: ImageObjectViewProps) {
  switch (object.kind) {
    case "single":
      return <SingleImageView object={object} className={className} sizes={sizes} />;
    case "video":
      return <VideoView object={object} className={className} />;
    case "carousel":
      return <CarouselView object={object} className={className} sizes={sizes} />;
    case "spring-stack":
      return <SpringStackView object={object} className={className} sizes={sizes} />;
    case "frame-sequence":
      return <FrameSequenceView object={object} className={className} />;
    case "photo-scatter":
      return <PhotoScatterView object={object} className={className} />;
  }
}
