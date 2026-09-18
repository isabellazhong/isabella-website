import type { SingleImage } from "../../types";
import { IMAGE_SIZES } from "../../lib/images";
import { ResponsiveImage } from "./ResponsiveImage";

export function SingleImageView({
  object,
  className,
  sizes = IMAGE_SIZES.halfColumn,
}: {
  object: SingleImage;
  className?: string;
  sizes?: string;
}) {
  if (object.variant === "plain") {
    return (
      <ResponsiveImage
        src={object.image.src}
        alt={object.image.alt}
        sizes={sizes}
        className={`max-h-200 max-w-full object-contain ${className ?? ""}`}
      />
    );
  }

  return (
    <div className={`polaroid-frame inline-block ${className ?? ""}`}>
      <ResponsiveImage
        src={object.image.src}
        alt={object.image.alt}
        sizes={sizes}
        className="max-h-200 max-w-full object-contain"
      />
    </div>
  );
}
