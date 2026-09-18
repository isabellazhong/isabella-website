import { IMAGE_SIZES } from "../../lib/images";
import { ResponsiveImage } from "./ResponsiveImage";

export interface PolaroidImageProps {
  src: string;
  alt: string;
  /** Optional handwritten-style caption, set into the frame's bottom strip. */
  caption?: string;
  className?: string;
  /** Rendered width hint (see IMAGE_SIZES); defaults to half a content column. */
  sizes?: string;
}

/**
 * A single photo in a polaroid frame: white paper border, deeper strip along
 * the bottom, layered shadow for lifted depth. Unlike SingleImageView, this
 * takes a src/alt directly rather than an ImageObject, so it can be dropped
 * in anywhere a plain framed photo is needed without joining the
 * ImageObject/ContentBlock system.
 */
export function PolaroidImage({ src, alt, caption, className, sizes = IMAGE_SIZES.halfColumn }: PolaroidImageProps) {
  return (
    <figure className={`polaroid-frame relative ${className ?? ""}`}>
      <ResponsiveImage src={src} alt={alt} sizes={sizes} className="aspect-[4/3] w-full rounded-lg" />
      {caption && (
        <figcaption className="absolute inset-x-3 bottom-2 text-center font-display text-sm text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
